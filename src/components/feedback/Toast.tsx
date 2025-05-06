import React, { useState, useEffect, forwardRef } from 'react';
import { createPortal } from 'react-dom';
import { cn } from '../../lib/utils';
import { cva, type VariantProps } from 'class-variance-authority';
import { motion, AnimatePresence } from 'framer-motion';
import { X, AlertCircle, CheckCircle, Info, AlertTriangle } from 'lucide-react';

const toastVariants = cva(
  "relative flex items-center w-full max-w-sm shadow-lg rounded-lg overflow-hidden p-4 pointer-events-auto",
  {
    variants: {
      variant: {
        info: "bg-primary-50 border-l-4 border-primary-500 text-primary-900",
        success: "bg-success-50 border-l-4 border-success-500 text-success-900",
        warning: "bg-warning-50 border-l-4 border-warning-500 text-warning-900",
        error: "bg-error-50 border-l-4 border-error-500 text-error-900",
      },
    },
    defaultVariants: {
      variant: "info",
    },
  }
);

// Icons for each variant
const icons = {
  info: <Info className="text-primary-500" size={20} />,
  success: <CheckCircle className="text-success-500" size={20} />,
  warning: <AlertTriangle className="text-warning-500" size={20} />,
  error: <AlertCircle className="text-error-500" size={20} />,
};

export interface ToastProps extends VariantProps<typeof toastVariants> {
  open?: boolean;
  title?: string;
  description?: string;
  duration?: number;
  onOpenChange?: (open: boolean) => void;
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'top-center' | 'bottom-center';
  className?: string;
}

export const Toast = forwardRef<HTMLDivElement, ToastProps>(
  ({ 
    open = false, 
    title, 
    description, 
    variant = "info", 
    duration = 5000, 
    onOpenChange,
    position = 'bottom-right',
    className,
    ...props 
  }, ref) => {
    const [mounted, setMounted] = useState(false);
    const [visible, setVisible] = useState(open);
    
    useEffect(() => {
      setMounted(true);
      return () => setMounted(false);
    }, []);
    
    useEffect(() => {
      setVisible(open);
      
      if (open && duration !== Infinity) {
        const timer = setTimeout(() => {
          setVisible(false);
          onOpenChange?.(false);
        }, duration);
        
        return () => clearTimeout(timer);
      }
    }, [open, duration, onOpenChange]);
    
    const handleClose = () => {
      setVisible(false);
      onOpenChange?.(false);
    };
    
    // Position classes based on position prop
    const positionClasses = {
      'top-right': 'top-0 right-0',
      'top-left': 'top-0 left-0',
      'bottom-right': 'bottom-0 right-0',
      'bottom-left': 'bottom-0 left-0',
      'top-center': 'top-0 left-1/2 -translate-x-1/2',
      'bottom-center': 'bottom-0 left-1/2 -translate-x-1/2',
    };
    
    // Animation variants based on position
    const getAnimationVariants = () => {
      if (position.includes('top')) {
        return {
          initial: { opacity: 0, y: -20 },
          animate: { opacity: 1, y: 0 },
          exit: { opacity: 0, y: -20 },
        };
      } else {
        return {
          initial: { opacity: 0, y: 20 },
          animate: { opacity: 1, y: 0 },
          exit: { opacity: 0, y: 20 },
        };
      }
    };
    
    if (!mounted) return null;
    
    return createPortal(
      <div
        aria-live="polite"
        className={cn(
          "fixed z-50 flex flex-col gap-2 m-4 w-full max-w-sm",
          positionClasses[position]
        )}
      >
        <AnimatePresence>
          {visible && (
            <motion.div
              ref={ref}
              role="alert"
              className={cn(toastVariants({ variant }), className)}
              initial={getAnimationVariants().initial}
              animate={getAnimationVariants().animate}
              exit={getAnimationVariants().exit}
              transition={{ duration: 0.2 }}
              {...props}
            >
              <div className="flex items-start gap-3 w-full">
                <div className="shrink-0">
                  {icons[variant || 'info']}
                </div>
                <div className="flex-grow">
                  {title && <p className="font-medium text-sm">{title}</p>}
                  {description && <p className="text-sm opacity-90 mt-1">{description}</p>}
                </div>
                <button
                  type="button"
                  className="shrink-0 rounded-md p-1 opacity-70 hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-neutral-500"
                  onClick={handleClose}
                  aria-label="Close toast"
                >
                  <X size={16} />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>,
      document.body
    );
  }
);

Toast.displayName = "Toast";

// Create a toast manager context
interface ToastContextProps {
  showToast: (props: Omit<ToastProps, 'open' | 'onOpenChange'>) => void;
}

const ToastContext = React.createContext<ToastContextProps | undefined>(undefined);

export const useToast = () => {
  const context = React.useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
};

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<(ToastProps & { id: string })[]>([]);
  
  const showToast = (props: Omit<ToastProps, 'open' | 'onOpenChange'>) => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { ...props, id, open: true }]);
  };
  
  const handleOpenChange = (id: string, open: boolean) => {
    if (!open) {
      setToasts((prev) => prev.filter((toast) => toast.id !== id));
    }
  };
  
  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          {...toast}
          onOpenChange={(open) => handleOpenChange(toast.id, open)}
        />
      ))}
    </ToastContext.Provider>
  );
};