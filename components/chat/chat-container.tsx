'use client';

import { Chat, User } from '@/lib/types';
import { ChatHeader } from './chat-header';
import { ChatMessages } from './chat-messages';
import { ChatInput } from './chat-input';
import { generateAIResponse } from '@/lib/ai';
import { useChatStore } from '@/lib/store';
import { useToast } from '@/components/ui/use-toast';

interface ChatContainerProps {
  chat: Chat;
  currentUser: User;
}

export function ChatContainer({ chat, currentUser }: ChatContainerProps) {
  const { addMessage, setLoading, isLoading } = useChatStore();
  const { toast } = useToast();
  const otherParticipant = chat.participants.find(p => p.id !== currentUser.id)!;

  const handleSendMessage = async (
    content: string,
    type: 'text' | 'image' | 'audio',
    file?: File
  ) => {
    try {
      setLoading(true);
      let fileUrl;
      
      if (file) {
        const formData = new FormData();
        formData.append('file', file);
        const response = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
        });
        
        if (!response.ok) {
          throw new Error('Failed to upload file');
        }
        
        const data = await response.json();
        fileUrl = data.fileUrl;
      }

      const newMessage = {
        id: Date.now().toString(),
        content,
        senderId: currentUser.id,
        timestamp: new Date(),
        type,
        fileUrl,
      };

      addMessage(chat.id, newMessage);

      if (type === 'text') {
        const aiResponse = await generateAIResponse(content);
        const aiMessage = {
          id: (Date.now() + 1).toString(),
          content: aiResponse,
          senderId: 'ai',
          timestamp: new Date(),
          type: 'text',
        };
        addMessage(chat.id, aiMessage);
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to send message. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex-1 flex flex-col">
      <ChatHeader user={otherParticipant} />
      <ChatMessages chat={chat} />
      <ChatInput onSendMessage={handleSendMessage} isLoading={isLoading} />
    </div>
  );
}