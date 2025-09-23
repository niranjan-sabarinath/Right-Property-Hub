"use client"

import type React from "react"
import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Search, Filter, X, ChevronDown, ChevronUp } from "lucide-react"
import { cn } from "@/lib/utils"
import { parsePrice, formatIndianPrice } from "@/lib/price-utils"
import { FilterState } from "@/types"

interface PropertyFiltersProps {
  filters: FilterState
  onFiltersChange: React.Dispatch<React.SetStateAction<FilterState>>
  className?: string
}

const PropertyFilters: React.FC<PropertyFiltersProps> = ({ filters, onFiltersChange, className }) => {

  const [activeFilters, setActiveFilters] = useState<string[]>([])

  const updateFilter = (key: keyof FilterState, value: any) => {
    const newFilters = { ...filters, [key]: value }
    onFiltersChange(newFilters)

    // Update active filters
    const newActiveFilters = []
    if (newFilters.search) newActiveFilters.push(`Search: ${newFilters.search}`)
    if (newFilters.bedrooms && newFilters.bedrooms !== "any-bedrooms")
      newActiveFilters.push(`Beds: ${newFilters.bedrooms}+`)
    if (newFilters.bathrooms && newFilters.bathrooms !== "any-bathrooms")
      newActiveFilters.push(`Baths: ${newFilters.bathrooms}+`)
    if (newFilters.status && newFilters.status !== "all-status") 
      newActiveFilters.push(`Status: ${newFilters.status}`)
    // Add sort filter to active filters if set
    if (newFilters.sortBy === 'price-high-low') {
      newActiveFilters.push('Price: High to Low')
    } else if (newFilters.sortBy === 'price-low-high') {
      newActiveFilters.push('Price: Low to High')
    }

    setActiveFilters(newActiveFilters)
  }

  const clearFilters = () => {
    const resetFilters: FilterState = {
      search: "",
      sortBy: 'none',
      propertyType: "all",
      location: "",
      bedrooms: "any-bedrooms",
      bathrooms: "any-bathrooms",
      status: "all-status",
      minArea: "",
      maxArea: "",
      minPrice: "",
      maxPrice: ""
    }
    setActiveFilters([])
    onFiltersChange(resetFilters)
  }

  const formatPriceRange = (price: number) => {
    // Format price for the range display without currency symbol
    return price.toLocaleString('en-IN');
  }

  const [isOpen, setIsOpen] = useState(true)

  return (
    <div className={className}>
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div
          className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50 transition-colors"
          onClick={() => setIsOpen(!isOpen)}
        >
          <h3 className="text-lg font-medium text-gray-900 flex items-center">
            <Filter className="w-5 h-5 mr-2 text-gray-600" />
            Filter Properties
          </h3>
          <div className="flex items-center space-x-2">
            {activeFilters.length > 0 && (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                {activeFilters.length} active
              </span>
            )}
            {isOpen ? (
              <ChevronUp className="w-5 h-5 text-gray-500" />
            ) : (
              <ChevronDown className="w-5 h-5 text-gray-500" />
            )}
          </div>
        </div>

        <div className={cn("space-y-6 p-6 pt-0", !isOpen && "hidden")}>
          {/* Search */}
          <div className="space-y-2">
            <Label htmlFor="search" className="text-sm font-medium text-gray-700">
              Search
            </Label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                id="search"
                placeholder="Search properties..."
                value={filters.search}
                onChange={(e) => updateFilter("search", e.target.value)}
                className="pl-10 h-11 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-gray-500"
              />
            </div>
          </div>

          {/* Price Sort */}
          <div className="space-y-2">
            <Label className="text-sm font-medium text-gray-700">Sort By</Label>
            <Select
              value={filters.sortBy}
              onValueChange={(value) => updateFilter('sortBy', value as 'price-high-low' | 'price-low-high' | 'none')}
            >
              <SelectTrigger className="h-11">
                <SelectValue placeholder="Sort by price" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="none">Default</SelectItem>
                <SelectItem value="price-high-low">Price: High to Low</SelectItem>
                <SelectItem value="price-low-high">Price: Low to High</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Status */}
          <div className="space-y-2">
            <Label className="text-sm font-medium text-gray-700">Status</Label>
            <Select value={filters.status} onValueChange={(value) => updateFilter("status", value)}>
              <SelectTrigger className="h-11">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all-status">All Status</SelectItem>
                <SelectItem value="For Sale">For Sale</SelectItem>
                <SelectItem value="For Rent">For Rent</SelectItem>
                <SelectItem value="Sold">Sold</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Active Filters */}
          {activeFilters.length > 0 && (
            <div className="pt-2">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-sm font-medium text-gray-700">Active filters:</span>
                {activeFilters.map((filter, index) => (
                  <div
                    key={index}
                    className="inline-flex items-center bg-gray-100 text-gray-800 text-sm px-3 py-1.5 rounded-full"
                  >
                    <span className="truncate max-w-[180px]">{filter}</span>
                    <button
                      type="button"
                      onClick={() => {
                        const filterKey = filter.split(":")[0].trim().toLowerCase()
                        if (filterKey === "search") updateFilter("search", "")
                        else if (filterKey === "type") updateFilter("propertyType", "all-types")
                        else if (filterKey === "beds") updateFilter("bedrooms", "any-bedrooms")
                        else if (filterKey === "baths") updateFilter("bathrooms", "any-bathrooms")
                        else if (filterKey === "location") updateFilter("location", "all-locations")
                        else if (filterKey === "status") updateFilter("status", "all-status")
                        else if (filterKey === "price") updateFilter("sortBy", "none")
                      }}
                      className="ml-1.5 -mr-1 p-0.5 hover:bg-gray-200 rounded-full transition-colors"
                    >
                      <X className="h-3.5 w-3.5 text-gray-500" />
                    </button>
                  </div>
                ))}
                <button onClick={clearFilters} className="text-sm font-medium text-gray-600 hover:text-gray-900 ml-1">
                  Clear all
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default PropertyFilters
