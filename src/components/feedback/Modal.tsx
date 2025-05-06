import React, { forwardRef, useEffect, useState,useCallback } from "react";
import { createPortal } from "react-dom";
import { cn } from "../../lib/utils";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Heading, Text } from "../typography";

export interface ModalProps extends React.HTMLAttributes<HTMLDivElement> {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title?: string;
  description?: string;
  children?: React.ReactNode;
  size?: "sm" | "md" | "lg" | "xl" | "full";
  closeOnOutsideClick?: boolean;
  className?: string;
  contentClassName?: string;
}

export const Modal = forwardRef<HTMLDivElement, ModalProps>(
  (
    {
      open,
      onOpenChange,
      title,
      description,
      children,
      size = "md",
      closeOnOutsideClick = true,
      className,
      contentClassName,
      ...props
    },
    ref
  ) => {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
      setMounted(true);

      // Lock body scroll when modal is open
      if (open) {
        document.body.style.overflow = "hidden";
      }

      return () => {
        document.body.style.overflow = "";
        setMounted(false);
      };
    }, [open]);

    const handleClose = useCallback(() => {
      onOpenChange(false);
    }, [onOpenChange]);

    const handleOutsideClick = (e: React.MouseEvent<HTMLDivElement>) => {
      if (closeOnOutsideClick && e.target === e.currentTarget) {
        handleClose();
      }
    };

    // Handle escape key press
    useEffect(() => {
      const handleEsc = (e: KeyboardEvent) => {
        if (e.key === "Escape" && open) {
          handleClose();
        }
      };

      window.addEventListener("keydown", handleEsc);
      return () => window.removeEventListener("keydown", handleEsc);
    }, [open, handleClose]);

    // Size classes
    const sizeClasses = {
      sm: "max-w-sm",
      md: "max-w-md",
      lg: "max-w-lg",
      xl: "max-w-xl",
      full: "max-w-full m-4",
    };

    if (!mounted) return null;

    return createPortal(
      <AnimatePresence>
        {open && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center"
            aria-modal="true"
            role="dialog"
            aria-labelledby={title ? "modal-title" : undefined}
            aria-describedby={description ? "modal-description" : undefined}
          >
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 bg-black/50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleOutsideClick}
            />

            {/* Modal Content */}
            <motion.div
              ref={ref}
              className={cn(
                "relative w-full p-4",
                sizeClasses[size],
                className
              )}
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.2 }}
              {...props}
            >
              <div
                className={cn(
                  "relative bg-white dark:bg-neutral-900 rounded-lg shadow-lg overflow-hidden",
                  contentClassName
                )}
              >
                {/* Header */}
                {(title || description) && (
                  <div className="p-4 border-b border-neutral-200 dark:border-neutral-800">
                    {title && (
                      <Heading
                        level="h3"
                        id="modal-title"
                        className="text-xl font-semibold mb-1"
                      >
                        {title}
                      </Heading>
                    )}
                    {description && (
                      <Text
                        variant="body"
                        id="modal-description"
                        className="text-neutral-600 dark:text-neutral-400"
                      >
                        {description}
                      </Text>
                    )}
                  </div>
                )}

                {/* Close Button */}
                <button
                  type="button"
                  className="absolute top-4 right-4 p-1 rounded-md text-neutral-500 hover:text-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-200 focus:outline-none focus:ring-2 focus:ring-primary-500"
                  onClick={handleClose}
                  aria-label="Close modal"
                >
                  <X size={18} />
                </button>

                {/* Content */}
                <div className="p-4">{children}</div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>,
      document.body
    );
  }
);

Modal.displayName = "Modal";

export const ModalFooter = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "flex items-center justify-end gap-2 p-4 border-t border-neutral-200 dark:border-neutral-800",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
});

ModalFooter.displayName = "ModalFooter";

export const ModalBody = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => {
  return (
    <div ref={ref} className={cn("p-4", className)} {...props}>
      {children}
    </div>
  );
});

ModalBody.displayName = "ModalBody";

export const ModalHeader = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    closeButton?: boolean;
    onClose?: () => void;
  }
>(({ className, children, closeButton = true, onClose, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "flex items-center justify-between p-4 border-b border-neutral-200 dark:border-neutral-800",
        className
      )}
      {...props}
    >
      <div>{children}</div>
      {closeButton && (
        <button
          type="button"
          className="p-1 rounded-md text-neutral-500 hover:text-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-200 focus:outline-none focus:ring-2 focus:ring-primary-500"
          onClick={onClose}
          aria-label="Close modal"
        >
          <X size={18} />
        </button>
      )}
    </div>
  );
});

ModalHeader.displayName = "ModalHeader";
