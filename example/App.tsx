import React, { useState } from 'react';
import {
  SettingsProvider,
  Button,
  Modal,
  LoadingSpinner,
  Switch,
  useSettings,
} from '../src';
import '../src/styles/index.css';

// Example component showing how to use the template
function ExampleApp() {
  return (
    <SettingsProvider>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-theme">
        <div className="mfe-container mfe-container-boxed py-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-8">
            React MFE Template Example
          </h1>
          
          <div className="space-y-8">
            <ThemeSection />
            <ButtonSection />
            <ModalSection />
            <LoadingSection />
          </div>
        </div>
      </div>
    </SettingsProvider>
  );
}

function ThemeSection() {
  const { settings, updateSettings } = useSettings();
  
  return (
    <section className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm transition-theme">
      <h2 className="text-xl font-semibold mb-4">Theme Settings</h2>
      
      <div className="space-y-4">
        <Switch
          checked={settings.theme === 'dark'}
          onChange={(checked) => updateSettings({ theme: checked ? 'dark' : 'light' })}
          label="Dark Mode"
          description="Toggle between light and dark themes"
        />
        
        <div className="text-sm text-gray-600 dark:text-gray-400">
          Current theme: <span className="font-medium">{settings.theme}</span>
        </div>
      </div>
    </section>
  );
}

function ButtonSection() {
  return (
    <section className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm transition-theme">
      <h2 className="text-xl font-semibold mb-4">Button Variants</h2>
      
      <div className="flex flex-wrap gap-4">
        <Button variant="primary">Primary Button</Button>
        <Button variant="secondary">Secondary Button</Button>
        <Button variant="ghost">Ghost Button</Button>
        <Button variant="primary" disabled>Disabled Button</Button>
      </div>
      
      <div className="mt-4">
        <h3 className="text-lg font-medium mb-2">Button Sizes</h3>
        <div className="flex items-center gap-4">
          <Button size="sm">Small</Button>
          <Button size="md">Medium</Button>
          <Button size="lg">Large</Button>
        </div>
      </div>
    </section>
  );
}

function ModalSection() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  return (
    <section className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm transition-theme">
      <h2 className="text-xl font-semibold mb-4">Modal Example</h2>
      
      <Button onClick={() => setIsModalOpen(true)}>
        Open Modal
      </Button>
      
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Example Modal"
      >
        <div className="space-y-4">
          <p>This is an example modal dialog with proper accessibility features.</p>
          <p>You can close it by:</p>
          <ul className="list-disc list-inside space-y-1 text-sm">
            <li>Clicking the X button</li>
            <li>Pressing the Escape key</li>
            <li>Clicking outside the modal</li>
          </ul>
          
          <div className="flex justify-end gap-2 pt-4">
            <Button variant="ghost" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button onClick={() => setIsModalOpen(false)}>
              Confirm
            </Button>
          </div>
        </div>
      </Modal>
    </section>
  );
}

function LoadingSection() {
  const [isLoading, setIsLoading] = useState(false);
  
  const handleLoadingDemo = () => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 2000);
  };
  
  return (
    <section className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm transition-theme">
      <h2 className="text-xl font-semibold mb-4">Loading States</h2>
      
      <div className="space-y-4">
        <Button onClick={handleLoadingDemo} disabled={isLoading}>
          {isLoading ? 'Loading...' : 'Trigger Loading Demo'}
        </Button>
        
        {isLoading && (
          <div className="flex items-center gap-4">
            <LoadingSpinner size="sm" />
            <LoadingSpinner size="md" />
            <LoadingSpinner size="lg" text="Loading content..." />
          </div>
        )}
      </div>
    </section>
  );
}

export default ExampleApp;
