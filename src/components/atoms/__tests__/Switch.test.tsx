import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Switch from '../Switch';

describe('Switch', () => {
  it('renders with required props', () => {
    const onChange = vi.fn();
    render(<Switch checked={false} onChange={onChange} />);
    
    const switchElement = screen.getByRole('switch');
    expect(switchElement).toBeInTheDocument();
    expect(switchElement).toHaveAttribute('aria-checked', 'false');
  });

  it('displays checked state correctly', () => {
    const onChange = vi.fn();
    const { rerender } = render(<Switch checked={false} onChange={onChange} />);
    
    let switchElement = screen.getByRole('switch');
    expect(switchElement).toHaveAttribute('aria-checked', 'false');
    expect(switchElement).toHaveClass('bg-gray-200');

    rerender(<Switch checked={true} onChange={onChange} />);
    switchElement = screen.getByRole('switch');
    expect(switchElement).toHaveAttribute('aria-checked', 'true');
    expect(switchElement).toHaveClass('bg-blue-600');
  });

  it('calls onChange when clicked', () => {
    const onChange = vi.fn();
    render(<Switch checked={false} onChange={onChange} />);
    
    const switchElement = screen.getByRole('switch');
    fireEvent.click(switchElement);
    
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenCalledWith(true);
  });

  it('toggles from checked to unchecked', () => {
    const onChange = vi.fn();
    render(<Switch checked={true} onChange={onChange} />);
    
    const switchElement = screen.getByRole('switch');
    fireEvent.click(switchElement);
    
    expect(onChange).toHaveBeenCalledWith(false);
  });

  it('does not call onChange when disabled', () => {
    const onChange = vi.fn();
    render(<Switch checked={false} onChange={onChange} disabled={true} />);
    
    const switchElement = screen.getByRole('switch');
    fireEvent.click(switchElement);
    
    expect(onChange).not.toHaveBeenCalled();
  });

  it('applies disabled styles when disabled', () => {
    const onChange = vi.fn();
    render(<Switch checked={false} onChange={onChange} disabled={true} />);
    
    const switchElement = screen.getByRole('switch');
    expect(switchElement).toBeDisabled();
    expect(switchElement).toHaveClass('cursor-not-allowed', 'opacity-50');
  });

  it('displays label when provided', () => {
    const onChange = vi.fn();
    render(<Switch checked={false} onChange={onChange} label="Enable notifications" />);
    
    expect(screen.getByText('Enable notifications')).toBeInTheDocument();
  });

  it('displays description when provided', () => {
    const onChange = vi.fn();
    render(
      <Switch 
        checked={false} 
        onChange={onChange} 
        description="Receive email notifications for updates" 
      />
    );
    
    expect(screen.getByText('Receive email notifications for updates')).toBeInTheDocument();
  });

  it('displays both label and description', () => {
    const onChange = vi.fn();
    render(
      <Switch 
        checked={false} 
        onChange={onChange} 
        label="Notifications"
        description="Enable email notifications" 
      />
    );
    
    expect(screen.getByText('Notifications')).toBeInTheDocument();
    expect(screen.getByText('Enable email notifications')).toBeInTheDocument();
  });

  it('accepts custom className', () => {
    const onChange = vi.fn();
    render(<Switch checked={false} onChange={onChange} className="custom-switch" />);
    
    const container = screen.getByRole('switch').parentElement;
    expect(container).toHaveClass('custom-switch');
  });

  it('has proper accessibility attributes', () => {
    const onChange = vi.fn();
    render(<Switch checked={true} onChange={onChange} />);
    
    const switchElement = screen.getByRole('switch');
    expect(switchElement).toHaveAttribute('role', 'switch');
    expect(switchElement).toHaveAttribute('aria-checked', 'true');
    expect(switchElement).toHaveAttribute('type', 'button');
  });

  it('applies correct transform classes based on checked state', () => {
    const onChange = vi.fn();
    const { rerender } = render(<Switch checked={false} onChange={onChange} />);
    
    let thumb = screen.getByRole('switch').querySelector('span');
    expect(thumb).toHaveClass('translate-x-0');

    rerender(<Switch checked={true} onChange={onChange} />);
    thumb = screen.getByRole('switch').querySelector('span');
    expect(thumb).toHaveClass('translate-x-5');
  });
});
