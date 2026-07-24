import { AuthService } from '../features/auth/authService';
import { AdminService } from '../features/admin/adminService';
import { SecurityService } from '../features/security/securityService';
import { ContactService } from '../features/contacts/contactService';
import { GroupService } from '../features/groups/groupService';

export function runComprehensiveTestSuite(): { passed: number; failed: number; log: string[] } {
  const logs: string[] = [];
  let passed = 0;
  let failed = 0;

  function assert(condition: boolean, testName: string) {
    if (condition) {
      passed++;
      logs.push(`✔ [PASS] ${testName}`);
    } else {
      failed++;
      logs.push(`✖ [FAIL] ${testName}`);
    }
  }

  // 1. AUTHENTICATION TESTS
  try {
    assert(AuthService.validateInviteCode('ONLYUS-INVITE-2026') === true, 'Auth Test: Valid invite code accepted');
    assert(AuthService.validateInviteCode('INVALID-CODE-999') === false, 'Auth Test: Invalid invite code rejected');
  } catch (e: any) {
    assert(false, `Auth Test Exception: ${e.message}`);
  }

  // 2. ADMIN APPROVAL & RBAC TESTS
  try {
    const pendingUsers = AdminService.getUsers('PENDING');
    assert(pendingUsers.length > 0, 'Admin Test: Pending users retrieved for review');

    if (pendingUsers.length > 0) {
      const approved = AdminService.approveUser(pendingUsers[0].id);
      assert(approved.status === 'APPROVED', 'Admin Test: User approved successfully');
    }

    let ownerDeleteFailed = false;
    try {
      AdminService.deleteUser('usr_owner');
    } catch {
      ownerDeleteFailed = true;
    }
    assert(ownerDeleteFailed === true, 'Admin Test: Owner account deletion safeguard enforced');
  } catch (e: any) {
    assert(false, `Admin Test Exception: ${e.message}`);
  }

  // 3. SECURITY & XSS SANITIZATION TESTS
  try {
    const unsafeString = '<script>alert("hack")</script>';
    const sanitized = SecurityService.sanitizeInput(unsafeString);
    assert(!sanitized.includes('<script>'), 'Security Test: XSS script tags escaped');

    const rbacResult = SecurityService.enforceRbac('USER', 'OWNER');
    assert(rbacResult === false, 'Security Test: USER blocked from OWNER privilege requirement');
  } catch (e: any) {
    assert(false, `Security Test Exception: ${e.message}`);
  }

  // 4. CONTACTS & GROUPS TESTS
  try {
    const inv = ContactService.sendInvitation('friend@test.com');
    assert(inv.recipientEmail === 'friend@test.com', 'Contacts Test: Friend invitation dispatched');

    const group = GroupService.createGroup('Test Group', 'Description', []);
    assert(group.name === 'Test Group', 'Group Test: Group creation verified');
  } catch (e: any) {
    assert(false, `Contacts/Groups Exception: ${e.message}`);
  }

  return { passed, failed, log: logs };
}
