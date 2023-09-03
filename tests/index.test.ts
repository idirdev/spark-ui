import { describe, it, expect } from 'vitest';
import type {
  Size,
  Position,
  ButtonVariant,
  ButtonProps,
  InputProps,
  BadgeColor,
  BadgeVariant,
  BadgeProps,
  AvatarStatus,
  AvatarProps,
  CardProps,
  ModalProps,
  DropdownItem,
  DropdownDivider,
  DropdownMenuEntry,
  DropdownProps,
  AlertVariant,
  AlertProps,
  SpinnerProps,
  TooltipProps,
} from '../src/types/index';

// spark-ui is a React component library; we verify the type system contracts
// by checking that valid type literals are assignable and that exports exist.

describe('Type definitions', () => {
  it('Size type accepts valid values', () => {
    const sizes: Size[] = ['sm', 'md', 'lg'];
    expect(sizes).toEqual(['sm', 'md', 'lg']);
  });

  it('Position type accepts valid values', () => {
    const positions: Position[] = ['top', 'right', 'bottom', 'left'];
    expect(positions).toEqual(['top', 'right', 'bottom', 'left']);
  });

  it('ButtonVariant type accepts valid values', () => {
    const variants: ButtonVariant[] = ['primary', 'secondary', 'outline', 'ghost', 'danger'];
    expect(variants).toHaveLength(5);
  });

  it('BadgeColor type accepts valid values', () => {
    const colors: BadgeColor[] = ['gray', 'red', 'green', 'blue', 'yellow', 'purple', 'pink', 'teal'];
    expect(colors).toHaveLength(8);
  });

  it('BadgeVariant type accepts valid values', () => {
    const variants: BadgeVariant[] = ['solid', 'outline', 'subtle'];
    expect(variants).toHaveLength(3);
  });

  it('AvatarStatus type accepts valid values', () => {
    const statuses: AvatarStatus[] = ['online', 'offline', 'busy', 'away'];
    expect(statuses).toHaveLength(4);
  });

  it('AlertVariant type accepts valid values', () => {
    const variants: AlertVariant[] = ['info', 'success', 'warning', 'error'];
    expect(variants).toHaveLength(4);
  });

  it('DropdownItem interface has required fields', () => {
    const item: DropdownItem = { key: 'test', label: 'Test Item' };
    expect(item.key).toBe('test');
    expect(item.label).toBe('Test Item');
  });

  it('DropdownDivider interface has type divider', () => {
    const divider: DropdownDivider = { key: 'div1', type: 'divider' };
    expect(divider.type).toBe('divider');
  });

  it('DropdownMenuEntry can be either item or divider', () => {
    const entries: DropdownMenuEntry[] = [
      { key: 'item1', label: 'Item 1' },
      { key: 'div1', type: 'divider' },
      { key: 'item2', label: 'Item 2' },
    ];
    expect(entries).toHaveLength(3);
  });

  it('ModalProps requires open and onClose', () => {
    const props: ModalProps = {
      open: true,
      onClose: () => {},
      children: null,
    };
    expect(props.open).toBe(true);
    expect(typeof props.onClose).toBe('function');
  });
});
