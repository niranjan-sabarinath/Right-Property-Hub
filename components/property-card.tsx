"use client"

import type React from "react"
import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, useAnimation, useInView } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { MapPin } from "lucide-react"
import { cn } from "@/lib/utils"

interface PropertyCardProps {
  property: {
    id: string
    title: string
    price: number
    location: string
    bedrooms: number
    bathrooms: number
    area: number
    image: string
    type: string
    status: "For Sale" | "For Rent" | "Sold"
    featured?: boolean
  }
  onCompare?: (property: PropertyCardProps["property"]) => void
  isSelected?: boolean
  showCompareButton?: boolean
  isLoading?: boolean
}

const PropertyCardSkeleton: React.FC = () => {
  return (
    <div className="group cursor-pointer relative overflow-hidden rounded-lg">
      <div className="relative">
        <div className="aspect-square overflow-hidden rounded-lg">
          <Skeleton className="w-full h-full" />
        </div>

        {/* Status Badge Skeleton */}
        <div className="absolute top-3 left-3">
          <Skeleton className="h-6 w-16 rounded-md" />
        </div>
      </div>

      <div className="mt-3 relative z-20">
        <Skeleton className="h-5 w-3/4 mb-2" />
        <div className="flex justify-between items-center">
          <Skeleton className="h-4 w-20" />
          <div className="flex items-center">
            <Skeleton className="h-4 w-16" />
          </div>
        </div>
      </div>
    </div>
  )
}

const PropertyCard: React.FC<PropertyCardProps> = ({
  property,
  onCompare,
  isSelected = false,
  showCompareButton = false,
  isLoading = false,
}) => {
  const controls = useAnimation()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  const [showSkeleton, setShowSkeleton] = useState(isLoading)

  useEffect(() => {
    if (isLoading) {
      setShowSkeleton(true)
      const timer = setTimeout(() => {
        setShowSkeleton(false)
      }, 1500) // Show skeleton for 1.5 seconds

      return () => clearTimeout(timer)
    }
  }, [isLoading])

  useEffect(() => {
    if (isInView) {
      // Start the shine animation after a delay
      const timer = setTimeout(() => {
        controls.start({
          x: ["-100%", "100%"],
          transition: {
            x: {
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "loop" as const,
              duration: 3,
              ease: "easeInOut",
              repeatDelay: 5, // Wait 5 seconds between animations
            },
          },
        })
      }, 1000)

      return () => clearTimeout(timer)
    }
  }, [isInView, controls])

  if (showSkeleton) {
    return <PropertyCardSkeleton />
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
      minimumFractionDigits: 0,
    }).format(price)
  }

  return (
    <div
      ref={ref}
      className={cn("group cursor-pointer relative overflow-hidden", isSelected && "ring-2 ring-primary rounded-lg")}
    >
      {/* Shine overlay */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent z-10 pointer-events-none"
        initial={{ x: "-100%" }}
        animate={controls}
        style={{
          transform: "skewX(-20deg)",
        }}
      />

      <div className="relative">
        <Link href={`/properties/${property.id}`}>
          <div className="aspect-square overflow-hidden rounded-lg">
            <Image
              src={property.image || "/placeholder.svg"}
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
              property.status === "For Sale" && "bg-green-100 text-green-800 hover:bg-green-100",
              property.status === "For Rent" && "bg-blue-100 text-blue-800 hover:bg-blue-100",
              property.status === "Sold" && "bg-gray-100 text-gray-800 hover:bg-gray-100",
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
        <div className="flex justify-between items-center text-sm text-gray-500 mt-1">
          <span className="font-medium text-primary">{formatPrice(property.price)}</span>
          <div className="flex items-center">
            <MapPin className="w-3.5 h-3.5 mr-1 text-gray-400" />
            <span className="text-gray-600 font-coco-light">{property.location.split(",")[0]}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PropertyCard
