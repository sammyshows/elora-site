'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface FeatureCardProps {
  icon?: string;
  title: string;
  description: string;
  index?: number;
  className?: string;
}

export default function FeatureCard({
  icon,
  title,
  description,
  index = 0,
  className = '',
}: FeatureCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ scale: 1.05 }}
      className={`bg-surface p-6 md:p-8 rounded-3xl border border-border hover:shadow-xl transition-shadow duration-300 ${className}`}
    >
      {icon && (
        <div className="text-4xl md:text-5xl mb-4">{icon}</div>
      )}
      <h3 className="text-xl md:text-2xl font-bold text-text mb-3">
        {title}
      </h3>
      <p className="text-secondary-text leading-relaxed">
        {description}
      </p>
    </motion.div>
  );
}
