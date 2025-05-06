import type { Meta, StoryObj } from '@storybook/react';
import { Toast, ToastProvider, useToast } from './Toast';
import { Text } from '../typography';
import { useState } from 'react';
import { Button } from '../ui/Button';

const meta = {
  title: 'Design System/Feedback/Toast',
  component: Toast,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['info', 'success', 'warning', 'error'],
    },
    position: {
      control: 'select',
      options: ['top-right', 'top-left', 'bottom-right', 'bottom-left', 'top-center', 'bottom-center'],
    },
    duration: {
      control: 'number',
    },
  },
  decorators: [
    (Story) => (
      <ToastProvider>
        <Story />
      </ToastProvider>
    ),
  ],
} satisfies Meta<typeof Toast>;

export default meta;
type Story = StoryObj<typeof Toast>;

// Basic toast
export const Default: Story = {
  args: {
    open: true,
    title: 'Toast Message',
    description: 'This is a simple toast notification',
    variant: 'info',
    duration: Infinity, // For demo purposes, don't auto-close
  },
};

// Success toast
export const Success: Story = {
  args: {
    open: true,
    title: 'Successfully saved!',
    description: 'Your changes have been saved successfully.',
    variant: 'success',
    duration: Infinity,
  },
};

// Warning toast
export const Warning: Story = {
  args: {
    open: true,
    title: 'Warning',
    description: 'You are reaching your storage limit. Consider upgrading your plan.',
    variant: 'warning',
    duration: Infinity,
  },
};

// Error toast
export const Error: Story = {
  args: {
    open: true,
    title: 'Error',
    description: 'There was an error processing your request. Please try again.',
    variant: 'error',
    duration: Infinity,
  },
};

// Positions demo
export const Positions: Story = {
  render: () => (
    <div className="flex flex-col items-center space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <Toast 
          open={true} 
          title="Top Left" 
          position="top-left" 
          variant="info"
          duration={Infinity}
        />
        <Toast 
          open={true} 
          title="Top Right" 
          position="top-right" 
          variant="success" 
          duration={Infinity}
        />
        <Toast 
          open={true} 
          title="Bottom Left" 
          position="bottom-left" 
          variant="warning" 
          duration={Infinity}
        />
        <Toast 
          open={true} 
          title="Bottom Right" 
          position="bottom-right" 
          variant="error" 
          duration={Infinity}
        />
        <Toast 
          open={true} 
          title="Top Center" 
          position="top-center" 
          variant="info" 
          duration={Infinity}
        />
        <Toast 
          open={true} 
          title="Bottom Center" 
          position="bottom-center" 
          variant="success" 
          duration={Infinity}
        />
      </div>
    </div>
  ),
};

// Interactive toast demo with useToast hook
export const ToastManager: Story = {
  render: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { showToast } = useToast();
    
    const variants = ['info', 'success', 'warning', 'error'] as const;
    const positions = [
      'top-right', 'top-left', 'bottom-right', 'bottom-left', 'top-center', 'bottom-center'
    ] as const;
    
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [position, setPosition] = useState<(typeof positions)[number]>('bottom-right');
    
    return (
      <div className="space-y-6 w-full max-w-xl">
        <Text variant="body">
          Click the buttons below to show different toast notifications.
          Current position: <span className="font-semibold">{position}</span>
        </Text>
        
        <div className="flex flex-wrap gap-2">
          {positions.map((pos) => (
            <button
              key={pos}
              className={`px-3 py-1 text-sm rounded-md ${
                position === pos 
                  ? 'bg-primary-500 text-white' 
                  : 'bg-neutral-200 hover:bg-neutral-300 text-neutral-700'
              }`}
              onClick={() => setPosition(pos)}
            >
              {pos}
            </button>
          ))}
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          {variants.map((variant) => (
            <Button
              key={variant}
              onClick={() => 
                showToast({
                  title: `${variant.charAt(0).toUpperCase() + variant.slice(1)} message`,
                  description: `This is a ${variant} toast notification with auto-dismiss.`,
                  variant,
                  position,
                  duration: 5000,
                })
              }
              className={`w-full capitalize ${
                variant === 'info' ? 'bg-primary-500 hover:bg-primary-600' :
                variant === 'success' ? 'bg-success-500 hover:bg-success-600' :
                variant === 'warning' ? 'bg-warning-500 hover:bg-warning-600' :
                'bg-error-500 hover:bg-error-600'
              }`}
            >
              Show {variant} toast
            </Button>
          ))}
        </div>
      </div>
    );
  },
};

// Use cases
export const UseCases: Story = {
  render: () => (
    <div className="space-y-8 max-w-lg">
      <div>
        <Text variant="label" className="mb-4">Common Toast Use Cases</Text>
        <div className="space-y-4">
          <div className="p-4 bg-neutral-50 border border-neutral-200 rounded-md">
            <Text variant="body" className="font-medium mb-2">Form Submission Feedback</Text>
            <div className="flex gap-2">
              <Toast 
                open={true} 
                title="Form submitted successfully" 
                variant="success" 
                duration={Infinity}
                className="max-w-xs"
              />
            </div>
            <Text variant="caption" className="mt-3">
              Use success toasts to confirm successful operations like form submissions, saves, or updates.
            </Text>
          </div>
          
          <div className="p-4 bg-neutral-50 border border-neutral-200 rounded-md">
            <Text variant="body" className="font-medium mb-2">Error Notifications</Text>
            <div className="flex gap-2">
              <Toast 
                open={true} 
                title="Connection error" 
                description="Unable to connect to the server. Please check your internet connection." 
                variant="error" 
                duration={Infinity}
                className="max-w-xs"
              />
            </div>
            <Text variant="caption" className="mt-3">
              Use error toasts for critical issues that require attention, like network errors or validation failures.
            </Text>
          </div>
          
          <div className="p-4 bg-neutral-50 border border-neutral-200 rounded-md">
            <Text variant="body" className="font-medium mb-2">Informational Updates</Text>
            <div className="flex gap-2">
              <Toast 
                open={true} 
                title="New message received" 
                description="You have a new message from John Doe" 
                variant="info" 
                duration={Infinity}
                className="max-w-xs"
              />
            </div>
            <Text variant="caption" className="mt-3">
              Use info toasts for non-critical updates, like notifications, status changes, or system messages.
            </Text>
          </div>
        </div>
      </div>
    </div>
  ),
};

// Accessibility
export const Accessibility: Story = {
  render: () => (
    <div className="space-y-8 max-w-lg">
      <div>
        <Text variant="body" className="mb-4">
          The Toast component implements the following accessibility features:
        </Text>
        <ul className="list-disc pl-5 space-y-2">
          <li>
            <Text variant="body">
              Uses <code>aria-live="polite"</code> to announce toast content to screen readers
            </Text>
          </li>
          <li>
            <Text variant="body">
              Each toast has <code>role="alert"</code> to indicate its importance
            </Text>
          </li>
          <li>
            <Text variant="body">
              Toasts are automatically dismissed after a configurable duration
            </Text>
          </li>
          <li>
            <Text variant="body">
              Clear focus management for interactive elements
            </Text>
          </li>
          <li>
            <Text variant="body">
              Color is not the only way to convey information (icons are used)
            </Text>
          </li>
        </ul>
      </div>
    </div>
  ),
};

// Best Practices
export const BestPractices: Story = {
  render: () => (
    <div className="max-w-3xl">
      <div className="mb-8">
        <Text variant="body" className="mb-4">
          Here are some best practices for using the Toast component:
        </Text>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="border border-success-300 rounded-md overflow-hidden">
          <div className="bg-success-100 p-3">
            <Text variant="label" className="text-success-800 font-medium">Do</Text>
          </div>
          <div className="p-4 space-y-4">
            <div>
              <Toast 
                open={true} 
                title="Image uploaded" 
                description="Your image has been uploaded successfully."
                variant="success" 
                duration={Infinity}
                className="max-w-xs"
              />
            </div>
            <Text variant="caption">
              ✓ Keep toast messages concise and clear<br />
              ✓ Use appropriate variants for different message types<br />
              ✓ Provide just enough information for the user to understand<br />
              ✓ Auto-dismiss non-critical messages (3-5 seconds)
            </Text>
          </div>
        </div>
        
        <div className="border border-error-300 rounded-md overflow-hidden">
          <div className="bg-error-100 p-3">
            <Text variant="label" className="text-error-800 font-medium">Don't</Text>
          </div>
          <div className="p-4 space-y-4">
            <div>
              <Toast 
                open={true} 
                title="Error #5732" 
                description="An unidentified error occurred while processing your request on the server. The system administrator has been notified. Please try again later or contact support with error code #5732."
                variant="error" 
                duration={Infinity}
                className="max-w-xs"
              />
            </div>
            <Text variant="caption">
              ✗ Use technical error codes or jargon<br />
              ✗ Display excessive text in toasts<br />
              ✗ Show too many toasts at once<br />
              ✗ Auto-dismiss critical error messages
            </Text>
          </div>
        </div>
      </div>
    </div>
  ),
};