import React, { forwardRef, useId } from 'react';
import type { InputProps, Size } from '../types';

const sizeStyles: Record<Size, { input: string; label: string; wrapper: string }> = {
  sm: {
    input: 'px-2.5 py-1.5 text-sm rounded-md',
    label: 'text-xs font-medium mb-1',
    wrapper: 'text-sm',
  },
  md: {
    input: 'px-3 py-2 text-sm rounded-lg',
    label: 'text-sm font-medium mb-1.5',
    wrapper: 'text-sm',
  },
  lg: {
    input: 'px-4 py-3 text-base rounded-lg',
    label: 'text-base font-medium mb-1.5',
    wrapper: 'text-base',
  },
};

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      error,
      hint,
      prefix,
      suffix,
      size = 'md',
      fullWidth = false,
      disabled = false,
      className = '',
      id: externalId,
      ...rest
    },
    ref
  ) => {
    const generatedId = useId();
    const inputId = externalId || generatedId;
    const errorId = error ? `${inputId}-error` : undefined;
    const hintId = hint && !error ? `${inputId}-hint` : undefined;

    const styles = sizeStyles[size];
    const hasError = Boolean(error);

    const inputBorderStyles = hasError
      ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
      : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500';

    const baseInputStyles = [
      'block w-full border bg-white text-gray-900 placeholder-gray-400',
      'transition-colors duration-150',
      'focus:outline-none focus:ring-2 focus:ring-offset-0',
      'disabled:bg-gray-50 disabled:text-gray-500 disabled:cursor-not-allowed',
      inputBorderStyles,
      styles.input,
    ].join(' ');

    const wrapperWidth = fullWidth ? 'w-full' : '';

    return (
      <div className={[styles.wrapper, wrapperWidth, className].filter(Boolean).join(' ')}>
        {label && (
          <label
            htmlFor={inputId}
            className={[styles.label, 'block text-gray-700', disabled ? 'text-gray-400' : ''].join(
              ' '
            )}
          >
            {label}
          </label>
        )}

        <div className="relative flex items-center">
          {prefix && (
            <div className="absolute left-0 pl-3 flex items-center pointer-events-none">
              <span className="text-gray-400">{prefix}</span>
            </div>
          )}

          <input
            ref={ref}
            id={inputId}
            disabled={disabled}
            aria-invalid={hasError || undefined}
            aria-describedby={
              [errorId, hintId].filter(Boolean).join(' ') || undefined
            }
            className={[
              baseInputStyles,
              prefix ? 'pl-10' : '',
              suffix ? 'pr-10' : '',
            ]
              .filter(Boolean)
              .join(' ')}
            {...rest}
          />

          {suffix && (
            <div className="absolute right-0 pr-3 flex items-center pointer-events-none">
              <span className="text-gray-400">{suffix}</span>
            </div>
          )}
        </div>

        {error && (
          <p id={errorId} className="mt-1.5 text-sm text-red-600" role="alert">
            {error}
          </p>
        )}

        {hint && !error && (
          <p id={hintId} className="mt-1.5 text-sm text-gray-500">
            {hint}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
