'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface InsightCardProps {
  title: string;
  insight: string;
  date: string;
  category?: string;
  index?: number;
  className?: string;
}

export default function InsightCard({
  title,
  insight,
  date,
  category,
  index = 0,
  className = '',
}: InsightCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.15 }}
      whileHover={{ scale: 1.03 }}
      className={`relative bg-gradient-to-br from-primary/10 via-secondary/10 to-background p-6 md:p-8 rounded-3xl border border-primary/20 hover:border-primary/40 transition-all duration-300 hover:shadow-2xl ${className}`}
    >
      <div className="absolute top-4 right-4 text-xs text-muted bg-surface px-3 py-1 rounded-full">
        {date}
      </div>

      {category && (
        <div className="inline-block mb-3 px-3 py-1 bg-primary/20 text-primary text-sm font-medium rounded-full">
          {category}
        </div>
      )}

      <h4 className="text-lg md:text-xl font-bold text-text mb-3">
        {title}
      </h4>

      <p className="text-secondary-text leading-relaxed italic border-l-4 border-primary pl-4">
        "{insight}"
      </p>

      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-secondary to-primary rounded-full"></div>
    </motion.div>
  );
}
