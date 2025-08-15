# Template Usage Guide

This guide explains how to use the React MFE Template to create new micro frontend projects.

## Getting Started

### 1. Clone the Template

```bash
# Clone the template repository
git clone https://github.com/jonmatum/react-mfe-template.git my-new-mfe-project
cd my-new-mfe-project

# Remove the original git history
rm -rf .git

# Initialize your own git repository
git init
git add .
git commit -m "Initial commit from react-mfe-template"
```

### 2. Customize Package Information

Update `package.json` with your project details:

```json
{
  "name": "your-mfe-project-name",
  "version": "0.1.0",
  "description": "Your project description",
  "author": "Your Name <your.email@example.com>",
  "repository": {
    "type": "git",
    "url": "https://github.com/yourusername/your-mfe-project.git"
  },
  "bugs": {
    "url": "https://github.com/yourusername/your-mfe-project/issues"
  },
  "homepage": "https://github.com/yourusername/your-mfe-project#readme"
}
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Verify Setup

```bash
# Run tests
npm run test

# Check linting
npm run lint

# Build the project
npm run build

# Start development server
npm run dev
```

## Project Structure

```
your-mfe-project/
├── src/
│   ├── components/
│   │   ├── atoms/           # Basic UI elements
│   │   ├── molecules/       # Simple combinations
│   │   └── organisms/       # Complex combinations
│   ├── contexts/            # React contexts
│   ├── types/              # TypeScript definitions
│   ├── utils/              # Utility functions
│   ├── styles/             # CSS files
│   └── index.ts            # Main exports
├── example/                # Usage examples
├── scripts/                # Build and utility scripts
├── dist/                   # Built files (generated)
└── coverage/               # Test coverage (generated)
```

## Development Workflow

### Adding New Components

#### 1. Create an Atom Component

```tsx
// src/components/atoms/Input.tsx
import React from 'react';
import { BaseComponentProps } from '../../types';
import { classNames } from '../../utils';

interface InputProps extends BaseComponentProps {
  type?: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input: React.FC<InputProps> = ({
  className,
  type = 'text',
  ...props
}) => {
  return (
    <input
      type={type}
      className={classNames(
        'block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500',
        className
      )}
      {...props}
    />
  );
};

export default Input;
```

#### 2. Add Tests

```tsx
// src/components/atoms/__tests__/Input.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Input from '../Input';

describe('Input', () => {
  it('renders with placeholder', () => {
    render(<Input placeholder="Enter text" />);
    expect(screen.getByPlaceholderText('Enter text')).toBeInTheDocument();
  });

  it('handles change events', () => {
    const handleChange = vi.fn();
    render(<Input onChange={handleChange} />);
    
    fireEvent.change(screen.getByRole('textbox'), {
      target: { value: 'test' }
    });
    
    expect(handleChange).toHaveBeenCalled();
  });
});
```

#### 3. Export the Component

```tsx
// src/index.ts
export { default as Input } from './components/atoms/Input';
```

### Building Molecules and Organisms

Use atoms to build more complex components:

```tsx
// src/components/molecules/SearchBox.tsx
import React, { useState } from 'react';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import Input from '../atoms/Input';
import Button from '../atoms/Button';

interface SearchBoxProps {
  onSearch: (query: string) => void;
  placeholder?: string;
}

const SearchBox: React.FC<SearchBoxProps> = ({
  onSearch,
  placeholder = 'Search...'
}) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <Input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={placeholder}
        className="flex-1"
      />
      <Button type="submit" variant="primary">
        <MagnifyingGlassIcon className="h-5 w-5" />
      </Button>
    </form>
  );
};

export default SearchBox;
```

## Styling Guidelines

### Using Design Tokens

```tsx
import { colors, spacing, typography } from 'your-mfe-project';

// Use tokens in your components
const customStyles = {
  backgroundColor: colors.primary[500],
  padding: spacing[4],
  fontSize: typography.fontSize.base[0],
};
```

### Tailwind CSS Classes

```tsx
// Prefer utility classes
<div className="bg-blue-500 p-4 text-base rounded-md shadow-sm">
  Content
</div>

// Use design tokens for consistency
<div className="bg-primary-500 p-4 text-base rounded-md shadow-sm">
  Content
</div>
```

## Testing Strategy

### Component Testing

```tsx
// Test component behavior
describe('MyComponent', () => {
  it('renders correctly', () => {
    render(<MyComponent />);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('handles user interactions', () => {
    const handleClick = vi.fn();
    render(<MyComponent onClick={handleClick} />);
    
    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalled();
  });

  it('applies custom className', () => {
    render(<MyComponent className="custom-class" />);
    expect(screen.getByRole('button')).toHaveClass('custom-class');
  });
});
```

### Coverage Requirements

The template enforces 90%+ coverage thresholds:
- Statements: 90%
- Branches: 90%
- Functions: 90%
- Lines: 90%

## Building and Publishing

### Development Build

```bash
npm run build:watch  # Watch mode for development
```

### Production Build

```bash
npm run build       # Full production build
npm run build:lib   # Library build only
```

### Publishing to npm

```bash
# Update version
npm version patch|minor|major

# Publish to npm
npm publish
```

## Configuration

### Environment Variables

Create `.env` files for different environments:

```bash
# .env.development
VITE_API_URL=http://localhost:3001

# .env.production
VITE_API_URL=https://api.yourproject.com
```

### Customizing Build

Modify `tsup.config.ts` for build customization:

```typescript
export default defineConfig({
  entry: ['src/index.ts'],
  format: ['cjs', 'esm'],
  dts: true,
  sourcemap: true,
  external: ['react', 'react-dom', '@heroicons/react'],
  // Add your customizations
});
```

## Deployment

### GitHub Pages

```bash
# Build for production
npm run build

# Deploy to GitHub Pages (if configured)
npm run deploy
```

### npm Package

```bash
# Ensure you're logged in to npm
npm login

# Publish the package
npm publish
```

## Additional Resources

- [React Documentation](https://reactjs.org/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Heroicons](https://heroicons.com/)
- [Vitest Documentation](https://vitest.dev/)

## Contributing

1. Follow the atomic design principles
2. Write comprehensive tests
3. Use TypeScript for all new code
4. Follow the existing code style
5. Update documentation as needed

## License

This template is licensed under the MIT License. See [LICENSE](LICENSE) for details.
