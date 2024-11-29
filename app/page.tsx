'use client';

import { ChatContainer } from '@/components/chat/chat-container';
import { ChatList } from '@/components/chat/chat-list';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { currentUser } from '@/lib/data';
import { useChatStore } from '@/lib/store';
import { Toaster } from '@/components/ui/toaster';

export default function Home() {
  const { chats, selectedChatId, setSelectedChat } = useChatStore();
  const selectedChat = chats.find((chat) => chat.id === selectedChatId);

  return (
    <main className="flex h-screen">
      <div className="w-[400px] border-r flex flex-col">
        <div className="p-4 flex items-center gap-4">
          <Avatar>
            <AvatarImage src={currentUser.avatar} />
            <AvatarFallback>{currentUser.name[0]}</AvatarFallback>
          </Avatar>
          <div>
            <h2 className="font-semibold">{currentUser.name}</h2>
            <p className="text-sm text-muted-foreground">Available</p>
          </div>
        </div>
        <Separator />
        <ChatList onSelectChat={(chat) => setSelectedChat(chat.id)} />
      </div>

      {selectedChat ? (
        <ChatContainer chat={selectedChat} currentUser={currentUser} />
      ) : (
        <div className="flex-1 flex items-center justify-center text-muted-foreground">
          Select a chat to start messaging
        </div>
      )}
      <Toaster />
    </main>
  );
}