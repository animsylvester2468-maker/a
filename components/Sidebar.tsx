import React from 'react';
import FeatureButton from './FeatureButton';
import { 
  ThumbnailIcon, TextToSpeechIcon, SpeechToTextIcon, ImageIcon, BlogIcon, MusicIcon, MenuIcon,
  BusinessNameIcon, CalendarIcon, AdCopyIcon, SeoIcon, ResearchIcon, ChatIcon
} from '../constants';

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
  onToolSelect: (tool: string) => void;
}

const creativeTools = [
  { icon: ChatIcon, label: 'Chatbot', url: 'https://nova-ai-business-assistant-f213e243.base44.app' },
  { icon: ThumbnailIcon, label: 'Thumbnail Generator', url: 'https://thumbnail-ai-0ae599a2.base44.app' },
  { icon: TextToSpeechIcon, label: 'Text-to-Speech', url: 'https://businetts.netlify.app/' },
  { icon: SpeechToTextIcon, label: 'Speech-to-Text', url: 'https://businetts.netlify.app/' },
  { icon: ImageIcon, label: 'AI Image Generator', url: 'https://visio-ai-ddd96435.base44.app' },
  { icon: BlogIcon, label: 'Blog Writer', url: 'https://content-spark-ai-b079dd2d.base44.app' },
  { icon: MusicIcon, label: 'Music Maker', url: 'https://studiol.netlify.app/' },
];

const businessTools = [
  { icon: BusinessNameIcon, label: 'Business Name & Logo Generator', url: 'https://brand-spark-ai-ba7e2111.base44.app' },
  { icon: AdCopyIcon, label: 'Ad Copy Generator', url: 'https://ad-genius-ai-e0b9daa2.base44.app' },
  { icon: SeoIcon, label: 'SEO Analyzer', url: 'https://opti-rank-ai-ce6a4184.base44.app' },
  { icon: ResearchIcon, label: 'Market Research Assistant', url: 'https://market-iq-6dcee989.base44.app' },
  { icon: CalendarIcon, label: 'Content Calendar Planner', url: 'https://content-spark-ai-213217a5.base44.app' },
];

const Sidebar: React.FC<SidebarProps> = ({ isOpen, toggleSidebar, onToolSelect }) => {
  const handleFeatureClick = (tool: { id?: string; url?: string }) => {
    if (tool.id) {
      onToolSelect(tool.id);
    } else if (tool.url) {
      onToolSelect(tool.url);
    }
    // On mobile, close sidebar after selection for better UX
    if (window.innerWidth < 1024) {
      toggleSidebar();
    }
  };

  return (
    <>
      {/* Overlay for mobile */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={toggleSidebar}
      ></div>
      
      {/* Sidebar */}
      <aside
        className={`fixed lg:relative inset-y-0 left-0 bg-white shadow-lg w-64 transform transition-transform duration-300 ease-in-out z-40 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0 lg:flex lg:flex-shrink-0`}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between h-16 px-4 border-b">
            <h1 className="text-xl font-bold text-gray-800">
              <span className="text-brand-primary">NexaCore</span>
              <span className="text-brand-secondary">Agent</span>
            </h1>
            <button onClick={toggleSidebar} className="text-gray-500 hover:text-gray-900 lg:hidden">
              <MenuIcon className="w-6 h-6" />
            </button>
          </div>
          <nav className="flex-1 px-2 py-4 space-y-1 overflow-y-auto">
            <h3 className="px-4 pt-2 pb-1 text-xs font-semibold text-gray-500 uppercase tracking-wider">Creative Tools</h3>
            {creativeTools.map((button) => (
              <FeatureButton
                key={button.label}
                icon={button.icon}
                label={button.label}
                onClick={() => handleFeatureClick(button)}
              />
            ))}
            <h3 className="px-4 pt-4 pb-1 text-xs font-semibold text-gray-500 uppercase tracking-wider">Business Growth</h3>
            {businessTools.map((button) => (
              <FeatureButton
                key={button.label}
                icon={button.icon}
                label={button.label}
                onClick={() => handleFeatureClick(button)}
              />
            ))}
          </nav>
          <div className="px-4 py-2 mt-auto border-t">
              <p className="text-xs text-gray-500">© 2024 NexaCore Agent</p>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;