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

const formatPrice = (price: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(price)
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

  const cardContent = (
    <div className="group w-full bg-white rounded-t-lg">
      {/* Image with status badge */}
      <div className="relative mb-3 h-64 w-full overflow-hidden rounded-t-lg">
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
      <div className="space-y-1 p-3">
        {/* Bedrooms and Area */}
        <div className="flex items-center space-x-4 text-sm text-gray-600">
          <div className="flex items-center">
            <Bed className="mr-1.5 h-4 w-4 text-gray-500" />
            <span className="text-sm font-medium text-gray-700">{property.bedrooms}</span>
          </div>
          <div className="h-4 w-px bg-gray-200" />
          <div className="flex items-center">
            <Square className="mr-1.5 h-3.5 w-3.5 text-gray-500" />
            <span className="text-sm font-medium text-gray-700">{property.area} sq ft</span>
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

        {/* Price and Compare Button */}
        <div className="flex items-center justify-between pt-1">
          <span className="text-lg font-bold text-gray-900">
            ${property.price.toLocaleString()}
            {property.status === 'For Rent' || property.status === 'Rented' ? (
              <span className="text-sm font-normal text-gray-500">/month</span>
            ) : null}
          </span>
          <div className="flex items-center space-x-2">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link 
                    href={`/properties/${property.id}`}
                    className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-gray-600 transition-colors hover:bg-gray-200 hover:text-primary"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Info className="h-4 w-4" />
                    <span className="sr-only">View property details</span>
                  </Link>
                </TooltipTrigger>
                <TooltipContent>
                  <p>View Details</p>
                </TooltipContent>
              </Tooltip>
              
              <Tooltip>
                <TooltipTrigger asChild>
                  <button 
                    onClick={handleCompareClick}
                    className={cn(
                      'flex h-8 w-8 items-center justify-center rounded-full transition-colors bg-gray-100 text-gray-600 hover:text-primary',
                      isSelected && 'text-primary hover:bg-primary/10'
                    )}
                  >
                    <GitCompare className="h-4 w-4" />
                    <span className="sr-only">
                      {isSelected ? 'Remove from compare' : 'Add to compare'}
                    </span>
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

  if (compareMode) {
    return cardContent
  }

  return (
    <Link href={`/properties/${property.id}`} className="block">
      {cardContent}
    </Link>
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
