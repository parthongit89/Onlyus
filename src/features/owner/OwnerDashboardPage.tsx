import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../shared/components/Button';
import { Input } from '../../shared/components/Input';
import { Avatar } from '../../shared/components/Avatar';
import { OwnerService, ServerHealth, GlobalServerConfig } from './ownerService';
import { User } from '../../shared/types';

export const OwnerDashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const [health, setHealth] = useState<ServerHealth>(OwnerService.getServerHealth());
  const [config, setConfig] = useState<GlobalServerConfig>(OwnerService.getGlobalConfig());
  const [admins, setAdmins] = useState<User[]>(OwnerService.getAdmins());
  const [newAdminEmail, setNewAdminEmail] = useState('');
  const [notification, setNotification] = useState<string | null>(null);

  const showNotify = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3000);
  };

  const handleAddAdmin = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const created = OwnerService.addAdmin(newAdminEmail);
      setNewAdminEmail('');
      setAdmins(OwnerService.getAdmins());
      showNotify(`Granted Admin privileges to ${created.email}`);
    } catch (err: any) {
      alert(err.message);
    }
  };

  const handleRemoveAdmin = (adminId: string) => {
    if (confirm('Revoke Admin authority for this user?')) {
      try {
        OwnerService.removeAdmin(adminId);
        setAdmins(OwnerService.getAdmins());
        showNotify('Admin privileges revoked.');
      } catch (err: any) {
        alert(err.message);
      }
    }
  };

  const handleDisableAdmin = (adminId: string) => {
    try {
      OwnerService.disableAdmin(adminId);
      setAdmins(OwnerService.getAdmins());
      showNotify('Admin disabled.');
    } catch (err: any) {
      alert(err.message);
    }
  };

  const handleToggleMaintenance = () => {
    const updated = OwnerService.updateGlobalConfig({ maintenanceMode: !config.maintenanceMode });
    setConfig(updated);
    setHealth(OwnerService.getServerHealth());
    showNotify(`Maintenance mode ${updated.maintenanceMode ? 'ENABLED' : 'DISABLED'}`);
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#0d0f12', color: '#f5f6f8', padding: '32px 24px' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '28px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <h1 style={{ fontSize: '1.8rem', fontWeight: 700 }}>Owner Control Panel</h1>
              <span style={{ backgroundColor: 'rgba(239, 68, 68, 0.15)', color: '#ef4444', fontSize: '0.78rem', fontWeight: 700, padding: '4px 10px', borderRadius: '12px' }}>
                HIGHEST AUTHORITY
              </span>
            </div>
            <p style={{ fontSize: '0.9rem', color: '#9da4b0', marginTop: '4px' }}>
              Manage administrators, infrastructure, server health, and global system configuration
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

        {/* Infrastructure Status Metrics */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px', marginBottom: '28px' }}>
          <div style={{ backgroundColor: '#16191e', borderRadius: '18px', padding: '20px', border: '1px solid rgba(255,255,255,0.08)' }}>
            <span style={{ fontSize: '0.82rem', color: '#9da4b0' }}>Server Status</span>
            <div style={{ fontSize: '1.5rem', fontWeight: 700, color: health.status === 'HEALTHY' ? '#22c55e' : '#ef4444', marginTop: '4px' }}>
              {health.status}
            </div>
          </div>
          <div style={{ backgroundColor: '#16191e', borderRadius: '18px', padding: '20px', border: '1px solid rgba(255,255,255,0.08)' }}>
            <span style={{ fontSize: '0.82rem', color: '#9da4b0' }}>CPU Usage</span>
            <div style={{ fontSize: '1.5rem', fontWeight: 700, color: '#f07b42', marginTop: '4px' }}>
              {health.cpuUsagePercent}%
            </div>
          </div>
          <div style={{ backgroundColor: '#16191e', borderRadius: '18px', padding: '20px', border: '1px solid rgba(255,255,255,0.08)' }}>
            <span style={{ fontSize: '0.82rem', color: '#9da4b0' }}>PostgreSQL Pool</span>
            <div style={{ fontSize: '1.1rem', fontWeight: 600, color: '#3b82f6', marginTop: '6px' }}>
              {health.dbConnectionPool}
            </div>
          </div>
          <div style={{ backgroundColor: '#16191e', borderRadius: '18px', padding: '20px', border: '1px solid rgba(255,255,255,0.08)' }}>
            <span style={{ fontSize: '0.82rem', color: '#9da4b0' }}>System Uptime</span>
            <div style={{ fontSize: '1.5rem', fontWeight: 700, color: '#22c55e', marginTop: '4px' }}>
              {health.uptimeHours} hrs
            </div>
          </div>
        </div>

        {/* Global System Settings */}
        <div style={{ backgroundColor: '#16191e', borderRadius: '24px', padding: '28px', border: '1px solid rgba(255, 255, 255, 0.08)', marginBottom: '28px' }}>
          <h3 style={{ fontSize: '1.2rem', fontWeight: 600, marginBottom: '16px' }}>Global Infrastructure Settings</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px', backgroundColor: '#1e2229', borderRadius: '14px' }}>
              <div>
                <div style={{ fontWeight: 600, fontSize: '0.95rem' }}>System Maintenance Mode</div>
                <div style={{ fontSize: '0.78rem', color: '#9da4b0' }}>Temporarily pause user activity for infrastructure upgrades</div>
              </div>
              <Button variant={config.maintenanceMode ? 'danger' : 'primary'} size="sm" onClick={handleToggleMaintenance}>
                {config.maintenanceMode ? 'Disable Maintenance Mode' : 'Enable Maintenance Mode'}
              </Button>
            </div>
          </div>
        </div>

        {/* Admin Management Panel */}
        <div style={{ backgroundColor: '#16191e', borderRadius: '24px', padding: '28px', border: '1px solid rgba(255, 255, 255, 0.08)' }}>
          <h3 style={{ fontSize: '1.2rem', fontWeight: 600, marginBottom: '16px' }}>Manage System Administrators</h3>

          <form onSubmit={handleAddAdmin} style={{ display: 'flex', gap: '12px', marginBottom: '24px' }}>
            <Input placeholder="Enter user email to promote to Admin..." value={newAdminEmail} onChange={(e) => setNewAdminEmail(e.target.value)} />
            <Button type="submit">+ Add Admin</Button>
          </form>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {admins.map((adm) => (
              <div key={adm.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px', backgroundColor: '#1e2229', borderRadius: '14px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                  <Avatar name={adm.displayName} isOnline={adm.isOnline} />
                  <div>
                    <div style={{ fontWeight: 600, fontSize: '0.95rem' }}>{adm.displayName} <span style={{ fontSize: '0.78rem', color: '#f07b42', fontWeight: 600 }}>[ADMIN]</span></div>
                    <div style={{ fontSize: '0.78rem', color: '#9da4b0' }}>{adm.email} • Granted {adm.createdAt}</div>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <Button size="sm" variant="outline" onClick={() => handleDisableAdmin(adm.id)}>Disable Admin</Button>
                  <Button size="sm" variant="danger" onClick={() => handleRemoveAdmin(adm.id)}>Remove Admin</Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
