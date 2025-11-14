'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface AnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  background?: string;
}

export default function AnimatedSection({
  children,
  className = '',
  delay = 0,
  background,
}: AnimatedSectionProps) {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.8, delay }}
      className={`py-16 md:py-24 lg:py-32 ${background || ''} ${className}`}
    >
      {children}
    </motion.section>
  );
}
