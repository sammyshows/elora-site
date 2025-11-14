import React from 'react';
import Link from 'next/link';

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  href?: string;
  onClick?: () => void;
  className?: string;
  external?: boolean;
}

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  href,
  onClick,
  className = '',
  external = false,
}: ButtonProps) {
  const baseStyles = 'inline-flex items-center justify-center font-medium rounded-full transition-all duration-300 hover:scale-105 active:scale-95';

  const variants = {
    primary: 'bg-primary text-white hover:bg-opacity-90 shadow-lg hover:shadow-xl',
    secondary: 'bg-secondary text-text hover:bg-opacity-90 shadow-md hover:shadow-lg',
    outline: 'border-2 border-primary text-primary hover:bg-primary hover:text-white',
  };

  const sizes = {
    sm: 'px-6 py-2 text-sm',
    md: 'px-8 py-3 text-base',
    lg: 'px-10 py-4 text-lg font-semibold',
  };

  const combinedClassName = `${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`;

  if (href) {
    // Use regular anchor tag for external links or anchor links (#)
    if (external || href.startsWith('#')) {
      return (
        <a
          href={href}
          target={external ? "_blank" : undefined}
          rel={external ? "noopener noreferrer" : undefined}
          className={combinedClassName}
        >
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={combinedClassName}>
        {children}
      </Link>
    );
  }

  return (
    <button onClick={onClick} className={combinedClassName}>
      {children}
    </button>
  );
}
