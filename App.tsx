import React, { useState, useCallback, useEffect } from 'react';
import type { Session } from '@supabase/supabase-js';
import { supabase } from './lib/supabase';
import Sidebar from './components/Sidebar';
import ChatWindow from './components/ChatWindow';
import Auth from './components/Auth';
import { MenuIcon } from './constants';

const App: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState<Session | null>(null);
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [activeTool, setActiveTool] = useState<string | null>(null);
  const [isBusinessUnlocked, setBusinessUnlocked] = useState<boolean>(false);

  useEffect(() => {
    if (window.innerWidth < 1024) {
      setSidebarOpen(false);
    }
  }, []);

  useEffect(() => {
    setLoading(true);
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setSession(session);
      setLoading(false);
    };
    getSession();

    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    const fetchProfileAndHandlePayment = async () => {
      if (session) {
        // Handle payment success first
        const params = new URLSearchParams(window.location.search);
        if (params.get('payment_success') === 'true') {
          const { data: updatedProfile, error: updateError } = await supabase
            .from('profiles')
            .update({ is_subscribed: true })
            .eq('id', session.user.id)
            .select('is_subscribed')
            .single();

          if (updateError) {
            console.error('Error updating profile after payment:', updateError);
          } else if (updatedProfile) {
            setBusinessUnlocked(updatedProfile.is_subscribed);
          }
          window.history.replaceState({}, document.title, window.location.pathname);
        } else {
          // Fetch profile normally
          const { data, error } = await supabase
            .from('profiles')
            .select('is_subscribed')
            .eq('id', session.user.id)
            .single();

          if (error) {
            console.error('Error fetching profile:', error);
          } else if (data) {
            setBusinessUnlocked(data.is_subscribed);
          }
        }
      } else {
        setBusinessUnlocked(false);
      }
    };
    fetchProfileAndHandlePayment();
  }, [session]);


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

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800">
              <span className="text-brand-primary">NexaCore</span>
              <span className="text-brand-secondary">Agent</span>
          </h1>
          <p className="mt-2 text-gray-600">Loading your workspace...</p>
        </div>
      </div>
    );
  }

  if (!session) {
    return <Auth />;
  }

  return (
    <div className="flex h-screen bg-gray-100 font-sans">
      <Sidebar 
        isOpen={isSidebarOpen} 
        toggleSidebar={toggleSidebar} 
        onToolSelect={handleToolSelect}
        isBusinessUnlocked={isBusinessUnlocked}
        user={session.user}
      />
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
