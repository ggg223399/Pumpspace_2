import React, { useEffect } from 'react';
import { Check, X } from 'lucide-react';

interface ToastProps {
  message: string;
  onClose: () => void;
  type?: 'success' | 'error' | 'info';
  duration?: number;
}

export function Toast({ 
  message, 
  onClose, 
  type = 'success', 
  duration = 3000 
}: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const getIcon = () => {
    switch (type) {
      case 'success':
        return <Check size={16} className="text-green-400" />;
      case 'error':
        return <X size={16} className="text-red-400" />;
      default:
        return null;
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div className="relative group">
        {/* Main Toast Container */}
        <div className="flex items-center space-x-3 px-4 py-3 rounded-lg
                     bg-surface/95 backdrop-blur-sm
                     border border-gray-700/50
                     shadow-lg shadow-black/20
                     animate-in slide-in-from-bottom-2">
          {/* Icon */}
          <span className="flex-shrink-0">
            {getIcon()}
          </span>

          {/* Message */}
          <span className="text-sm text-gray-200">
            {message}
          </span>

          {/* Close Button */}
          <button
            onClick={onClose}
            className="flex-shrink-0 p-1 rounded-md
                     text-gray-400 hover:text-white
                     hover:bg-surface transition-colors"
          >
            <X size={14} />
          </button>

          {/* Progress Bar */}
          <div className="absolute bottom-0 left-0 h-0.5 bg-cyan-500/30
                       animate-[progress_3s_linear]"
            style={{
              width: '100%',
              animation: `progress ${duration}ms linear`
            }}
          />

          {/* Hover Effect Border */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100
                       pointer-events-none transition-opacity duration-200">
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r
                         from-transparent via-cyan-500/50 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r
                         from-transparent via-cyan-500/50 to-transparent" />
          </div>
        </div>
      </div>
    </div>
  );
}