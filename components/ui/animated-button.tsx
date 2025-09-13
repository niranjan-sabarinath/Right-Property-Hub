'use client';

import * as React from 'react';
import { motion, MotionProps } from 'framer-motion';
import { Button, ButtonProps } from './button';
import { cn } from '@/lib/utils';

type AnimatedButtonProps = ButtonProps & {
  whileHover?: MotionProps['whileHover'];
  whileTap?: MotionProps['whileTap'];
  initial?: MotionProps['initial'];
  animate?: MotionProps['animate'];
  transition?: MotionProps['transition'];
  layout?: MotionProps['layout'];
  layoutId?: MotionProps['layoutId'];
};

export const AnimatedButton = React.forwardRef<HTMLButtonElement, AnimatedButtonProps>(
  ({ 
    whileHover, 
    whileTap, 
    initial, 
    animate, 
    transition, 
    layout,
    layoutId,
    className,
    ...buttonProps 
  }, ref) => {
    return (
      <motion.span
        initial={initial}
        animate={animate}
        whileHover={whileHover}
        whileTap={whileTap}
        transition={transition}
        layout={layout}
        layoutId={layoutId}
        className={cn('inline-block', className)}
      >
        <Button 
          ref={ref} 
          {...buttonProps} 
        />
      </motion.span>
    );
  }
);

AnimatedButton.displayName = 'AnimatedButton';

export default AnimatedButton;
