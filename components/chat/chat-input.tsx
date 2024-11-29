'use client';

import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Image, Loader2, Mic, Send, Square } from 'lucide-react';
import { KeyboardEvent, useRef, useState } from 'react';
import { useReactMediaRecorder } from 'react-media-recorder';

interface ChatInputProps {
  onSendMessage: (content: string, type: 'text' | 'image' | 'audio', file?: File) => void;
  isLoading: boolean;
}

export function ChatInput({ onSendMessage, isLoading }: ChatInputProps) {
  const [message, setMessage] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { startRecording, stopRecording, mediaBlobUrl } = useReactMediaRecorder({
    audio: true,
    onStop: async (blobUrl, blob) => {
      if (!isLoading) {
        const audioFile = new File([blob], 'audio-message.wav', { type: 'audio/wav' });
        onSendMessage('Audio message', 'audio', audioFile);
        setIsRecording(false);
      }
    },
  });

  const handleSend = () => {
    if (message.trim() && !isLoading) {
      onSendMessage(message, 'text');
      setMessage('');
    }
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && !isLoading) {
      onSendMessage('Image', 'image', file);
    }
  };

  const handleRecording = () => {
    if (isLoading) return;
    
    if (isRecording) {
      stopRecording();
    } else {
      startRecording();
      setIsRecording(true);
    }
  };

  return (
    <div className="border-t p-4 flex gap-4">
      <input
        type="file"
        accept="image/*"
        className="hidden"
        ref={fileInputRef}
        onChange={handleImageUpload}
        disabled={isLoading}
      />
      <Button
        variant="ghost"
        size="icon"
        onClick={() => fileInputRef.current?.click()}
        disabled={isLoading}
      >
        <Image className="h-4 w-4" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        onClick={handleRecording}
        className={isRecording ? 'text-red-500' : ''}
        disabled={isLoading}
      >
        {isRecording ? <Square className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
      </Button>
      <Textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyPress={handleKeyPress}
        placeholder="Type a message..."
        className="resize-none"
        rows={1}
        disabled={isLoading}
      />
      <Button onClick={handleSend} size="icon" disabled={isLoading}>
        {isLoading ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <Send className="h-4 w-4" />
        )}
      </Button>
    </div>
  );
}