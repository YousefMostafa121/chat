'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { User } from '@/lib/types';

interface ChatHeaderProps {
  user: User;
}

export function ChatHeader({ user }: ChatHeaderProps) {
  return (
    <div className="border-b p-4 flex items-center gap-4">
      <Avatar>
        <AvatarImage src={user.avatar} />
        <AvatarFallback>{user.name[0]}</AvatarFallback>
      </Avatar>
      <div>
        <h2 className="font-semibold">{user.name}</h2>
        <p className="text-sm text-muted-foreground">
          {user.status === 'online' ? 'Online' : 'Offline'}
        </p>
      </div>
    </div>
  );
}