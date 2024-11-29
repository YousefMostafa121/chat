'use client';

import { ScrollArea } from '@/components/ui/scroll-area';
import { chats } from '@/lib/data';
import { Chat } from '@/lib/types';
import { ChatPreview } from './chat-preview';

export function ChatList({ onSelectChat }: { onSelectChat: (chat: Chat) => void }) {
  return (
    <ScrollArea className="h-[calc(100vh-4rem)]">
      <div className="flex flex-col gap-1 p-4">
        {chats.map((chat) => (
          <ChatPreview
            key={chat.id}
            chat={chat}
            onClick={() => onSelectChat(chat)}
          />
        ))}
      </div>
    </ScrollArea>
  );
}