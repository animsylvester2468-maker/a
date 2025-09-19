
import React from 'react';
import { Message } from '../types';

interface ChatMessageProps {
  message: Message;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const isUser = message.sender === 'user';

  const userAvatar = (
    <div className="w-8 h-8 rounded-full bg-indigo-500 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
      U
    </div>
  );

  const botAvatar = (
    <div className="w-8 h-8 rounded-full bg-pink-500 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
      AI
    </div>
  );

  return (
    <div className={`flex items-start gap-3 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
      {isUser ? userAvatar : botAvatar}
      <div className={`px-4 py-3 rounded-xl max-w-md md:max-w-lg shadow-sm ${isUser ? 'bg-indigo-500 text-white' : 'bg-gray-100 text-gray-800'}`}>
        <p className="text-sm">{message.text}</p>
      </div>
    </div>
  );
};

export default ChatMessage;
