import React, { useState, useRef, useCallback, useEffect } from 'react';
import { createPortal } from 'react-dom';
import type { TooltipProps, Position } from '../types';

interface Coords {
  top: number;
  left: number;
}

const ARROW_SIZE = 6;
const OFFSET = 8;

function calculatePosition(
  triggerRect: DOMRect,
  tooltipRect: DOMRect,
  position: Position
): { coords: Coords; actualPosition: Position } {
  const scrollX = window.scrollX;
  const scrollY = window.scrollY;

  const positions: Record<Position, Coords> = {
    top: {
      top: triggerRect.top + scrollY - tooltipRect.height - OFFSET,
      left: triggerRect.left + scrollX + triggerRect.width / 2 - tooltipRect.width / 2,
    },
    bottom: {
      top: triggerRect.bottom + scrollY + OFFSET,
      left: triggerRect.left + scrollX + triggerRect.width / 2 - tooltipRect.width / 2,
    },
    left: {
      top: triggerRect.top + scrollY + triggerRect.height / 2 - tooltipRect.height / 2,
      left: triggerRect.left + scrollX - tooltipRect.width - OFFSET,
    },
    right: {
      top: triggerRect.top + scrollY + triggerRect.height / 2 - tooltipRect.height / 2,
      left: triggerRect.right + scrollX + OFFSET,
    },
  };

  let coords = positions[position];
  let actualPosition = position;

  // Flip if out of viewport
  if (position === 'top' && coords.top - scrollY < 0) {
    coords = positions.bottom;
    actualPosition = 'bottom';
  } else if (position === 'bottom' && coords.top - scrollY + tooltipRect.height > window.innerHeight) {
    coords = positions.top;
    actualPosition = 'top';
  } else if (position === 'left' && coords.left - scrollX < 0) {
    coords = positions.right;
    actualPosition = 'right';
  } else if (position === 'right' && coords.left - scrollX + tooltipRect.width > window.innerWidth) {
    coords = positions.left;
    actualPosition = 'left';
  }

  // Clamp horizontal
  coords.left = Math.max(scrollX + 4, Math.min(coords.left, scrollX + window.innerWidth - tooltipRect.width - 4));

  return { coords, actualPosition };
}

const arrowStyles: Record<Position, string> = {
  top: 'bottom-[-4px] left-1/2 -translate-x-1/2 border-l-transparent border-r-transparent border-b-transparent border-t-gray-900',
  bottom: 'top-[-4px] left-1/2 -translate-x-1/2 border-l-transparent border-r-transparent border-t-transparent border-b-gray-900',
  left: 'right-[-4px] top-1/2 -translate-y-1/2 border-t-transparent border-b-transparent border-r-transparent border-l-gray-900',
  right: 'left-[-4px] top-1/2 -translate-y-1/2 border-t-transparent border-b-transparent border-l-transparent border-r-gray-900',
};

export function Tooltip({
  content,
  children,
  position = 'top',
  delay = 200,
  className = '',
}: TooltipProps) {
  const [visible, setVisible] = useState(false);
  const [coords, setCoords] = useState<Coords>({ top: 0, left: 0 });
  const [actualPosition, setActualPosition] = useState<Position>(position);

  const triggerRef = useRef<HTMLSpanElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>();

  const updatePosition = useCallback(() => {
    if (!triggerRef.current || !tooltipRef.current) return;
    const triggerRect = triggerRef.current.getBoundingClientRect();
    const tooltipRect = tooltipRef.current.getBoundingClientRect();
    const result = calculatePosition(triggerRect, tooltipRect, position);
    setCoords(result.coords);
    setActualPosition(result.actualPosition);
  }, [position]);

  const show = useCallback(() => {
    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setVisible(true);
    }, delay);
  }, [delay]);

  const hide = useCallback(() => {
    clearTimeout(timeoutRef.current);
    setVisible(false);
  }, []);

  useEffect(() => {
    if (visible) {
      // Need a frame for the tooltip to render before measuring
      requestAnimationFrame(updatePosition);
    }
  }, [visible, updatePosition]);

  useEffect(() => {
    return () => clearTimeout(timeoutRef.current);
  }, []);

  const tooltip = visible
    ? createPortal(
        <div
          ref={tooltipRef}
          role="tooltip"
          className={[
            'fixed z-[9999] px-2.5 py-1.5 text-xs font-medium text-white bg-gray-900 rounded-lg',
            'shadow-lg pointer-events-none',
            'animate-tooltipIn',
            className,
          ].join(' ')}
          style={{ top: coords.top, left: coords.left, position: 'absolute' }}
        >
          {content}
          <span
            className={['absolute w-0 h-0 border-4', arrowStyles[actualPosition]].join(' ')}
            aria-hidden="true"
          />
        </div>,
        document.body
      )
    : null;

  return (
    <>
      <span
        ref={triggerRef}
        onMouseEnter={show}
        onMouseLeave={hide}
        onFocus={show}
        onBlur={hide}
        className="inline-flex"
      >
        {children}
      </span>
      {tooltip}
      {visible && (
        <style>{`
          @keyframes tooltipIn {
            from { opacity: 0; transform: scale(0.95); }
            to { opacity: 1; transform: scale(1); }
          }
          .animate-tooltipIn { animation: tooltipIn 0.15s ease-out; }
        `}</style>
      )}
    </>
  );
}

Tooltip.displayName = 'Tooltip';
