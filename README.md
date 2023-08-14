# Spark UI

[![npm version](https://img.shields.io/npm/v/@idirdev/spark-ui.svg)](https://www.npmjs.com/package/@idirdev/spark-ui)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue.svg)](https://www.typescriptlang.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-Ready-38B2AC.svg)](https://tailwindcss.com/)

Minimal React component library built with TypeScript and Tailwind CSS.

## Installation

```bash
npm install @idirdev/spark-ui
```

### Peer Dependencies

```bash
npm install react react-dom tailwindcss
```

## Components

### Button

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'primary' \| 'secondary' \| 'outline' \| 'ghost' \| 'danger'` | `'primary'` | Visual style |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Button size |
| `loading` | `boolean` | `false` | Show spinner and disable |
| `leftIcon` | `ReactNode` | - | Icon before label |
| `rightIcon` | `ReactNode` | - | Icon after label |
| `fullWidth` | `boolean` | `false` | Take full container width |

```tsx
import { Button } from '@idirdev/spark-ui';

<Button variant="primary" size="md" loading={false}>
  Click me
</Button>
```

### Input

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `label` | `string` | - | Label text above input |
| `error` | `string` | - | Error message below input |
| `hint` | `string` | - | Hint text (hidden when error) |
| `prefix` | `ReactNode` | - | Element inside left of input |
| `suffix` | `ReactNode` | - | Element inside right of input |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Input size |

```tsx
import { Input } from '@idirdev/spark-ui';

<Input label="Email" placeholder="you@example.com" error="Invalid email" />
```

### Badge

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `color` | `'gray' \| 'red' \| 'green' \| 'blue' \| 'yellow' \| 'purple' \| 'pink' \| 'teal'` | `'gray'` | Badge color |
| `variant` | `'solid' \| 'outline' \| 'subtle'` | `'subtle'` | Visual variant |
| `dot` | `boolean` | `false` | Show dot indicator |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Badge size |

```tsx
import { Badge } from '@idirdev/spark-ui';

<Badge color="green" variant="subtle" dot>Active</Badge>
```

### Avatar

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `src` | `string` | - | Image URL |
| `name` | `string` | - | Name for initials fallback |
| `size` | `'sm' \| 'md' \| 'lg' \| number` | `'md'` | Avatar size |
| `status` | `'online' \| 'offline' \| 'busy' \| 'away'` | - | Status indicator dot |
| `bordered` | `boolean` | `false` | White ring border |

```tsx
import { Avatar } from '@idirdev/spark-ui';

<Avatar name="John Doe" status="online" size="lg" />
```

### Card

```tsx
import { Card, CardHeader, CardBody, CardFooter } from '@idirdev/spark-ui';

<Card hoverable>
  <CardHeader title="Card Title" subtitle="Description" />
  <CardBody>Content goes here</CardBody>
  <CardFooter>
    <Button variant="ghost">Cancel</Button>
    <Button>Save</Button>
  </CardFooter>
</Card>
```

### Modal

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `open` | `boolean` | - | Control visibility |
| `onClose` | `() => void` | - | Close handler |
| `size` | `'sm' \| 'md' \| 'lg' \| 'full'` | `'md'` | Modal width |
| `title` | `ReactNode` | - | Header title |
| `footer` | `ReactNode` | - | Footer content |
| `closeOnBackdrop` | `boolean` | `true` | Close on backdrop click |
| `closeOnEsc` | `boolean` | `true` | Close on Escape key |

```tsx
import { Modal } from '@idirdev/spark-ui';

<Modal open={isOpen} onClose={() => setIsOpen(false)} title="Confirm">
  <p>Are you sure?</p>
</Modal>
```

### Dropdown

```tsx
import { Dropdown } from '@idirdev/spark-ui';

<Dropdown
  trigger={<Button variant="outline">Menu</Button>}
  items={[
    { key: 'edit', label: 'Edit', onClick: handleEdit },
    { key: 'div', type: 'divider' },
    { key: 'delete', label: 'Delete', danger: true, onClick: handleDelete },
  ]}
/>
```

### Alert

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'info' \| 'success' \| 'warning' \| 'error'` | `'info'` | Alert style |
| `title` | `string` | - | Bold title line |
| `dismissible` | `boolean` | `false` | Show close button |

```tsx
import { Alert } from '@idirdev/spark-ui';

<Alert variant="success" title="Saved!" dismissible>
  Your changes have been saved successfully.
</Alert>
```

### Spinner

```tsx
import { Spinner } from '@idirdev/spark-ui';

<Spinner size="md" color="#6366f1" />
```

### Tooltip

```tsx
import { Tooltip } from '@idirdev/spark-ui';

<Tooltip content="Copy to clipboard" position="top" delay={200}>
  <button>Copy</button>
</Tooltip>
```

## License

MIT
