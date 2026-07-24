import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../shared/components/Button';
import { NotificationService, AppNotification } from './notificationService';

export const NotificationCenter: React.FC = () => {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState<AppNotification[]>(NotificationService.getNotifications());
  const [silentMode, setSilentMode] = useState<boolean>(NotificationService.isSilentMode());

  const handleToggleSilentMode = () => {
    const updated = NotificationService.toggleSilentMode();
    setSilentMode(updated);
  };

  const handleMarkRead = (id: string) => {
    NotificationService.markAsRead(id);
    setNotifications(NotificationService.getNotifications());
  };

  const handleMarkAllRead = () => {
    NotificationService.markAllAsRead();
    setNotifications(NotificationService.getNotifications());
  };

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#0d0f12', color: '#f5f6f8', padding: '32px 24px' }}>
      <div style={{ maxWidth: '640px', margin: '0 auto' }}>
        {/* Top Bar */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '28px' }}>
          <div>
            <h1 style={{ fontSize: '1.8rem', fontWeight: 700 }}>Notifications</h1>
            <p style={{ fontSize: '0.88rem', color: '#9da4b0', marginTop: '4px' }}>
              System alerts, admin announcements, & message notifications
            </p>
          </div>
          <Button variant="outline" onClick={() => navigate('/chats')}>
            ← Back to Chats
          </Button>
        </div>

        {/* Silent Mode & Controls Card */}
        <div style={{ backgroundColor: '#16191e', borderRadius: '20px', padding: '20px 24px', border: '1px solid rgba(255, 255, 255, 0.08)', marginBottom: '24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <div style={{ fontWeight: 600, fontSize: '1rem' }}>
              {silentMode ? '🔕 Silent Mode Enabled' : '🔔 Normal Notifications'}
            </div>
            <p style={{ fontSize: '0.78rem', color: '#9da4b0', marginTop: '2px' }}>
              {silentMode ? 'Sound alerts & push banners are muted' : 'Receive real-time push alerts and sounds'}
            </p>
          </div>
          <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            <Button size="sm" variant={silentMode ? 'primary' : 'outline'} onClick={handleToggleSilentMode}>
              {silentMode ? 'Turn Sound On' : 'Enable Silent Mode'}
            </Button>
            {unreadCount > 0 && (
              <Button size="sm" variant="secondary" onClick={handleMarkAllRead}>
                Mark All Read
              </Button>
            )}
          </div>
        </div>

        {/* Notifications List */}
        <div style={{ backgroundColor: '#16191e', borderRadius: '24px', padding: '24px', border: '1px solid rgba(255, 255, 255, 0.08)' }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '16px' }}>
            Inbox ({unreadCount} unread)
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {notifications.map((n) => (
              <div
                key={n.id}
                onClick={() => handleMarkRead(n.id)}
                style={{
                  padding: '16px',
                  borderRadius: '14px',
                  backgroundColor: n.isRead ? '#1e2229' : 'rgba(240, 123, 66, 0.1)',
                  borderLeft: n.isRead ? '3px solid transparent' : '3px solid #f07b42',
                  cursor: 'pointer',
                  transition: 'background 0.2s ease',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                  <span style={{ fontWeight: 600, fontSize: '0.92rem', color: n.isRead ? '#f5f6f8' : '#f07b42' }}>
                    {n.title}
                  </span>
                  <span style={{ fontSize: '0.75rem', color: '#626975' }}>{n.timestamp}</span>
                </div>
                <p style={{ fontSize: '0.84rem', color: '#9da4b0', lineHeight: 1.4 }}>{n.body}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
