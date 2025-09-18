
import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Message } from '../types';
import ChatMessage from './ChatMessage';
import MessageInput from './MessageInput';

const initialMessages: Message[] = [
    { id: '1', text: 'Hello! I am a helpful AI assistant. How can I help you today?', sender: 'bot' }
];

const ChatWindow: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = useCallback((text: string) => {
    if (text.trim() === '') return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text,
      sender: 'user',
    };
    
    setMessages(prevMessages => [...prevMessages, userMessage]);

    // Simulate bot response
    setTimeout(() => {
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: `This is a placeholder response to: "${text}"`,
        sender: 'bot',
      };
      setMessages(prevMessages => [...prevMessages, botMessage]);
    }, 1000);
  }, []);

  return (
    <div className="flex flex-col h-full bg-white rounded-xl shadow-lg">
      <div className="flex-1 p-6 overflow-y-auto">
        <div className="space-y-4">
          {messages.map((message) => (
            <ChatMessage key={message.id} message={message} />
          ))}
          <div ref={messagesEndRef} />
        </div>
      </div>
      <MessageInput onSendMessage={handleSendMessage} />
    </div>
  );
};

export default ChatWindow;
