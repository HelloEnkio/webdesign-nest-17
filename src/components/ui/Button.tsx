
import React from 'react';
import { cn } from '@/lib/utils';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  fullWidth?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', children, fullWidth = false, ...props }, ref) => {
    return (
      <button
        className={cn(
          'rounded-lg font-medium transition-all duration-200 inline-flex items-center justify-center',
          'focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black/10',
          {
            'bg-black text-white hover:bg-black/90': variant === 'primary',
            'bg-neutral-100 text-neutral-900 hover:bg-neutral-200': variant === 'secondary',
            'bg-transparent text-neutral-900 hover:bg-neutral-100': variant === 'ghost',
            'bg-transparent text-neutral-900 border border-neutral-300 hover:bg-neutral-100': variant === 'outline',
            'text-xs px-3 py-1.5': size === 'sm',
            'text-sm px-4 py-2': size === 'md',
            'text-base px-6 py-3': size === 'lg',
            'w-full': fullWidth,
          },
          className
        )}
        ref={ref}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';

export default Button;
