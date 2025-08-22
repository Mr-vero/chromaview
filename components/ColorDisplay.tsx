
import React, { useState, useEffect } from 'react';
import type { ColorInfo } from '../types';
import { CopyIcon } from './Icons';

interface ColorDisplayProps {
  color: ColorInfo | null;
}

const ColorInfoChip: React.FC<{ label: string, value: string }> = ({ label, value }) => {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(value);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="flex flex-col items-center">
            <span className="text-xs text-gray-300 uppercase tracking-wider">{label}</span>
            <button 
                onClick={handleCopy}
                className="mt-1 text-sm sm:text-lg font-mono tracking-wider bg-gray-900/50 px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg flex items-center space-x-2 transition-colors hover:bg-gray-800/70 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black focus:ring-indigo-500"
            >
                <span>{copied ? 'Copied!' : value}</span>
                {!copied && <CopyIcon className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400"/>}
            </button>
        </div>
    );
};

export const ColorDisplay: React.FC<ColorDisplayProps> = ({ color }) => {
    const [displayColor, setDisplayColor] = useState<ColorInfo | null>(null);

    useEffect(() => {
        if(color){
            setDisplayColor(color);
        }
    }, [color]);

    const textColor = displayColor ? getContrastingTextColor(displayColor.hex) : 'text-white';

    function getContrastingTextColor(hex: string) {
        if (!hex.startsWith('#')) return 'text-white';
        const r = parseInt(hex.slice(1, 3), 16);
        const g = parseInt(hex.slice(3, 5), 16);
        const b = parseInt(hex.slice(5, 7), 16);
        const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
        return luminance > 0.5 ? 'text-black' : 'text-white';
    }

  return (
    <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 md:p-6 pointer-events-auto">
        <div className="max-w-md mx-auto bg-black/50 backdrop-blur-lg rounded-2xl shadow-2xl p-3 sm:p-4 md:p-6 transition-all duration-300 ease-in-out">
            {displayColor ? (
                <div className="flex flex-col sm:flex-row items-center justify-around gap-3 sm:gap-4">
                    <div className="flex flex-col items-center space-y-2">
                         <div
                            className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-full border-4 border-white/50 shadow-lg transition-colors duration-200"
                            style={{ backgroundColor: displayColor.hex }}
                        ></div>
                        <span className={`text-xs sm:text-sm ${textColor} font-semibold`} style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.5)' }}>
                            Live
                        </span>
                    </div>

                    <div className="flex items-center gap-3 sm:gap-4">
                        <ColorInfoChip label="HEX" value={displayColor.hex} />
                        <ColorInfoChip label="RGB" value={displayColor.rgb} />
                    </div>
                </div>
            ) : (
                <div className="text-center text-gray-300 py-4 sm:py-6 md:py-8">
                    <p className="text-sm sm:text-base">Scanning for color...</p>
                </div>
            )}
        </div>
    </div>
  );
};
