
import React, { useRef, useEffect, useCallback, useState } from 'react';
import type { ColorInfo } from '../types';
import { TargetIcon, SwitchCameraIcon } from './Icons';

interface CameraFeedProps {
  onColorDetect: (color: ColorInfo) => void;
  onPermissionGranted: () => void;
  onPermissionDenied: (error: string) => void;
}

const componentToHex = (c: number): string => {
  const hex = c.toString(16);
  return hex.length === 1 ? "0" + hex : hex;
};

const rgbToHex = (r: number, g: number, b: number): string => {
  return `#${componentToHex(r)}${componentToHex(g)}${componentToHex(b)}`;
};

export const CameraFeed: React.FC<CameraFeedProps> = ({ onColorDetect, onPermissionGranted, onPermissionDenied }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameId = useRef<number | null>(null);
  const [facingMode, setFacingMode] = useState<'user' | 'environment'>('environment');
  const [hasMultipleCameras, setHasMultipleCameras] = useState(false);
  const streamRef = useRef<MediaStream | null>(null);

  const detectColor = useCallback(() => {
    if (videoRef.current && canvasRef.current && videoRef.current.readyState >= 2) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d', { willReadFrequently: true });

      if (context) {
        const centerX = Math.floor(video.videoWidth / 2);
        const centerY = Math.floor(video.videoHeight / 2);

        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        context.drawImage(video, 0, 0, video.videoWidth, video.videoHeight);
        
        try {
          const pixelData = context.getImageData(centerX, centerY, 1, 1).data;
          const [r, g, b] = pixelData;
          
          const hex = rgbToHex(r, g, b);
          const rgb = `rgb(${r}, ${g}, ${b})`;
          onColorDetect({ hex, rgb });
        } catch (e) {
            // This can happen due to security restrictions (e.g. tainted canvas)
            // but is unlikely with a direct camera feed.
            console.error("Could not get image data:", e);
        }
      }
    }
    animationFrameId.current = requestAnimationFrame(detectColor);
  }, [onColorDetect]);

  const checkMultipleCameras = useCallback(async () => {
    try {
      const devices = await navigator.mediaDevices.enumerateDevices();
      const videoDevices = devices.filter(device => device.kind === 'videoinput');
      setHasMultipleCameras(videoDevices.length > 1);
    } catch (err) {
      console.error('Error enumerating devices:', err);
    }
  }, []);

  const startCamera = useCallback(async (mode: 'user' | 'environment' = facingMode) => {
    try {
      // Stop existing stream if any
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }

      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { 
          facingMode: mode,
          width: { ideal: 1920 },
          height: { ideal: 1080 }
        } 
      });
      
      streamRef.current = stream;
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.onloadedmetadata = () => {
          onPermissionGranted();
          detectColor();
        };
      }
    } catch (err) {
      console.error('Error accessing camera:', err);
      let errorMessage = "An unknown error occurred while trying to access the camera.";
      if(err instanceof Error) {
        errorMessage = err.message;
      }
      onPermissionDenied(errorMessage);
    }
  }, [facingMode, onPermissionGranted, onPermissionDenied, detectColor]);

  const switchCamera = useCallback(() => {
    const newMode = facingMode === 'environment' ? 'user' : 'environment';
    setFacingMode(newMode);
    startCamera(newMode);
  }, [facingMode, startCamera]);
  
  useEffect(() => {
    startCamera();
    checkMultipleCameras();

    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="absolute inset-0">
      <video ref={videoRef} autoPlay playsInline className="w-full h-full object-cover"></video>
      <canvas ref={canvasRef} className="hidden"></canvas>
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <TargetIcon />
      </div>
      {hasMultipleCameras && (
        <button
          onClick={switchCamera}
          className="absolute top-4 right-4 bg-black/50 backdrop-blur-sm text-white p-3 rounded-full shadow-lg hover:bg-black/70 transition-colors focus:outline-none focus:ring-2 focus:ring-white/50"
          aria-label="Switch camera"
        >
          <SwitchCameraIcon className="w-6 h-6" />
        </button>
      )}
    </div>
  );
};
