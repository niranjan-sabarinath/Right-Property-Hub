"use client"

import type React from "react"
import Image from "next/image"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { MapPin, Bed, Square, GitCompare, Info } from "lucide-react"
import { cn } from "@/lib/utils"
import type { Property } from "@/data/properties"

export interface PropertyCardProps {
  property: Property
  onCompare?: (property: Property) => void
  isSelected?: boolean
  showCompareButton?: boolean
  isLoading?: boolean
  view?: 'grid' | 'list'
  compareMode?: boolean
  onCompareToggle?: (id: string) => void
}

const formatPrice = (price: string) => {
  // If price is already formatted (contains letters), return as is
  if (typeof price === 'string' && /[a-zA-Z]/.test(price)) {
    return price;
  }
  
  // Convert string to number if needed
  const priceNum = typeof price === 'string' ? parseFloat(price.replace(/[^0-9.]/g, '')) : price;
  
  // Format as currency
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(priceNum);
}

const PropertyCard: React.FC<PropertyCardProps> = ({
  property,
  onCompare,
  isSelected,
  showCompareButton = false,
  isLoading = false,
  view = 'grid',
  compareMode = false,
  onCompareToggle,
}) => {
  if (isLoading) {
    return <PropertyCardSkeleton view={view} />
  }

  const handleCompareClick = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    onCompare?.(property)
  }

  const handleCardClick = (e: React.MouseEvent) => {
    // Only navigate if the click was not on a button or link
    const target = e.target as HTMLElement;
    if (target.closest('button, a, [role="button"]')) {
      return;
    }
    window.location.href = `/properties/${property.type}/${property.id}`;
  };

  return (
    <div 
      className="group w-full bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200 cursor-pointer"
      onClick={handleCardClick}
    >
      {/* Image with status badge */}
      <div className="relative h-64 w-full overflow-hidden">
        <Image
          src={property.image}
          alt={property.title}
          fill
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute right-2 top-2 z-10">
          <Badge 
            variant="secondary" 
            className={cn(
              'bg-white/90 text-foreground backdrop-blur-sm',
              property.status === 'For Sale' && 'bg-green-100 text-green-800',
              property.status === 'For Rent' && 'bg-blue-100 text-blue-800',
              property.status === 'Sold' && 'bg-red-100 text-red-800',
              property.status === 'Rented' && 'bg-purple-100 text-purple-800'
            )}
          >
            {property.status}
          </Badge>
        </div>
      </div>

      {/* Property details */}
      <div className="space-y-1 p-4">
        {/* Bedrooms and Area */}
        <div className="flex items-center space-x-4 text-sm text-gray-600">
          <div className="flex items-center">
            <Bed className="mr-1.5 h-4 w-4 text-gray-500" />
            <span className="text-sm font-medium text-gray-700">{property.bedrooms}</span>
          </div>
          <div className="h-4 w-px bg-gray-200" />
          <div className="flex items-center">
            <Square className="mr-1.5 h-3.5 w-3.5 text-gray-500" />
            <span className="text-sm font-medium text-gray-700">{property.area}</span>
          </div>
        </div>

        {/* Title */}
        <h3 className="text-lg font-semibold text-gray-900 line-clamp-1">
          {property.title}
        </h3>

        {/* Location */}
        <div className="flex items-center text-sm text-gray-500">
          <MapPin className="mr-1 h-4 w-4 flex-shrink-0" />
          <span className="line-clamp-1">{property.location}</span>
        </div>

        {/* Price and Action Buttons */}
        <div className="flex items-center justify-between pt-2">
          <span className="font-bold text-gray-900">
            {property.price}
            {property.status === 'For Rent' || property.status === 'Rented' ? (
              <span className="text-sm font-normal text-gray-500">/month</span>
            ) : null}
          </span>
          <div className="flex items-center space-x-2">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <a 
                    href={`/properties/${property.type}/${property.id}`}
                    className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-gray-600 transition-colors hover:bg-gray-200 hover:text-primary"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Info className="h-4 w-4" />
                    <span className="sr-only">View property details</span>
                  </a>
                </TooltipTrigger>
                <TooltipContent>
                  <p>View Details</p>
                </TooltipContent>
              </Tooltip>
              
              <Tooltip>
                <TooltipTrigger asChild>
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      handleCompareClick(e);
                    }}
                    className={cn(
                      'flex h-8 w-8 items-center justify-center rounded-full transition-colors',
                      isSelected 
                        ? 'text-primary bg-primary/10 hover:bg-primary/20' 
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-primary'
                    )}
                    aria-label={isSelected ? 'Remove from compare' : 'Add to compare'}
                  >
                    <GitCompare className="h-4 w-4" />
                  </button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{isSelected ? 'Remove from compare' : 'Add to compare'}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>
      </div>
    </div>
  )
}

// Skeleton component for loading state
export const PropertyCardSkeleton: React.FC<{ view?: 'grid' | 'list' }> = ({ view = 'grid' }) => {
  return (
    <div className="w-full">
      <Skeleton className="h-64 w-full rounded-lg" />
      <div className="mt-3 space-y-2">
        <div className="flex space-x-4">
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-4 w-20" />
        </div>
        <Skeleton className="h-5 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
        <div className="flex justify-between pt-1">
          <Skeleton className="h-6 w-24" />
          <Skeleton className="h-5 w-16" />
        </div>
      </div>
    </div>
  )
};

export default PropertyCard;
