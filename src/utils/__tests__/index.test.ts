import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { 
  classNames, 
  storage, 
  theme, 
  debounce, 
  generateId, 
  formatNumber, 
  truncate 
} from '../index';

describe('classNames', () => {
  it('combines multiple class names', () => {
    expect(classNames('class1', 'class2', 'class3')).toBe('class1 class2 class3');
  });

  it('filters out falsy values', () => {
    expect(classNames('class1', null, 'class2', undefined, false, 'class3')).toBe('class1 class2 class3');
  });

  it('handles empty input', () => {
    expect(classNames()).toBe('');
  });

  it('handles all falsy values', () => {
    expect(classNames(null, undefined, false, '')).toBe('');
  });
});

describe('storage', () => {
  beforeEach(() => {
    // Mock localStorage
    const localStorageMock = {
      getItem: vi.fn(),
      setItem: vi.fn(),
      removeItem: vi.fn(),
    };
    Object.defineProperty(window, 'localStorage', {
      value: localStorageMock,
      writable: true,
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('get', () => {
    it('returns parsed value from localStorage', () => {
      const mockValue = { test: 'value' };
      vi.mocked(localStorage.getItem).mockReturnValue(JSON.stringify(mockValue));

      const result = storage.get('test-key', {});
      expect(result).toEqual(mockValue);
      expect(localStorage.getItem).toHaveBeenCalledWith('test-key');
    });

    it('returns default value when item does not exist', () => {
      vi.mocked(localStorage.getItem).mockReturnValue(null);

      const defaultValue = { default: true };
      const result = storage.get('test-key', defaultValue);
      expect(result).toEqual(defaultValue);
    });

    it('returns default value when JSON parsing fails', () => {
      vi.mocked(localStorage.getItem).mockReturnValue('invalid-json');

      const defaultValue = { default: true };
      const result = storage.get('test-key', defaultValue);
      expect(result).toEqual(defaultValue);
    });

    it('returns default value when localStorage throws error', () => {
      vi.mocked(localStorage.getItem).mockImplementation(() => {
        throw new Error('localStorage error');
      });

      const defaultValue = { default: true };
      const result = storage.get('test-key', defaultValue);
      expect(result).toEqual(defaultValue);
    });
  });

  describe('set', () => {
    it('stores stringified value in localStorage', () => {
      const value = { test: 'value' };
      storage.set('test-key', value);

      expect(localStorage.setItem).toHaveBeenCalledWith('test-key', JSON.stringify(value));
    });

    it('handles localStorage errors silently', () => {
      vi.mocked(localStorage.setItem).mockImplementation(() => {
        throw new Error('localStorage error');
      });

      expect(() => storage.set('test-key', 'value')).not.toThrow();
    });
  });

  describe('remove', () => {
    it('removes item from localStorage', () => {
      storage.remove('test-key');
      expect(localStorage.removeItem).toHaveBeenCalledWith('test-key');
    });

    it('handles localStorage errors silently', () => {
      vi.mocked(localStorage.removeItem).mockImplementation(() => {
        throw new Error('localStorage error');
      });

      expect(() => storage.remove('test-key')).not.toThrow();
    });
  });
});

describe('theme', () => {
  beforeEach(() => {
    // Mock window.matchMedia
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: vi.fn().mockImplementation(query => ({
        matches: false,
        media: query,
      })),
    });

    // Mock document
    Object.defineProperty(document, 'documentElement', {
      writable: true,
      value: {
        classList: {
          remove: vi.fn(),
          add: vi.fn(),
        },
      },
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('getSystemTheme', () => {
    it('returns light when matchMedia does not match', () => {
      window.matchMedia = vi.fn().mockReturnValue({ matches: false });
      expect(theme.getSystemTheme()).toBe('light');
    });

    it('returns dark when matchMedia matches', () => {
      window.matchMedia = vi.fn().mockReturnValue({ matches: true });
      expect(theme.getSystemTheme()).toBe('dark');
    });

    it('returns light when window is undefined (SSR)', () => {
      const originalWindow = global.window;
      // @ts-expect-error - Testing SSR scenario
      delete global.window;
      
      expect(theme.getSystemTheme()).toBe('light');
      
      global.window = originalWindow;
    });
  });

  describe('applyTheme', () => {
    it('applies light theme', () => {
      theme.applyTheme('light');

      expect(document.documentElement.classList.remove).toHaveBeenCalledWith('light', 'dark');
      expect(document.documentElement.classList.add).toHaveBeenCalledWith('light');
    });

    it('applies dark theme', () => {
      theme.applyTheme('dark');

      expect(document.documentElement.classList.remove).toHaveBeenCalledWith('light', 'dark');
      expect(document.documentElement.classList.add).toHaveBeenCalledWith('dark');
    });

    it('applies system theme based on media query', () => {
      window.matchMedia = vi.fn().mockReturnValue({ matches: true });
      theme.applyTheme('system');

      expect(document.documentElement.classList.remove).toHaveBeenCalledWith('light', 'dark');
      expect(document.documentElement.classList.add).toHaveBeenCalledWith('dark');
    });

    it('does nothing when document is undefined (SSR)', () => {
      const originalDocument = global.document;
      // @ts-expect-error - Testing SSR scenario
      delete global.document;
      
      expect(() => theme.applyTheme('light')).not.toThrow();
      
      global.document = originalDocument;
    });
  });
});

describe('debounce', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('delays function execution', () => {
    const fn = vi.fn();
    const debouncedFn = debounce(fn, 100);

    debouncedFn();
    expect(fn).not.toHaveBeenCalled();

    vi.advanceTimersByTime(100);
    expect(fn).toHaveBeenCalledTimes(1);
  });

  it('cancels previous calls', () => {
    const fn = vi.fn();
    const debouncedFn = debounce(fn, 100);

    debouncedFn();
    debouncedFn();
    debouncedFn();

    vi.advanceTimersByTime(100);
    expect(fn).toHaveBeenCalledTimes(1);
  });

  it('passes arguments correctly', () => {
    const fn = vi.fn();
    const debouncedFn = debounce(fn, 100);

    debouncedFn('arg1', 'arg2');
    vi.advanceTimersByTime(100);

    expect(fn).toHaveBeenCalledWith('arg1', 'arg2');
  });
});

describe('generateId', () => {
  it('generates id with default prefix', () => {
    const id = generateId();
    expect(id).toMatch(/^id-[a-z0-9]{9}$/);
  });

  it('generates id with custom prefix', () => {
    const id = generateId('custom');
    expect(id).toMatch(/^custom-[a-z0-9]{9}$/);
  });

  it('generates unique ids', () => {
    const id1 = generateId();
    const id2 = generateId();
    expect(id1).not.toBe(id2);
  });
});

describe('formatNumber', () => {
  it('formats number with default locale', () => {
    expect(formatNumber(1234.56)).toBe('1,234.56');
  });

  it('formats number with custom locale', () => {
    expect(formatNumber(1234.56, 'de-DE')).toBe('1.234,56');
  });

  it('formats integer', () => {
    expect(formatNumber(1234)).toBe('1,234');
  });
});

describe('truncate', () => {
  it('returns original text when shorter than maxLength', () => {
    expect(truncate('short', 10)).toBe('short');
  });

  it('returns original text when equal to maxLength', () => {
    expect(truncate('exactly10c', 10)).toBe('exactly10c');
  });

  it('truncates text when longer than maxLength', () => {
    expect(truncate('this is a long text', 10)).toBe('this is...');
  });

  it('handles edge case with maxLength of 3', () => {
    expect(truncate('test', 3)).toBe('...');
  });

  it('handles empty string', () => {
    expect(truncate('', 10)).toBe('');
  });
});
