import { useState, useEffect } from 'react';
import { FiCheck, FiAlertTriangle } from 'react-icons/fi';

type NotificationType = 'success' | 'error' | null;

interface NotificationProps {
  type: NotificationType;
  message: string;
  onClose: () => void;
}

export const Notification = ({ type, message, onClose }: NotificationProps) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 5000);

    return () => clearTimeout(timer);
  }, [onClose]);

  if (!type) return null;

  return (
    <div 
      className={`fixed top-4 right-4 z-50 flex items-center p-4 rounded-lg shadow-lg transition-all duration-300 ${
        type === 'success' ? 'bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800' : 
        'bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800'
      }`}
    >
      <div 
        className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
          type === 'success' ? 'bg-green-100 dark:bg-green-800/30' : 'bg-red-100 dark:bg-red-800/30'
        }`}
      >
        {type === 'success' ? (
          <FiCheck className="text-green-600 dark:text-green-400" />
        ) : (
          <FiAlertTriangle className="text-red-600 dark:text-red-400" />
        )}
      </div>
      <div className="ml-3">
        <p className={`text-sm font-medium ${
          type === 'success' ? 'text-green-800 dark:text-green-200' : 'text-red-800 dark:text-red-200'
        }`}>
          {message}
        </p>
      </div>
      <button 
        onClick={onClose}
        className="ml-4 text-gray-400 hover:text-gray-500 dark:text-gray-500 dark:hover:text-gray-400"
      >
        <span className="sr-only">Close</span>
        <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
        </svg>
      </button>
    </div>
  );
};

export const useNotification = () => {
  const [notification, setNotification] = useState<{type: NotificationType; message: string}>({
    type: null,
    message: ''
  });

  const showNotification = (type: 'success' | 'error', message: string) => {
    setNotification({ type, message });
  };

  const hideNotification = () => {
    setNotification({ type: null, message: '' });
  };

  return {
    notification,
    showNotification,
    hideNotification
  };
};