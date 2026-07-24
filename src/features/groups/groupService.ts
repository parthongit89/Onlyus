import { Chat, ChatMessage, User } from '../../shared/types';

export interface GroupDetails {
  id: string;
  name: string;
  description: string;
  avatarUrl?: string;
  adminId: string;
  members: User[];
  createdAt: string;
}

let MOCK_GROUPS: GroupDetails[] = [
  {
    id: 'grp_family',
    name: 'OnlyUs Family Group',
    description: 'Private encrypted group for trusted family members.',
    avatarUrl: '',
    adminId: 'usr_me',
    members: [
      {
        id: 'usr_me',
        username: 'me',
        displayName: 'Current User (Group Admin)',
        email: 'me@onlyus.private',
        role: 'USER',
        status: 'APPROVED',
        isOnline: true,
        createdAt: '2026-07-01',
      },
      {
        id: 'usr_parth',
        username: 'parth',
        displayName: 'Parth Sonavane',
        email: 'parth@onlyus.private',
        role: 'OWNER',
        status: 'APPROVED',
        isOnline: true,
        createdAt: '2026-07-01',
      },
      {
        id: 'usr_alice',
        username: 'alice',
        displayName: 'Alice Engineer',
        email: 'alice@onlyus.private',
        role: 'USER',
        status: 'APPROVED',
        isOnline: true,
        createdAt: '2026-07-10',
      },
    ],
    createdAt: '2026-07-01',
  },
];

let MOCK_GROUP_MESSAGES: Record<string, ChatMessage[]> = {
  grp_family: [
    {
      id: 'gmsg_1',
      chatId: 'grp_family',
      senderId: 'usr_parth',
      content: 'Dinner plan tonight at 8 PM?',
      isRead: true,
      createdAt: '11:20 AM',
    },
    {
      id: 'gmsg_2',
      chatId: 'grp_family',
      senderId: 'usr_alice',
      content: 'Sounds great! Count me in.',
      isRead: true,
      createdAt: '11:25 AM',
    },
  ],
};

export class GroupService {
  static getGroups(): GroupDetails[] {
    return [...MOCK_GROUPS];
  }

  static getGroupById(groupId: string): GroupDetails | undefined {
    return MOCK_GROUPS.find((g) => g.id === groupId);
  }

  static createGroup(name: string, description: string, memberIds: string[]): GroupDetails {
    if (!name.trim()) throw new Error('Group name is required.');

    const newGroup: GroupDetails = {
      id: `grp_${Date.now()}`,
      name: name.trim(),
      description: description.trim() || 'No description provided.',
      adminId: 'usr_me',
      members: [
        {
          id: 'usr_me',
          username: 'me',
          displayName: 'Current User (Group Admin)',
          email: 'me@onlyus.private',
          role: 'USER',
          status: 'APPROVED',
          isOnline: true,
          createdAt: new Date().toISOString(),
        },
      ],
      createdAt: new Date().toLocaleDateString(),
    };

    MOCK_GROUPS.unshift(newGroup);
    MOCK_GROUP_MESSAGES[newGroup.id] = [
      {
        id: `gmsg_init_${Date.now()}`,
        chatId: newGroup.id,
        senderId: 'usr_me',
        content: `Group "${newGroup.name}" created.`,
        isRead: true,
        createdAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
    ];

    return newGroup;
  }

  static addMember(groupId: string, newMember: User, requestingUserId: string = 'usr_me'): GroupDetails {
    const group = MOCK_GROUPS.find((g) => g.id === groupId);
    if (!group) throw new Error('Group not found.');
    if (group.adminId !== requestingUserId) {
      throw new Error('Group Rule Violation: Only Group Admin can add members.');
    }

    if (!group.members.some((m) => m.id === newMember.id)) {
      group.members.push(newMember);
    }
    return { ...group };
  }

  static removeMember(groupId: string, memberId: string, requestingUserId: string = 'usr_me'): GroupDetails {
    const group = MOCK_GROUPS.find((g) => g.id === groupId);
    if (!group) throw new Error('Group not found.');
    if (group.adminId !== requestingUserId) {
      throw new Error('Group Rule Violation: Only Group Admin can remove members.');
    }

    group.members = group.members.filter((m) => m.id !== memberId);
    return { ...group };
  }

  static updateGroupSettings(groupId: string, name: string, description: string, requestingUserId: string = 'usr_me'): GroupDetails {
    const group = MOCK_GROUPS.find((g) => g.id === groupId);
    if (!group) throw new Error('Group not found.');
    if (group.adminId !== requestingUserId) {
      throw new Error('Group Rule Violation: Only Group Admin can update group settings.');
    }

    if (name.trim()) group.name = name.trim();
    if (description !== undefined) group.description = description.trim();

    return { ...group };
  }

  static getGroupMessages(groupId: string): ChatMessage[] {
    return MOCK_GROUP_MESSAGES[groupId] || [];
  }

  static sendGroupMessage(groupId: string, content: string, senderId: string = 'usr_me'): ChatMessage {
    if (!content.trim()) throw new Error('Message content cannot be empty.');

    const newMsg: ChatMessage = {
      id: `gmsg_${Date.now()}`,
      chatId: groupId,
      senderId,
      content: content.trim(),
      isRead: true,
      createdAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    if (!MOCK_GROUP_MESSAGES[groupId]) {
      MOCK_GROUP_MESSAGES[groupId] = [];
    }
    MOCK_GROUP_MESSAGES[groupId].push(newMsg);
    return newMsg;
  }
}
