import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Avatar } from '../../shared/components/Avatar';
import { Input } from '../../shared/components/Input';
import { Button } from '../../shared/components/Button';

export const ChatListPage: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'chats' | 'contacts'>('chats');
  const [selectedChat, setSelectedChat] = useState<string | null>('1');
  const [message, setMessage] = useState('');

  const sampleChats = [
    { id: '1', name: 'Parth (Owner)', lastMsg: 'Welcome to OnlyUs private chat', time: '12:45 PM', unread: 2, isOnline: true },
    { id: '2', name: 'Family Group', lastMsg: 'Dinner plan tonight at 8', time: '11:20 AM', unread: 0, isOnline: false },
    { id: '3', name: 'Admin Portal', lastMsg: 'Account verification updates', time: 'Yesterday', unread: 0, isOnline: true },
  ];

  return (
    <div style={{ display: 'flex', height: '100vh', width: '100vw', backgroundColor: '#0d0f12', color: '#f5f6f8' }}>
      {/* Sidebar Navigation */}
      <div
        style={{
          width: '320px',
          borderRight: '1px solid rgba(255, 255, 255, 0.08)',
          backgroundColor: '#16191e',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* Header */}
        <div style={{ padding: '20px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid rgba(255, 255, 255, 0.06)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <Avatar name="Me" isOnline={true} />
            <div>
              <h3 style={{ fontSize: '1rem', fontWeight: 600 }}>OnlyUs</h3>
              <span style={{ fontSize: '0.75rem', color: '#22c55e' }}>Connected</span>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button onClick={() => navigate('/admin')} title="Admin Panel" style={{ color: '#9da4b0', padding: '6px' }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
            </button>
            <button onClick={() => navigate('/settings')} title="Settings" style={{ color: '#9da4b0', padding: '6px' }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>
            </button>
          </div>
        </div>

        {/* Search */}
        <div style={{ padding: '12px 16px' }}>
          <Input placeholder="Search messages or contacts..." />
        </div>

        {/* List */}
        <div style={{ flex: 1, overflowY: 'auto' }}>
          {sampleChats.map((c) => (
            <div
              key={c.id}
              onClick={() => setSelectedChat(c.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '14px 16px',
                cursor: 'pointer',
                backgroundColor: selectedChat === c.id ? '#262b34' : 'transparent',
                borderLeft: selectedChat === c.id ? '3px solid #f07b42' : '3px solid transparent',
              }}
            >
              <Avatar name={c.name} isOnline={c.isOnline} />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                  <span style={{ fontSize: '0.92rem', fontWeight: 600, color: '#f5f6f8' }}>{c.name}</span>
                  <span style={{ fontSize: '0.75rem', color: '#626975' }}>{c.time}</span>
                </div>
                <p style={{ fontSize: '0.82rem', color: '#9da4b0', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {c.lastMsg}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Active Conversation Main Pane */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', backgroundColor: '#0d0f12' }}>
        {selectedChat ? (
          <>
            <div style={{ padding: '16px 24px', borderBottom: '1px solid rgba(255, 255, 255, 0.08)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#16191e' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <Avatar name="Parth (Owner)" isOnline={true} size="md" />
                <div>
                  <h4 style={{ fontSize: '1rem', fontWeight: 600 }}>Parth (Owner)</h4>
                  <span style={{ fontSize: '0.78rem', color: '#22c55e' }}>Active Now</span>
                </div>
              </div>
            </div>

            <div style={{ flex: 1, padding: '24px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ alignSelf: 'flex-start', backgroundColor: '#1e2229', padding: '12px 16px', borderRadius: '16px 16px 16px 4px', maxWidth: '70%', fontSize: '0.92rem' }}>
                Welcome to OnlyUs! Private messaging application built for trusted connections.
              </div>
              <div style={{ alignSelf: 'flex-end', backgroundColor: '#f07b42', color: '#ffffff', padding: '12px 16px', borderRadius: '16px 16px 4px 16px', maxWidth: '70%', fontSize: '0.92rem' }}>
                Thanks Parth! The E2EE security and invite-only approval flow are active.
              </div>
            </div>

            <div style={{ padding: '16px 24px', borderTop: '1px solid rgba(255, 255, 255, 0.08)', backgroundColor: '#16191e', display: 'flex', gap: '12px' }}>
              <Input
                placeholder="Type an encrypted message..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
              <Button onClick={() => setMessage('')}>Send</Button>
            </div>
          </>
        ) : (
          <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#626975' }}>
            Select a conversation to start messaging
          </div>
        )}
      </div>
    </div>
  );
};
