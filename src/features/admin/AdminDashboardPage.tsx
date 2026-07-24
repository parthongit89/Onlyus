import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../shared/components/Button';

export const AdminDashboardPage: React.FC = () => {
  const navigate = useNavigate();

  const pendingUsers = [
    { id: 'usr_101', email: 'user1@example.com', date: '2026-07-24', status: 'PENDING' },
    { id: 'usr_102', email: 'user2@example.com', date: '2026-07-23', status: 'PENDING' },
  ];

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#0d0f12', color: '#f5f6f8', padding: '32px' }}>
      <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
          <div>
            <h1 style={{ fontSize: '1.8rem', fontWeight: 700 }}>Admin Dashboard</h1>
            <p style={{ fontSize: '0.9rem', color: '#9da4b0' }}>Manage user access approvals & invitations</p>
          </div>
          <Button variant="outline" onClick={() => navigate('/chats')}>
            Back to Chats
          </Button>
        </div>

        {/* Stats Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '36px' }}>
          {[
            { label: 'Pending Approvals', count: '2', color: '#eab308' },
            { label: 'Approved Users', count: '14', color: '#22c55e' },
            { label: 'Rejected Requests', count: '1', color: '#ef4444' },
            { label: 'System Logs', count: '128', color: '#3b82f6' },
          ].map((stat, i) => (
            <div key={i} style={{ backgroundColor: '#16191e', borderRadius: '16px', padding: '20px', border: '1px solid rgba(255,255,255,0.08)' }}>
              <span style={{ fontSize: '0.82rem', color: '#9da4b0' }}>{stat.label}</span>
              <div style={{ fontSize: '1.8rem', fontWeight: 700, color: stat.color, marginTop: '6px' }}>{stat.count}</div>
            </div>
          ))}
        </div>

        {/* Pending Requests Table */}
        <div style={{ backgroundColor: '#16191e', borderRadius: '20px', padding: '24px', border: '1px solid rgba(255,255,255,0.08)' }}>
          <h3 style={{ fontSize: '1.2rem', fontWeight: 600, marginBottom: '20px' }}>Pending User Registrations</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {pendingUsers.map((u) => (
              <div key={u.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px', backgroundColor: '#1e2229', borderRadius: '12px' }}>
                <div>
                  <div style={{ fontWeight: 600, fontSize: '0.95rem' }}>{u.email}</div>
                  <div style={{ fontSize: '0.78rem', color: '#626975' }}>Requested on {u.date}</div>
                </div>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <Button size="sm" variant="primary">Approve Access</Button>
                  <Button size="sm" variant="danger">Reject</Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
