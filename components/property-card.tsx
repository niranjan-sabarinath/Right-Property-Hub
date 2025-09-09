'use client';

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useAnimation, useInView } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MapPin, Bed, Bath, Square, Heart, Share2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PropertyCardProps {
  property: {
    id: string;
    title: string;
    price: number;
    location: string;
    bedrooms: number;
    bathrooms: number;
    area: number;
    image: string;
    type: string;
    status: 'For Sale' | 'For Rent' | 'Sold';
    featured?: boolean;
  };
  onCompare?: (property: any) => void;
  isSelected?: boolean;
  showCompareButton?: boolean;
}

const PropertyCard: React.FC<PropertyCardProps> = ({ 
  property, 
  onCompare, 
  isSelected = false, 
  showCompareButton = false 
}) => {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      // Start the shine animation after a delay
      const timer = setTimeout(() => {
        controls.start({
          x: ['-100%', '100%'],
          transition: {
            x: {
              repeat: Infinity,
              repeatType: 'loop',
              duration: 3,
              ease: 'easeInOut',
              repeatDelay: 5, // Wait 5 seconds between animations
            },
          },
        });
      }, 1000);
      
      return () => clearTimeout(timer);
    }
  }, [isInView, controls]);

  return (
    <div 
      ref={ref}
      className={cn(
        "group cursor-pointer relative overflow-hidden",
        isSelected && "ring-2 ring-primary rounded-lg"
      )}
    >
      {/* Shine overlay */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent z-10 pointer-events-none"
        initial={{ x: '-100%' }}
        animate={controls}
        style={{
          transform: 'skewX(-20deg)',
        }}
      />
      
      <div className="relative">
        <Link href={`/properties/${property.id}`}>
          <div className="aspect-square overflow-hidden rounded-lg">
            <Image
              src={property.image}
              alt={property.title}
              width={400}
              height={400}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>
        </Link>
        
        {/* Status Badge */}
        <div className="absolute top-3 left-3">
          <Badge 
            className={cn(
              "text-xs font-medium px-2 py-1 rounded-md",
              property.status === 'For Sale' && "bg-green-100 text-green-800 hover:bg-green-100",
              property.status === 'For Rent' && "bg-blue-100 text-blue-800 hover:bg-blue-100",
              property.status === 'Sold' && "bg-gray-100 text-gray-800 hover:bg-gray-100"
            )}
          >
            {property.status}
          </Badge>
        </div>
      </div>

      <div className="mt-3 relative z-20">
        <Link href={`/properties/${property.id}`}>
          <h3 className="font-medium font-coco-regular text-gray-900 group-hover:text-primary transition-colors line-clamp-1">
            {property.title}
          </h3>
        </Link>
        <div className="flex items-center text-sm text-gray-500 mt-0.5">
          <MapPin className="w-3.5 h-3.5 mr-1 relative -top-[2px]" />
          <span className="line-clamp-1 font-coco-light   ">{property.location}</span>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;