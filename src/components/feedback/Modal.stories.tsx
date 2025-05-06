import type { Meta, StoryObj } from '@storybook/react';
import { Modal, ModalBody, ModalFooter, ModalHeader } from './Modal';
import { Text, Heading } from '../typography';
import { Button } from '../ui/Button';
import { useState } from 'react';
import { TextInput } from '../inputs';
import { AlertTriangle, Check, Info, X } from 'lucide-react';

const meta = {
  title: 'Design System/Feedback/Modal',
  component: Modal,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl', 'full'],
    },
    closeOnOutsideClick: {
      control: 'boolean',
    },
  },
} satisfies Meta<typeof Modal>;

export default meta;
type Story = StoryObj<typeof Modal>;

// Basic Modal
export const Default: Story = {
  args: {
    open: true,
    title: 'Modal Title',
    description: 'This is a description for the modal dialog.',
    size: 'md',
    closeOnOutsideClick: true,
    onOpenChange: () => {},
    children: (
      <>
        <div className="py-4">
          <Text variant="body">This is the modal content.</Text>
        </div>
        <ModalFooter>
          <Button variant="outline" onClick={() => {}}>Cancel</Button>
          <Button onClick={() => {}}>Confirm</Button>
        </ModalFooter>
      </>
    ),
  },
};

// Interactive Example
export const Interactive: Story = {
  render: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [open, setOpen] = useState(false);
    
    return (
      <div className="space-y-4">
        <Button onClick={() => setOpen(true)}>Open Modal</Button>
        
        <Modal
          open={open}
          onOpenChange={setOpen}
          title="Interactive Modal"
          description="This modal can be opened and closed using the button."
        >
          <div className="py-4">
            <Text variant="body">
              This is an interactive modal example. You can close it by clicking outside,
              pressing ESC, or using the close button.
            </Text>
          </div>
          <ModalFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
            <Button onClick={() => setOpen(false)}>Confirm</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  },
};

// Different Sizes
export const Sizes: Story = {
  render: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [size, setSize] = useState<'sm' | 'md' | 'lg' | 'xl' | 'full'>('md');
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [open, setOpen] = useState(false);
    
    return (
      <div className="space-y-4">
        <div className="flex flex-wrap gap-2">
          {(['sm', 'md', 'lg', 'xl', 'full'] as const).map((s) => (
            <button
              key={s}
              className={`px-3 py-1 text-sm rounded-md ${
                size === s 
                  ? 'bg-primary-500 text-white' 
                  : 'bg-neutral-200 hover:bg-neutral-300 text-neutral-700'
              }`}
              onClick={() => setSize(s)}
            >
              {s}
            </button>
          ))}
        </div>
        
        <Button onClick={() => setOpen(true)}>
          Open {size.toUpperCase()} Modal
        </Button>
        
        <Modal
          open={open}
          onOpenChange={setOpen}
          title={`${size.toUpperCase()} Modal`}
          description={`This is a ${size} sized modal`}
          size={size}
        >
          <div className="py-4">
            <Text variant="body">
              This modal demonstrates the {size} size variant. Modal sizes range from small (sm)
              to full screen (full).
            </Text>
          </div>
          <ModalFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>Close</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  },
};

// Form Modal
export const FormModal: Story = {
  render: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [open, setOpen] = useState(false);
    
    return (
      <div>
        <Button onClick={() => setOpen(true)}>Open Form Modal</Button>
        
        <Modal
          open={open}
          onOpenChange={setOpen}
          title="Create Account"
          size="md"
        >
          <div className="p-4 space-y-4">
            <TextInput
              label="Full Name"
              placeholder="Enter your full name"
              required
            />
            <TextInput
              label="Email Address"
              type="email"
              placeholder="your@email.com"
              required
            />
            <TextInput
              label="Password"
              type="password"
              placeholder="Create a secure password"
              required
              helperText="Must be at least 8 characters"
            />
          </div>
          <ModalFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
            <Button onClick={() => setOpen(false)}>Create Account</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  },
};

// Modal Variants (using custom styling)
export const ModalVariants: Story = {
  render: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [openModal, setOpenModal] = useState<string | null>(null);
    
    const openVariant = (variant: string) => {
      setOpenModal(variant);
    };
    
    const closeModal = () => {
      setOpenModal(null);
    };
    
    return (
      <div className="space-y-4">
        <div className="flex flex-wrap gap-2">
          <Button onClick={() => openVariant('info')} className="bg-primary-500 hover:bg-primary-600">
            Info Modal
          </Button>
          <Button onClick={() => openVariant('success')} className="bg-success-500 hover:bg-success-600">
            Success Modal
          </Button>
          <Button onClick={() => openVariant('warning')} className="bg-warning-500 hover:bg-warning-600">
            Warning Modal
          </Button>
          <Button onClick={() => openVariant('error')} className="bg-error-500 hover:bg-error-600">
            Error Modal
          </Button>
        </div>
        
        {/* Info Modal */}
        <Modal
          open={openModal === 'info'}
          onOpenChange={closeModal}
          contentClassName="border-t-4 border-primary-500"
        >
          <ModalHeader>
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-full bg-primary-100">
                <Info className="text-primary-500" size={20} />
              </div>
              <Heading level="h3" className="text-xl">Information</Heading>
            </div>
          </ModalHeader>
          <ModalBody>
            <Text variant="body">
              This is an informational message. Your account settings have been updated.
              The changes will take effect next time you log in.
            </Text>
          </ModalBody>
          <ModalFooter>
            <Button onClick={closeModal}>Got it</Button>
          </ModalFooter>
        </Modal>
        
        {/* Success Modal */}
        <Modal
          open={openModal === 'success'}
          onOpenChange={closeModal}
          contentClassName="border-t-4 border-success-500"
        >
          <ModalHeader>
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-full bg-success-100">
                <Check className="text-success-500" size={20} />
              </div>
              <Heading level="h3" className="text-xl">Success</Heading>
            </div>
          </ModalHeader>
          <ModalBody>
            <Text variant="body">
              Your changes have been saved successfully! The document is now available
              to all team members.
            </Text>
          </ModalBody>
          <ModalFooter>
            <Button onClick={closeModal} className="bg-success-500 hover:bg-success-600">
              Done
            </Button>
          </ModalFooter>
        </Modal>
        
        {/* Warning Modal */}
        <Modal
          open={openModal === 'warning'}
          onOpenChange={closeModal}
          contentClassName="border-t-4 border-warning-500"
        >
          <ModalHeader>
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-full bg-warning-100">
                <AlertTriangle className="text-warning-500" size={20} />
              </div>
              <Heading level="h3" className="text-xl">Warning</Heading>
            </div>
          </ModalHeader>
          <ModalBody>
            <Text variant="body">
              You are about to archive this project. This will hide it from active
              projects, but you can restore it later. Team members will lose access
              until restored.
            </Text>
          </ModalBody>
          <ModalFooter>
            <Button variant="outline" onClick={closeModal}>Cancel</Button>
            <Button onClick={closeModal} className="bg-warning-500 hover:bg-warning-600">
              Archive Project
            </Button>
          </ModalFooter>
        </Modal>
        
        {/* Error Modal */}
        <Modal
          open={openModal === 'error'}
          onOpenChange={closeModal}
          contentClassName="border-t-4 border-error-500"
        >
          <ModalHeader>
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-full bg-error-100">
                <X className="text-error-500" size={20} />
              </div>
              <Heading level="h3" className="text-xl">Error</Heading>
            </div>
          </ModalHeader>
          <ModalBody>
            <Text variant="body">
              An error occurred while processing your request. We couldn't save your
              changes due to a server error. Please try again or contact support if
              the issue persists.
            </Text>
          </ModalBody>
          <ModalFooter>
            <Button variant="outline" onClick={closeModal}>Cancel</Button>
            <Button onClick={closeModal} className="bg-error-500 hover:bg-error-600">
              Try Again
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  },
};

// Accessibility
export const Accessibility: Story = {
  render: () => (
    <div className="space-y-8 max-w-lg">
      <div>
        <Text variant="body" className="mb-4">
          The Modal component implements the following accessibility features:
        </Text>
        <ul className="list-disc pl-5 space-y-2">
          <li>
            <Text variant="body">
              Uses <code>role="dialog"</code> and <code>aria-modal="true"</code>
            </Text>
          </li>
          <li>
            <Text variant="body">
              Associates labels using <code>aria-labelledby</code> and <code>aria-describedby</code>
            </Text>
          </li>
          <li>
            <Text variant="body">
              Supports keyboard navigation and escape key to close
            </Text>
          </li>
          <li>
            <Text variant="body">
              Traps focus within the modal when open
            </Text>
          </li>
          <li>
            <Text variant="body">
              Returns focus to the triggering element when closed
            </Text>
          </li>
        </ul>
      </div>
      <Button onClick={() => {}}>Open Accessible Modal (Demo)</Button>
    </div>
  ),
};

// Best Practices
export const BestPractices: Story = {
  render: () => (
    <div className="max-w-3xl">
      <div className="mb-8">
        <Text variant="body" className="mb-4">
          Here are some best practices for using the Modal component:
        </Text>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="border border-success-300 rounded-md overflow-hidden">
          <div className="bg-success-100 p-3">
            <Text variant="label" className="text-success-800 font-medium">Do</Text>
          </div>
          <div className="p-4 space-y-4">
            <Text variant="caption">
              ✓ Use clear titles that describe the modal's purpose<br />
              ✓ Keep modal content focused on a single task<br />
              ✓ Provide clear actions (primary and secondary)<br />
              ✓ Allow closing with ESC key and clicking outside<br />
              ✓ Use appropriate sizing for the content
            </Text>
          </div>
        </div>
        
        <div className="border border-error-300 rounded-md overflow-hidden">
          <div className="bg-error-100 p-3">
            <Text variant="label" className="text-error-800 font-medium">Don't</Text>
          </div>
          <div className="p-4 space-y-4">
            <Text variant="caption">
              ✗ Nest modals within other modals<br />
              ✗ Use modals for simple messages (use toast instead)<br />
              ✗ Pack too much content into a single modal<br />
              ✗ Use modals for critical content that should be persistent<br />
              ✗ Create modals without clear action buttons
            </Text>
          </div>
        </div>
      </div>
    </div>
  ),
};