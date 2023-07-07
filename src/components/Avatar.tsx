import React, { forwardRef, useState, useMemo } from 'react';
import type { AvatarProps, AvatarStatus, Size } from '../types';

const presetSizes: Record<Size, { container: string; text: string; status: string }> = {
  sm: { container: 'w-8 h-8', text: 'text-xs', status: 'w-2.5 h-2.5 border-[1.5px]' },
  md: { container: 'w-10 h-10', text: 'text-sm', status: 'w-3 h-3 border-2' },
  lg: { container: 'w-14 h-14', text: 'text-lg', status: 'w-3.5 h-3.5 border-2' },
};

const statusColors: Record<AvatarStatus, string> = {
  online: 'bg-green-500',
  offline: 'bg-gray-400',
  busy: 'bg-red-500',
  away: 'bg-yellow-500',
};

const bgColors = [
  'bg-blue-500',
  'bg-green-500',
  'bg-purple-500',
  'bg-pink-500',
  'bg-teal-500',
  'bg-orange-500',
  'bg-cyan-500',
  'bg-indigo-500',
];

function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) {
    return parts[0].substring(0, 2).toUpperCase();
  }
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

function hashString(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
    hash = hash & hash;
  }
  return Math.abs(hash);
}

export const Avatar = forwardRef<HTMLDivElement, AvatarProps>(
  (
    {
      src,
      alt,
      name,
      size = 'md',
      status,
      bordered = false,
      className = '',
      style: externalStyle,
      ...rest
    },
    ref
  ) => {
    const [imgError, setImgError] = useState(false);

    const showImage = src && !imgError;
    const initials = name ? getInitials(name) : '?';

    const bgColor = useMemo(() => {
      if (name) {
        return bgColors[hashString(name) % bgColors.length];
      }
      return 'bg-gray-400';
    }, [name]);

    const isCustomSize = typeof size === 'number';
    const sizeConfig = isCustomSize ? null : presetSizes[size];

    const containerClasses = [
      'relative inline-flex items-center justify-center rounded-full overflow-hidden shrink-0',
      'select-none',
      showImage ? '' : bgColor,
      sizeConfig?.container ?? '',
      bordered ? 'ring-2 ring-white' : '',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    const containerStyle: React.CSSProperties = isCustomSize
      ? { width: size, height: size, ...externalStyle }
      : { ...externalStyle };

    const textSizeClass = sizeConfig?.text ?? '';
    const statusSizeClass = sizeConfig?.status ?? 'w-3 h-3 border-2';

    return (
      <div ref={ref} className={containerClasses} style={containerStyle} {...rest}>
        {showImage ? (
          <img
            src={src}
            alt={alt || name || 'Avatar'}
            onError={() => setImgError(true)}
            className="w-full h-full object-cover"
            draggable={false}
          />
        ) : (
          <span
            className={['font-medium text-white leading-none', textSizeClass].join(' ')}
            aria-label={name || 'Avatar'}
          >
            {initials}
          </span>
        )}

        {status && (
          <span
            className={[
              'absolute bottom-0 right-0 rounded-full border-white',
              statusColors[status],
              statusSizeClass,
            ].join(' ')}
            aria-label={status}
          />
        )}
      </div>
    );
  }
);

Avatar.displayName = 'Avatar';
