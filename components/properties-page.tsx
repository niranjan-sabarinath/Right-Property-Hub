'use client';

import { useSearchParams } from 'next/navigation';
import dynamic from 'next/dynamic';

// Import PropertyListing with SSR disabled to avoid hydration issues
const PropertyListing = dynamic(
  () => import('@/components/property-listing'),
  { ssr: false }
);

export default function PropertiesPage() {
  const searchParams = useSearchParams();
  
  // Get filters from URL params
  const filters = {
    status: searchParams.get('status') || 'all',
    type: searchParams.get('type') || 'all',
    minPrice: searchParams.get('minPrice') || '',
    maxPrice: searchParams.get('maxPrice') || '',
    bedrooms: searchParams.get('bedrooms') || 'all',
    sort: searchParams.get('sort') || 'featured',
  };
  
  // Get location from URL params if it exists
  const location = searchParams.get('location') || 'all';
  
  return (
    <PropertyListing 
      filters={filters} 
      defaultLocation={location === 'all' ? undefined : location as 'India' | 'Dubai'}
      showLocationFilter={true}
    />
  );
}
