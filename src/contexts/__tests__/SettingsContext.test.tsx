import { render, screen, fireEvent, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { SettingsProvider, useSettings } from '../SettingsContext';

// Mock the storage and theme utilities
vi.mock('../../utils', () => ({
  storage: {
    get: vi.fn(),
    set: vi.fn(),
  },
  theme: {
    applyTheme: vi.fn(),
  },
}));

// Test component that uses the settings context
const TestComponent = () => {
  const { settings, updateSettings, resetSettings } = useSettings();
  
  return (
    <div>
      <div data-testid="theme">{settings.theme}</div>
      <div data-testid="layout">{settings.layout}</div>
      <div data-testid="container-width">{settings.containerWidth}</div>
      <button 
        onClick={() => updateSettings({ theme: 'dark' })}
        data-testid="update-theme"
      >
        Update Theme
      </button>
      <button 
        onClick={() => updateSettings({ layout: 'sidebar' })}
        data-testid="update-layout"
      >
        Update Layout
      </button>
      <button 
        onClick={() => resetSettings()}
        data-testid="reset"
      >
        Reset
      </button>
    </div>
  );
};

// Import the mocked modules
import * as utils from '../../utils';

describe('SettingsContext', () => {
  const mockStorage = vi.mocked(utils).storage;
  const mockTheme = vi.mocked(utils).theme;

  beforeEach(() => {
    vi.clearAllMocks();
    mockStorage.get.mockReturnValue({});
    
    // Mock matchMedia
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: vi.fn().mockImplementation(query => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
      })),
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('provides default settings', () => {
    render(
      <SettingsProvider>
        <TestComponent />
      </SettingsProvider>
    );

    expect(screen.getByTestId('theme')).toHaveTextContent('system');
    expect(screen.getByTestId('layout')).toHaveTextContent('stacked');
    expect(screen.getByTestId('container-width')).toHaveTextContent('boxed');
  });

  it('loads settings from storage', () => {
    mockStorage.get.mockReturnValue({
      theme: 'dark',
      layout: 'sidebar',
    });

    render(
      <SettingsProvider>
        <TestComponent />
      </SettingsProvider>
    );

    expect(screen.getByTestId('theme')).toHaveTextContent('dark');
    expect(screen.getByTestId('layout')).toHaveTextContent('sidebar');
    expect(screen.getByTestId('container-width')).toHaveTextContent('boxed'); // default
  });

  it('applies initial settings', () => {
    render(
      <SettingsProvider initialSettings={{ theme: 'light', layout: 'sidebar' }}>
        <TestComponent />
      </SettingsProvider>
    );

    expect(screen.getByTestId('theme')).toHaveTextContent('light');
    expect(screen.getByTestId('layout')).toHaveTextContent('sidebar');
  });

  it('updates settings and saves to storage', () => {
    render(
      <SettingsProvider>
        <TestComponent />
      </SettingsProvider>
    );

    act(() => {
      fireEvent.click(screen.getByTestId('update-theme'));
    });

    expect(screen.getByTestId('theme')).toHaveTextContent('dark');
    expect(mockStorage.set).toHaveBeenCalledWith('mfe-settings', {
      theme: 'dark',
      layout: 'stacked',
      containerWidth: 'boxed',
    });
  });

  it('updates multiple settings', () => {
    render(
      <SettingsProvider>
        <TestComponent />
      </SettingsProvider>
    );

    act(() => {
      fireEvent.click(screen.getByTestId('update-theme'));
    });

    act(() => {
      fireEvent.click(screen.getByTestId('update-layout'));
    });

    expect(screen.getByTestId('theme')).toHaveTextContent('dark');
    expect(screen.getByTestId('layout')).toHaveTextContent('sidebar');
  });

  it('resets settings to defaults', () => {
    mockStorage.get.mockReturnValue({
      theme: 'dark',
      layout: 'sidebar',
    });

    render(
      <SettingsProvider>
        <TestComponent />
      </SettingsProvider>
    );

    // Verify initial loaded state
    expect(screen.getByTestId('theme')).toHaveTextContent('dark');
    expect(screen.getByTestId('layout')).toHaveTextContent('sidebar');

    act(() => {
      fireEvent.click(screen.getByTestId('reset'));
    });

    expect(screen.getByTestId('theme')).toHaveTextContent('system');
    expect(screen.getByTestId('layout')).toHaveTextContent('stacked');
    expect(screen.getByTestId('container-width')).toHaveTextContent('boxed');
  });

  it('resets to initial settings when provided', () => {
    render(
      <SettingsProvider initialSettings={{ theme: 'light' }}>
        <TestComponent />
      </SettingsProvider>
    );

    act(() => {
      fireEvent.click(screen.getByTestId('update-theme'));
    });

    expect(screen.getByTestId('theme')).toHaveTextContent('dark');

    act(() => {
      fireEvent.click(screen.getByTestId('reset'));
    });

    expect(screen.getByTestId('theme')).toHaveTextContent('light');
  });

  it('uses custom storage key', () => {
    render(
      <SettingsProvider storageKey="custom-key">
        <TestComponent />
      </SettingsProvider>
    );

    expect(mockStorage.get).toHaveBeenCalledWith('custom-key', {});

    act(() => {
      fireEvent.click(screen.getByTestId('update-theme'));
    });

    expect(mockStorage.set).toHaveBeenCalledWith('custom-key', expect.any(Object));
  });

  it('applies theme on mount', () => {
    render(
      <SettingsProvider>
        <TestComponent />
      </SettingsProvider>
    );

    expect(mockTheme.applyTheme).toHaveBeenCalledWith('system');
  });

  it('applies theme when theme setting changes', () => {
    render(
      <SettingsProvider>
        <TestComponent />
      </SettingsProvider>
    );

    act(() => {
      fireEvent.click(screen.getByTestId('update-theme'));
    });

    expect(mockTheme.applyTheme).toHaveBeenCalledWith('dark');
  });

  it('listens for system theme changes when theme is system', () => {
    const mockMediaQuery = {
      matches: false,
      media: '(prefers-color-scheme: dark)',
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    };

    window.matchMedia = vi.fn().mockReturnValue(mockMediaQuery);

    render(
      <SettingsProvider>
        <TestComponent />
      </SettingsProvider>
    );

    expect(window.matchMedia).toHaveBeenCalledWith('(prefers-color-scheme: dark)');
    expect(mockMediaQuery.addEventListener).toHaveBeenCalledWith('change', expect.any(Function));
  });

  it('does not listen for system theme changes when theme is not system', () => {
    const mockMediaQuery = {
      matches: false,
      media: '(prefers-color-scheme: dark)',
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    };

    window.matchMedia = vi.fn().mockReturnValue(mockMediaQuery);

    render(
      <SettingsProvider initialSettings={{ theme: 'light' }}>
        <TestComponent />
      </SettingsProvider>
    );

    expect(mockMediaQuery.addEventListener).not.toHaveBeenCalled();
  });

  it('throws error when useSettings is used outside provider', () => {
    // Suppress console.error for this test
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    expect(() => {
      render(<TestComponent />);
    }).toThrow('useSettings must be used within a SettingsProvider');

    consoleSpy.mockRestore();
  });

  it('cleans up media query listener on unmount', () => {
    const mockMediaQuery = {
      matches: false,
      media: '(prefers-color-scheme: dark)',
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    };

    window.matchMedia = vi.fn().mockReturnValue(mockMediaQuery);

    const { unmount } = render(
      <SettingsProvider>
        <TestComponent />
      </SettingsProvider>
    );

    unmount();

    expect(mockMediaQuery.removeEventListener).toHaveBeenCalledWith('change', expect.any(Function));
  });
});
