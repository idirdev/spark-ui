import React, { forwardRef } from 'react';
import type { CardProps, CardHeaderProps, CardFooterProps, Size } from '../types';
import type { HTMLAttributes, ReactNode } from 'react';

const paddingMap: Record<Size | 'none', string> = {
  none: 'p-0',
  sm: 'p-3',
  md: 'p-5',
  lg: 'p-7',
};

export const Card = forwardRef<HTMLDivElement, CardProps>(
  (
    {
      hoverable = false,
      bordered = true,
      padding = 'md',
      children,
      className = '',
      ...rest
    },
    ref
  ) => {
    const classes = [
      'bg-white rounded-xl overflow-hidden',
      'transition-shadow duration-200',
      bordered ? 'border border-gray-200' : 'shadow-sm',
      hoverable ? 'hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 cursor-pointer' : '',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <div ref={ref} className={classes} {...rest}>
        <div className={paddingMap[padding]}>{children}</div>
      </div>
    );
  }
);

Card.displayName = 'Card';

export const CardHeader = forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ title, subtitle, action, children, className = '', ...rest }, ref) => {
    if (children) {
      return (
        <div
          ref={ref}
          className={['mb-4', className].filter(Boolean).join(' ')}
          {...rest}
        >
          {children}
        </div>
      );
    }

    return (
      <div
        ref={ref}
        className={['flex items-start justify-between gap-4 mb-4', className]
          .filter(Boolean)
          .join(' ')}
        {...rest}
      >
        <div className="min-w-0 flex-1">
          {title && (
            <h3 className="text-lg font-semibold text-gray-900 leading-tight truncate">
              {title}
            </h3>
          )}
          {subtitle && (
            <p className="mt-1 text-sm text-gray-500 leading-normal">{subtitle}</p>
          )}
        </div>
        {action && <div className="shrink-0">{action}</div>}
      </div>
    );
  }
);

CardHeader.displayName = 'CardHeader';

export const CardBody = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ children, className = '', ...rest }, ref) => {
    return (
      <div ref={ref} className={['text-gray-700', className].filter(Boolean).join(' ')} {...rest}>
        {children}
      </div>
    );
  }
);

CardBody.displayName = 'CardBody';

export const CardFooter = forwardRef<HTMLDivElement, CardFooterProps>(
  ({ align = 'right', children, className = '', ...rest }, ref) => {
    const alignMap = {
      left: 'justify-start',
      center: 'justify-center',
      right: 'justify-end',
    };

    return (
      <div
        ref={ref}
        className={[
          'flex items-center gap-3 mt-5 pt-4 border-t border-gray-100',
          alignMap[align],
          className,
        ]
          .filter(Boolean)
          .join(' ')}
        {...rest}
      >
        {children}
      </div>
    );
  }
);

CardFooter.displayName = 'CardFooter';
