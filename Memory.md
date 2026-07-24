# AI Persistent Memory

This file contains permanent project knowledge.
The AI must always read this file before starting any task.
If this file conflicts with any assumption, this file always has higher priority.

---

## Project Identity
- **Project Name**: OnlyUs
- **Project Type**: Private Invite-Only Messaging Application
- **Project Status**: Under Active Development
- **Project Owner**: Parth Sonavane

---

## Project Vision
- The application is NOT a public social media platform.
- The application exists only for trusted friends and family members.
- Every feature must support privacy, simplicity, speed, and security.

---

## Design Memory
- All UI/UX designs are provided by the Project Owner.
- The AI must never generate its own design.
- Never redesign existing screens.
- Never modify layouts unless instructed.
- Always implement designs exactly as provided.

---

## Development Memory
- Development follows `Phases.md`.
- Never skip phases.
- Never develop future features before the current phase is completed.
- Every phase must be reviewed before continuing.

---

## Architecture Memory
- Always follow `Architecture.md`.
- Use Feature-Based Architecture.
- Keep every module isolated.
- Avoid duplicate code.
- Write reusable components.

---

## Rules Memory
- Always follow `Rules.md`.
- Never bypass project rules.
- Never remove existing features without permission.
- Never expose admin functionality to normal users.

---

## Authentication Memory
- Registration is Invite Only.
- Public registration is disabled.
- Every account starts as Pending.
- Admin approval is mandatory.
- Rejected users cannot login.
- Suspended users cannot login.

---

## User Roles Memory
- **Owner**: Full access
- **Admin**: Review accounts, Approve users, Reject users, Suspend users
- **User**: Private messaging only

---

## Security Memory
- Authentication is required everywhere.
- Authorization is required everywhere.
- Validate every request.
- Protect all APIs.
- Never expose sensitive information.
- Never hardcode secrets.

---

## Code Memory
- Use clean code.
- Small reusable functions.
- Reusable UI components.
- Consistent naming.
- Readable project structure.
- Strict typing where applicable.

---

## Database Memory
- Avoid duplicate records.
- Use unique IDs.
- Store timestamps.
- Maintain data integrity.
- Never delete critical data accidentally.

---

## API Memory
- Use consistent endpoint naming.
- Return proper HTTP status codes.
- Validate all input.
- Handle all errors gracefully.

---

## Logging Memory
- Log important system events.
- **Never log**: Passwords, OTPs, Private messages, Encryption keys, Authentication tokens.

---

## AI Behavior Memory
- Never assume missing requirements.
- Ask questions if requirements are unclear.
- Never invent features.
- Never invent screens.
- Never change business logic without approval.
- Never change project architecture without approval.
- Always preserve existing functionality.

---

## Documentation Memory
Whenever a new feature is completed:
- Update documentation if required.
- Keep `Architecture.md` synchronized.
- Keep `Rules.md` synchronized.
- Keep API documentation synchronized.

---

## Long-Term Goal
Build a scalable, secure, modern private messaging platform with complete owner control while maintaining clean architecture, modular development, and high code quality.
