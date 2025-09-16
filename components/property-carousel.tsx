'use client';

import React, { useRef, useState, useEffect } from 'react';
import { motion, PanInfo, useAnimation } from 'framer-motion';
import PropertyCard from './property-card';
import type { Property } from '@/data/properties';

interface PropertyCarouselProps {
  properties: Property[];
}

const PropertyCarousel: React.FC<PropertyCarouselProps> = ({ properties }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [width, setWidth] = useState(0);
  const carousel = useRef<HTMLDivElement>(null);
  const controls = useAnimation();

  // Update width on resize
  useEffect(() => {
    const updateWidth = () => {
      if (carousel.current) {
        setWidth(carousel.current.scrollWidth - carousel.current.offsetWidth);
      }
    };

    updateWidth();
    window.addEventListener('resize', updateWidth);
    return () => window.removeEventListener('resize', updateWidth);
  }, []);

  // Handle drag end to snap to nearest card
  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    if (!carousel.current) return;
    
    const threshold = 50;
    const newIndex = Math.round(
      (info.offset.x / (carousel.current.scrollWidth / properties.length)) * -1
    );
    
    const nextIndex = Math.min(
      Math.max(currentIndex + (info.offset.x > 0 ? -1 : 1), 0),
      properties.length - 1
    );
    
    if (Math.abs(info.offset.x) > threshold) {
      setCurrentIndex(nextIndex);
    }
  };

  // Update position when currentIndex changes
  useEffect(() => {
    if (!carousel.current) return;
    
    const itemWidth = carousel.current.scrollWidth / properties.length;
    const newX = -currentIndex * itemWidth;
    
    controls.start({
      x: newX,
      transition: { type: 'spring', stiffness: 300, damping: 30 }
    });
  }, [currentIndex, properties.length, controls]);

  return (
    <div className="relative w-full">
      <div className="overflow-hidden">
        <motion.div
          ref={carousel}
          className="flex"
          drag="x"
          dragConstraints={{ right: 0, left: -width }}
          onDragEnd={handleDragEnd}
          animate={controls}
        >
          {properties.map((property, index) => (
            <div 
              key={property.id} 
              className={`px-2 ${index === 0 ? 'pl-4' : ''} ${index === properties.length - 1 ? 'pr-4' : ''}`}
              style={{
                minWidth: '85%',
                maxWidth: '85%',
                flex: '0 0 85%',
              }}
            >
              <PropertyCard property={property} />
            </div>
          ))}
        </motion.div>
      </div>
      
      {/* Navigation Dots */}
      <div className="flex justify-center mt-6 space-x-2">
        {properties.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2 h-2 rounded-full transition-colors ${
              index === currentIndex ? 'bg-gray-900' : 'bg-gray-300'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default PropertyCarousel;
