import { create } from 'zustand';
import { Chat, Message } from './types';
import { chats as initialChats } from './data';

interface ChatStore {
  chats: Chat[];
  selectedChatId: string | null;
  isLoading: boolean;
  setSelectedChat: (chatId: string | null) => void;
  addMessage: (chatId: string, message: Message) => void;
  setLoading: (loading: boolean) => void;
}

export const useChatStore = create<ChatStore>((set) => ({
  chats: initialChats,
  selectedChatId: null,
  isLoading: false,
  setSelectedChat: (chatId) => set({ selectedChatId: chatId }),
  addMessage: (chatId, message) =>
    set((state) => ({
      chats: state.chats.map((chat) =>
        chat.id === chatId
          ? { ...chat, messages: [...chat.messages, message] }
          : chat
      ),
    })),
  setLoading: (loading) => set({ isLoading: loading }),
}));