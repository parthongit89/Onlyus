# Global Rules & Directives

## Global Rules
- Never generate dummy features unless requested.
- Never expose private user data.
- Never bypass authentication.
- Never bypass authorization.
- Always use clean architecture.
- Keep every feature modular.
- Follow feature-based folder structure.
- Reusable code only.
- Avoid duplicate logic.
- Every API must have validation.
- Every database query must be secure.
- Every error must be handled gracefully.
- Write readable code with comments where necessary.
- Use github for version control mangement

---

## Authentication Rules
- Registration is Invite Only.
- Public signup is disabled.
- Every new account starts as Pending.
- Only Admin or Owner can approve an account.
- Rejected users cannot login.
- Suspended users cannot login.
- Every login must require authentication.
- Logout must invalidate the session.
- Store passwords securely using strong hashing.
- Limit failed login attempts.

---

## User Rules
**Users can:**
- Chat privately.
- Create groups.
- Send images, videos, files.
- Edit profile.
- Change password.
- Block users.
- Delete own account.

**Users cannot:**
- Access Admin pages.
- Access Owner pages.
- View other private data.
- Approve users.
- Delete other accounts.
- Modify server settings.

---

## Admin Rules
**Admins can:**
- Review new registrations.
- Approve users.
- Reject users.
- Suspend users.
- Delete users.
- View reports.
- Manage groups.
- Search users.
- View audit logs.

**Admins cannot:**
- Delete Owner.
- Change Owner role.
- Modify critical system configuration.

---

## Owner Rules
Owner has full system access.
**Owner can:**
- Add Admin.
- Remove Admin.
- Disable Admin.
- Delete any account.
- Manage invitations.
- Manage server settings.
- View analytics.
- Restore deleted accounts (if enabled).

---

## Chat Rules
- Private chats only.
- Invite-only users.
- Messages belong only to participants.
- Deleted messages should follow project policy.
- Support read receipts.
- Support typing indicator.
- Support message reactions.
- Support pinned messages.
- Support archived chats.

---

## Group Rules
- Group creator becomes Group Admin.
- Group Admin can add/remove members.
- Group Admin can change group photo.
- Group Admin can rename group.
- Only members can read group messages.

---

## Media Rules
- Validate uploaded files.
- Limit maximum upload size.
- Allow image preview.
- Allow video preview.
- Reject unsupported file types.

---

## Security Rules
- Use HTTPS only.
- Validate every request.
- Prevent SQL Injection, XSS, CSRF.
- Sanitize all inputs.
- Rate limit APIs.
- Record security events.
- Protect secrets using environment variables.

---

## Database Rules
- Never duplicate user records.
- Use unique IDs.
- Store timestamps.
- Soft delete where possible.
- Use transactions for critical operations.

---

## API Rules
- RESTful naming.
- Consistent response format.
- Proper HTTP status codes.
- Validate request body.
- Return meaningful errors.

---

## UI Rules
- Responsive layouts.
- Consistent colors.
- Accessible components.
- Loading indicators.
- Empty states.
- Error states.

---

## Logging Rules
**Log:**
- Login or invite
- Logout
- Registration
- Account Approval / Rejection
- User Suspension
- Group Creation
- Media Upload
- Security Events

**Never log:**
- Passwords
- OTP
- Private message content
- Encryption keys

---

## Coding Rules
- TypeScript only.
- Strict typing.
- ESLint.
- Prettier.
- Small reusable components.
- Feature-first architecture.
- No hardcoded secrets.
- No duplicate code.
- Keep functions focused.

---

## AI Agent Rules
- Never remove existing features unless requested.
- Never modify authentication flow without permission.
- Never expose admin APIs to users.
- Ask before changing database schema.
- Keep the project scalable.
- Follow `Architecture.md` strictly.
- Follow `ProjectRequirements.md` strictly.
- Keep backward compatibility whenever possible.
