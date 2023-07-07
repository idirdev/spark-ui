import React, { forwardRef } from 'react';
import type { BadgeProps, BadgeColor, BadgeVariant, Size } from '../types';

type ColorMap = Record<BadgeColor, string>;

const solidColors: ColorMap = {
  gray: 'bg-gray-600 text-white',
  red: 'bg-red-600 text-white',
  green: 'bg-green-600 text-white',
  blue: 'bg-blue-600 text-white',
  yellow: 'bg-yellow-500 text-white',
  purple: 'bg-purple-600 text-white',
  pink: 'bg-pink-600 text-white',
  teal: 'bg-teal-600 text-white',
};

const outlineColors: ColorMap = {
  gray: 'border border-gray-400 text-gray-700 bg-transparent',
  red: 'border border-red-400 text-red-700 bg-transparent',
  green: 'border border-green-400 text-green-700 bg-transparent',
  blue: 'border border-blue-400 text-blue-700 bg-transparent',
  yellow: 'border border-yellow-400 text-yellow-700 bg-transparent',
  purple: 'border border-purple-400 text-purple-700 bg-transparent',
  pink: 'border border-pink-400 text-pink-700 bg-transparent',
  teal: 'border border-teal-400 text-teal-700 bg-transparent',
};

const subtleColors: ColorMap = {
  gray: 'bg-gray-100 text-gray-700',
  red: 'bg-red-100 text-red-700',
  green: 'bg-green-100 text-green-700',
  blue: 'bg-blue-100 text-blue-700',
  yellow: 'bg-yellow-100 text-yellow-800',
  purple: 'bg-purple-100 text-purple-700',
  pink: 'bg-pink-100 text-pink-700',
  teal: 'bg-teal-100 text-teal-700',
};

const variantMap: Record<BadgeVariant, ColorMap> = {
  solid: solidColors,
  outline: outlineColors,
  subtle: subtleColors,
};

const dotColors: Record<BadgeColor, string> = {
  gray: 'bg-gray-500',
  red: 'bg-red-500',
  green: 'bg-green-500',
  blue: 'bg-blue-500',
  yellow: 'bg-yellow-500',
  purple: 'bg-purple-500',
  pink: 'bg-pink-500',
  teal: 'bg-teal-500',
};

const sizeStyles: Record<Size, { badge: string; dot: string }> = {
  sm: { badge: 'px-1.5 py-0.5 text-xs', dot: 'w-1.5 h-1.5' },
  md: { badge: 'px-2 py-0.5 text-xs', dot: 'w-2 h-2' },
  lg: { badge: 'px-2.5 py-1 text-sm', dot: 'w-2 h-2' },
};

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  (
    {
      color = 'gray',
      variant = 'subtle',
      dot = false,
      size = 'md',
      children,
      className = '',
      ...rest
    },
    ref
  ) => {
    const colorStyles = variantMap[variant][color];
    const styles = sizeStyles[size];

    const showDot = dot && variant !== 'solid';
    const dotColorClass = variant === 'solid' ? 'bg-white' : dotColors[color];

    return (
      <span
        ref={ref}
        className={[
          'inline-flex items-center gap-1.5 font-medium rounded-full whitespace-nowrap leading-none',
          colorStyles,
          styles.badge,
          className,
        ]
          .filter(Boolean)
          .join(' ')}
        {...rest}
      >
        {showDot && (
          <span
            className={['rounded-full shrink-0', dotColorClass, styles.dot].join(' ')}
            aria-hidden="true"
          />
        )}
        {children}
      </span>
    );
  }
);

Badge.displayName = 'Badge';
