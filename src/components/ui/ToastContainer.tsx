import React from 'react';
import { Toast } from './Toast';
import { useToast } from '../../hooks/useToast';

export function ToastContainer() {
  const { toasts, hideToast } = useToast();

  return (
    <div className="fixed bottom-0 right-0 z-50 p-4 space-y-2">
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          message={toast.message}
          type={toast.type}
          duration={toast.duration}
          onClose={() => hideToast(toast.id)}
        />
      ))}
    </div>
  );
}