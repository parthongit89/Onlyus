# Project Name: OnlyUs Architecture

## Architecture Style
**Feature-Based Architecture**
- The project must be modular.
- Each feature is isolated.

### Project Structure
```
src/
├── features/
│   ├── auth/
│   ├── chats/
│   ├── groups/
│   ├── contacts/
│   ├── profile/
│   ├── notifications/
|   |──media/
│   ├── settings/
│   ├── admin/
│   └── onboarding/
├── shared/
│   ├── components/
│   ├── hooks/
│   ├── services/
│   ├── utils/
│   ├── constants/
│   ├── types/
│   └── assets/
├── layouts/
├── routes/
├── providers/
├── store/
├── api/
├── App.tsx
└── main.tsx
```

---

## User Roles

### 1. Owner
Highest authority.
- **Can**: Access everything, Add Admins, Remove Admins, Delete any account, Suspend users, View analytics, Manage invitations, Configure system settings.

### 2. Admin
- **Can**: Review every newly registered account, Approve accounts, Reject accounts, Suspend users, Delete inappropriate content, Manage groups, View reports, Manage invitations.
- **Cannot**: Remove Owner, Change Owner settings.

### 3. User
- **Can**: Send messages, Receive messages, Create groups, Share media, Edit profile, Block users, Delete own account.
- **Cannot**: Access admin dashboard.

---

## Authentication Flow
Invite Only.
Registration Flow:
`Invite` → `OTP Verification` → `Account Created` → `Pending Review` → `Admin Approval` → `User Gets Access`
*(No public signup)*

---

## Core Modules
- Authentication
- Chats (Private Chat, Group Chat)
- Media Sharing
- Notifications
- Contacts
- Settings
- Admin Dashboard
- Owner Dashboard

---

## Admin Dashboard Features
- Pending Users
- Approved Users
- Rejected Users
- Blocked Users
- Groups
- Reports
- Invitations
- Logs
- Analytics
- Search Users
- Delete Account / Suspend Account
- Approve / Reject Registration

---

## Chat System Features
- One-to-One Chat
- Group Chat
- Image Sharing, Video Sharing, Document Sharing, Voice Notes
- Read Receipts
- Typing Indicator
- Online Status
- Message Search
- Pinned Chats 
- Delete, Forward, Reply, Star Messages

---

## Security
- Authentication Required
- Role-Based Access Control (RBAC)
- Secure APIs
- Encrypted Database Connection
- Rate Limiting
- Audit Logs
- Device Session Management
- Login History

---

## Notifications
- New Message
- Group Invitation
- Account Approved / Account Rejected
- Admin Announcement
- System Updates

---

## Database Collections / Tables
- Users
- Admins
- Invitations
- Chats
- Messages
- Groups
- Media
- Notifications
- Reports
- AuditLogs
- Sessions
- Settings

---

## Shared Components
- Button, Input, Modal, Avatar, Loader, Toast, Navbar, Sidebar, SearchBar, EmptyState, ErrorScreen

---

## API Structure
- `/auth`
- `/users`
- `/chats`
- `/messages`
- `/groups`
- `/media`
- `/notifications`
- `/admin`
- `/settings`
- `/reports`

---

## Future Modules
- Voice Calling, Video Calling, Screen Sharing, Message Scheduling, Message Translation, AI Chat Assistant, Backup & Restore, Desktop Application, Web Application, End-to-End Encryption, Multi Device Support.
