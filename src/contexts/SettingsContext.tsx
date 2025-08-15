import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from 'react';
import { AppSettings } from '../types';
import { storage, theme } from '../utils';

interface SettingsContextType {
  settings: AppSettings;
  updateSettings: (newSettings: Partial<AppSettings>) => void;
  resetSettings: () => void;
}

const defaultSettings: AppSettings = {
  theme: 'system',
  layout: 'stacked',
  containerWidth: 'boxed',
};

const SettingsContext = createContext<SettingsContextType | undefined>(
  undefined
);

interface SettingsProviderProps {
  children: ReactNode;
  initialSettings?: Partial<AppSettings>;
  storageKey?: string;
}

export const SettingsProvider: React.FC<SettingsProviderProps> = ({
  children,
  initialSettings = {},
  storageKey = 'mfe-settings',
}) => {
  const [settings, setSettings] = useState<AppSettings>(() => {
    const savedSettings = storage.get(storageKey, {});
    return {
      ...defaultSettings,
      ...initialSettings,
      ...savedSettings,
    };
  });

  // Apply theme changes
  useEffect(() => {
    theme.applyTheme(settings.theme);
  }, [settings.theme]);

  // Listen for system theme changes
  useEffect(() => {
    if (settings.theme !== 'system') return;

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = () => {
      theme.applyTheme('system');
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [settings.theme]);

  const updateSettings = (newSettings: Partial<AppSettings>) => {
    setSettings(prev => {
      const updated = { ...prev, ...newSettings };
      storage.set(storageKey, updated);
      return updated;
    });
  };

  const resetSettings = () => {
    const reset = { ...defaultSettings, ...initialSettings };
    setSettings(reset);
    storage.set(storageKey, reset);
  };

  const value: SettingsContextType = {
    settings,
    updateSettings,
    resetSettings,
  };

  return (
    <SettingsContext.Provider value={value}>
      {children}
    </SettingsContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useSettings = (): SettingsContextType => {
  const context = useContext(SettingsContext);
  if (context === undefined) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
};
