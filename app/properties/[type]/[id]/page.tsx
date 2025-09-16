'use client';

import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import Navigation from '@/components/navigation';
import Footer from '@/components/footer';
import PropertyCard from '@/components/property-card';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { 
  MapPin, 
  Bed, 
  Bath, 
  Ruler, 
  Car, 
  Calendar, 
  User, 
  Phone, 
  Mail, 
  Share2,
  Heart,
  ArrowLeft
} from 'lucide-react';

interface PropertyDetailPageProps {
  params: {
    type: string;
    id: string;
  };
}

const PropertyDetailPage = ({ params }: PropertyDetailPageProps) => {
  const { type, id } = params;
  const [activeImage, setActiveImage] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  
  // Get params on client side as well for consistency
  const routerParams = useParams();
  const clientType = routerParams.type;
  const clientId = routerParams.id;
  
  // Use client-side params if available (for client-side navigation)
  const effectiveType = clientType || type;
  const effectiveId = clientId || id;
  
  // Mock property data - replace with your actual data fetching logic
  const property = {
    id: effectiveId,
    title: 'Luxury Modern Villa',
    price: 1250000,
    location: 'Beverly Hills, California',
    bedrooms: 4,
    bathrooms: 3.5,
    area: 3200,
    yearBuilt: 2019,
    garage: 2,
    description: 'Stunning modern villa with panoramic views, located in the heart of Beverly Hills. This property features an open floor plan, high-end finishes, and luxurious amenities.',
    features: [
      'Swimming Pool',
      'Home Office',
      'Smart Home',
      'Security System',
      'Walk-in Closet',
      'Gourmet Kitchen'
    ],
    images: [
      '/images/1.jpg',
      '/images/2.jpg',
      '/images/bg.png'
    ],
    agent: {
      name: 'Sarah Johnson',
      phone: '(555) 123-4567',
      email: 'sarah@rightpropertyhub.com',
      image: '/images/agent.jpg'
    }
  };

  const similarProperties = [
    {
      id: '3',
      title: 'Luxury Waterfront Villa',
      price: 2500000,
      location: 'Malibu, California',
      bedrooms: 5,
      bathrooms: 4.5,
      area: 4500,
      image: '/images/2.jpg',
      type: 'Villa',
      status: 'For Sale' as const
    },
    {
      id: '4',
      title: 'Modern Downtown Loft',
      price: 850000,
      location: 'Los Angeles, California',
      bedrooms: 2,
      bathrooms: 2,
      area: 1800,
      image: '/images/1.jpg',
      type: 'Apartment',
      status: 'For Sale' as const
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      <main className="flex-1">
        {/* Back button */}
        <div className="container mx-auto px-4 py-6">
          <Link href={`/properties/${effectiveType}`} className="inline-flex items-center text-gray-600 hover:text-gray-900">
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to {effectiveType} Properties
          </Link>
        </div>

        {/* Property Gallery */}
        <div className="relative bg-gray-100">
          <div className="container mx-auto px-4 py-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Main Image */}
              <div className="lg:col-span-2">
                <div className="relative aspect-video rounded-xl overflow-hidden bg-white shadow-lg">
                  <Image
                    src={property.images[activeImage]}
                    alt={property.title}
                    fill
                    className="object-cover"
                    priority
                  />
                  <button 
                    onClick={() => setIsFavorite(!isFavorite)}
                    className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-md hover:bg-gray-100 transition-colors"
                  >
                    <Heart 
                      className={`w-6 h-6 ${isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-400'}`} 
                    />
                  </button>
                </div>
                
                {/* Thumbnails */}
                <div className="flex gap-3 mt-4 overflow-x-auto pb-2">
                  {property.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setActiveImage(index)}
                      className={`flex-shrink-0 w-20 h-16 rounded-md overflow-hidden border-2 ${
                        activeImage === index ? 'border-blue-500' : 'border-transparent'
                      }`}
                    >
                      <Image
                        src={image}
                        alt={`Thumbnail ${index + 1}`}
                        width={80}
                        height={64}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              </div>

              {/* Property Info */}
              <div className="lg:col-span-1">
                <div className="bg-white rounded-xl p-6 shadow-lg sticky top-24">
                  <h1 className="text-2xl font-bold text-gray-900 mb-2">{property.title}</h1>
                  <p className="text-gray-600 mb-4">
                    <MapPin className="inline w-4 h-4 mr-1" />
                    {property.location}
                  </p>
                  
                  <div className="text-3xl font-bold text-blue-600 mb-6">
                    ${property.price.toLocaleString()}
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4 mb-6">
                    <div className="text-center">
                      <div className="bg-blue-50 p-2 rounded-lg">
                        <Bed className="w-6 h-6 mx-auto text-blue-600" />
                      </div>
                      <p className="text-sm text-gray-600 mt-1">{property.bedrooms} Beds</p>
                    </div>
                    <div className="text-center">
                      <div className="bg-blue-50 p-2 rounded-lg">
                        <Bath className="w-6 h-6 mx-auto text-blue-600" />
                      </div>
                      <p className="text-sm text-gray-600 mt-1">{property.bathrooms} Baths</p>
                    </div>
                    <div className="text-center">
                      <div className="bg-blue-50 p-2 rounded-lg">
                        <Ruler className="w-6 h-6 mx-auto text-blue-600" />
                      </div>
                      <p className="text-sm text-gray-600 mt-1">{property.area} sqft</p>
                    </div>
                  </div>
                  
                  <Button className="w-full py-6 text-lg font-semibold bg-blue-600 hover:bg-blue-700">
                    Schedule a Viewing
                  </Button>
                  
                  <Button variant="outline" className="w-full mt-3 py-6 text-lg font-semibold">
                    <Phone className="w-5 h-5 mr-2" />
                    Contact Agent
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Property Details */}
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Property Details</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 mb-6">{property.description}</p>
                  
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">Property Type</h3>
                      <p className="font-medium">{type.charAt(0).toUpperCase() + type.slice(1)}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">Year Built</h3>
                      <p className="font-medium">{property.yearBuilt}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">Garage</h3>
                      <p className="font-medium">{property.garage} cars</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">Property ID</h3>
                      <p className="font-mono">{property.id}</p>
                    </div>
                  </div>
                  
                  <div className="mt-8">
                    <h3 className="text-lg font-semibold mb-4">Features</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {property.features.map((feature, index) => (
                        <div key={index} className="flex items-center">
                          <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mr-2"></div>
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              {/* Similar Properties */}
              <div className="mt-12">
                <h2 className="text-2xl font-bold mb-6">Similar Properties</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {similarProperties.map((item) => {
                    const propertyData = {
                      id: item.id,
                      title: item.title,
                      price: item.price,
                      location: item.location,
                      bedrooms: item.bedrooms,
                      bathrooms: item.bathrooms,
                      area: item.area,
                      type: item.type.toLowerCase() as 'residential' | 'commercial' | 'vacation' | 'luxury',
                      status: item.status,
                      image: item.image,
                      featured: false,
                      yearBuilt: new Date().getFullYear() - 2, // Default value
                      description: `${item.bedrooms} bed, ${item.bathrooms} bath ${item.type} in ${item.location}`,
                      features: [],
                      agent: {
                        name: 'Agent Name',
                        phone: '(000) 000-0000',
                        email: 'agent@example.com',
                        image: ''
                      },
                      images: [item.image]
                    };
                    return <PropertyCard key={item.id} property={propertyData} />;
                  })}
                </div>
              </div>
            </div>
            
            {/* Contact Agent */}
            <div>
              <Card className="sticky top-24">
                <CardHeader>
                  <CardTitle>Contact Agent</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center mb-6">
                    <div className="w-16 h-16 rounded-full overflow-hidden mr-4">
                      <Image
                        src={property.agent.image}
                        alt={property.agent.name}
                        width={64}
                        height={64}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="font-semibold">{property.agent.name}</h3>
                      <p className="text-sm text-gray-600">Real Estate Agent</p>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex items-center text-gray-600">
                      <Phone className="w-5 h-5 mr-2 text-blue-600" />
                      <a href={`tel:${property.agent.phone}`} className="hover:underline">
                        {property.agent.phone}
                      </a>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Mail className="w-5 h-5 mr-2 text-blue-600" />
                      <a href={`mailto:${property.agent.email}`} className="hover:underline">
                        {property.agent.email}
                      </a>
                    </div>
                  </div>
                  
                  <div className="mt-6 pt-6 border-t">
                    <h4 className="font-medium mb-3">Schedule a Viewing</h4>
                    <form className="space-y-4">
                      <div>
                        <Label htmlFor="date">Date</Label>
                        <Input type="date" id="date" className="mt-1" />
                      </div>
                      <div>
                        <Label htmlFor="time">Time</Label>
                        <Input type="time" id="time" className="mt-1" />
                      </div>
                      <div>
                        <Label htmlFor="message">Message (Optional)</Label>
                        <Textarea id="message" rows={3} className="mt-1" />
                      </div>
                      <Button type="submit" className="w-full">
                        Request Viewing
                      </Button>
                    </form>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default PropertyDetailPage;
