
import React, { useState, useCallback } from 'react';
import { CameraFeed } from './components/CameraFeed';
import { ColorDisplay } from './components/ColorDisplay';
import { PermissionPrompt } from './components/PermissionPrompt';
import type { ColorInfo } from './types';

const App: React.FC = () => {
  const [detectedColor, setDetectedColor] = useState<ColorInfo | null>(null);
  const [permission, setPermission] = useState<'prompt' | 'granted' | 'denied'>('prompt');
  const [error, setError] = useState<string | null>(null);

  const handleColorDetect = useCallback((color: ColorInfo) => {
    setDetectedColor(color);
  }, []);

  const handlePermissionGranted = () => {
    setPermission('granted');
    setError(null);
  };

  const handlePermissionDenied = (errorMessage: string) => {
    setPermission('denied');
    setError(errorMessage);
  };

  return (
    <main className="h-screen w-screen overflow-hidden bg-black text-white relative flex items-center justify-center">
      {permission === 'granted' && (
        <>
          <CameraFeed 
            onColorDetect={handleColorDetect} 
            onPermissionGranted={handlePermissionGranted}
            onPermissionDenied={handlePermissionDenied}
          />
          <div className="absolute top-0 left-0 right-0 bottom-0 pointer-events-none">
            <ColorDisplay color={detectedColor} />
          </div>
        </>
      )}
      
      {permission === 'prompt' && (
         <PermissionPrompt onGrant={handlePermissionGranted} />
      )}

      {permission === 'denied' && (
        <div className="text-center p-8 bg-gray-900 rounded-lg shadow-lg max-w-sm">
            <h2 className="text-2xl font-bold text-red-400 mb-4">Camera Access Denied</h2>
            <p className="text-gray-300">This application requires camera access to detect colors.</p>
            <p className="text-gray-400 mt-2 text-sm">Please enable camera permissions in your browser settings and refresh the page.</p>
            {error && <p className="text-red-500 mt-4 text-xs bg-red-900/50 p-2 rounded">{error}</p>}
        </div>
      )}
    </main>
  );
};

export default App;
