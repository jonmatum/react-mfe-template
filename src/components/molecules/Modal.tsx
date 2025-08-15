import React, { useEffect } from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { ModalProps } from '../../types';
import { classNames } from '../../utils';
import Button from '../atoms/Button';

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  className,
}) => {
  // Handle escape key
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className='fixed inset-0 z-50 overflow-y-auto'>
      {/* Backdrop */}
      <div
        className='fixed inset-0 bg-black bg-opacity-50 transition-opacity'
        onClick={onClose}
        aria-hidden='true'
      />

      {/* Modal */}
      <div className='flex min-h-full items-center justify-center p-4'>
        <div
          className={classNames(
            'relative w-full max-w-md transform rounded-lg bg-white p-6 shadow-xl transition-all dark:bg-gray-800',
            className
          )}
          role='dialog'
          aria-modal='true'
          aria-labelledby={title ? 'modal-title' : undefined}
        >
          {/* Header */}
          <div className='flex items-center justify-between mb-4'>
            {title && (
              <h3
                id='modal-title'
                className='text-lg font-semibold text-gray-900 dark:text-gray-100'
              >
                {title}
              </h3>
            )}
            <Button
              variant='ghost'
              size='sm'
              onClick={onClose}
              className='ml-auto -mr-2 p-2'
              aria-label='Close modal'
            >
              <XMarkIcon className='h-5 w-5' />
            </Button>
          </div>

          {/* Content */}
          <div className='text-gray-700 dark:text-gray-300'>{children}</div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
