'use client';

import React from 'react';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { X, MapPin, Bed, Bath, Square, Calendar, DollarSign } from 'lucide-react';

interface Property {
  id: string;
  title: string;
  price: number;
  location: string;
  bedrooms: number;
  bathrooms: number;
  area: number;
  image: string;
  type: string;
  status: string;
  yearBuilt?: number;
  lotSize?: number;
  amenities?: string[];
  description?: string;
}

interface PropertyComparisonProps {
  properties: Property[];
  onRemoveProperty: (propertyId: string) => void;
  onClearAll: () => void;
}

const PropertyComparison: React.FC<PropertyComparisonProps> = ({
  properties,
  onRemoveProperty,
  onClearAll,
}) => {
  if (properties.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="max-w-md mx-auto">
          <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
            <Square className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No Properties to Compare</h3>
          <p className="text-gray-600">
            Select properties from the listings to compare their features side by side.
          </p>
        </div>
      </div>
    );
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const comparisonRows = [
    {
      label: 'Property Image',
      render: (property: Property) => (
        <div className="aspect-video w-full overflow-hidden rounded-lg">
          <Image
            src={property.image}
            alt={property.title}
            width={300}
            height={200}
            className="w-full h-full object-cover"
          />
        </div>
      ),
    },
    {
      label: 'Price',
      render: (property: Property) => (
        <div className="flex items-center space-x-2">
          <DollarSign className="w-4 h-4 text-primary" />
          <span className="text-xl font-bold text-primary">{formatPrice(property.price)}</span>
        </div>
      ),
    },
    {
      label: 'Status',
      render: (property: Property) => (
        <Badge 
          className={
            property.status === 'For Sale' 
              ? "bg-green-500 hover:bg-green-600" 
              : "bg-blue-500 hover:bg-blue-600"
          }
        >
          {property.status}
        </Badge>
      ),
    },
    {
      label: 'Property Type',
      render: (property: Property) => <span className="font-medium">{property.type}</span>,
    },
    {
      label: 'Location',
      render: (property: Property) => (
        <div className="flex items-center space-x-1">
          <MapPin className="w-4 h-4 text-gray-500" />
          <span className="text-sm">{property.location}</span>
        </div>
      ),
    },
    {
      label: 'Bedrooms',
      render: (property: Property) => (
        <div className="flex items-center space-x-1">
          <Bed className="w-4 h-4 text-gray-500" />
          <span>{property.bedrooms}</span>
        </div>
      ),
    },
    {
      label: 'Bathrooms',
      render: (property: Property) => (
        <div className="flex items-center space-x-1">
          <Bath className="w-4 h-4 text-gray-500" />
          <span>{property.bathrooms}</span>
        </div>
      ),
    },
    {
      label: 'Living Area',
      render: (property: Property) => (
        <div className="flex items-center space-x-1">
          <Square className="w-4 h-4 text-gray-500" />
          <span>{property.area?.toLocaleString()} sqft</span>
        </div>
      ),
    },
    {
      label: 'Year Built',
      render: (property: Property) => (
        <div className="flex items-center space-x-1">
          <Calendar className="w-4 h-4 text-gray-500" />
          <span>{property.yearBuilt || 'N/A'}</span>
        </div>
      ),
    },
    {
      label: 'Lot Size',
      render: (property: Property) => (
        <span>{property.lotSize ? `${property.lotSize.toLocaleString()} sqft` : 'N/A'}</span>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Property Comparison</h2>
        <Button variant="outline" onClick={onClearAll}>
          Clear All
        </Button>
      </div>

      {/* Desktop Comparison Table */}
      <div className="hidden lg:block">
        <Card>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-4 w-32">Features</th>
                    {properties.map((property) => (
                      <th key={property.id} className="text-left p-4 min-w-64">
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="font-semibold text-base line-clamp-2">{property.title}</h3>
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => onRemoveProperty(property.id)}
                            className="h-8 w-8"
                          >
                            <X className="w-4 h-4" />
                          </Button>
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {comparisonRows.map((row, index) => (
                    <tr key={index} className="border-b last:border-b-0">
                      <td className="p-4 font-medium text-gray-700 bg-gray-50">
                        {row.label}
                      </td>
                      {properties.map((property) => (
                        <td key={property.id} className="p-4">
                          {row.render(property)}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Mobile Comparison Cards */}
      <div className="lg:hidden grid gap-4">
        {properties.map((property) => (
          <Card key={property.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg line-clamp-2">{property.title}</CardTitle>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onRemoveProperty(property.id)}
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {comparisonRows.map((row, index) => (
                <div key={index} className="flex items-start justify-between py-2 border-b last:border-b-0">
                  <span className="font-medium text-gray-700 text-sm">{row.label}:</span>
                  <div className="text-right">{row.render(property)}</div>
                </div>
              ))}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Summary */}
      {properties.length > 1 && (
        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="pt-6">
            <h3 className="font-semibold text-blue-900 mb-2">Quick Comparison Summary</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div>
                <span className="font-medium text-blue-800">Price Range:</span>
                <br />
                {formatPrice(Math.min(...properties.map(p => p.price)))} - {formatPrice(Math.max(...properties.map(p => p.price)))}
              </div>
              <div>
                <span className="font-medium text-blue-800">Bedrooms Range:</span>
                <br />
                {Math.min(...properties.map(p => p.bedrooms))} - {Math.max(...properties.map(p => p.bedrooms))} beds
              </div>
              <div>
                <span className="font-medium text-blue-800">Area Range:</span>
                <br />
                {Math.min(...properties.map(p => p.area)).toLocaleString()} - {Math.max(...properties.map(p => p.area)).toLocaleString()} sqft
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default PropertyComparison;