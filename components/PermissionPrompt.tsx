
import React from 'react';
import { CameraIcon } from './Icons';

interface PermissionPromptProps {
  onGrant: () => void;
}

export const PermissionPrompt: React.FC<PermissionPromptProps> = ({ onGrant }) => {
  return (
    <div className="text-center p-8 bg-gray-900 rounded-lg shadow-lg max-w-sm flex flex-col items-center">
      <CameraIcon className="w-16 h-16 text-indigo-400 mb-6" />
      <h2 className="text-2xl font-bold text-white mb-3">Welcome to Chroma View</h2>
      <p className="text-gray-300 mb-8">This app needs access to your camera to detect colors in real-time.</p>
      <button 
        onClick={onGrant}
        className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-3 px-6 rounded-lg transition-transform transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-indigo-500"
      >
        Enable Camera
      </button>
    </div>
  );
};
