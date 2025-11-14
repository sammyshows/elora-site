import React from 'react';

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  align?: 'left' | 'center' | 'right';
  className?: string;
}

export default function SectionHeading({
  title,
  subtitle,
  align = 'center',
  className = '',
}: SectionHeadingProps) {
  const alignmentClasses = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
  };

  return (
    <div className={`mb-12 md:mb-16 ${alignmentClasses[align]} ${className}`}>
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-text mb-4">
        {title}
      </h2>
      {subtitle && (
        <p className="text-lg md:text-xl text-secondary-text max-w-3xl mx-auto">
          {subtitle}
        </p>
      )}
    </div>
  );
}
