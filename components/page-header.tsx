'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import Image from 'next/image';

type PageHeaderProps = {
  title: string;
  subtitle?: string;
  className?: string;
  children?: React.ReactNode;
};

const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  subtitle,
  className = '',
  children
}) => {
  return (
    <header className={cn('relative overflow-hidden bg-[#eef2f3]', className)}>
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20 md:pt-40 md:pb-28">
        {/* Left Side Vector */}
        <motion.div 
          className="absolute -left-72 top-16 -translate-y-1/2 w-1/2 h-[120%] -z-10 opacity-40 hidden md:block"
          initial={{ x: -200, opacity: 0, scale: 0.9 }}
          animate={{ x: 0, opacity: 0.3, scale: 1 }}
          transition={{ duration: 1, ease: 'easeOut', delay: 0.2 }}
          whileHover={{ opacity: 0.4, scale: 1.02 }}
        >
          <Image
            src="/images/vector-1.png"
            alt=""
            fill
            className="object-contain object-left scale-x-[-1]"
            priority
          />
        </motion.div>
        
        {/* Right Side Vector */}
        <motion.div 
          className="absolute -right-20 top-16 -translate-y-1/2 w-1/2 h-[120%] -z-10 opacity-40 hidden md:block"
          initial={{ x: 200, opacity: 0, scale: 0.9 }}
          animate={{ x: 0, opacity: 0.4, scale: 1 }}
          transition={{ duration: 1, ease: 'easeOut' }}
          whileHover={{ opacity: 0.5, scale: 1.02 }}
        >
          <Image
            src="/images/vector-1.png"
            alt=""
            fill
            className="object-contain object-right"
            priority
          />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="max-w-3xl mx-auto text-center"
        >
          <motion.h1 
            className="text-4xl md:text-5xl lg:text-6xl font-coco-regular text-gray-900 leading-tight"
          >
            {title}
          </motion.h1>
          
          {subtitle && (
            <motion.p 
              className="mt-6 text-lg md:text-xl text-gray-600 max-w-2xl mx-auto font-coco-light leading-relaxed"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: 'easeOut', delay: 0.1 }}
            >
              {subtitle}
            </motion.p>
          )}
          
          {children && (
            <motion.div
              className="mt-8"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: 'easeOut', delay: 0.2 }}
            >
              {children}
            </motion.div>
          )}
        </motion.div>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-white to-gray-50/50" />
        <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]" />
      </div>
    </header>
  );
};

export default PageHeader;
