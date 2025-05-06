import React, { useState } from 'react';
import { 
  Heading, 
  Text, 
  TextInput, 
  Dropdown, 
  Toast, 
  Modal, 
  ModalBody, 
  ModalFooter, 
  ToastProvider, 
  useToast,
  Button
} from './components';
import { Mail, ChevronDown, AlertCircle, CheckCircle, Info, AlertTriangle } from 'lucide-react';

function App() {
  const [modalOpen, setModalOpen] = useState(false);
  const [toastOpen, setToastOpen] = useState(false);
  const [toastVariant, setToastVariant] = useState<'info' | 'success' | 'warning' | 'error'>('info');
  const { showToast } = useToast();

  const handleShowToast = (variant: 'info' | 'success' | 'warning' | 'error') => {
    setToastVariant(variant);
    setToastOpen(true);
    
    // Auto close after 3 seconds
    setTimeout(() => {
      setToastOpen(false);
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-neutral-50 p-8">
      <div className="max-w-4xl mx-auto space-y-10">
        {/* Header */}
        <div className="text-center mb-10">
          <Heading level="h1" className="mb-4">Design System Demo</Heading>
          <Text variant="body" className="text-lg max-w-2xl mx-auto">
            A comprehensive showcase of typography, data entry, and feedback components
            built with React, TypeScript, and TailwindCSS.
          </Text>
        </div>
        
        {/* Typography Section */}
        <section className="space-y-6 p-6 bg-white rounded-lg shadow-sm">
          <Heading level="h2" className="pb-2 border-b border-neutral-200">Typography</Heading>
          
          <div className="space-y-6">
            <div>
              <Heading level="h3" className="mb-4">Headings</Heading>
              <div className="space-y-3">
                <Heading level="h1">Heading 1</Heading>
                <Heading level="h2">Heading 2</Heading>
                <Heading level="h3">Heading 3</Heading>
                <Heading level="h4">Heading 4</Heading>
                <Heading level="h5">Heading 5</Heading>
                <Heading level="h6">Heading 6</Heading>
              </div>
            </div>
            
            <div>
              <Heading level="h3" className="mb-4">Text Variants</Heading>
              <div className="space-y-4">
                <div>
                  <Text variant="label">Body Text</Text>
                  <Text variant="body" className="mt-1">
                    The quick brown fox jumps over the lazy dog. Body text is used for the main content
                    of a page. It should be easy to read and have good contrast with the background.
                  </Text>
                </div>
                
                <div>
                  <Text variant="label">Label Text</Text>
                  <Text variant="label" className="mt-1 block">
                    Used for form labels and other short pieces of text that need to stand out.
                  </Text>
                </div>
                
                <div>
                  <Text variant="label">Caption Text</Text>
                  <Text variant="caption" className="mt-1">
                    Used for image captions, footnotes, and other supplementary information.
                  </Text>
                </div>
                
                <div>
                  <Text variant="label">Helper Text</Text>
                  <Text variant="helper" className="mt-1">
                    Used for form field hints, error messages, and other small pieces of text.
                  </Text>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Data Entry Components Section */}
        <section className="space-y-6 p-6 bg-white rounded-lg shadow-sm">
          <Heading level="h2" className="pb-2 border-b border-neutral-200">Data Entry Components</Heading>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* TextInput Examples */}
            <div className="space-y-4">
              <Heading level="h3">Text Input</Heading>
              
              <TextInput 
                label="Default Input"
                placeholder="Enter text here"
              />
              
              <TextInput 
                label="With Icon"
                placeholder="Enter your email"
                leftIcon={<Mail size={18} />}
              />
              
              <TextInput 
                label="With Helper Text"
                placeholder="Enter your name"
                helperText="We'll use this for your profile."
              />
              
              <TextInput 
                label="With Error"
                placeholder="Enter your email"
                value="invalid-email"
                variant="error"
                errorText="Please enter a valid email address."
              />
              
              <TextInput 
                label="Disabled Input"
                placeholder="You cannot edit this field"
                disabled
              />
            </div>
            
            {/* Dropdown Examples */}
            <div className="space-y-4">
              <Heading level="h3">Dropdown</Heading>
              
              <Dropdown 
                label="Basic Dropdown"
                options={[
                  { value: 'option1', label: 'Option 1' },
                  { value: 'option2', label: 'Option 2' },
                  { value: 'option3', label: 'Option 3' },
                ]}
                placeholder="Select an option"
              />
              
              <Dropdown 
                label="With Helper Text"
                options={[
                  { value: 'us', label: 'United States' },
                  { value: 'ca', label: 'Canada' },
                  { value: 'mx', label: 'Mexico' },
                ]}
                placeholder="Select a country"
                helperText="Select your country of residence."
              />
              
              <Dropdown 
                label="With Error"
                options={[
                  { value: 'option1', label: 'Option 1' },
                  { value: 'option2', label: 'Option 2' },
                ]}
                placeholder="Select an option"
                variant="error"
                errorText="This field is required."
                required
              />
              
              <Dropdown 
                label="With Disabled Options"
                options={[
                  { value: 'option1', label: 'Option 1' },
                  { value: 'option2', label: 'Option 2', disabled: true },
                  { value: 'option3', label: 'Option 3' },
                ]}
                placeholder="Select an option"
                helperText="Some options are unavailable."
              />
              
              <Dropdown 
                label="Disabled Dropdown"
                options={[
                  { value: 'option1', label: 'Option 1' },
                  { value: 'option2', label: 'Option 2' },
                ]}
                placeholder="Select an option"
                disabled
              />
            </div>
          </div>
        </section>
        
        {/* Feedback Components Section */}
        <section className="space-y-6 p-6 bg-white rounded-lg shadow-sm">
          <Heading level="h2" className="pb-2 border-b border-neutral-200">Feedback Components</Heading>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Toast Examples */}
            <div className="space-y-4">
              <Heading level="h3">Toast Notifications</Heading>
              <Text variant="body" className="mb-4">
                Click the buttons below to trigger different toast notifications.
              </Text>
              
              <div className="flex flex-wrap gap-2">
                <Button
                  onClick={() => showToast({
                    title: 'Information',
                    description: 'This is an informational message.',
                    variant: 'info',
                    position: 'bottom-right',
                  })}
                  className="bg-primary-500 hover:bg-primary-600"
                >
                  Info Toast
                </Button>
                
                <Button
                  onClick={() => showToast({
                    title: 'Success',
                    description: 'Your changes have been saved successfully!',
                    variant: 'success',
                    position: 'bottom-right',
                  })}
                  className="bg-success-500 hover:bg-success-600"
                >
                  Success Toast
                </Button>
                
                <Button
                  onClick={() => showToast({
                    title: 'Warning',
                    description: 'You are approaching your storage limit.',
                    variant: 'warning',
                    position: 'bottom-right',
                  })}
                  className="bg-warning-500 hover:bg-warning-600"
                >
                  Warning Toast
                </Button>
                
                <Button
                  onClick={() => showToast({
                    title: 'Error',
                    description: 'There was an error processing your request.',
                    variant: 'error',
                    position: 'bottom-right',
                  })}
                  className="bg-error-500 hover:bg-error-600"
                >
                  Error Toast
                </Button>
              </div>
              
              <div className="p-4 bg-neutral-100 rounded-md mt-4">
                <Text variant="label">Preview:</Text>
                <div className="mt-2">
                  <div className={`flex items-start gap-3 p-4 rounded-md border-l-4 ${
                    toastVariant === 'info' ? 'bg-primary-50 border-primary-500' :
                    toastVariant === 'success' ? 'bg-success-50 border-success-500' :
                    toastVariant === 'warning' ? 'bg-warning-50 border-warning-500' :
                    'bg-error-50 border-error-500'
                  }`}>
                    <div className="shrink-0">
                      {toastVariant === 'info' && <Info className="text-primary-500" size={20} />}
                      {toastVariant === 'success' && <CheckCircle className="text-success-500" size={20} />}
                      {toastVariant === 'warning' && <AlertTriangle className="text-warning-500" size={20} />}
                      {toastVariant === 'error' && <AlertCircle className="text-error-500" size={20} />}
                    </div>
                    <div>
                      <Text variant="body" className="font-medium">
                        {toastVariant.charAt(0).toUpperCase() + toastVariant.slice(1)} Message
                      </Text>
                      <Text variant="caption" className="mt-1">
                        This is a {toastVariant} toast notification example.
                      </Text>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Modal Examples */}
            <div className="space-y-4">
              <Heading level="h3">Modal Dialogs</Heading>
              <Text variant="body" className="mb-4">
                Click the buttons below to open different modal dialogs.
              </Text>
              
              <div className="flex flex-wrap gap-2">
                <Button onClick={() => setModalOpen(true)}>
                  Open Modal
                </Button>
              </div>
              
              <div className="p-4 bg-neutral-100 rounded-md mt-4">
                <Text variant="label">Preview:</Text>
                <div className="mt-2 border border-neutral-200 rounded-md overflow-hidden">
                  <div className="p-4 border-b border-neutral-200 bg-white">
                    <Heading level="h4">Modal Title</Heading>
                    <Text variant="body" className="mt-1 text-neutral-600">
                      This is a description of the modal's purpose.
                    </Text>
                  </div>
                  <div className="p-4 bg-white">
                    <Text variant="body">
                      Modal content goes here. This could include forms, information,
                      confirmations, or other interactive elements.
                    </Text>
                  </div>
                  <div className="p-4 border-t border-neutral-200 bg-white flex justify-end gap-2">
                    <Button variant="outline">Cancel</Button>
                    <Button>Confirm</Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      
      {/* Toast Example (visible state controlled by button) */}
      <Toast
        open={toastOpen}
        title={`${toastVariant.charAt(0).toUpperCase() + toastVariant.slice(1)} Message`}
        description={`This is a ${toastVariant} toast notification example.`}
        variant={toastVariant}
        onOpenChange={setToastOpen}
      />
      
      {/* Modal Example */}
      <Modal
        open={modalOpen}
        onOpenChange={setModalOpen}
        title="Sample Modal"
        description="This is a sample modal dialog that demonstrates the component's functionality."
      >
        <ModalBody>
          <Text variant="body">
            Modal dialogs are useful for:
          </Text>
          <ul className="list-disc pl-5 mt-2 space-y-1">
            <li><Text variant="body">Requesting user confirmation</Text></li>
            <li><Text variant="body">Displaying forms that require focused attention</Text></li>
            <li><Text variant="body">Showing detailed information without navigating away</Text></li>
            <li><Text variant="body">Creating multi-step flows</Text></li>
          </ul>
        </ModalBody>
        <ModalFooter>
          <Button variant="outline" onClick={() => setModalOpen(false)}>Cancel</Button>
          <Button onClick={() => setModalOpen(false)}>Confirm</Button>
        </ModalFooter>
      </Modal>
      
    </div>
  );
}

// Wrap the app with ToastProvider
function WrappedApp() {
  return (
    <ToastProvider>
      <App />
    </ToastProvider>
  );
}

export default WrappedApp;