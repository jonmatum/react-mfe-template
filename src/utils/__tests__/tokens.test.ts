import { describe, it, expect } from 'vitest';
import {
  colors,
  spacing,
  typography,
  borderRadius,
  shadows,
  breakpoints,
  transitions,
  zIndex,
} from '../tokens';

describe('Design Tokens', () => {
  describe('colors', () => {
    it('has primary color palette', () => {
      expect(colors.primary).toBeDefined();
      expect(colors.primary[50]).toBe('#eff6ff');
      expect(colors.primary[500]).toBe('#3b82f6');
      expect(colors.primary[900]).toBe('#1e3a8a');
    });

    it('has secondary color palette', () => {
      expect(colors.secondary).toBeDefined();
      expect(colors.secondary[50]).toBe('#f8fafc');
      expect(colors.secondary[500]).toBe('#64748b');
      expect(colors.secondary[900]).toBe('#0f172a');
    });

    it('has semantic colors', () => {
      expect(colors.success).toBeDefined();
      expect(colors.warning).toBeDefined();
      expect(colors.error).toBeDefined();
      expect(colors.info).toBeDefined();
    });
  });

  describe('spacing', () => {
    it('has consistent spacing scale', () => {
      expect(spacing[0]).toBe('0');
      expect(spacing[1]).toBe('0.25rem');
      expect(spacing[4]).toBe('1rem');
      expect(spacing[8]).toBe('2rem');
      expect(spacing[16]).toBe('4rem');
    });

    it('has all required spacing values', () => {
      const expectedKeys = [0, 1, 2, 3, 4, 5, 6, 8, 10, 12, 16, 20, 24, 32];
      expectedKeys.forEach(key => {
        expect(spacing[key]).toBeDefined();
      });
    });
  });

  describe('typography', () => {
    it('has font families', () => {
      expect(typography.fontFamily.sans).toContain('Inter');
      expect(typography.fontFamily.mono).toContain('JetBrains Mono');
    });

    it('has font sizes with line heights', () => {
      expect(typography.fontSize.xs).toEqual(['0.75rem', { lineHeight: '1rem' }]);
      expect(typography.fontSize.base).toEqual(['1rem', { lineHeight: '1.5rem' }]);
      expect(typography.fontSize['4xl']).toEqual(['2.25rem', { lineHeight: '2.5rem' }]);
    });

    it('has font weights', () => {
      expect(typography.fontWeight.normal).toBe('400');
      expect(typography.fontWeight.medium).toBe('500');
      expect(typography.fontWeight.bold).toBe('700');
    });
  });

  describe('borderRadius', () => {
    it('has border radius values', () => {
      expect(borderRadius.none).toBe('0');
      expect(borderRadius.sm).toBe('0.125rem');
      expect(borderRadius.md).toBe('0.375rem');
      expect(borderRadius.lg).toBe('0.5rem');
      expect(borderRadius.full).toBe('9999px');
    });
  });

  describe('shadows', () => {
    it('has shadow definitions', () => {
      expect(shadows.sm).toBeDefined();
      expect(shadows.md).toBeDefined();
      expect(shadows.lg).toBeDefined();
      expect(shadows.xl).toBeDefined();
    });

    it('has proper shadow format', () => {
      expect(shadows.sm).toContain('rgb');
      expect(shadows.md).toContain('rgb');
    });
  });

  describe('breakpoints', () => {
    it('has responsive breakpoints', () => {
      expect(breakpoints.sm).toBe('640px');
      expect(breakpoints.md).toBe('768px');
      expect(breakpoints.lg).toBe('1024px');
      expect(breakpoints.xl).toBe('1280px');
      expect(breakpoints['2xl']).toBe('1536px');
    });
  });

  describe('transitions', () => {
    it('has transition values', () => {
      expect(transitions.fast).toBe('150ms ease-in-out');
      expect(transitions.base).toBe('200ms ease-in-out');
      expect(transitions.slow).toBe('300ms ease-in-out');
    });
  });

  describe('zIndex', () => {
    it('has z-index values', () => {
      expect(zIndex.dropdown).toBe(1000);
      expect(zIndex.sticky).toBe(1020);
      expect(zIndex.fixed).toBe(1030);
      expect(zIndex.modal).toBe(1040);
      expect(zIndex.popover).toBe(1050);
      expect(zIndex.tooltip).toBe(1060);
    });

    it('has proper z-index hierarchy', () => {
      expect(zIndex.dropdown).toBeLessThan(zIndex.sticky);
      expect(zIndex.sticky).toBeLessThan(zIndex.fixed);
      expect(zIndex.fixed).toBeLessThan(zIndex.modal);
      expect(zIndex.modal).toBeLessThan(zIndex.popover);
      expect(zIndex.popover).toBeLessThan(zIndex.tooltip);
    });
  });

  describe('token consistency', () => {
    it('all color palettes have consistent structure', () => {
      const colorPalettes = [colors.primary, colors.secondary];
      const expectedShades = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900];
      
      colorPalettes.forEach(palette => {
        expectedShades.forEach(shade => {
          expect(palette[shade]).toBeDefined();
          expect(typeof palette[shade]).toBe('string');
          expect(palette[shade]).toMatch(/^#[0-9a-f]{6}$/i);
        });
      });
    });

    it('semantic colors have proper structure', () => {
      const semanticColors = [colors.success, colors.warning, colors.error, colors.info];
      const expectedShades = [50, 500, 600, 700];
      
      semanticColors.forEach(palette => {
        expectedShades.forEach(shade => {
          expect(palette[shade]).toBeDefined();
          expect(typeof palette[shade]).toBe('string');
          expect(palette[shade]).toMatch(/^#[0-9a-f]{6}$/i);
        });
      });
    });

    it('spacing values are in rem or zero', () => {
      Object.values(spacing).forEach(value => {
        expect(value).toMatch(/^(\d+(\.\d+)?rem|0)$/);
      });
    });

    it('font sizes have proper structure', () => {
      Object.values(typography.fontSize).forEach(([size, config]) => {
        expect(size).toMatch(/^\d+(\.\d+)?rem$/);
        expect(config).toHaveProperty('lineHeight');
      });
    });
  });
});
