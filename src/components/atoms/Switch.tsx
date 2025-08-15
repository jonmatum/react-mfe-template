import React from 'react';
import { BaseComponentProps } from '../../types';
import { classNames } from '../../utils';

interface SwitchProps extends BaseComponentProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
  label?: string;
  description?: string;
}

const Switch: React.FC<SwitchProps> = ({
  checked,
  onChange,
  disabled = false,
  label,
  description,
  className,
}) => {
  return (
    <div className={classNames('flex items-center justify-between', className)}>
      {(label || description) && (
        <div className='flex flex-col'>
          {label && (
            <label className='text-sm font-medium text-gray-900 dark:text-gray-100'>
              {label}
            </label>
          )}
          {description && (
            <p className='text-sm text-gray-500 dark:text-gray-400'>
              {description}
            </p>
          )}
        </div>
      )}

      <button
        type='button'
        className={classNames(
          'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2',
          checked ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-700',
          disabled && 'cursor-not-allowed opacity-50'
        )}
        role='switch'
        aria-checked={checked}
        disabled={disabled}
        onClick={() => !disabled && onChange(!checked)}
      >
        <span
          className={classNames(
            'pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out',
            checked ? 'translate-x-5' : 'translate-x-0'
          )}
        />
      </button>
    </div>
  );
};

export default Switch;
