'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface AnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  background?: string;
  id?: string;
}

export default function AnimatedSection({
  children,
  className = '',
  delay = 0,
  background,
  id,
}: AnimatedSectionProps) {
  return (
    <motion.section
      id={id}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.8, delay }}
      className={`py-16 md:py-24 lg:py-32 overflow-x-hidden ${background || ''} ${className}`}
    >
      {children}
    </motion.section>
  );
}
