import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../shared/components/Button';
import { Input } from '../../shared/components/Input';
import { Avatar } from '../../shared/components/Avatar';
import { AdminService } from './adminService';
import { User, InviteToken, AuditLog } from '../../shared/types';

export const AdminDashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'pending' | 'approved' | 'rejected' | 'invites' | 'logs'>('pending');
  const [searchQuery, setSearchQuery] = useState('');
  const [users, setUsers] = useState<User[]>(AdminService.getUsers());
  const [invites, setInvites] = useState<InviteToken[]>(AdminService.getInvitations());
  const [logs, setLogs] = useState<AuditLog[]>(AdminService.getAuditLogs());
  const [notification, setNotification] = useState<string | null>(null);

  const refreshData = () => {
    setUsers(AdminService.getUsers());
    setInvites(AdminService.getInvitations());
    setLogs(AdminService.getAuditLogs());
  };

  const showNotification = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3000);
  };

  const handleApprove = (userId: string) => {
    try {
      AdminService.approveUser(userId);
      refreshData();
      showNotification('Account approved successfully. User now has access to OnlyUs.');
    } catch (err: any) {
      alert(err.message);
    }
  };

  const handleReject = (userId: string) => {
    try {
      AdminService.rejectUser(userId);
      refreshData();
      showNotification('Registration request rejected.');
    } catch (err: any) {
      alert(err.message);
    }
  };

  const handleSuspend = (userId: string) => {
    try {
      AdminService.suspendUser(userId);
      refreshData();
      showNotification('User account suspended.');
    } catch (err: any) {
      alert(err.message);
    }
  };

  const handleDelete = (userId: string) => {
    if (confirm('Are you sure you want to permanently delete this user account?')) {
      try {
        AdminService.deleteUser(userId);
        refreshData();
        showNotification('User account permanently deleted.');
      } catch (err: any) {
        alert(err.message);
      }
    }
  };

  const handleGenerateInvite = () => {
    const newInvite = AdminService.generateInviteToken();
    refreshData();
    showNotification(`New invite token generated: ${newInvite.code}`);
  };

  // Filtered lists
  const pendingUsers = users.filter((u) => u.status === 'PENDING');
  const approvedUsers = users.filter((u) => u.status === 'APPROVED');
  const rejectedUsers = users.filter((u) => u.status === 'REJECTED' || u.status === 'SUSPENDED');
  const filteredUsers = searchQuery ? AdminService.searchUsers(searchQuery) : users;

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#0d0f12', color: '#f5f6f8', padding: '32px 24px' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        {/* Top Bar */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '28px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <h1 style={{ fontSize: '1.8rem', fontWeight: 700 }}>Admin Dashboard</h1>
              <span style={{ backgroundColor: 'rgba(240, 123, 66, 0.15)', color: '#f07b42', fontSize: '0.78rem', fontWeight: 600, padding: '4px 10px', borderRadius: '12px' }}>
                Phase 3 — Active
              </span>
            </div>
            <p style={{ fontSize: '0.9rem', color: '#9da4b0', marginTop: '4px' }}>
              Invitation reviews, access approvals, security moderation & system logs
            </p>
          </div>
          <Button variant="outline" onClick={() => navigate('/chats')}>
            ← Back to Chats
          </Button>
        </div>

        {/* Floating Notification */}
        {notification && (
          <div style={{ backgroundColor: '#22c55e', color: '#ffffff', padding: '12px 20px', borderRadius: '12px', marginBottom: '24px', fontWeight: 500, boxShadow: '0 4px 14px rgba(34, 197, 94, 0.3)' }}>
            ✓ {notification}
          </div>
        )}

        {/* Stats Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '28px' }}>
          <div style={{ backgroundColor: '#16191e', borderRadius: '16px', padding: '20px', border: '1px solid rgba(255,255,255,0.08)' }}>
            <span style={{ fontSize: '0.82rem', color: '#9da4b0' }}>Pending Approvals</span>
            <div style={{ fontSize: '2rem', fontWeight: 700, color: '#eab308', marginTop: '4px' }}>{pendingUsers.length}</div>
          </div>
          <div style={{ backgroundColor: '#16191e', borderRadius: '16px', padding: '20px', border: '1px solid rgba(255,255,255,0.08)' }}>
            <span style={{ fontSize: '0.82rem', color: '#9da4b0' }}>Approved Users</span>
            <div style={{ fontSize: '2rem', fontWeight: 700, color: '#22c55e', marginTop: '4px' }}>{approvedUsers.length}</div>
          </div>
          <div style={{ backgroundColor: '#16191e', borderRadius: '16px', padding: '20px', border: '1px solid rgba(255,255,255,0.08)' }}>
            <span style={{ fontSize: '0.82rem', color: '#9da4b0' }}>Active Invite Tokens</span>
            <div style={{ fontSize: '2rem', fontWeight: 700, color: '#f07b42', marginTop: '4px' }}>{invites.filter(i => !i.isUsed).length}</div>
          </div>
          <div style={{ backgroundColor: '#16191e', borderRadius: '16px', padding: '20px', border: '1px solid rgba(255,255,255,0.08)' }}>
            <span style={{ fontSize: '0.82rem', color: '#9da4b0' }}>Security Audit Logs</span>
            <div style={{ fontSize: '2rem', fontWeight: 700, color: '#3b82f6', marginTop: '4px' }}>{logs.length}</div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div style={{ display: 'flex', gap: '8px', borderBottom: '1px solid rgba(255, 255, 255, 0.08)', marginBottom: '24px', paddingBottom: '8px' }}>
          <Button variant={activeTab === 'pending' ? 'primary' : 'outline'} size="sm" onClick={() => setActiveTab('pending')}>
            Pending Approvals ({pendingUsers.length})
          </Button>
          <Button variant={activeTab === 'approved' ? 'primary' : 'outline'} size="sm" onClick={() => setActiveTab('approved')}>
            Approved Users ({approvedUsers.length})
          </Button>
          <Button variant={activeTab === 'rejected' ? 'primary' : 'outline'} size="sm" onClick={() => setActiveTab('rejected')}>
            Rejected / Suspended ({rejectedUsers.length})
          </Button>
          <Button variant={activeTab === 'invites' ? 'primary' : 'outline'} size="sm" onClick={() => setActiveTab('invites')}>
            Invitation Tokens
          </Button>
          <Button variant={activeTab === 'logs' ? 'primary' : 'outline'} size="sm" onClick={() => setActiveTab('logs')}>
            Audit Logs
          </Button>
        </div>

        {/* Search Bar */}
        <div style={{ marginBottom: '20px' }}>
          <Input placeholder="Search users by name, email, or username..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
        </div>

        {/* Content Pane */}
        <div style={{ backgroundColor: '#16191e', borderRadius: '20px', padding: '24px', border: '1px solid rgba(255, 255, 255, 0.08)' }}>
          {activeTab === 'pending' && (
            <div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 600, marginBottom: '16px' }}>Pending User Approvals</h3>
              {pendingUsers.length === 0 ? (
                <div style={{ color: '#626975', padding: '24px 0', textAlign: 'center' }}>No pending user requests at this moment.</div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {pendingUsers.map((u) => (
                    <div key={u.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px', backgroundColor: '#1e2229', borderRadius: '14px', border: '1px solid rgba(234, 179, 8, 0.2)' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                        <Avatar name={u.displayName} />
                        <div>
                          <div style={{ fontWeight: 600, fontSize: '0.95rem' }}>{u.displayName} <span style={{ fontSize: '0.8rem', color: '#9da4b0' }}>({u.email})</span></div>
                          <div style={{ fontSize: '0.78rem', color: '#eab308', marginTop: '2px' }}>Status: PENDING ADMIN APPROVAL • Requested {u.createdAt}</div>
                        </div>
                      </div>
                      <div style={{ display: 'flex', gap: '10px' }}>
                        <Button size="sm" variant="primary" onClick={() => handleApprove(u.id)}>Approve Access</Button>
                        <Button size="sm" variant="danger" onClick={() => handleReject(u.id)}>Reject</Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === 'approved' && (
            <div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 600, marginBottom: '16px' }}>Approved Active Members</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {approvedUsers.map((u) => (
                  <div key={u.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px', backgroundColor: '#1e2229', borderRadius: '14px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                      <Avatar name={u.displayName} isOnline={u.isOnline} />
                      <div>
                        <div style={{ fontWeight: 600, fontSize: '0.95rem' }}>{u.displayName} <span style={{ fontSize: '0.8rem', color: '#f07b42', fontWeight: 500 }}>[{u.role}]</span></div>
                        <div style={{ fontSize: '0.78rem', color: '#9da4b0' }}>{u.email} • Joined {u.createdAt}</div>
                      </div>
                    </div>
                    {u.role !== 'OWNER' && (
                      <div style={{ display: 'flex', gap: '10px' }}>
                        <Button size="sm" variant="outline" onClick={() => handleSuspend(u.id)}>Suspend</Button>
                        <Button size="sm" variant="danger" onClick={() => handleDelete(u.id)}>Delete</Button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'invites' && (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 600 }}>Invite Tokens</h3>
                <Button size="sm" variant="primary" onClick={handleGenerateInvite}>+ Generate New Invite Token</Button>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {invites.map((inv, idx) => (
                  <div key={idx} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 18px', backgroundColor: '#1e2229', borderRadius: '12px' }}>
                    <div>
                      <code style={{ fontSize: '1rem', color: '#f07b42', fontWeight: 700 }}>{inv.code}</code>
                      <div style={{ fontSize: '0.78rem', color: '#9da4b0', marginTop: '2px' }}>Expires: {inv.expiresAt} • Created by {inv.createdBy}</div>
                    </div>
                    <span style={{ fontSize: '0.8rem', fontWeight: 600, padding: '4px 10px', borderRadius: '8px', backgroundColor: inv.isUsed ? 'rgba(239, 68, 68, 0.15)' : 'rgba(34, 197, 94, 0.15)', color: inv.isUsed ? '#ef4444' : '#22c55e' }}>
                      {inv.isUsed ? 'USED' : 'ACTIVE'}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'logs' && (
            <div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 600, marginBottom: '16px' }}>Security Audit Logs</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {logs.map((log) => (
                  <div key={log.id} style={{ padding: '12px 16px', backgroundColor: '#1e2229', borderRadius: '10px', borderLeft: '3px solid #3b82f6', fontSize: '0.86rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', color: '#9da4b0', marginBottom: '4px' }}>
                      <span style={{ fontWeight: 600, color: '#3b82f6' }}>[{log.action}]</span>
                      <span>{log.timestamp}</span>
                    </div>
                    <div style={{ color: '#f5f6f8' }}>{log.details}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
