import { User } from '../../shared/types';

export interface ContactInvitation {
  id: string;
  sender: User;
  recipientEmail: string;
  status: 'PENDING' | 'ACCEPTED' | 'REJECTED';
  createdAt: string;
}

let MOCK_CONTACTS: User[] = [
  {
    id: 'usr_parth',
    username: 'parth',
    displayName: 'Parth Sonavane (Owner)',
    email: 'parth@onlyus.private',
    role: 'OWNER',
    status: 'APPROVED',
    isOnline: true,
    createdAt: '2026-07-01',
  },
  {
    id: 'usr_alice',
    username: 'alice',
    displayName: 'Alice Engineer',
    email: 'alice@onlyus.private',
    role: 'USER',
    status: 'APPROVED',
    isOnline: true,
    createdAt: '2026-07-10',
  },
  {
    id: 'usr_bob',
    username: 'bob_c',
    displayName: 'Bob Carter',
    email: 'bob@onlyus.private',
    role: 'USER',
    status: 'APPROVED',
    isOnline: false,
    createdAt: '2026-07-15',
  },
];

let MOCK_INVITATIONS: ContactInvitation[] = [
  {
    id: 'inv_101',
    sender: {
      id: 'usr_charlie',
      username: 'charlie_d',
      displayName: 'Charlie Davis',
      email: 'charlie@example.com',
      role: 'USER',
      status: 'APPROVED',
      isOnline: true,
      createdAt: '2026-07-20',
    },
    recipientEmail: 'me@onlyus.private',
    status: 'PENDING',
    createdAt: '2026-07-24 15:30',
  },
];

let MOCK_BLOCKED_USERS: User[] = [
  {
    id: 'usr_spammer',
    username: 'bad_bot',
    displayName: 'Blocked Account',
    email: 'spam@untrusted.com',
    role: 'USER',
    status: 'REJECTED',
    isOnline: false,
    createdAt: '2026-07-01',
  },
];

export class ContactService {
  static getContacts(): User[] {
    return [...MOCK_CONTACTS];
  }

  static getInvitations(): ContactInvitation[] {
    return MOCK_INVITATIONS.filter((i) => i.status === 'PENDING');
  }

  static getBlockedUsers(): User[] {
    return [...MOCK_BLOCKED_USERS];
  }

  static sendInvitation(emailOrUsername: string): ContactInvitation {
    if (!emailOrUsername.trim()) {
      throw new Error('Please enter a valid email or username.');
    }
    const newInv: ContactInvitation = {
      id: `inv_${Date.now()}`,
      sender: {
        id: 'usr_me',
        username: 'me',
        displayName: 'Current User',
        email: 'me@onlyus.private',
        role: 'USER',
        status: 'APPROVED',
        isOnline: true,
        createdAt: new Date().toISOString(),
      },
      recipientEmail: emailOrUsername,
      status: 'PENDING',
      createdAt: new Date().toLocaleString(),
    };
    MOCK_INVITATIONS.unshift(newInv);
    return newInv;
  }

  static acceptInvitation(invitationId: string): User {
    const inv = MOCK_INVITATIONS.find((i) => i.id === invitationId);
    if (!inv) throw new Error('Invitation not found.');

    inv.status = 'ACCEPTED';
    const newContact = inv.sender;
    if (!MOCK_CONTACTS.some((c) => c.id === newContact.id)) {
      MOCK_CONTACTS.push(newContact);
    }
    return newContact;
  }

  static rejectInvitation(invitationId: string): boolean {
    const inv = MOCK_INVITATIONS.find((i) => i.id === invitationId);
    if (!inv) throw new Error('Invitation not found.');
    inv.status = 'REJECTED';
    return true;
  }

  static blockUser(userId: string): User {
    const contactIdx = MOCK_CONTACTS.findIndex((c) => c.id === userId);
    if (contactIdx === -1) throw new Error('User not found in contacts.');

    const [blocked] = MOCK_CONTACTS.splice(contactIdx, 1);
    if (!MOCK_BLOCKED_USERS.some((b) => b.id === blocked.id)) {
      MOCK_BLOCKED_USERS.push(blocked);
    }
    return blocked;
  }

  static unblockUser(userId: string): User {
    const blockedIdx = MOCK_BLOCKED_USERS.findIndex((b) => b.id === userId);
    if (blockedIdx === -1) throw new Error('User not found in blocked list.');

    const [unblocked] = MOCK_BLOCKED_USERS.splice(blockedIdx, 1);
    if (!MOCK_CONTACTS.some((c) => c.id === unblocked.id)) {
      MOCK_CONTACTS.push(unblocked);
    }
    return unblocked;
  }

  static searchContacts(query: string): User[] {
    const q = query.toLowerCase();
    return MOCK_CONTACTS.filter(
      (c) =>
        c.displayName.toLowerCase().includes(q) ||
        c.username.toLowerCase().includes(q) ||
        c.email.toLowerCase().includes(q)
    );
  }
}
