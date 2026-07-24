import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../shared/components/Button';
import { Input } from '../../shared/components/Input';
import { Avatar } from '../../shared/components/Avatar';
import { ContactService, ContactInvitation } from './contactService';
import { User } from '../../shared/types';

export const ContactsPage: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'contacts' | 'invitations' | 'blocked'>('contacts');
  const [searchQuery, setSearchQuery] = useState('');
  const [newContactEmail, setNewContactEmail] = useState('');
  const [contacts, setContacts] = useState<User[]>(ContactService.getContacts());
  const [invitations, setInvitations] = useState<ContactInvitation[]>(ContactService.getInvitations());
  const [blockedUsers, setBlockedUsers] = useState<User[]>(ContactService.getBlockedUsers());
  const [notification, setNotification] = useState<string | null>(null);

  const refreshData = () => {
    setContacts(ContactService.getContacts());
    setInvitations(ContactService.getInvitations());
    setBlockedUsers(ContactService.getBlockedUsers());
  };

  const showNotify = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3000);
  };

  const handleSendInvitation = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const inv = ContactService.sendInvitation(newContactEmail);
      setNewContactEmail('');
      refreshData();
      showNotify(`Friend invitation sent to ${inv.recipientEmail}`);
    } catch (err: any) {
      alert(err.message);
    }
  };

  const handleAccept = (invId: string) => {
    try {
      const added = ContactService.acceptInvitation(invId);
      refreshData();
      showNotify(`Accepted invitation from ${added.displayName}`);
    } catch (err: any) {
      alert(err.message);
    }
  };

  const handleReject = (invId: string) => {
    try {
      ContactService.rejectInvitation(invId);
      refreshData();
      showNotify('Invitation declined.');
    } catch (err: any) {
      alert(err.message);
    }
  };

  const handleBlock = (userId: string) => {
    try {
      const blocked = ContactService.blockUser(userId);
      refreshData();
      showNotify(`Blocked ${blocked.displayName}`);
    } catch (err: any) {
      alert(err.message);
    }
  };

  const handleUnblock = (userId: string) => {
    try {
      const unblocked = ContactService.unblockUser(userId);
      refreshData();
      showNotify(`Unblocked ${unblocked.displayName}`);
    } catch (err: any) {
      alert(err.message);
    }
  };

  const filteredContacts = searchQuery ? ContactService.searchContacts(searchQuery) : contacts;

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#0d0f12', color: '#f5f6f8', padding: '32px 24px' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '28px' }}>
          <div>
            <h1 style={{ fontSize: '1.8rem', fontWeight: 700 }}>Contacts & Friends</h1>
            <p style={{ fontSize: '0.88rem', color: '#9da4b0', marginTop: '4px' }}>
              Manage friend invitations, private contacts, and blocked accounts
            </p>
          </div>
          <Button variant="outline" onClick={() => navigate('/chats')}>
            ← Back to Chats
          </Button>
        </div>

        {notification && (
          <div style={{ backgroundColor: '#22c55e', color: '#ffffff', padding: '12px 20px', borderRadius: '12px', marginBottom: '24px', fontWeight: 500 }}>
            ✓ {notification}
          </div>
        )}

        {/* Add Friend Form */}
        <div style={{ backgroundColor: '#16191e', borderRadius: '20px', padding: '24px', border: '1px solid rgba(255, 255, 255, 0.08)', marginBottom: '28px' }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '14px' }}>Send Friend Invitation</h3>
          <form onSubmit={handleSendInvitation} style={{ display: 'flex', gap: '12px' }}>
            <Input
              placeholder="Enter friend's email or @username..."
              value={newContactEmail}
              onChange={(e) => setNewContactEmail(e.target.value)}
            />
            <Button type="submit">Send Invite</Button>
          </form>
        </div>

        {/* Navigation Tabs */}
        <div style={{ display: 'flex', gap: '8px', borderBottom: '1px solid rgba(255, 255, 255, 0.08)', marginBottom: '24px', paddingBottom: '8px' }}>
          <Button variant={activeTab === 'contacts' ? 'primary' : 'outline'} size="sm" onClick={() => setActiveTab('contacts')}>
            My Contacts ({contacts.length})
          </Button>
          <Button variant={activeTab === 'invitations' ? 'primary' : 'outline'} size="sm" onClick={() => setActiveTab('invitations')}>
            Pending Invitations ({invitations.length})
          </Button>
          <Button variant={activeTab === 'blocked' ? 'primary' : 'outline'} size="sm" onClick={() => setActiveTab('blocked')}>
            Blocked Users ({blockedUsers.length})
          </Button>
        </div>

        {/* Search */}
        <div style={{ marginBottom: '20px' }}>
          <Input placeholder="Search contacts by name, email, or @username..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
        </div>

        {/* Tab Content */}
        <div style={{ backgroundColor: '#16191e', borderRadius: '20px', padding: '24px', border: '1px solid rgba(255, 255, 255, 0.08)' }}>
          {activeTab === 'contacts' && (
            <div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '16px' }}>Direct Contacts</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {filteredContacts.map((c) => (
                  <div key={c.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 18px', backgroundColor: '#1e2229', borderRadius: '14px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                      <Avatar name={c.displayName} isOnline={c.isOnline} />
                      <div>
                        <div style={{ fontWeight: 600, fontSize: '0.95rem' }}>{c.displayName}</div>
                        <div style={{ fontSize: '0.78rem', color: '#9da4b0' }}>@{c.username} • {c.email}</div>
                      </div>
                    </div>
                    <div style={{ display: 'flex', gap: '10px' }}>
                      <Button size="sm" variant="primary" onClick={() => navigate('/chats')}>Message</Button>
                      <Button size="sm" variant="danger" onClick={() => handleBlock(c.id)}>Block</Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'invitations' && (
            <div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '16px' }}>Incoming Friend Invitations</h3>
              {invitations.length === 0 ? (
                <div style={{ color: '#626975', padding: '20px 0', textAlign: 'center' }}>No pending friend invitations.</div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {invitations.map((inv) => (
                    <div key={inv.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 18px', backgroundColor: '#1e2229', borderRadius: '14px', border: '1px solid rgba(240, 123, 66, 0.2)' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                        <Avatar name={inv.sender.displayName} isOnline={inv.sender.isOnline} />
                        <div>
                          <div style={{ fontWeight: 600, fontSize: '0.95rem' }}>{inv.sender.displayName}</div>
                          <div style={{ fontSize: '0.78rem', color: '#9da4b0' }}>{inv.sender.email} • Sent {inv.createdAt}</div>
                        </div>
                      </div>
                      <div style={{ display: 'flex', gap: '10px' }}>
                        <Button size="sm" variant="primary" onClick={() => handleAccept(inv.id)}>Accept</Button>
                        <Button size="sm" variant="outline" onClick={() => handleReject(inv.id)}>Decline</Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === 'blocked' && (
            <div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '16px' }}>Blocked Accounts</h3>
              {blockedUsers.length === 0 ? (
                <div style={{ color: '#626975', padding: '20px 0', textAlign: 'center' }}>No blocked accounts.</div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {blockedUsers.map((b) => (
                    <div key={b.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 18px', backgroundColor: '#1e2229', borderRadius: '14px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                        <Avatar name={b.displayName} />
                        <div>
                          <div style={{ fontWeight: 600, fontSize: '0.95rem' }}>{b.displayName}</div>
                          <div style={{ fontSize: '0.78rem', color: '#ef4444' }}>BLOCKED • {b.email}</div>
                        </div>
                      </div>
                      <Button size="sm" variant="outline" onClick={() => handleUnblock(b.id)}>Unblock</Button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
