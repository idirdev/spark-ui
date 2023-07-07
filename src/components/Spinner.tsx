import React, { forwardRef } from 'react';
import type { SpinnerProps, Size } from '../types';

const sizeMap: Record<Size, { spinner: string; border: string }> = {
  sm: { spinner: 'w-4 h-4', border: 'border-[2px]' },
  md: { spinner: 'w-6 h-6', border: 'border-[2.5px]' },
  lg: { spinner: 'w-10 h-10', border: 'border-[3px]' },
};

export const Spinner = forwardRef<HTMLDivElement, SpinnerProps>(
  ({ size = 'md', color, thickness, className = '', style, ...rest }, ref) => {
    const config = sizeMap[size];

    const borderWidth = thickness ? `${thickness}px` : undefined;

    const inlineStyles: React.CSSProperties = {
      borderColor: color ?? undefined,
      borderRightColor: 'transparent',
      borderWidth: borderWidth,
      ...style,
    };

    return (
      <div
        ref={ref}
        role="status"
        aria-label="Loading"
        className={[
          'inline-block rounded-full animate-spin',
          config.spinner,
          !thickness ? config.border : '',
          !color ? 'border-blue-600' : '',
          'border-r-transparent',
          className,
        ]
          .filter(Boolean)
          .join(' ')}
        style={Object.keys(inlineStyles).length > 0 ? inlineStyles : undefined}
        {...rest}
      >
        <span className="sr-only">Loading...</span>
      </div>
    );
  }
);

Spinner.displayName = 'Spinner';
