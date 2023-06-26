import { ReactNode, HTMLAttributes, InputHTMLAttributes, ButtonHTMLAttributes } from 'react';

// ─── Shared ──────────────────────────────────────────────
export type Size = 'sm' | 'md' | 'lg';
export type Position = 'top' | 'right' | 'bottom' | 'left';

// ─── Button ──────────────────────────────────────────────
export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: Size;
  loading?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  fullWidth?: boolean;
}

// ─── Input ───────────────────────────────────────────────
export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size' | 'prefix'> {
  label?: string;
  error?: string;
  hint?: string;
  prefix?: ReactNode;
  suffix?: ReactNode;
  size?: Size;
  fullWidth?: boolean;
}

// ─── Badge ───────────────────────────────────────────────
export type BadgeColor = 'gray' | 'red' | 'green' | 'blue' | 'yellow' | 'purple' | 'pink' | 'teal';
export type BadgeVariant = 'solid' | 'outline' | 'subtle';

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  color?: BadgeColor;
  variant?: BadgeVariant;
  dot?: boolean;
  size?: Size;
}

// ─── Avatar ──────────────────────────────────────────────
export type AvatarStatus = 'online' | 'offline' | 'busy' | 'away';

export interface AvatarProps extends HTMLAttributes<HTMLDivElement> {
  src?: string;
  alt?: string;
  name?: string;
  size?: Size | number;
  status?: AvatarStatus;
  bordered?: boolean;
}

// ─── Card ────────────────────────────────────────────────
export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  hoverable?: boolean;
  bordered?: boolean;
  padding?: Size | 'none';
}

export interface CardHeaderProps extends HTMLAttributes<HTMLDivElement> {
  title?: ReactNode;
  subtitle?: ReactNode;
  action?: ReactNode;
}

export interface CardFooterProps extends HTMLAttributes<HTMLDivElement> {
  align?: 'left' | 'center' | 'right';
}

// ─── Modal ───────────────────────────────────────────────
export interface ModalProps {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
  size?: Size | 'full';
  closeOnBackdrop?: boolean;
  closeOnEsc?: boolean;
  title?: ReactNode;
  footer?: ReactNode;
  className?: string;
}

// ─── Dropdown ────────────────────────────────────────────
export interface DropdownItem {
  key: string;
  label: ReactNode;
  icon?: ReactNode;
  disabled?: boolean;
  danger?: boolean;
  onClick?: () => void;
}

export interface DropdownDivider {
  key: string;
  type: 'divider';
}

export type DropdownMenuEntry = DropdownItem | DropdownDivider;

export interface DropdownProps {
  trigger: ReactNode;
  items: DropdownMenuEntry[];
  align?: 'left' | 'right';
  className?: string;
}

// ─── Alert ───────────────────────────────────────────────
export type AlertVariant = 'info' | 'success' | 'warning' | 'error';

export interface AlertProps extends HTMLAttributes<HTMLDivElement> {
  variant?: AlertVariant;
  title?: string;
  icon?: ReactNode;
  dismissible?: boolean;
  onDismiss?: () => void;
}

// ─── Spinner ─────────────────────────────────────────────
export interface SpinnerProps extends HTMLAttributes<HTMLDivElement> {
  size?: Size;
  color?: string;
  thickness?: number;
}

// ─── Tooltip ─────────────────────────────────────────────
export interface TooltipProps {
  content: ReactNode;
  children: ReactNode;
  position?: Position;
  delay?: number;
  className?: string;
}
