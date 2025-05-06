import type { Meta, StoryObj } from '@storybook/react';
import { Dropdown } from './Dropdown';
import { Text } from '../typography';
import { useState } from 'react';

const meta = {
  title: 'Design System/Inputs/Dropdown',
  component: Dropdown,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
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
    clearable: {
      control: 'boolean',
    },
  },
} satisfies Meta<typeof Dropdown>;

export default meta;
type Story = StoryObj<typeof Dropdown>;

// Sample options
const colorOptions = [
  { value: 'red', label: 'Red' },
  { value: 'blue', label: 'Blue' },
  { value: 'green', label: 'Green' },
  { value: 'yellow', label: 'Yellow' },
  { value: 'purple', label: 'Purple' },
  { value: 'orange', label: 'Orange' },
  { value: 'pink', label: 'Pink' },
  { value: 'black', label: 'Black' },
  { value: 'white', label: 'White' },
  { value: 'gray', label: 'Gray' },
];

// Countries for demonstrating longer lists
const countryOptions = [
  { value: 'us', label: 'United States' },
  { value: 'ca', label: 'Canada' },
  { value: 'mx', label: 'Mexico' },
  { value: 'br', label: 'Brazil' },
  { value: 'ar', label: 'Argentina' },
  { value: 'uk', label: 'United Kingdom' },
  { value: 'fr', label: 'France' },
  { value: 'de', label: 'Germany' },
  { value: 'it', label: 'Italy' },
  { value: 'es', label: 'Spain' },
  { value: 'pt', label: 'Portugal' },
  { value: 'ru', label: 'Russia' },
  { value: 'cn', label: 'China' },
  { value: 'jp', label: 'Japan' },
  { value: 'in', label: 'India' },
  { value: 'au', label: 'Australia' },
  { value: 'nz', label: 'New Zealand' },
  { value: 'za', label: 'South Africa' },
  { value: 'eg', label: 'Egypt' },
  { value: 'ng', label: 'Nigeria' },
];

// Base Dropdown
export const Default: Story = {
  args: {
    label: 'Favorite Color',
    options: colorOptions,
    placeholder: 'Select a color',
    helperText: 'Choose your favorite color',
  },
};

// With Error
export const WithError: Story = {
  args: {
    label: 'Required Field',
    options: colorOptions,
    placeholder: 'Please select an option',
    variant: 'error',
    errorText: 'This field is required',
    required: true,
  },
};

// Disabled
export const Disabled: Story = {
  args: {
    label: 'Favorite Color',
    options: colorOptions,
    placeholder: 'Select a color',
    disabled: true,
    helperText: 'This field is disabled',
  },
};

// With Disabled Options
export const WithDisabledOptions: Story = {
  args: {
    label: 'Favorite Color',
    options: [
      { value: 'red', label: 'Red' },
      { value: 'blue', label: 'Blue' },
      { value: 'green', label: 'Green', disabled: true },
      { value: 'yellow', label: 'Yellow' },
      { value: 'purple', label: 'Purple', disabled: true },
    ],
    placeholder: 'Select a color',
    helperText: 'Some options are unavailable',
  },
};

// Clearable
export const Clearable: Story = {
  args: {
    label: 'Favorite Color',
    options: colorOptions,
    placeholder: 'Select a color',
    value: 'blue',
    clearable: true,
    helperText: 'Click the X to clear your selection',
  },
};

// Searchable (many options)
export const Searchable: Story = {
  args: {
    label: 'Select Country',
    options: countryOptions,
    placeholder: 'Search for a country',
    helperText: 'Type to search for a country',
  },
};

// Sizes
export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col gap-4 w-80">
      <Dropdown 
        size="sm" 
        label="Small Dropdown" 
        options={colorOptions}
        placeholder="Small size" 
      />
      <Dropdown 
        size="md" 
        label="Medium Dropdown (Default)" 
        options={colorOptions}
        placeholder="Medium size" 
      />
      <Dropdown 
        size="lg" 
        label="Large Dropdown" 
        options={colorOptions}
        placeholder="Large size" 
      />
    </div>
  ),
};

// Interactive Example
export const Interactive: Story = {
  render: () => {
    const [value, setValue] = useState('');
    
    return (
      <div className="space-y-4 w-80">
        <Dropdown 
          label="Interactive Dropdown" 
          options={colorOptions}
          placeholder="Select a color"
          value={value}
          onChange={setValue}
          clearable
        />
        
        <div className="p-3 bg-neutral-50 rounded-md border border-neutral-200">
          <Text variant="label">Current selection:</Text>
          <Text variant="body" className="mt-1">
            {value ? `You selected: ${value}` : 'Nothing selected'}
          </Text>
        </div>
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
          The Dropdown component implements the following accessibility features:
        </Text>
        <ul className="list-disc pl-5 space-y-2">
          <li>
            <Text variant="body">
              ARIA attributes for listbox pattern (aria-haspopup, aria-expanded)
            </Text>
          </li>
          <li>
            <Text variant="body">
              Keyboard navigation support (arrow keys, Enter, Escape)
            </Text>
          </li>
          <li>
            <Text variant="body">
              Error states communicated with aria-invalid and error text
            </Text>
          </li>
          <li>
            <Text variant="body">
              Helper and error messages linked with aria-describedby
            </Text>
          </li>
          <li>
            <Text variant="body">
              Required fields marked visually and with the required attribute
            </Text>
          </li>
        </ul>
      </div>
      <div className="space-y-4">
        <Dropdown 
          label="Country (Required)" 
          options={countryOptions.slice(0, 5)}
          placeholder="Select a country"
          required
          helperText="Press Tab to navigate to this field, Enter to open the dropdown, arrow keys to navigate options"
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
          Here are some best practices for using the Dropdown component:
        </Text>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="border border-success-300 rounded-md overflow-hidden">
          <div className="bg-success-100 p-3">
            <Text variant="label" className="text-success-800 font-medium">Do</Text>
          </div>
          <div className="p-4 space-y-4">
            <div>
              <Dropdown 
                label="Country" 
                options={countryOptions.slice(0, 5)}
                placeholder="Select a country"
              />
            </div>
            <Text variant="caption">
              ✓ Use clear, descriptive labels<br />
              ✓ Keep option lists organized and manageable<br />
              ✓ Add search for long option lists<br />
              ✓ Use consistent dropdown widths for related fields
            </Text>
          </div>
        </div>
        
        <div className="border border-error-300 rounded-md overflow-hidden">
          <div className="bg-error-100 p-3">
            <Text variant="label" className="text-error-800 font-medium">Don't</Text>
          </div>
          <div className="p-4 space-y-4">
            <div>
              <Dropdown 
                options={[
                  { value: 'option1', label: 'A very long option label that will overflow and create layout issues in dropdowns' },
                  { value: 'option2', label: 'Another very long option that continues beyond a reasonable length for a dropdown menu item' }
                ]}
                placeholder="Select"
              />
            </div>
            <Text variant="caption">
              ✗ Use excessively long option labels<br />
              ✗ Use dropdowns for binary choices (use checkboxes/toggles)<br />
              ✗ Use dropdowns when there are less than 3 options<br />
              ✗ Nest dropdowns within other dropdowns
            </Text>
          </div>
        </div>
      </div>
    </div>
  ),
};