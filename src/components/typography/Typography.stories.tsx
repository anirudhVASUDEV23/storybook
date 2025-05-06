import type { Meta, StoryObj } from '@storybook/react';
import { Heading, Text } from './Typography';

const meta = {
  title: 'Design System/Typography',
  component: Heading,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Heading>;

export default meta;

// Heading Stories
export const Headings: StoryObj = {
  render: () => (
    <div className="space-y-4">
      <Heading level="h1">Heading 1 (48px)</Heading>
      <Heading level="h2">Heading 2 (36px)</Heading>
      <Heading level="h3">Heading 3 (30px)</Heading>
      <Heading level="h4">Heading 4 (24px)</Heading>
      <Heading level="h5">Heading 5 (20px)</Heading>
      <Heading level="h6">Heading 6 (18px)</Heading>
    </div>
  ),
};

// Text Stories
export const TextElements: StoryObj = {
  render: () => (
    <div className="space-y-4">
      <Text variant="body">
        Body Text - The quick brown fox jumps over the lazy dog. Body text is used for the main content of a page. 
        It should be easy to read and have good contrast with the background.
      </Text>
      <Text variant="label">
        Label Text - Used for form labels and other short pieces of text that need to stand out.
      </Text>
      <Text variant="caption">
        Caption Text - Used for image captions, footnotes, and other supplementary information.
      </Text>
      <Text variant="helper">
        Helper Text - Used for form field hints, error messages, and other small pieces of text.
      </Text>
    </div>
  ),
};

// Typography System Overview
export const TypographySystem: StoryObj = {
  render: () => (
    <div className="space-y-8 max-w-3xl">
      <div>
        <Heading level="h1">Typography System</Heading>
        <Text variant="body" className="mt-2">
          A comprehensive typography system with headings, body text, and utilities.
        </Text>
      </div>
      
      <div>
        <Heading level="h2">Font Weights</Heading>
        <div className="mt-2 space-y-2">
          <Text className="font-normal">Normal (400) - Primary body text weight</Text>
          <Text className="font-medium">Medium (500) - Emphasis and smaller headings</Text>
          <Text className="font-bold">Bold (700) - Used for headings and strong emphasis</Text>
        </div>
      </div>
      
      <div>
        <Heading level="h2">Line Heights</Heading>
        <div className="mt-2 space-y-4">
          <div>
            <Text variant="label">Headings - 120% (tight)</Text>
            <Heading level="h3" className="mt-1">This is a sample heading with tight line height</Heading>
          </div>
          <div>
            <Text variant="label">Body - 150% (relaxed)</Text>
            <Text variant="body" className="mt-1">
              This is a sample paragraph with relaxed line height. The quick brown fox jumps over the lazy dog.
              Multiple lines of text demonstrate the line height properly. Proper line height improves readability
              and makes content more accessible.
            </Text>
          </div>
        </div>
      </div>
      
      <div>
        <Heading level="h2">Accessibility Notes</Heading>
        <ul className="mt-2 space-y-2 list-disc pl-5">
          <li>
            <Text variant="body">
              All text has appropriate contrast ratios (4.5:1 for normal text, 3:1 for large text)
            </Text>
          </li>
          <li>
            <Text variant="body">
              Text can be resized up to 200% without loss of content or functionality
            </Text>
          </li>
          <li>
            <Text variant="body">
              Headings use proper semantic HTML elements (h1-h6)
            </Text>
          </li>
          <li>
            <Text variant="body">
              Font sizes use relative units (rem) to respect user preferences
            </Text>
          </li>
        </ul>
      </div>
      
      <div>
        <Heading level="h2">Best Practices</Heading>
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 border border-success-300 bg-success-50 rounded-md">
            <Text variant="label" className="text-success-700">Do</Text>
            <ul className="mt-2 space-y-2 list-disc pl-5">
              <li><Text variant="body">Use H1 only once per page</Text></li>
              <li><Text variant="body">Maintain proper heading hierarchy (H1 → H2 → H3)</Text></li>
              <li><Text variant="body">Limit body text width to 60-80 characters</Text></li>
            </ul>
          </div>
          <div className="p-4 border border-error-300 bg-error-50 rounded-md">
            <Text variant="label" className="text-error-700">Don't</Text>
            <ul className="mt-2 space-y-2 list-disc pl-5">
              <li><Text variant="body">Skip heading levels (H1 → H3)</Text></li>
              <li><Text variant="body">Use headings just for styling</Text></li>
              <li><Text variant="body">Center large blocks of text</Text></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  ),
};