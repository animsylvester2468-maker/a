
import React, { useState } from 'react';
import { SendIcon } from '../constants';

interface MessageInputProps {
  onSendMessage: (text: string) => void;
}

const MessageInput: React.FC<MessageInputProps> = ({ onSendMessage }) => {
  const [text, setText] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSendMessage(text);
    setText('');
  };

  return (
    <div className="p-4 bg-white border-t border-gray-200 rounded-b-xl">
      <form onSubmit={handleSubmit} className="flex items-center space-x-3">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type your message..."
          className="flex-1 w-full px-4 py-2 text-gray-700 bg-gray-100 border border-transparent rounded-full focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent"
        />
        <button
          type="submit"
          disabled={!text.trim()}
          className="flex-shrink-0 inline-flex items-center justify-center w-10 h-10 text-white bg-brand-primary rounded-full hover:bg-brand-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-primary disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
        >
          <SendIcon className="w-5 h-5" />
        </button>
      </form>
    </div>
  );
};

export default MessageInput;
