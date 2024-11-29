'use client';

import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { currentUser } from '@/lib/data';
import { Chat } from '@/lib/types';
import { format } from 'date-fns';

export function ChatPreview({ chat, onClick }: { chat: Chat; onClick: () => void }) {
  const otherParticipant = chat.participants.find((p) => p.id !== currentUser.id)!;
  const lastMessage = chat.messages[chat.messages.length - 1];

  return (
    <Button
      variant="ghost"
      className="flex items-center gap-4 p-4 w-full hover:bg-accent"
      onClick={onClick}
    >
      <Avatar className="h-12 w-12">
        <AvatarFallback>{otherParticipant.name[0]}</AvatarFallback>
      </Avatar>
      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-center">
          <p className="font-medium truncate">{otherParticipant.name}</p>
          <span className="text-xs text-muted-foreground">
            {format(lastMessage.timestamp, 'HH:mm')}
          </span>
        </div>
        <p className="text-sm text-muted-foreground truncate">
          {lastMessage.content}
        </p>
      </div>
    </Button>
  );
}