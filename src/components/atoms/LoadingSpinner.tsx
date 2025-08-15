import React from 'react';
import { BaseComponentProps } from '../../types';
import { classNames } from '../../utils';

interface LoadingSpinnerProps extends BaseComponentProps {
  size?: 'sm' | 'md' | 'lg';
  text?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  className,
  size = 'md',
  text,
}) => {
  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-8 w-8',
    lg: 'h-12 w-12',
  };

  return (
    <div
      className={classNames(
        'flex flex-col items-center justify-center',
        className
      )}
    >
      <div
        className={classNames(
          'animate-spin rounded-full border-2 border-gray-300 border-t-blue-600',
          sizeClasses[size]
        )}
        role='status'
        aria-label='Loading'
      />
      {text && (
        <p className='mt-2 text-sm text-gray-600 dark:text-gray-400'>{text}</p>
      )}
    </div>
  );
};

export default LoadingSpinner;
