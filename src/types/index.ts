import { ComponentType } from 'react';

// Core navigation types
export interface NavigationItem {
  id: string;
  name: string;
  href: string;
  icon?: ComponentType<{ className?: string }>;
  current?: boolean;
  badge?: string | number;
  onClick?: (event: React.MouseEvent, item: NavigationItem) => void;
}

export interface UserInfo {
  name: string;
  email: string;
  imageUrl?: string;
}

// Theme and layout types
export type Theme = 'light' | 'dark' | 'system';
export type Layout = 'stacked' | 'sidebar';
export type ContainerWidth = 'boxed' | 'full';

export interface AppSettings {
  theme: Theme;
  layout: Layout;
  containerWidth: ContainerWidth;
}

// Loading configuration
export interface LoadingConfig {
  text?: string;
  component?: ComponentType;
}

// Main app shell configuration
export interface AppShellConfig {
  title: string;
  navigation: NavigationItem[];
  userNavigation?: NavigationItem[];
  user?: UserInfo;
  defaultSettings?: Partial<AppSettings>;
  loading?: LoadingConfig;
}

// Component props
export interface BaseComponentProps {
  className?: string;
  children?: React.ReactNode;
}

export interface ButtonProps extends BaseComponentProps {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  type?: 'button' | 'submit' | 'reset';
}

export interface ModalProps extends BaseComponentProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
}
