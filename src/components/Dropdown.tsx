import React, { useState, useRef, useEffect, useCallback } from 'react';
import type { DropdownProps, DropdownMenuEntry, DropdownItem } from '../types';

function isDivider(entry: DropdownMenuEntry): entry is { key: string; type: 'divider' } {
  return 'type' in entry && entry.type === 'divider';
}

export function Dropdown({ trigger, items, align = 'left', className = '' }: DropdownProps) {
  const [open, setOpen] = useState(false);
  const [focusIndex, setFocusIndex] = useState(-1);
  const containerRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const actionableItems = items.filter((item): item is DropdownItem => !isDivider(item));

  const close = useCallback(() => {
    setOpen(false);
    setFocusIndex(-1);
  }, []);

  // Close on outside click
  useEffect(() => {
    if (!open) return;

    const handleClick = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        close();
      }
    };

    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [open, close]);

  // Close on Escape
  useEffect(() => {
    if (!open) return;

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        close();
      }
    };

    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [open, close]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (!open) {
        if (e.key === 'ArrowDown' || e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          setOpen(true);
          setFocusIndex(0);
        }
        return;
      }

      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault();
          setFocusIndex((prev) => {
            const next = prev + 1;
            return next >= actionableItems.length ? 0 : next;
          });
          break;

        case 'ArrowUp':
          e.preventDefault();
          setFocusIndex((prev) => {
            const next = prev - 1;
            return next < 0 ? actionableItems.length - 1 : next;
          });
          break;

        case 'Enter':
        case ' ':
          e.preventDefault();
          if (focusIndex >= 0 && focusIndex < actionableItems.length) {
            const item = actionableItems[focusIndex];
            if (!item.disabled && item.onClick) {
              item.onClick();
            }
          }
          close();
          break;

        case 'Home':
          e.preventDefault();
          setFocusIndex(0);
          break;

        case 'End':
          e.preventDefault();
          setFocusIndex(actionableItems.length - 1);
          break;
      }
    },
    [open, focusIndex, actionableItems, close]
  );

  // Track which actionable index each rendered item maps to
  let actionableIndex = -1;

  return (
    <div ref={containerRef} className={['relative inline-block', className].join(' ')}>
      {/* Trigger */}
      <div
        role="button"
        tabIndex={0}
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={() => {
          setOpen((prev) => !prev);
          if (!open) setFocusIndex(0);
        }}
        onKeyDown={handleKeyDown}
        className="cursor-pointer"
      >
        {trigger}
      </div>

      {/* Menu */}
      {open && (
        <div
          ref={menuRef}
          role="menu"
          className={[
            'absolute z-50 mt-1.5 min-w-[12rem] py-1',
            'bg-white border border-gray-200 rounded-xl shadow-lg',
            'animate-dropdown',
            align === 'right' ? 'right-0' : 'left-0',
          ].join(' ')}
        >
          {items.map((entry) => {
            if (isDivider(entry)) {
              return (
                <div
                  key={entry.key}
                  role="separator"
                  className="my-1 border-t border-gray-100"
                />
              );
            }

            actionableIndex++;
            const currentIdx = actionableIndex;
            const isFocused = currentIdx === focusIndex;

            return (
              <button
                key={entry.key}
                role="menuitem"
                type="button"
                disabled={entry.disabled}
                tabIndex={-1}
                className={[
                  'w-full flex items-center gap-2.5 px-3 py-2 text-sm text-left',
                  'transition-colors duration-100',
                  entry.disabled
                    ? 'text-gray-300 cursor-not-allowed'
                    : entry.danger
                    ? 'text-red-600 hover:bg-red-50'
                    : 'text-gray-700 hover:bg-gray-50',
                  isFocused && !entry.disabled ? 'bg-gray-50' : '',
                ].join(' ')}
                onClick={() => {
                  if (!entry.disabled && entry.onClick) {
                    entry.onClick();
                  }
                  close();
                }}
                onMouseEnter={() => setFocusIndex(currentIdx)}
              >
                {entry.icon && (
                  <span className="w-4 h-4 shrink-0 flex items-center justify-center" aria-hidden="true">
                    {entry.icon}
                  </span>
                )}
                <span className="flex-1 truncate">{entry.label}</span>
              </button>
            );
          })}
        </div>
      )}

      <style>{`
        @keyframes dropdown {
          from { opacity: 0; transform: translateY(-4px) scale(0.97); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        .animate-dropdown { animation: dropdown 0.15s ease-out; }
      `}</style>
    </div>
  );
}

Dropdown.displayName = 'Dropdown';
