
import React from 'react';

export const TargetIcon: React.FC = () => (
  <div 
    className="w-24 h-24 border-2 border-white/20 rounded-full flex items-center justify-center bg-transparent transition-all duration-300"
    style={{ backdropFilter: 'blur(2px)' }}
  >
    <div className="w-16 h-16 border-2 border-white/30 rounded-full flex items-center justify-center">
        <div className="w-1 h-1 bg-white/80 rounded-full shadow-lg"></div>
    </div>
    <div className="absolute w-2 h-24 border-l-2 border-r-2 border-white/10"></div>
    <div className="absolute h-2 w-24 border-t-2 border-b-2 border-white/10"></div>
  </div>
);

export const CopyIcon: React.FC<{className?: string}> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
    </svg>
);

export const CameraIcon: React.FC<{className?: string}> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
);
