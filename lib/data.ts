import { Chat, User } from './types';

export const currentUser: User = {
  id: '1',
  name: 'John Doe',
  avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&auto=format&fit=crop&q=60',
  status: 'online',
};

export const contacts: User[] = [
  {
    id: '2',
    name: 'Alice Smith',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&auto=format&fit=crop&q=60',
    status: 'online',
    lastSeen: new Date(),
  },
  {
    id: '3',
    name: 'Bob Johnson',
    avatar: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=400&auto=format&fit=crop&q=60',
    status: 'offline',
    lastSeen: new Date(Date.now() - 1000 * 60 * 30),
  },
];

export const chats: Chat[] = [
  {
    id: '1',
    participants: [currentUser, contacts[0]],
    messages: [
      {
        id: '1',
        content: 'Hey, how are you?',
        senderId: '1',
        timestamp: new Date(Date.now() - 1000 * 60 * 60),
      },
      {
        id: '2',
        content: "I'm good, thanks! How about you?",
        senderId: '2',
        timestamp: new Date(Date.now() - 1000 * 60 * 30),
      },
    ],
  },
  {
    id: '2',
    participants: [currentUser, contacts[1]],
    messages: [
      {
        id: '3',
        content: 'Did you see the meeting notes?',
        senderId: '3',
        timestamp: new Date(Date.now() - 1000 * 60 * 120),
      },
      {
        id: '4',
        content: "Yes, I will review them soon",
        senderId: '1',
        timestamp: new Date(Date.now() - 1000 * 60 * 100),
      },
    ],
  },
];