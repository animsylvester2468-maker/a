import React, { useState, useCallback } from 'react';
import Sidebar from './components/Sidebar';
import ChatWindow from './components/ChatWindow';
import { MenuIcon } from './constants';

const App: React.FC = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [activeTool, setActiveTool] = useState<string | null>(null);

  const toggleSidebar = useCallback(() => {
    setSidebarOpen(prevState => !prevState);
  }, []);

  const handleToolSelect = useCallback((tool: string) => {
    setActiveTool(tool);
  }, []);

  const renderContent = () => {
    if (!activeTool) {
      return (
        <div className="flex items-center justify-center h-full text-center text-gray-500 bg-white rounded-xl shadow-lg">
          <div>
            <h2 className="text-2xl font-semibold">Welcome to NexaCore Agent</h2>
            <p className="mt-2">Select a tool from the sidebar to get started.</p>
          </div>
        </div>
      );
    }

    if (activeTool === 'chatbot') {
      return <ChatWindow />;
    }

    if (activeTool.startsWith('http')) {
      return (
        <iframe
          src={activeTool}
          title={activeTool}
          className="w-full h-full border-0 rounded-xl shadow-lg"
          sandbox="allow-scripts allow-same-origin allow-forms"
        ></iframe>
      );
    }

    return null; // Should not happen
  };

  return (
    <div className="flex h-screen bg-gray-100 font-sans">
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} onToolSelect={handleToolSelect} />
      <div className="flex-1 flex flex-col transition-all duration-300">
        <header className="bg-white shadow-sm p-4 flex items-center lg:hidden">
          <button onClick={toggleSidebar} className="text-gray-600 hover:text-brand-primary focus:outline-none">
            <MenuIcon className="h-6 w-6" />
          </button>
          <h1 className="text-xl font-semibold text-gray-800 ml-4">NexaCore Agent</h1>
        </header>
        <main className="flex-1 flex flex-col p-2 sm:p-4 lg:p-6 overflow-hidden">
           {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default App;