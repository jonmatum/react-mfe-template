// Main exports for React MFE Template

// Types
export * from './types';

// Utilities
export * from './utils';
export {
  colors,
  spacing,
  typography,
  borderRadius,
  shadows,
  breakpoints,
  transitions,
  zIndex,
} from './utils/tokens';

// Contexts
export { SettingsProvider, useSettings } from './contexts/SettingsContext';

// Atoms
export { default as Button } from './components/atoms/Button';
export { default as LoadingSpinner } from './components/atoms/LoadingSpinner';
export { default as Switch } from './components/atoms/Switch';

// Molecules
export { default as Modal } from './components/molecules/Modal';
