# Application name "OnlyUs"

Project requirement.md file

- **GitHub Access Token**: `ghp_************************************`
- **GitHub Username**: `parthongit89`
- **PostgreSQL Database Password**: `parthpostgress89##`
- **Port**: `5432`

## Connect firbase SQL Database 
```
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBBrszbHCHj_F_GIuktnzm4qnNq6ivAYfo",
  authDomain: "onlyus-f7a0b.firebaseapp.com",
  projectId: "onlyus-f7a0b",
  storageBucket: "onlyus-f7a0b.firebasestorage.app",
  messagingSenderId: "472354289896",
  appId: "1:472354289896:web:0bb2af18cc0b7ea925715d",
  measurementId: "G-E33TP066RE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

```

---

## Core Algorithms & Concepts
- **Authentication**: OTP, Email, JWT Tokens
- **End-to-End Encryption (E2EE)**: Signal Protocol (industry standard)
- **Message Delivery**: Queue system (FIFO), retries, acknowledgements
- **Real-time Communication**: WebSockets or gRPC
- **Offline Sync**: Local database + background synchronization
- **Push Notifications**: Firebase Cloud Messaging (FCM)
- **Media Upload**: Chunked upload for large files
- **Compression**: Images/videos compression
- **Caching**: Frequently used data stored locally
- **Search Indexing**: Fast message search
- **Rate Limiting**: Spam and abuse prevention

## Data Structures
- Queue
- Hash Map
- Trees
- Graphs (contacts/groups)
- Priority Queue (notifications)
- Trie (fast search)

## Security
- AES-256 Encryption
- RSA/ECC for key exchange
- Signal Double Ratchet Algorithm
- TLS/HTTPS
- Password Hashing (Argon2, bcrypt)

---

## Goal of the Project
Build a secure, private, invitation-only messaging application for personal communication among trusted friends and family members.

The application will focus on fast, reliable, and private one-to-one and group messaging without public profiles, public feeds, advertisements, or content recommendations.

Only authorized users invited by the administrator can access the platform. The project should prioritize privacy, security, a clean user experience, and reliable real-time communication while remaining simple and easy to use.

The long-term goal is to create an independent private communication platform fully controlled by the owner, with complete control over user management, features, and infrastructure.
