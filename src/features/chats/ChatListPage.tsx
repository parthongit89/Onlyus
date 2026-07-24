import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Avatar } from '../../shared/components/Avatar';
import { Input } from '../../shared/components/Input';
import { Button } from '../../shared/components/Button';
import { ChatService } from './chatService';
import { Chat, ChatMessage } from '../../shared/types';

export const ChatListPage: React.FC = () => {
  const navigate = useNavigate();
  const [chats, setChats] = useState<Chat[]>([]);
  const [selectedChatId, setSelectedChatId] = useState<string>('chat_1');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputContent, setInputContent] = useState('');
  const [replyingTo, setReplyingTo] = useState<ChatMessage | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [showArchived, setShowArchived] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    loadChats();
  }, [showArchived]);

  useEffect(() => {
    if (selectedChatId) {
      loadMessages(selectedChatId);
    }
  }, [selectedChatId]);

  const loadChats = () => {
    setChats(ChatService.getChats(showArchived));
  };

  const loadMessages = (chatId: string) => {
    setMessages(ChatService.getMessages(chatId));
  };

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputContent.trim()) return;

    try {
      ChatService.sendMessage(selectedChatId, inputContent, replyingTo?.id);
      setInputContent('');
      setReplyingTo(null);
      loadMessages(selectedChatId);
      loadChats();

      // Typing indicator simulation
      setIsTyping(true);
      setTimeout(() => {
        setIsTyping(false);
      }, 1500);
    } catch (err: any) {
      alert(err.message);
    }
  };

  const handleDeleteMsg = (msgId: string) => {
    ChatService.deleteMessage(selectedChatId, msgId);
    loadMessages(selectedChatId);
    loadChats();
  };

  const handleStarMsg = (msgId: string) => {
    ChatService.toggleStarMessage(selectedChatId, msgId);
    loadMessages(selectedChatId);
  };

  const handleArchiveChat = (chatId: string) => {
    ChatService.toggleArchiveChat(chatId);
    loadChats();
  };

  const handlePinChat = (chatId: string) => {
    ChatService.togglePinChat(chatId);
    loadChats();
  };

  const currentChat = chats.find((c) => c.id === selectedChatId) || chats[0];
  const participant = currentChat?.participants[0];

  const displayedMessages = searchQuery
    ? ChatService.searchMessages(selectedChatId, searchQuery)
    : messages;

  return (
    <div style={{ display: 'flex', height: '100vh', width: '100vw', backgroundColor: '#0d0f12', color: '#f5f6f8' }}>
      {/* Sidebar Navigation */}
      <div
        style={{
          width: '340px',
          borderRight: '1px solid rgba(255, 255, 255, 0.08)',
          backgroundColor: '#16191e',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* Header */}
        <div style={{ padding: '18px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid rgba(255, 255, 255, 0.06)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <Avatar name="Me" isOnline={true} />
            <div>
              <h3 style={{ fontSize: '1rem', fontWeight: 700 }}>OnlyUs</h3>
              <span style={{ fontSize: '0.75rem', color: '#22c55e', fontWeight: 500 }}>● Signal E2EE Active</span>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '6px' }}>
            <button onClick={() => navigate('/contacts')} title="Contacts" style={{ color: '#9da4b0', padding: '6px', borderRadius: '8px', cursor: 'pointer' }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
            </button>
            <button onClick={() => navigate('/admin')} title="Admin Dashboard" style={{ color: '#9da4b0', padding: '6px', borderRadius: '8px', cursor: 'pointer' }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
            </button>
            <button onClick={() => navigate('/profile')} title="Profile Settings" style={{ color: '#9da4b0', padding: '6px', borderRadius: '8px', cursor: 'pointer' }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>
            </button>
          </div>
        </div>

        {/* Filter Toggle */}
        <div style={{ padding: '10px 16px', display: 'flex', gap: '8px', borderBottom: '1px solid rgba(255, 255, 255, 0.04)' }}>
          <Button size="sm" variant={!showArchived ? 'primary' : 'outline'} onClick={() => setShowArchived(false)}>
            Chats
          </Button>
          <Button size="sm" variant={showArchived ? 'primary' : 'outline'} onClick={() => setShowArchived(true)}>
            Archived
          </Button>
        </div>

        {/* Chat List */}
        <div style={{ flex: 1, overflowY: 'auto' }}>
          {chats.map((c) => {
            const p = c.participants[0];
            const isSelected = selectedChatId === c.id;
            return (
              <div
                key={c.id}
                onClick={() => setSelectedChatId(c.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '14px 16px',
                  cursor: 'pointer',
                  backgroundColor: isSelected ? '#262b34' : 'transparent',
                  borderLeft: isSelected ? '3px solid #f07b42' : '3px solid transparent',
                  transition: 'background 0.2s ease',
                }}
              >
                <Avatar name={p?.displayName || c.name} isOnline={p?.isOnline} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                    <span style={{ fontSize: '0.92rem', fontWeight: 600, color: '#f5f6f8' }}>
                      {c.isPinned && '📌 '}
                      {p?.displayName || c.name}
                    </span>
                    <span style={{ fontSize: '0.75rem', color: '#626975' }}>{c.lastMessage?.createdAt}</span>
                  </div>
                  <p style={{ fontSize: '0.82rem', color: '#9da4b0', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {c.lastMessage?.content || 'No messages yet'}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Main Conversation Pane */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', backgroundColor: '#0d0f12' }}>
        {currentChat ? (
          <>
            {/* Active Header */}
            <div style={{ padding: '16px 24px', borderBottom: '1px solid rgba(255, 255, 255, 0.08)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#16191e' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                <Avatar name={participant?.displayName || currentChat.name} isOnline={participant?.isOnline} size="md" />
                <div>
                  <h4 style={{ fontSize: '1rem', fontWeight: 700 }}>{participant?.displayName || currentChat.name}</h4>
                  <span style={{ fontSize: '0.78rem', color: participant?.isOnline ? '#22c55e' : '#64748b' }}>
                    {isTyping ? 'typing...' : participant?.isOnline ? 'Online' : 'Offline'}
                  </span>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                <Input
                  placeholder="Search in chat..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  style={{ padding: '6px 12px', fontSize: '0.82rem', width: '180px' }}
                />
                <Button size="sm" variant="outline" onClick={() => handlePinChat(currentChat.id)}>
                  {currentChat.isPinned ? 'Unpin' : 'Pin'}
                </Button>
                <Button size="sm" variant="outline" onClick={() => handleArchiveChat(currentChat.id)}>
                  {currentChat.isArchived ? 'Unarchive' : 'Archive'}
                </Button>
              </div>
            </div>

            {/* Messages Feed */}
            <div style={{ flex: 1, padding: '24px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {displayedMessages.map((msg) => {
                const isMe = msg.senderId === 'usr_me';
                return (
                  <div
                    key={msg.id}
                    style={{
                      alignSelf: isMe ? 'flex-end' : 'flex-start',
                      maxWidth: '68%',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '4px',
                    }}
                  >
                    <div
                      style={{
                        backgroundColor: isMe ? '#f07b42' : '#1e2229',
                        color: '#ffffff',
                        padding: '12px 16px',
                        borderRadius: isMe ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
                        fontSize: '0.92rem',
                        lineHeight: 1.45,
                        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)',
                        position: 'relative',
                      }}
                    >
                      {msg.replyToId && (
                        <div style={{ backgroundColor: 'rgba(0,0,0,0.2)', borderLeft: '3px solid #ffffff', padding: '4px 8px', borderRadius: '4px', marginBottom: '6px', fontSize: '0.78rem' }}>
                          Replying to prior message
                        </div>
                      )}
                      <div>{msg.content}</div>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '6px', marginTop: '4px', fontSize: '0.72rem', opacity: 0.8 }}>
                        <span>{msg.createdAt}</span>
                        {msg.isStarred && <span>⭐</span>}
                        {isMe && <span style={{ color: '#ffffff' }}>✓✓</span>}
                      </div>
                    </div>

                    {/* Action buttons */}
                    <div style={{ display: 'flex', gap: '8px', alignSelf: isMe ? 'flex-end' : 'flex-start', fontSize: '0.72rem', color: '#626975', cursor: 'pointer' }}>
                      <span onClick={() => setReplyingTo(msg)}>Reply</span>
                      <span onClick={() => handleStarMsg(msg.id)}>{msg.isStarred ? 'Unstar' : 'Star'}</span>
                      <span onClick={() => handleDeleteMsg(msg.id)}>Delete</span>
                    </div>
                  </div>
                );
              })}

              {isTyping && (
                <div style={{ alignSelf: 'flex-start', backgroundColor: '#1e2229', padding: '8px 14px', borderRadius: '14px', fontSize: '0.8rem', color: '#9da4b0' }}>
                  {participant?.displayName} is typing...
                </div>
              )}
            </div>

            {/* Replying Banner */}
            {replyingTo && (
              <div style={{ padding: '8px 24px', backgroundColor: '#1e2229', borderTop: '1px solid rgba(255,255,255,0.06)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.82rem', color: '#9da4b0' }}>
                <div>Replying to: <i>"{replyingTo.content}"</i></div>
                <button onClick={() => setReplyingTo(null)} style={{ color: '#ef4444', fontWeight: 600 }}>✕ Cancel</button>
              </div>
            )}

            {/* Input Footer */}
            <form onSubmit={handleSend} style={{ padding: '16px 24px', borderTop: '1px solid rgba(255, 255, 255, 0.08)', backgroundColor: '#16191e', display: 'flex', gap: '12px' }}>
              <Input
                placeholder="Type an end-to-end encrypted message..."
                value={inputContent}
                onChange={(e) => setInputContent(e.target.value)}
              />
              <Button type="submit" size="md">Send</Button>
            </form>
          </>
        ) : (
          <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#626975' }}>
            Select a contact conversation to start private messaging
          </div>
        )}
      </div>
    </div>
  );
};
