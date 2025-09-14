'use client';

import React, { useState, useEffect } from 'react';
import Navigation from '@/components/navigation';
import Footer from '@/components/footer';
import PageHeader from '@/components/page-header';
import PropertyCard from '@/components/property-card';
import PropertyFilters from '@/components/property-filters';
import PropertyComparison from '@/components/property-comparison';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Building, Grid, List, GitCompare, X } from 'lucide-react';
import { toast } from 'sonner';

// Sample properties data
const sampleProperties = [
  {
    id: '1',
    title: 'Modern Downtown Penthouse',
    price: 850000,
    location: 'Downtown',
    bedrooms: 3,
    bathrooms: 2,
    area: 2200,
    image: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=600',
    type: 'Apartment',
    status: 'For Sale' as const,
    featured: true,
    yearBuilt: 2020,
    lotSize: 0,
    amenities: ['Gym', 'Pool', 'Concierge', 'Rooftop Terrace'],
    description: 'Stunning modern penthouse with panoramic city views.',
  },
  {
    id: '2',
    title: 'Charming Family Home',
    price: 1200000,
    location: 'Suburbs',
    bedrooms: 4,
    bathrooms: 3,
    area: 3200,
    image: 'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=600',
    type: 'House',
    status: 'For Sale' as const,
    yearBuilt: 2015,
    lotSize: 8000,
    amenities: ['Garage', 'Garden', 'Fireplace', 'Study Room'],
    description: 'Perfect family home in quiet neighborhood.',
  },
  {
    id: '3',
    title: 'Luxury Waterfront Villa',
    price: 2500000,
    location: 'Waterfront',
    bedrooms: 5,
    bathrooms: 4,
    area: 4500,
    image: 'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=600',
    type: 'Villa',
    status: 'For Sale' as const,
    featured: true,
    yearBuilt: 2018,
    lotSize: 12000,
    amenities: ['Private Beach', 'Pool', 'Wine Cellar', 'Guest House'],
    description: 'Exclusive waterfront villa with private beach access.',
  },
  {
    id: '4',
    title: 'Cozy Studio Apartment',
    price: 2200,
    location: 'City Center',
    bedrooms: 1,
    bathrooms: 1,
    area: 750,
    image: 'https://images.pexels.com/photos/2029667/pexels-photo-2029667.jpeg?auto=compress&cs=tinysrgb&w=600',
    type: 'Studio',
    status: 'For Rent' as const,
    yearBuilt: 2019,
    lotSize: 0,
    amenities: ['High-speed Internet', 'Modern Kitchen', 'City Views'],
    description: 'Modern studio in the heart of the city.',
  },
  {
    id: '5',
    title: 'Executive Townhouse',
    price: 950000,
    location: 'Hills',
    bedrooms: 3,
    bathrooms: 2,
    area: 2800,
    image: 'https://images.pexels.com/photos/1571468/pexels-photo-1571468.jpeg?auto=compress&cs=tinysrgb&w=600',
    type: 'Townhouse',
    status: 'For Sale' as const,
    yearBuilt: 2017,
    lotSize: 4000,
    amenities: ['Balcony', 'Parking', 'Security', 'Community Pool'],
    description: 'Elegant townhouse with mountain views.',
  },
  {
    id: '6',
    title: 'Modern City Loft',
    price: 3800,
    location: 'Downtown',
    bedrooms: 2,
    bathrooms: 2,
    area: 1400,
    image: 'https://images.pexels.com/photos/1571453/pexels-photo-1571453.jpeg?auto=compress&cs=tinysrgb&w=600',
    type: 'Apartment',
    status: 'For Rent' as const,
    yearBuilt: 2021,
    lotSize: 0,
    amenities: ['Gym', 'Rooftop Access', 'Modern Appliances'],
    description: 'Contemporary loft with industrial design elements.',
  },
  {
    id: '7',
    title: 'Suburban Dream House',
    price: 1050000,
    location: 'Suburbs',
    bedrooms: 4,
    bathrooms: 3,
    area: 3000,
    image: 'https://images.pexels.com/photos/1396132/pexels-photo-1396132.jpeg?auto=compress&cs=tinysrgb&w=600',
    type: 'House',
    status: 'For Sale' as const,
    yearBuilt: 2016,
    lotSize: 6500,
    amenities: ['Swimming Pool', 'Large Deck', 'Two-car Garage'],
    description: 'Beautiful family home with spacious backyard.',
  },
  {
    id: '8',
    title: 'Urban Condo',
    price: 2800,
    location: 'City Center',
    bedrooms: 2,
    bathrooms: 1,
    area: 1100,
    image: 'https://images.pexels.com/photos/2581922/pexels-photo-2581922.jpeg?auto=compress&cs=tinysrgb&w=600',
    type: 'Condo',
    status: 'For Rent' as const,
    yearBuilt: 2020,
    lotSize: 0,
    amenities: ['Fitness Center', 'Business Center', 'Pet Friendly'],
    description: 'Modern condo in convenient downtown location.',
  },
];

const PropertiesPage = () => {
  const [filteredProperties, setFilteredProperties] = useState(sampleProperties);
  const [filters, setFilters] = useState<any>({});
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState('featured');
  const [compareProperties, setCompareProperties] = useState<any[]>([]);
  const [showComparison, setShowComparison] = useState(false);

  useEffect(() => {
    let filtered = [...sampleProperties];

    // Apply filters
    if (filters.propertyType && filters.propertyType !== 'all-types') {
      filtered = filtered.filter(property => property.type === filters.propertyType);
    }
    if (filters.status && filters.status !== 'all-status') {
      filtered = filtered.filter(property => property.status === filters.status);
    }
    if (filters.bedrooms && filters.bedrooms !== 'any-bedrooms') {
      filtered = filtered.filter(property => property.bedrooms >= parseInt(filters.bedrooms));
    }
    if (filters.bathrooms && filters.bathrooms !== 'any-bathrooms') {
      filtered = filtered.filter(property => property.bathrooms >= parseInt(filters.bathrooms));
    }
    if (filters.location && filters.location !== 'all-locations') {
      filtered = filtered.filter(property => property.location === filters.location);
    }
    if (filters.priceRange) {
      filtered = filtered.filter(property => 
        property.price >= filters.priceRange[0] && property.price <= filters.priceRange[1]
      );
    }
    if (filters.search) {
      filtered = filtered.filter(property =>
        property.title.toLowerCase().includes(filters.search.toLowerCase()) ||
        property.location.toLowerCase().includes(filters.search.toLowerCase()) ||
        property.type.toLowerCase().includes(filters.search.toLowerCase())
      );
    }

    // Apply sorting
    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'area-large':
        filtered.sort((a, b) => b.area - a.area);
        break;
      case 'area-small':
        filtered.sort((a, b) => a.area - b.area);
        break;
      case 'newest':
        filtered.sort((a, b) => (b.yearBuilt || 0) - (a.yearBuilt || 0));
        break;
      default:
        // Featured first
        filtered.sort((a, b) => {
          if (a.featured && !b.featured) return -1;
          if (!a.featured && b.featured) return 1;
          return 0;
        });
    }

    setFilteredProperties(filtered);
  }, [filters, sortBy]);

  const handleCompareProperty = (property: any) => {
    const isAlreadySelected = compareProperties.some(p => p.id === property.id);
    
    if (isAlreadySelected) {
      setCompareProperties(prev => prev.filter(p => p.id !== property.id));
      toast.success(`${property.title} removed from comparison`);
    } else {
      if (compareProperties.length >= 3) {
        toast.error('You can compare maximum 3 properties at a time');
        return;
      }
      setCompareProperties(prev => [...prev, property]);
      toast.success(`${property.title} added to comparison`);
    }
  };

  const handleRemoveFromComparison = (propertyId: string) => {
    const property = compareProperties.find(p => p.id === propertyId);
    setCompareProperties(prev => prev.filter(p => p.id !== propertyId));
    if (property) {
      toast.success(`${property.title} removed from comparison`);
    }
  };

  const handleClearComparison = () => {
    setCompareProperties([]);
    setShowComparison(false);
    toast.success('Comparison cleared');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      {/* Hero Section */}
      <PageHeader 
        title="Find your Dream Property"
        subtitle="Discover the perfect home that matches your lifestyle"
      />

      {/* Compare Bar */}
      {compareProperties.length > 0 && (
        <div className="sticky top-20 z-40 bg-primary text-white py-3 shadow-lg">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <GitCompare className="w-5 h-5" />
                <span className="font-medium">
                  {compareProperties.length} propert{compareProperties.length === 1 ? 'y' : 'ies'} selected for comparison
                </span>
                <div className="flex space-x-2">
                  {compareProperties.map(property => (
                    <Badge key={property.id} variant="secondary" className="text-xs">
                      {property.title.substring(0, 20)}...
                      <Button
                        variant="ghost"
                        size="icon"
                        className="w-4 h-4 ml-1 text-gray-600 hover:text-red-600"
                        onClick={() => handleRemoveFromComparison(property.id)}
                      >
                        <X className="w-3 h-3" />
                      </Button>
                    </Badge>
                  ))}
                </div>
              </div>
              <div className="flex space-x-2">
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => setShowComparison(!showComparison)}
                  disabled={compareProperties.length < 2}
                >
                  {showComparison ? 'Hide Comparison' : 'Compare Properties'}
                </Button>
                <Button variant="ghost" size="sm" onClick={handleClearComparison}>
                  Clear All
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {showComparison ? (
          /* Property Comparison View */
          <PropertyComparison
            properties={compareProperties}
            onRemoveProperty={handleRemoveFromComparison}
            onClearAll={handleClearComparison}
          />
        ) : (
          /* Property Listing View */
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Filters Sidebar */}
            <div className="lg:col-span-1">
              <PropertyFilters 
                onFiltersChange={setFilters}
                className="sticky top-32"
              />
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3 space-y-6">
              {/* Results Header */}
              <Card>
                <CardHeader>
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between space-y-4 lg:space-y-0">
                    <div>
                      <CardTitle className="text-2xl">Property Listings</CardTitle>
                      <p className="text-muted-foreground">
                        Showing {filteredProperties.length} of {sampleProperties.length} properties
                      </p>
                    </div>
                    
                    <div className="flex items-center space-x-4">
                      {/* View Mode Toggle */}
                      <div className="flex items-center border rounded-lg p-1">
                        <Button
                          variant={viewMode === 'grid' ? 'default' : 'ghost'}
                          size="sm"
                          onClick={() => setViewMode('grid')}
                          className="h-8"
                        >
                          <Grid className="w-4 h-4" />
                        </Button>
                        <Button
                          variant={viewMode === 'list' ? 'default' : 'ghost'}
                          size="sm"
                          onClick={() => setViewMode('list')}
                          className="h-8"
                        >
                          <List className="w-4 h-4" />
                        </Button>
                      </div>

                      {/* Sort Options */}
                      <Select value={sortBy} onValueChange={setSortBy}>
                        <SelectTrigger className="w-48">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="featured">Featured First</SelectItem>
                          <SelectItem value="price-low">Price: Low to High</SelectItem>
                          <SelectItem value="price-high">Price: High to Low</SelectItem>
                          <SelectItem value="area-large">Area: Largest First</SelectItem>
                          <SelectItem value="area-small">Area: Smallest First</SelectItem>
                          <SelectItem value="newest">Newest First</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardHeader>
              </Card>

              {/* Properties Grid/List */}
              {filteredProperties.length > 0 ? (
                <div className={
                  viewMode === 'grid' 
                    ? 'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6'
                    : 'space-y-6'
                }>
                  {filteredProperties.map((property) => (
                    <PropertyCard
                      key={property.id}
                      property={property}
                      onCompare={handleCompareProperty}
                      isSelected={compareProperties.some(p => p.id === property.id)}
                      showCompareButton={true}
                    />
                  ))}
                </div>
              ) : (
                <Card>
                  <CardContent className="text-center py-16">
                    <Building className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-gray-600 mb-2">No properties found</h3>
                    <p className="text-gray-500 mb-6">Try adjusting your filters to see more results.</p>
                    <Button onClick={() => setFilters({})}>Clear All Filters</Button>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default PropertiesPage;