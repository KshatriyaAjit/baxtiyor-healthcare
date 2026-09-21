import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'blue' | 'teal' | 'gray' | 'warning' | 'success';
  size?: 'sm' | 'md';
}

export function Badge({
  children,
  className,
  variant = 'blue',
  size = 'sm',
  ...props
}: BadgeProps) {
  const baseStyles = 'inline-flex items-center font-medium rounded-full';

  const sizeStyles = {
    sm: 'text-xs px-2.5 py-0.5',
    md: 'text-sm px-3 py-1',
  };

  const variantStyles = {
    blue: 'bg-brand-soft-blue text-brand-blue border border-brand-blue/20',
    teal: 'bg-brand-soft-teal text-brand-teal border border-brand-teal/20',
    gray: 'bg-gray-100 text-brand-text-secondary border border-brand-border',
    warning: 'bg-amber-50 text-amber-800 border border-amber-200',
    success: 'bg-emerald-50 text-emerald-800 border border-emerald-200',
  };

  return (
    <span
      className={twMerge(clsx(baseStyles, sizeStyles[size], variantStyles[variant], className))}
      {...props}
    >
      {children}
    </span>
  );
}

