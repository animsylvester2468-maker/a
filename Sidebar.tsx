import React, { useState } from 'react';
import FeatureButton from './FeatureButton';
import PaymentModal from './PaymentModal';
import { 
  ThumbnailIcon, TextToSpeechIcon, SpeechToTextIcon, ImageIcon, BlogIcon, MusicIcon, MenuIcon,
  BusinessNameIcon, CalendarIcon, AdCopyIcon, SeoIcon, ResearchIcon, ChatIcon, HeartIcon, LockClosedIcon,
  SocialMediaIcon, EmailIcon, CompetitorIcon, VideoScriptIcon, PodcastIcon, LogoIcon
} from '../constants';

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
  onToolSelect: (tool: string) => void;
  isBusinessUnlocked: boolean;
}

const creativeTools = [
  { icon: ChatIcon, label: 'Chatbot', id: 'chatbot', type: 'creative' },
  { icon: ThumbnailIcon, label: 'Thumbnail Generator', url: 'https://thumbnail-ai-0ae599a2.base44.app', type: 'creative' },
  { icon: TextToSpeechIcon, label: 'Text-to-Speech', url: 'https://businetts.netlify.app/', type: 'creative' },
  { icon: SpeechToTextIcon, label: 'Speech-to-Text', url: 'https://businetts.netlify.app/', type: 'creative' },
  { icon: ImageIcon, label: 'AI Image Generator', url: 'https://visio-ai-ddd96435.base44.app', type: 'creative' },
  { icon: BlogIcon, label: 'Blog Writer', url: 'https://content-spark-ai-b079dd2d.base44.app', type: 'creative' },
  { icon: MusicIcon, label: 'Music Maker', url: 'https://studiol.netlify.app/', type: 'creative' },
  { icon: VideoScriptIcon, label: 'Video Script Writer', type: 'creative', status: 'coming_soon' },
  { icon: PodcastIcon, label: 'Podcast Idea Generator', type: 'creative', status: 'coming_soon' },
  { icon: LogoIcon, label: 'Logo Maker', type: 'creative', status: 'coming_soon' },
];

const businessTools = [
  { icon: BusinessNameIcon, label: 'Business Name & Logo Generator', url: 'https://brand-spark-ai-ba7e2111.base44.app', type: 'business' },
  { icon: AdCopyIcon, label: 'Ad Copy Generator', url: 'https://ad-genius-ai-e0b9daa2.base44.app', type: 'business' },
  { icon: SeoIcon, label: 'SEO Analyzer', url: 'https://opti-rank-ai-ce6a4184.base44.app', type: 'business' },
  { icon: ResearchIcon, label: 'Market Research Assistant', url: 'https://market-iq-6dcee989.base44.app', type: 'business' },
  { icon: CalendarIcon, label: 'Content Calendar Planner', url: 'https://content-spark-ai-213217a5.base44.app', type: 'business' },
  { icon: SocialMediaIcon, label: 'Social Media Manager', type: 'business', status: 'coming_soon' },
  { icon: EmailIcon, label: 'Email Campaign Writer', type: 'business', status: 'coming_soon' },
  { icon: CompetitorIcon, label: 'Competitor Analysis', type: 'business', status: 'coming_soon' },
];

const Sidebar: React.FC<SidebarProps> = ({ isOpen, toggleSidebar, onToolSelect, isBusinessUnlocked }) => {
  const [isPaymentModalOpen, setPaymentModalOpen] = useState(false);

  const handleFeatureClick = (tool: { id?: string; url?: string; type: string, status?: string }) => {
    if (tool.status === 'coming_soon') {
      alert('This feature is coming soon! Stay tuned for updates.');
      return;
    }

    if (tool.type === 'business' && !isBusinessUnlocked) {
      setPaymentModalOpen(true);
      return;
    }

    if (tool.id) {
      onToolSelect(tool.id);
    } else if (tool.url) {
      onToolSelect(tool.url);
    }
    
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
                status={button.status as 'coming_soon' | undefined}
              />
            ))}
            <h3 className="px-4 pt-4 pb-1 text-xs font-semibold text-gray-500 uppercase tracking-wider flex justify-between items-center">
              <span>Business Growth</span>
              {!isBusinessUnlocked && <LockClosedIcon className="w-4 h-4 text-gray-400" />}
            </h3>
            {businessTools.map((button) => (
              <FeatureButton
                key={button.label}
                icon={button.icon}
                label={button.label}
                onClick={() => handleFeatureClick(button)}
                status={button.status as 'coming_soon' | undefined}
              />
            ))}
          </nav>
          <div className="px-2 py-4 mt-auto border-t">
              <a
                href="https://ko-fi.com/novasoftlabs"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center px-4 py-2 text-sm font-medium text-gray-700 rounded-lg hover:bg-pink-100 hover:text-brand-secondary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-secondary transition-colors duration-200"
              >
                <HeartIcon className="w-5 h-5 mr-3 text-brand-secondary" />
                <span className="flex-1 text-left">Support Us</span>
              </a>
              <p className="text-xs text-center text-gray-500 mt-4">© 2024 NexaCore Agent</p>
          </div>
        </div>
      </aside>
      <PaymentModal isOpen={isPaymentModalOpen} onClose={() => setPaymentModalOpen(false)} />
    </>
  );
};

export default Sidebar;