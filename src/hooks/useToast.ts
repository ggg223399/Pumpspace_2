import { useState, useCallback } from 'react';

interface ToastOptions {
  type?: 'success' | 'error' | 'info';
  duration?: number;
}

interface Toast {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info';
  duration: number;
}

export function useToast() {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = useCallback((
    message: string, 
    { type = 'success', duration = 3000 }: ToastOptions = {}
  ) => {
    const id = Date.now().toString();
    const toast = { id, message, type, duration };
    
    setToasts(current => [...current, toast]);
  }, []);

  const hideToast = useCallback((id: string) => {
    setToasts(current => current.filter(toast => toast.id !== id));
  }, []);

  return { toasts, showToast, hideToast };
}