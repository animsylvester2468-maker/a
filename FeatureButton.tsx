
import React from 'react';

interface FeatureButtonProps {
  icon: React.ElementType;
  label: string;
  onClick: () => void;
}

const FeatureButton: React.FC<FeatureButtonProps> = ({ icon: Icon, label, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="w-full flex items-center px-4 py-2 text-sm font-medium text-gray-700 rounded-lg hover:bg-gray-100 hover:text-brand-primary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-primary transition-colors duration-200"
    >
      <Icon className="w-5 h-5 mr-3 text-gray-500" />
      <span>{label}</span>
    </button>
  );
};

export default FeatureButton;
