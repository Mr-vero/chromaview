
import React from 'react';
import { CameraIcon } from './Icons';

interface PermissionPromptProps {
  onGrant: () => void;
}

export const PermissionPrompt: React.FC<PermissionPromptProps> = ({ onGrant }) => {
  return (
    <div className="text-center p-6 sm:p-8 bg-gray-900 rounded-lg shadow-lg max-w-sm flex flex-col items-center mx-4">
      <CameraIcon className="w-12 h-12 sm:w-16 sm:h-16 text-indigo-400 mb-4 sm:mb-6" />
      <h2 className="text-xl sm:text-2xl font-bold text-white mb-2 sm:mb-3">Welcome to ChromaView</h2>
      <p className="text-sm sm:text-base text-gray-300 mb-6 sm:mb-8">This app needs access to your camera to detect colors in real-time.</p>
      <button 
        onClick={onGrant}
        className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-2.5 px-5 sm:py-3 sm:px-6 rounded-lg transition-transform transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-indigo-500"
      >
        Enable Camera
      </button>
    </div>
  );
};
