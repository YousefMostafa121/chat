export interface Message {
  id: string;
  content: string;
  senderId: string;
  timestamp: Date;
  type: 'text' | 'image' | 'audio' | 'ai';
  fileUrl?: string;
}

export interface Chat {
  id: string;
  participants: User[];
  messages: Message[];
  lastMessage?: Message;
}

export interface User {
  id: string;
  name: string;
  avatar: string;
  status: 'online' | 'offline';
  lastSeen?: Date;
}

export interface AIAssistant extends User {
  id: 'ai';
  name: 'AI Assistant';
  avatar: '/ai-avatar.png';
  status: 'online';
}