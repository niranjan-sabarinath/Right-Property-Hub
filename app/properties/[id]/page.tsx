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
  Square, 
  Calendar, 
  Car, 
  Heart, 
  Share2, 
  Phone, 
  Mail,
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  Star,
  User
} from 'lucide-react';
import { toast } from 'sonner';

// Sample property data
const propertyData: { [key: string]: any } = {
  '1': {
    id: '1',
    title: 'Modern Downtown Penthouse',
    price: 850000,
    location: 'Downtown',
    bedrooms: 3,
    bathrooms: 2,
    area: 2200,
    yearBuilt: 2020,
    lotSize: 0,
    parkingSpaces: 2,
    type: 'Apartment',
    status: 'For Sale',
    featured: true,
    images: [
      'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/1571453/pexels-photo-1571453.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/2029667/pexels-photo-2029667.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/2581922/pexels-photo-2581922.jpeg?auto=compress&cs=tinysrgb&w=1200',
    ],
    description: 'Experience luxury living at its finest in this stunning modern penthouse located in the heart of downtown. This exceptional property offers panoramic city views, premium finishes, and an unparalleled lifestyle. The open-concept design seamlessly blends indoor and outdoor living with floor-to-ceiling windows and a private terrace.',
    amenities: [
      '24/7 Concierge Service',
      'Rooftop Terrace with City Views',
      'State-of-the-art Fitness Center',
      'Swimming Pool and Spa',
      'Private Elevator Access',
      'Smart Home Technology',
      'Premium Appliances',
      'In-unit Laundry',
      'Climate Control',
      'High-speed Internet Ready'
    ],
    neighborhood: {
      walkScore: 95,
      schools: ['Downtown Elementary (9/10)', 'Central High School (8/10)'],
      nearby: ['Metro Station (0.2 mi)', 'Shopping Center (0.3 mi)', 'Park (0.5 mi)', 'Hospital (0.8 mi)']
    },
    agent: {
      name: 'Sarah Johnson',
      phone: '+1 (555) 123-4567',
      email: 'sarah.johnson@rightpropertyhub.com',
      image: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150',
      rating: 4.9,
      reviews: 127,
      specialties: ['Luxury Properties', 'Downtown Area', 'Investment Properties']
    }
  },
  '2': {
    id: '2',
    title: 'Charming Family Home',
    price: 1200000,
    location: 'Suburbs',
    bedrooms: 4,
    bathrooms: 3,
    area: 3200,
    yearBuilt: 2015,
    lotSize: 8000,
    parkingSpaces: 2,
    type: 'House',
    status: 'For Sale',
    images: [
      'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/1396132/pexels-photo-1396132.jpeg?auto=compress&cs=tinysrgb&w=1200',
    ],
    description: 'Perfect family home in a quiet, tree-lined neighborhood. This beautifully maintained house offers spacious rooms, a large backyard, and excellent schools nearby.',
    amenities: [
      'Two-car Garage',
      'Large Backyard',
      'Fireplace',
      'Study Room',
      'Master Suite',
      'Walk-in Closets',
      'Modern Kitchen',
      'Hardwood Floors'
    ],
    agent: {
      name: 'Michael Chen',
      phone: '+1 (555) 234-5678',
      email: 'michael.chen@rightpropertyhub.com',
      image: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150',
      rating: 4.8,
      reviews: 95
    }
  }
};

// Sample similar properties
const similarProperties = [
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
  }
];

const PropertyDetailPage = () => {
  const params = useParams();
  const propertyId = params.id as string;
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isFavorited, setIsFavorited] = useState(false);

  const property = propertyData[propertyId];

  if (!property) {
    return (
      <div className="min-h-screen bg-white">
        <Navigation />
        <div className="pt-24 pb-20">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Property Not Found</h1>
            <p className="text-gray-600 mb-8">The property you're looking for doesn't exist or has been removed.</p>
            <Button asChild>
              <Link href="/properties">Back to Properties</Link>
            </Button>
          </div>
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

  const nextImage = () => {
    setCurrentImageIndex((prev) => 
      prev === property.images.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? property.images.length - 1 : prev - 1
    );
  };

  const handleInquiry = () => {
    toast.success('Inquiry sent successfully! We\'ll contact you soon.');
  };

  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      <div className="pt-20">
        {/* Back Button */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Button variant="ghost" asChild>
            <Link href="/properties">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Properties
            </Link>
          </Button>
        </div>

        {/* Property Images */}
        <section className="relative">
          <div className="aspect-[21/9] max-h-[600px] overflow-hidden bg-gray-100">
            <Image
              src={property.images[currentImageIndex]}
              alt={property.title}
              fill
              className="object-cover"
              priority
            />
            
            {/* Image Navigation */}
            {property.images.length > 1 && (
              <>
                <Button
                  variant="secondary"
                  size="icon"
                  className="absolute left-4 top-1/2 -translate-y-1/2 h-12 w-12"
                  onClick={prevImage}
                >
                  <ChevronLeft className="w-6 h-6" />
                </Button>
                <Button
                  variant="secondary"
                  size="icon"
                  className="absolute right-4 top-1/2 -translate-y-1/2 h-12 w-12"
                  onClick={nextImage}
                >
                  <ChevronRight className="w-6 h-6" />
                </Button>
              </>
            )}

            {/* Action Buttons */}
            <div className="absolute top-4 right-4 flex space-x-2">
              <Button
                variant="secondary"
                size="icon"
                onClick={() => setIsFavorited(!isFavorited)}
                className={isFavorited ? "bg-red-500 text-white hover:bg-red-600" : ""}
              >
                <Heart className={`w-5 h-5 ${isFavorited ? 'fill-current' : ''}`} />
              </Button>
              <Button variant="secondary" size="icon">
                <Share2 className="w-5 h-5" />
              </Button>
            </div>

            {/* Status Badge */}
            <Badge className="absolute top-4 left-4 bg-green-500 hover:bg-green-600">
              {property.status}
            </Badge>
          </div>

          {/* Image Thumbnails */}
          {property.images.length > 1 && (
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
              <div className="flex space-x-2 overflow-x-auto">
                {property.images.map((image: string, index: number) => (
                  <button
                    key={index}
                    className={`relative aspect-video w-20 h-16 rounded-lg overflow-hidden flex-shrink-0 ${
                      currentImageIndex === index ? 'ring-2 ring-primary' : ''
                    }`}
                    onClick={() => setCurrentImageIndex(index)}
                  >
                    <Image
                      src={image}
                      alt={`${property.title} ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>
          )}
        </section>

        {/* Property Details */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Header */}
              <div>
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">{property.title}</h1>
                    <div className="flex items-center space-x-2 text-gray-600">
                      <MapPin className="w-5 h-5" />
                      <span>{property.location}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold text-primary">{formatPrice(property.price)}</div>
                    <div className="text-gray-600">{property.type}</div>
                  </div>
                </div>

                {/* Key Features */}
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <Bed className="w-8 h-8 mx-auto text-primary mb-2" />
                    <div className="text-2xl font-bold">{property.bedrooms}</div>
                    <div className="text-sm text-gray-600">Bedrooms</div>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <Bath className="w-8 h-8 mx-auto text-primary mb-2" />
                    <div className="text-2xl font-bold">{property.bathrooms}</div>
                    <div className="text-sm text-gray-600">Bathrooms</div>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <Square className="w-8 h-8 mx-auto text-primary mb-2" />
                    <div className="text-2xl font-bold">{property.area.toLocaleString()}</div>
                    <div className="text-sm text-gray-600">Sqft</div>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <Calendar className="w-8 h-8 mx-auto text-primary mb-2" />
                    <div className="text-2xl font-bold">{property.yearBuilt}</div>
                    <div className="text-sm text-gray-600">Year Built</div>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <Car className="w-8 h-8 mx-auto text-primary mb-2" />
                    <div className="text-2xl font-bold">{property.parkingSpaces}</div>
                    <div className="text-sm text-gray-600">Parking</div>
                  </div>
                </div>
              </div>

              {/* Description */}
              <Card>
                <CardHeader>
                  <CardTitle>Description</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 leading-relaxed">{property.description}</p>
                </CardContent>
              </Card>

              {/* Amenities */}
              <Card>
                <CardHeader>
                  <CardTitle>Amenities & Features</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {property.amenities.map((amenity: string, index: number) => (
                      <div key={index} className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-primary rounded-full"></div>
                        <span className="text-gray-700">{amenity}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Neighborhood */}
              {property.neighborhood && (
                <Card>
                  <CardHeader>
                    <CardTitle>Neighborhood</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="font-semibold mb-2">Walk Score: {property.neighborhood.walkScore}/100</h4>
                      <p className="text-gray-600">Very walkable - most errands can be accomplished on foot</p>
                    </div>
                    
                    <Separator />
                    
                    <div>
                      <h4 className="font-semibold mb-2">Schools</h4>
                      <div className="space-y-1">
                        {property.neighborhood.schools.map((school: string, index: number) => (
                          <p key={index} className="text-gray-600">{school}</p>
                        ))}
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div>
                      <h4 className="font-semibold mb-2">Nearby</h4>
                      <div className="space-y-1">
                        {property.neighborhood.nearby.map((place: string, index: number) => (
                          <p key={index} className="text-gray-600">{place}</p>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Contact Agent */}
              <Card>
                <CardHeader>
                  <CardTitle>Contact Agent</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <Image
                      src={property.agent.image}
                      alt={property.agent.name}
                      width={60}
                      height={60}
                      className="rounded-full"
                    />
                    <div>
                      <h3 className="font-semibold">{property.agent.name}</h3>
                      {property.agent.rating && (
                        <div className="flex items-center space-x-1">
                          <div className="flex">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <Star
                                key={i}
                                className={`w-4 h-4 ${
                                  i < Math.floor(property.agent.rating)
                                    ? 'text-yellow-400 fill-current'
                                    : 'text-gray-300'
                                }`}
                              />
                            ))}
                          </div>
                          <span className="text-sm text-gray-600">
                            {property.agent.rating} ({property.agent.reviews} reviews)
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Button className="w-full" size="lg">
                      <Phone className="w-4 h-4 mr-2" />
                      {property.agent.phone}
                    </Button>
                    <Button variant="outline" className="w-full">
                      <Mail className="w-4 h-4 mr-2" />
                      Email Agent
                    </Button>
                  </div>

                  <Separator />

                  {/* Inquiry Form */}
                  <div className="space-y-3">
                    <h4 className="font-semibold">Send a Message</h4>
                    <Input placeholder="Your Name" />
                    <Input placeholder="Your Email" type="email" />
                    <Input placeholder="Your Phone" type="tel" />
                    <Textarea 
                      placeholder="I'm interested in this property. Please contact me with more information."
                      rows={3}
                    />
                    <Button className="w-full" onClick={handleInquiry}>
                      Send Inquiry
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Schedule Tour */}
              <Card>
                <CardHeader>
                  <CardTitle>Schedule a Tour</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-gray-600">See this property in person</p>
                  <div className="space-y-3">
                    <Label htmlFor="tour-date">Preferred Date</Label>
                    <Input id="tour-date" type="date" />
                    <Label htmlFor="tour-time">Preferred Time</Label>
                    <Input id="tour-time" type="time" />
                    <Button className="w-full">Schedule Tour</Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        {/* Similar Properties */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Similar Properties</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {similarProperties.map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
};

export default PropertyDetailPage;