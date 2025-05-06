import React from 'react';
import { cn } from '../../lib/utils';

export type HeadingLevel = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
export type TextVariant = 'body' | 'label' | 'caption' | 'helper';

export interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  level: HeadingLevel;
  children: React.ReactNode;
  className?: string;
}

export interface TextProps extends React.HTMLAttributes<HTMLParagraphElement> {
  variant?: TextVariant;
  children: React.ReactNode;
  className?: string;
}

const headingVariants: Record<HeadingLevel, string> = {
  h1: 'text-5xl font-bold text-neutral-900 dark:text-neutral-50 leading-tight',
  h2: 'text-4xl font-bold text-neutral-900 dark:text-neutral-50 leading-tight',
  h3: 'text-3xl font-bold text-neutral-900 dark:text-neutral-50 leading-tight',
  h4: 'text-2xl font-medium text-neutral-900 dark:text-neutral-50 leading-tight',
  h5: 'text-xl font-medium text-neutral-900 dark:text-neutral-50 leading-tight',
  h6: 'text-lg font-medium text-neutral-900 dark:text-neutral-50 leading-tight',
};

const textVariants: Record<TextVariant, string> = {
  body: 'text-base text-neutral-800 dark:text-neutral-200 leading-relaxed',
  label: 'text-sm font-medium text-neutral-700 dark:text-neutral-300',
  caption: 'text-sm text-neutral-600 dark:text-neutral-400',
  helper: 'text-xs text-neutral-500 dark:text-neutral-500',
};

export const Heading = ({ level, className, children, ...props }: HeadingProps) => {
  const Component = level;
  
  return (
    <Component 
      className={cn(headingVariants[level], className)} 
      {...props}
    >
      {children}
    </Component>
  );
};

export const Text = ({ variant = 'body', className, children, ...props }: TextProps) => {
  return (
    <p 
      className={cn(textVariants[variant], className)} 
      {...props}
    >
      {children}
    </p>
  );
};