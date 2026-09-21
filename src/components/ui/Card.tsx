import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  hoverEffect?: boolean;
}

export function Card({
  children,
  className,
  hoverEffect = false,
  ...props
}: CardProps) {
  return (
    <div
      className={twMerge(
        clsx(
          'bg-white rounded-xl border border-brand-border p-6 shadow-sm',
          hoverEffect &&
            'transition-all duration-200 hover:shadow-md hover:border-brand-blue/30',
          className
        )
      )}
      {...props}
    >
      {children}
    </div>
  );
}

