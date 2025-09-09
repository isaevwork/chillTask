# Component Guidelines

## Component Structure

```typescript
// Component.tsx
import React from 'react';
import cls from './Component.module.scss';

interface ComponentProps {
  // Define props with proper types
}

const Component: React.FC<ComponentProps> = ({ prop1, prop2 }) => {
  // Component logic here

  return (
    <div className={cls.component}>
      {/* JSX content */}
    </div>
  );
};

export default Component;
```

## SCSS Modules

```scss
// Component.module.scss
.component {
  // Base styles

  &__element {
    // Element styles
  }

  &--modifier {
    // Modifier styles
  }
}
```

## State Management

- Use useState for local component state
- Use useReducer for complex state logic
- Consider context for shared state
- Keep state as close to where it's used as possible

## Props and Events

- Always define prop types with interfaces
- Use descriptive prop names
- Handle events with proper typing
- Use optional props with default values when appropriate
