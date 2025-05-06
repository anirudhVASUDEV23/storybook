import type { Meta, StoryObj } from '@storybook/react';
import { TextInput } from './TextInput';
import { MailIcon, LockIcon, SearchIcon, UserIcon } from 'lucide-react';
import { Text } from '../typography';

const meta = {
  title: 'Design System/Inputs/TextInput',
  component: TextInput,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: ['text', 'password', 'email', 'number', 'search', 'tel', 'url'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    variant: {
      control: 'select',
      options: ['default', 'error'],
    },
    disabled: {
      control: 'boolean',
    },
    required: {
      control: 'boolean',
    },
  },
} satisfies Meta<typeof TextInput>;

export default meta;
type Story = StoryObj<typeof TextInput>;

// Base TextInput
export const Default: Story = {
  args: {
    label: 'Email',
    placeholder: 'Enter your email',
    helperText: 'We\'ll never share your email with anyone else.',
  },
};

// With Icons
export const WithIcons: Story = {
  args: {
    label: 'Email Address',
    placeholder: 'Enter your email',
    leftIcon: <MailIcon size={18} />,
  },
};

// With Error
export const WithError: Story = {
  args: {
    label: 'Email Address',
    placeholder: 'Enter your email',
    value: 'invalid-email',
    variant: 'error',
    errorText: 'Please enter a valid email address.',
  },
};

// Disabled
export const Disabled: Story = {
  args: {
    label: 'Email Address',
    placeholder: 'Enter your email',
    value: 'user@example.com',
    disabled: true,
    helperText: 'This field is disabled',
  },
};

// Password Input
export const Password: Story = {
  args: {
    type: 'password',
    label: 'Password',
    placeholder: 'Enter your password',
    leftIcon: <LockIcon size={18} />,
    helperText: 'Password must be at least 8 characters long',
  },
};

// Sizes
export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col gap-4 w-80">
      <TextInput 
        size="sm" 
        label="Small Input" 
        placeholder="Small input" 
      />
      <TextInput 
        size="md" 
        label="Medium Input (Default)" 
        placeholder="Medium input" 
      />
      <TextInput 
        size="lg" 
        label="Large Input" 
        placeholder="Large input" 
      />
    </div>
  ),
};

// Use Cases
export const UseCases: Story = {
  render: () => (
    <div className="space-y-8 max-w-md">
      <div>
        <Text variant="label" className="mb-4">Search</Text>
        <TextInput 
          placeholder="Search..." 
          leftIcon={<SearchIcon size={18} />}
        />
      </div>
      
      <div>
        <Text variant="label" className="mb-4">User Account Form</Text>
        <div className="space-y-4">
          <TextInput 
            label="Full Name" 
            placeholder="Enter your full name" 
            leftIcon={<UserIcon size={18} />}
            required
          />
          <TextInput 
            label="Email" 
            type="email" 
            placeholder="Enter your email" 
            leftIcon={<MailIcon size={18} />}
            required
          />
          <TextInput 
            label="Password" 
            type="password" 
            placeholder="Enter your password" 
            leftIcon={<LockIcon size={18} />}
            required
            helperText="Password must be at least 8 characters long and include a number"
          />
        </div>
      </div>
    </div>
  ),
};

// Accessibility Examples
export const Accessibility: Story = {
  render: () => (
    <div className="space-y-8 max-w-lg">
      <div>
        <Text variant="body" className="mb-4">
          The TextInput component implements the following accessibility features:
        </Text>
        <ul className="list-disc pl-5 space-y-2">
          <li>
            <Text variant="body">
              Labels are properly associated with inputs using htmlFor/id
            </Text>
          </li>
          <li>
            <Text variant="body">
              Error states are communicated with aria-invalid and error text
            </Text>
          </li>
          <li>
            <Text variant="body">
              Helper text and error messages are linked with aria-describedby
            </Text>
          </li>
          <li>
            <Text variant="body">
              Required fields are marked visually and with the required attribute
            </Text>
          </li>
          <li>
            <Text variant="body">
              Focus states have sufficient contrast and visibility
            </Text>
          </li>
        </ul>
      </div>
      <div className="space-y-4">
        <TextInput 
          label="Email Address (Required)" 
          placeholder="Enter email" 
          required
          helperText="We'll never share your email"
        />
        <TextInput 
          label="Username" 
          placeholder="Enter username"
          variant="error"
          errorText="This username is already taken"
        />
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
          Here are some best practices for using the TextInput component:
        </Text>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="border border-success-300 rounded-md overflow-hidden">
          <div className="bg-success-100 p-3">
            <Text variant="label" className="text-success-800 font-medium">Do</Text>
          </div>
          <div className="p-4 space-y-4">
            <div>
              <TextInput 
                label="Email Address" 
                placeholder="Enter your email" 
                helperText="We'll use this for account recovery"
              />
            </div>
            <div>
              <TextInput 
                label="First Name" 
                placeholder="Enter your first name"
              />
            </div>
            <Text variant="caption">
              ✓ Use clear, concise labels<br />
              ✓ Provide helpful placeholder text<br />
              ✓ Add helper text when additional context is needed<br />
              ✓ Use consistent field sizes and alignment
            </Text>
          </div>
        </div>
        
        <div className="border border-error-300 rounded-md overflow-hidden">
          <div className="bg-error-100 p-3">
            <Text variant="label" className="text-error-800 font-medium">Don't</Text>
          </div>
          <div className="p-4 space-y-4">
            <div>
              <TextInput 
                placeholder="Email" 
              />
            </div>
            <div>
              <TextInput 
                label="First Name" 
                placeholder="First Name"
                helperText="Please enter your first name here, not your last name or nickname, we need your legal first name for our records and will use this in all communications"
              />
            </div>
            <Text variant="caption">
              ✗ Omit labels in favor of placeholder text only<br />
              ✗ Duplicate label content in placeholder<br />
              ✗ Write excessively long helper text<br />
              ✗ Use inconsistent styling between related inputs
            </Text>
          </div>
        </div>
      </div>
    </div>
  ),
};