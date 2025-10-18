import React from 'react';

interface FeatureButtonProps {
  icon: React.ElementType;
  label: string;
  onClick: () => void;
  status?: 'coming_soon';
}

const FeatureButton: React.FC<FeatureButtonProps> = ({ icon: Icon, label, onClick, status }) => {
  const isComingSoon = status === 'coming_soon';

  return (
    <button
      onClick={onClick}
      disabled={isComingSoon}
      className={`w-full flex items-center px-4 py-2 text-sm font-medium text-gray-700 rounded-lg transition-colors duration-200 ${
        isComingSoon
          ? 'opacity-60 cursor-not-allowed'
          : 'hover:bg-gray-100 hover:text-brand-primary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-primary'
      }`}
    >
      <Icon className="w-5 h-5 mr-3 text-gray-500" />
      <span className="flex-1 text-left">{label}</span>
      {isComingSoon && (
        <span className="text-xs font-semibold text-gray-400 bg-gray-200 rounded-full px-2 py-0.5">
          Soon
        </span>
      )}
    </button>
  );
};

export default FeatureButton;
