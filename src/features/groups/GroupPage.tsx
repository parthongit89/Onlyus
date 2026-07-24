import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../shared/components/Button';
import { Input } from '../../shared/components/Input';
import { Avatar } from '../../shared/components/Avatar';
import { GroupService, GroupDetails } from './groupService';
import { ChatMessage, User } from '../../shared/types';

export const GroupPage: React.FC = () => {
  const navigate = useNavigate();
  const [groups, setGroups] = useState<GroupDetails[]>(GroupService.getGroups());
  const [selectedGroupId, setSelectedGroupId] = useState<string>('grp_family');
  const [messages, setMessages] = useState<ChatMessage[]>(GroupService.getGroupMessages('grp_family'));
  const [inputContent, setInputContent] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showSettingsModal, setShowSettingsModal] = useState(false);

  // Create Group Form
  const [groupName, setGroupName] = useState('');
  const [groupDesc, setGroupDesc] = useState('');

  // Add Member Form
  const [newMemberEmail, setNewMemberEmail] = useState('');
  const [notification, setNotification] = useState<string | null>(null);

  const showNotify = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3000);
  };

  const handleSelectGroup = (gId: string) => {
    setSelectedGroupId(gId);
    setMessages(GroupService.getGroupMessages(gId));
  };

  const handleSendGroupMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputContent.trim()) return;

    try {
      GroupService.sendGroupMessage(selectedGroupId, inputContent);
      setInputContent('');
      setMessages([...GroupService.getGroupMessages(selectedGroupId)]);
    } catch (err: any) {
      alert(err.message);
    }
  };

  const handleCreateGroup = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const created = GroupService.createGroup(groupName, groupDesc, []);
      setGroupName('');
      setGroupDesc('');
      setShowCreateModal(false);
      setGroups(GroupService.getGroups());
      handleSelectGroup(created.id);
      showNotify(`Group "${created.name}" created successfully!`);
    } catch (err: any) {
      alert(err.message);
    }
  };

  const handleAddMember = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMemberEmail.trim()) return;

    try {
      const newMemberUser: User = {
        id: `usr_${Date.now()}`,
        username: newMemberEmail.split('@')[0],
        displayName: newMemberEmail.split('@')[0],
        email: newMemberEmail,
        role: 'USER',
        status: 'APPROVED',
        isOnline: true,
        createdAt: new Date().toISOString(),
      };

      const updated = GroupService.addMember(selectedGroupId, newMemberUser);
      setNewMemberEmail('');
      setGroups(GroupService.getGroups());
      showNotify(`Added ${newMemberUser.displayName} to group.`);
    } catch (err: any) {
      alert(err.message);
    }
  };

  const handleRemoveMember = (memberId: string) => {
    try {
      GroupService.removeMember(selectedGroupId, memberId);
      setGroups(GroupService.getGroups());
      showNotify('Member removed from group.');
    } catch (err: any) {
      alert(err.message);
    }
  };

  const currentGroup = groups.find((g) => g.id === selectedGroupId) || groups[0];

  return (
    <div style={{ display: 'flex', height: '100vh', width: '100vw', backgroundColor: '#0d0f12', color: '#f5f6f8' }}>
      {/* Sidebar */}
      <div style={{ width: '340px', borderRight: '1px solid rgba(255, 255, 255, 0.08)', backgroundColor: '#16191e', display: 'flex', flexDirection: 'column' }}>
        <div style={{ padding: '18px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid rgba(255, 255, 255, 0.06)' }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 700 }}>Group Chats</h3>
          <div style={{ display: 'flex', gap: '8px' }}>
            <Button size="sm" variant="primary" onClick={() => setShowCreateModal(true)}>+ New Group</Button>
            <Button size="sm" variant="outline" onClick={() => navigate('/chats')}>Private</Button>
          </div>
        </div>

        <div style={{ flex: 1, overflowY: 'auto' }}>
          {groups.map((g) => (
            <div
              key={g.id}
              onClick={() => handleSelectGroup(g.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '14px 16px',
                cursor: 'pointer',
                backgroundColor: selectedGroupId === g.id ? '#262b34' : 'transparent',
                borderLeft: selectedGroupId === g.id ? '3px solid #f07b42' : '3px solid transparent',
              }}
            >
              <Avatar name={g.name} size="md" />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontWeight: 600, fontSize: '0.92rem' }}>{g.name}</div>
                <div style={{ fontSize: '0.78rem', color: '#9da4b0', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {g.members.length} Members • {g.description}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Group Pane */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', backgroundColor: '#0d0f12' }}>
        {currentGroup ? (
          <>
            {/* Header */}
            <div style={{ padding: '16px 24px', borderBottom: '1px solid rgba(255, 255, 255, 0.08)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#16191e' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                <Avatar name={currentGroup.name} size="md" />
                <div>
                  <h4 style={{ fontSize: '1.05rem', fontWeight: 700 }}>{currentGroup.name}</h4>
                  <span style={{ fontSize: '0.78rem', color: '#f07b42' }}>{currentGroup.members.length} Members • Group Admin: You</span>
                </div>
              </div>
              <Button size="sm" variant="outline" onClick={() => setShowSettingsModal(true)}>Group Settings & Members</Button>
            </div>

            {/* Notification */}
            {notification && (
              <div style={{ backgroundColor: '#22c55e', color: '#ffffff', padding: '10px 20px', fontSize: '0.86rem', textAlign: 'center' }}>
                ✓ {notification}
              </div>
            )}

            {/* Group Feed */}
            <div style={{ flex: 1, padding: '24px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {messages.map((msg) => {
                const isMe = msg.senderId === 'usr_me';
                const senderName = currentGroup.members.find((m) => m.id === msg.senderId)?.displayName || msg.senderId;
                return (
                  <div key={msg.id} style={{ alignSelf: isMe ? 'flex-end' : 'flex-start', maxWidth: '68%' }}>
                    {!isMe && <div style={{ fontSize: '0.75rem', color: '#f07b42', marginBottom: '2px', fontWeight: 600 }}>{senderName}</div>}
                    <div style={{ backgroundColor: isMe ? '#f07b42' : '#1e2229', color: '#ffffff', padding: '12px 16px', borderRadius: isMe ? '18px 18px 4px 18px' : '18px 18px 18px 4px', fontSize: '0.92rem' }}>
                      {msg.content}
                      <div style={{ textAlign: 'right', fontSize: '0.7rem', opacity: 0.7, marginTop: '4px' }}>{msg.createdAt}</div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Group Input */}
            <form onSubmit={handleSendGroupMessage} style={{ padding: '16px 24px', borderTop: '1px solid rgba(255, 255, 255, 0.08)', backgroundColor: '#16191e', display: 'flex', gap: '12px' }}>
              <Input placeholder="Type encrypted group message..." value={inputContent} onChange={(e) => setInputContent(e.target.value)} />
              <Button type="submit">Send</Button>
            </form>
          </>
        ) : (
          <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#626975' }}>Select a group to start messaging</div>
        )}
      </div>

      {/* Create Group Modal */}
      {showCreateModal && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.7)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px', zIndex: 1000 }}>
          <div style={{ backgroundColor: '#16191e', borderRadius: '24px', padding: '28px', width: '100%', maxWidth: '440px', border: '1px solid rgba(255,255,255,0.1)' }}>
            <h3 style={{ fontSize: '1.4rem', fontWeight: 700, marginBottom: '16px' }}>Create New Group</h3>
            <form onSubmit={handleCreateGroup} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <Input label="Group Name" placeholder="e.g. Family & Friends" value={groupName} onChange={(e) => setGroupName(e.target.value)} />
              <Input label="Description" placeholder="What is this group about?" value={groupDesc} onChange={(e) => setGroupDesc(e.target.value)} />
              <div style={{ display: 'flex', gap: '10px', marginTop: '12px' }}>
                <Button fullWidth type="submit">Create Group</Button>
                <Button fullWidth variant="outline" type="button" onClick={() => setShowCreateModal(false)}>Cancel</Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Group Settings Modal */}
      {showSettingsModal && currentGroup && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.7)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px', zIndex: 1000 }}>
          <div style={{ backgroundColor: '#16191e', borderRadius: '24px', padding: '28px', width: '100%', maxWidth: '520px', border: '1px solid rgba(255,255,255,0.1)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h3 style={{ fontSize: '1.3rem', fontWeight: 700 }}>{currentGroup.name} Settings</h3>
              <button onClick={() => setShowSettingsModal(false)} style={{ color: '#ef4444', fontWeight: 600 }}>✕ Close</button>
            </div>

            <p style={{ fontSize: '0.86rem', color: '#9da4b0', marginBottom: '20px' }}>{currentGroup.description}</p>

            {/* Add Member Form */}
            <form onSubmit={handleAddMember} style={{ display: 'flex', gap: '10px', marginBottom: '24px' }}>
              <Input placeholder="Member email or username..." value={newMemberEmail} onChange={(e) => setNewMemberEmail(e.target.value)} />
              <Button type="submit" size="sm">+ Add Member</Button>
            </form>

            <h4 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '12px' }}>Group Members ({currentGroup.members.length})</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxHeight: '220px', overflowY: 'auto' }}>
              {currentGroup.members.map((m) => (
                <div key={m.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 14px', backgroundColor: '#1e2229', borderRadius: '10px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <Avatar name={m.displayName} size="sm" isOnline={m.isOnline} />
                    <div>
                      <div style={{ fontWeight: 600, fontSize: '0.88rem' }}>{m.displayName}</div>
                      <div style={{ fontSize: '0.75rem', color: '#9da4b0' }}>{m.email}</div>
                    </div>
                  </div>
                  {m.id === currentGroup.adminId ? (
                    <span style={{ fontSize: '0.75rem', color: '#f07b42', fontWeight: 600 }}>Group Admin</span>
                  ) : (
                    <Button size="sm" variant="danger" onClick={() => handleRemoveMember(m.id)}>Remove</Button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
