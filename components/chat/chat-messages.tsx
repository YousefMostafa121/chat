'use client';

import { ScrollArea } from '@/components/ui/scroll-area';
import { currentUser } from '@/lib/data';
import { Chat, Message } from '@/lib/types';
import { format } from 'date-fns';
import { useEffect, useRef } from 'react';
import Image from 'next/image';

function ChatMessage({ message }: { message: Message }) {
  const isOwn = message.senderId === currentUser.id;

  return (
    <div className={`flex ${isOwn ? 'justify-end' : 'justify-start'} mb-4`}>
      <div
        className={`rounded-lg px-4 py-2 max-w-[70%] ${
          isOwn ? 'bg-primary text-primary-foreground' : 'bg-muted'
        }`}
      >
        {message.type === 'text' && (
          <p className="text-sm">{message.content}</p>
        )}
        {message.type === 'image' && message.fileUrl && (
          <div className="relative w-48 h-48">
            <Image
              src={message.fileUrl}
              alt="Image message"
              fill
              className="object-cover rounded-lg"
            />
          </div>
        )}
        {message.type === 'audio' && message.fileUrl && (
          <audio controls className="max-w-full">
            <source src={message.fileUrl} type="audio/wav" />
            Your browser does not support the audio element.
          </audio>
        )}
        <p className="text-xs text-muted-foreground mt-1">
          {format(message.timestamp, 'HH:mm')}
        </p>
      </div>
    </div>
  );
}

export function ChatMessages({ chat }: { chat: Chat }) {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chat.messages]);

  return (
    <ScrollArea className="flex-1 p-4">
      <div className="space-y-4">
        {chat.messages.map((message) => (
          <ChatMessage key={message.id} message={message} />
        ))}
        <div ref={messagesEndRef} />
      </div>
    </ScrollArea>
  );
}