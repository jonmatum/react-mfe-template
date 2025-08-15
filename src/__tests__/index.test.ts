import { describe, it, expect } from 'vitest';
import * as exports from '../index';

describe('Main exports', () => {
  it('exports all components', () => {
    expect(exports.Button).toBeDefined();
    expect(exports.LoadingSpinner).toBeDefined();
    expect(exports.Switch).toBeDefined();
    expect(exports.Modal).toBeDefined();
  });

  it('exports contexts', () => {
    expect(exports.SettingsProvider).toBeDefined();
    expect(exports.useSettings).toBeDefined();
  });

  it('exports utilities', () => {
    expect(exports.classNames).toBeDefined();
    expect(exports.storage).toBeDefined();
    expect(exports.theme).toBeDefined();
    expect(exports.debounce).toBeDefined();
    expect(exports.generateId).toBeDefined();
    expect(exports.formatNumber).toBeDefined();
    expect(exports.truncate).toBeDefined();
  });

  it('exports design tokens', () => {
    expect(exports.colors).toBeDefined();
    expect(exports.spacing).toBeDefined();
    expect(exports.typography).toBeDefined();
    expect(exports.borderRadius).toBeDefined();
    expect(exports.shadows).toBeDefined();
    expect(exports.breakpoints).toBeDefined();
    expect(exports.transitions).toBeDefined();
    expect(exports.zIndex).toBeDefined();
  });

  it('exports types', () => {
    // Types are exported but not runtime values, so we just check the module structure
    expect(typeof exports).toBe('object');
  });
});
