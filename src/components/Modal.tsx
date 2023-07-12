import React, { useEffect, useCallback, useRef } from 'react';
import { createPortal } from 'react-dom';
import type { ModalProps, Size } from '../types';

const sizeStyles: Record<Size | 'full', string> = {
  sm: 'max-w-sm',
  md: 'max-w-lg',
  lg: 'max-w-3xl',
  full: 'max-w-[calc(100vw-2rem)] max-h-[calc(100vh-2rem)]',
};

export function Modal({
  open,
  onClose,
  children,
  size = 'md',
  closeOnBackdrop = true,
  closeOnEsc = true,
  title,
  footer,
  className = '',
}: ModalProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const previousActiveElement = useRef<Element | null>(null);

  const handleEsc = useCallback(
    (e: KeyboardEvent) => {
      if (closeOnEsc && e.key === 'Escape') {
        e.stopPropagation();
        onClose();
      }
    },
    [closeOnEsc, onClose]
  );

  const handleBackdropClick = useCallback(
    (e: React.MouseEvent) => {
      if (closeOnBackdrop && e.target === overlayRef.current) {
        onClose();
      }
    },
    [closeOnBackdrop, onClose]
  );

  useEffect(() => {
    if (open) {
      previousActiveElement.current = document.activeElement;
      document.addEventListener('keydown', handleEsc);
      document.body.style.overflow = 'hidden';

      return () => {
        document.removeEventListener('keydown', handleEsc);
        document.body.style.overflow = '';

        if (previousActiveElement.current instanceof HTMLElement) {
          previousActiveElement.current.focus();
        }
      };
    }
  }, [open, handleEsc]);

  if (!open) return null;

  const modal = (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={handleBackdropClick}
      role="presentation"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm animate-fadeIn"
        aria-hidden="true"
      />

      {/* Dialog */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label={typeof title === 'string' ? title : undefined}
        className={[
          'relative w-full bg-white rounded-2xl shadow-2xl',
          'animate-scaleIn',
          'flex flex-col',
          sizeStyles[size],
          size === 'full' ? 'h-full' : 'max-h-[85vh]',
          className,
        ]
          .filter(Boolean)
          .join(' ')}
      >
        {/* Header */}
        {(title || true) && (
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 shrink-0">
            {title && (
              <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
            )}
            {!title && <div />}
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
              aria-label="Close"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        )}

        {/* Body */}
        <div className="flex-1 overflow-y-auto px-6 py-5">{children}</div>

        {/* Footer */}
        {footer && (
          <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-gray-100 shrink-0">
            {footer}
          </div>
        )}
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes scaleIn {
          from { opacity: 0; transform: scale(0.95) translateY(8px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
        .animate-fadeIn { animation: fadeIn 0.2s ease-out; }
        .animate-scaleIn { animation: scaleIn 0.2s ease-out; }
      `}</style>
    </div>
  );

  return createPortal(modal, document.body);
}

Modal.displayName = 'Modal';
