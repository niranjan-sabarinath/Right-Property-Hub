'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Filter, X } from 'lucide-react';
import PropertyFilters from './property-filters';

interface MobilePropertyFiltersProps {
  filters: {
    search: string;
    sortBy: 'price-high-low' | 'price-low-high' | 'none';
    propertyType: string;
    bedrooms: string;
    bathrooms: string;
    location: string;
    status: string;
  };
  onFiltersChange: (filters: any) => void;
}

export default function MobilePropertyFilters({ filters, onFiltersChange }: MobilePropertyFiltersProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [filterCount, setFilterCount] = useState(0);

  const handleFiltersChange = (updatedFilters: any) => {
    // Count active filters
    const activeFilters = [
      filters.search ? 1 : 0,
      filters.propertyType !== 'all-types' ? 1 : 0,
      filters.bedrooms !== 'any-bedrooms' ? 1 : 0,
      filters.bathrooms !== 'any-bathrooms' ? 1 : 0,
      filters.location !== 'all-locations' ? 1 : 0,
      filters.status !== 'all-status' ? 1 : 0,
      filters.sortBy !== 'none' ? 1 : 0
    ].reduce((a, b) => a + b, 0);

    setFilterCount(activeFilters);
    onFiltersChange(updatedFilters);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="w-full flex items-center justify-center gap-2 md:hidden">
          <Filter className="w-4 h-4" />
          Filters {filterCount > 0 && `(${filterCount})`}
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-[425px]">
        <div className="py-4">
          <PropertyFilters 
            filters={filters}
            onFiltersChange={handleFiltersChange} 
            className="!border-0 !p-0 !shadow-none"
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
