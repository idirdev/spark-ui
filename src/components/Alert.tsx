import React, { forwardRef, useState } from 'react';
import type { AlertProps, AlertVariant } from '../types';

const variantStyles: Record<AlertVariant, { container: string; icon: string; title: string }> = {
  info: {
    container: 'bg-blue-50 border-blue-200 text-blue-800',
    icon: 'text-blue-500',
    title: 'text-blue-900',
  },
  success: {
    container: 'bg-green-50 border-green-200 text-green-800',
    icon: 'text-green-500',
    title: 'text-green-900',
  },
  warning: {
    container: 'bg-yellow-50 border-yellow-200 text-yellow-800',
    icon: 'text-yellow-600',
    title: 'text-yellow-900',
  },
  error: {
    container: 'bg-red-50 border-red-200 text-red-800',
    icon: 'text-red-500',
    title: 'text-red-900',
  },
};

const defaultIcons: Record<AlertVariant, React.ReactNode> = {
  info: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  success: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  warning: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z" />
    </svg>
  ),
  error: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
};

export const Alert = forwardRef<HTMLDivElement, AlertProps>(
  (
    {
      variant = 'info',
      title,
      icon,
      dismissible = false,
      onDismiss,
      children,
      className = '',
      ...rest
    },
    ref
  ) => {
    const [dismissed, setDismissed] = useState(false);

    if (dismissed) return null;

    const styles = variantStyles[variant];
    const displayIcon = icon !== undefined ? icon : defaultIcons[variant];

    const handleDismiss = () => {
      setDismissed(true);
      onDismiss?.();
    };

    return (
      <div
        ref={ref}
        role="alert"
        className={[
          'flex gap-3 p-4 border rounded-xl text-sm leading-relaxed',
          styles.container,
          className,
        ]
          .filter(Boolean)
          .join(' ')}
        {...rest}
      >
        {displayIcon && (
          <span className={['shrink-0 mt-0.5', styles.icon].join(' ')} aria-hidden="true">
            {displayIcon}
          </span>
        )}

        <div className="flex-1 min-w-0">
          {title && (
            <p className={['font-semibold mb-1', styles.title].join(' ')}>{title}</p>
          )}
          <div>{children}</div>
        </div>

        {dismissible && (
          <button
            type="button"
            onClick={handleDismiss}
            className="shrink-0 p-0.5 rounded-md opacity-60 hover:opacity-100 transition-opacity"
            aria-label="Dismiss"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>
    );
  }
);

Alert.displayName = 'Alert';
