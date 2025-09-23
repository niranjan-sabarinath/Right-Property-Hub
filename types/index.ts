export interface FilterState {
  search: string
  sortBy: 'price-high-low' | 'price-low-high' | 'none'
  propertyType: string
  location: string
  status: string
  bedrooms: string
  bathrooms: string
  minArea: string
  maxArea: string
  minPrice: string
  maxPrice: string
}
