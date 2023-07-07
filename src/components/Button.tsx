import React, { forwardRef } from 'react';
import type { ButtonProps, ButtonVariant, Size } from '../types';

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    'bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800 focus-visible:ring-blue-500 shadow-sm',
  secondary:
    'bg-gray-100 text-gray-900 hover:bg-gray-200 active:bg-gray-300 focus-visible:ring-gray-400 shadow-sm',
  outline:
    'border border-gray-300 text-gray-700 bg-transparent hover:bg-gray-50 active:bg-gray-100 focus-visible:ring-gray-400',
  ghost:
    'text-gray-700 bg-transparent hover:bg-gray-100 active:bg-gray-200 focus-visible:ring-gray-400',
  danger:
    'bg-red-600 text-white hover:bg-red-700 active:bg-red-800 focus-visible:ring-red-500 shadow-sm',
};

const sizeStyles: Record<Size, string> = {
  sm: 'px-3 py-1.5 text-sm gap-1.5 rounded-md',
  md: 'px-4 py-2 text-sm gap-2 rounded-lg',
  lg: 'px-6 py-3 text-base gap-2.5 rounded-lg',
};

const iconSizeMap: Record<Size, string> = {
  sm: 'w-4 h-4',
  md: 'w-4 h-4',
  lg: 'w-5 h-5',
};

const spinnerSizeMap: Record<Size, string> = {
  sm: 'w-3 h-3 border-[1.5px]',
  md: 'w-4 h-4 border-2',
  lg: 'w-5 h-5 border-2',
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      loading = false,
      leftIcon,
      rightIcon,
      fullWidth = false,
      disabled,
      children,
      className = '',
      type = 'button',
      ...rest
    },
    ref
  ) => {
    const isDisabled = disabled || loading;

    const baseStyles = [
      'inline-flex items-center justify-center font-medium',
      'transition-colors duration-150 ease-in-out',
      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
      'disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none',
      'select-none',
    ].join(' ');

    const widthStyle = fullWidth ? 'w-full' : '';

    return (
      <button
        ref={ref}
        type={type}
        disabled={isDisabled}
        className={[baseStyles, variantStyles[variant], sizeStyles[size], widthStyle, className]
          .filter(Boolean)
          .join(' ')}
        aria-busy={loading || undefined}
        {...rest}
      >
        {loading && (
          <span
            className={[
              'inline-block rounded-full border-current border-r-transparent animate-spin',
              spinnerSizeMap[size],
            ].join(' ')}
            aria-hidden="true"
          />
        )}

        {!loading && leftIcon && (
          <span className={['inline-flex shrink-0', iconSizeMap[size]].join(' ')} aria-hidden="true">
            {leftIcon}
          </span>
        )}

        {children && <span>{children}</span>}

        {!loading && rightIcon && (
          <span className={['inline-flex shrink-0', iconSizeMap[size]].join(' ')} aria-hidden="true">
            {rightIcon}
          </span>
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';
