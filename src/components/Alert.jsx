import React from 'react';
import { useTasks } from '../context/TaskContext';

const Alert = () => {
  const { alert } = useTasks();

  if (!alert) return null;

  const alertClasses = {
    success: 'bg-green-100 border-green-400 text-green-700',
    warning: 'bg-yellow-100 border-yellow-400 text-yellow-700',
    error: 'bg-red-100 border-red-400 text-red-700'
  };

  return (
    <div className={`fixed top-4 right-4 border-l-4 p-4 rounded-lg shadow-lg ${alertClasses[alert.type]}`}>
      <div className="flex items-center">
        <div className="py-1">
          <svg className={`h-6 w-6 mr-4`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            {alert.type === 'success' && (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            )}
            {alert.type === 'warning' && (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            )}
            {alert.type === 'error' && (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            )}
          </svg>
        </div>
        <div>
          <p className="font-bold">{alert.message}</p>
        </div>
      </div>
    </div>
  );
};

export default Alert;