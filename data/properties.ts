export interface Property {
  id: string;
  title: string;
  price: number;
  location: string;
  propertyLocation?: 'dubai' | 'india'; // Optional field to specify if property is in Dubai or India
  bedrooms: number;
  bathrooms: number;
  area: number;
  image: string;
  images?: string[];
  type: 'residential' | 'commercial' | 'vacation' | 'luxury';
  status: 'For Sale' | 'For Rent' | 'Sold' | 'Rented';
  featured?: boolean;
  description?: string;
  yearBuilt?: number;
  garage?: number;
  amenities?: string[];
  address?: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  agent?: {
    name: string;
    phone: string;
    email: string;
    image: string;
  };
  locationType?: 'india' | 'dubai';
  createdAt?: string;
  updatedAt?: string;
}

export const propertyTypes = [
  { id: 'residential', name: 'Residential' },
  { id: 'commercial', name: 'Commercial' },
  { id: 'vacation', name: 'Vacation Homes' },
  { id: 'luxury', name: 'Luxury Estates' },
];

export const properties: Property[] = [
  {
    id: '1',
    title: 'Modern Downtown Penthouse',
    price: 850000,
    location: 'Downtown, New York, USA',
    bedrooms: 3,
    bathrooms: 2,
    area: 2200,
    image: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=600',
    images: [
      'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=600',
      'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=600',
      'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=600',
    ],
    type: 'residential',
    status: 'For Sale',
    featured: true,
    description: 'Stunning modern penthouse with panoramic city views. Features an open floor plan, high-end finishes, and a spacious terrace.',
    yearBuilt: 2020,
    garage: 2,
    amenities: ['Swimming Pool', 'Gym', '24/7 Security', 'Parking', 'Elevator'],
    address: {
      street: '123 Main St',
      city: 'New York',
      state: 'NY',
      zipCode: '10001',
      country: 'USA',
    },
    agent: {
      name: 'John Doe',
      phone: '+1 (555) 123-4567',
      email: 'john@example.com',
      image: 'https://randomuser.me/api/portraits/men/1.jpg',
    },
    locationType: 'dubai',
    createdAt: '2023-01-15',
    updatedAt: '2023-01-15',
  },
  {
    id: '2',
    title: 'Charming Family Home',
    price: 1200000,
    location: 'Greenwich, Connecticut, USA',
    bedrooms: 4,
    bathrooms: 3,
    area: 3200,
    image: 'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=600',
    type: 'residential',
    status: 'For Sale',
    featured: false,
    description: 'Beautiful family home in a quiet neighborhood. Features a large backyard, modern kitchen, and spacious living areas.',
    yearBuilt: 2015,
    garage: 2,
    amenities: ['Backyard', 'Fireplace', 'Central AC', 'Laundry Room'],
    address: {
      street: '456 Oak Ave',
      city: 'Greenwich',
      state: 'CT',
      zipCode: '06830',
      country: 'USA',
    },
    agent: {
      name: 'Jane Smith',
      phone: '+1 (555) 987-6543',
      email: 'jane@example.com',
      image: 'https://randomuser.me/api/portraits/women/2.jpg',
    },
    locationType: 'india',
    createdAt: '2023-02-20',
    updatedAt: '2023-02-20',
  },
  {
    id: '3',
    title: 'Luxury Beachfront Villa',
    price: 4500000,
    location: 'Malibu, California, USA',
    bedrooms: 5,
    bathrooms: 5.5,
    area: 6500,
    image: 'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=600',
    images: [
      'https://images.pexels.com/photos/106399/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=600',
      'https://images.pexels.com/photos/106399/pexels-photo-1571468.jpeg?auto=compress&cs=tinysrgb&w=600',
      'https://images.pexels.com/photos/106399/pexels-photo-164558.jpeg?auto=compress&cs=tinysrgb&w=600'
    ],
    type: 'luxury',
    status: 'For Sale',
    featured: false,
    description: 'Stunning beachfront villa with private beach access, infinity pool, and breathtaking ocean views. Features smart home technology and designer finishes throughout.',
    yearBuilt: 2021,
    garage: 3,
    amenities: ['Private Beach', 'Infinity Pool', 'Home Theater', 'Wine Cellar', 'Smart Home'],
    address: {
      street: '1 Ocean View Drive',
      city: 'Malibu',
      state: 'CA',
      zipCode: '90265',
      country: 'USA',
    },
    agent: {
      name: 'Robert Johnson',
      phone: '+1 (310) 555-1234',
      email: 'robert@luxuryestates.com',
      image: 'https://randomuser.me/api/portraits/men/3.jpg',
    },
    locationType: 'dubai',
    createdAt: '2023-03-10',
    updatedAt: '2023-03-10',
  },
  {
    id: '4',
    title: 'Downtown Office Space',
    price: 2500000,
    location: 'Financial District, New York, USA',
    bedrooms: 0,
    bathrooms: 4,
    area: 5000,
    image: 'https://images.pexels.com/photos/1571468/pexels-photo-1571468.jpeg?auto=compress&cs=tinysrgb&w=600',
    type: 'commercial',
    status: 'For Sale',
    featured: false,
    description: 'Prime commercial space in the heart of the financial district. Open floor plan with floor-to-ceiling windows and modern amenities.',
    yearBuilt: 2018,
    amenities: ['Concierge', 'Fitness Center', 'Conference Rooms', 'High-Speed Internet'],
    address: {
      street: '500 Wall Street',
      city: 'New York',
      state: 'NY',
      zipCode: '10005',
      country: 'USA',
    },
    agent: {
      name: 'Sarah Williams',
      phone: '+1 (212) 555-6789',
      email: 'sarah@commercialspaces.com',
      image: 'https://randomuser.me/api/portraits/women/4.jpg',
    },
    locationType: 'dubai',
    createdAt: '2023-04-05',
    updatedAt: '2023-04-05',
  },
  {
    id: '5',
    title: 'Mountain Retreat Cabin',
    price: 650000,
    location: 'Aspen, Colorado, USA',
    bedrooms: 3,
    bathrooms: 2,
    area: 1800,
    image: 'https://images.pexels.com/photos/164558/pexels-photo-164558.jpeg?auto=compress&cs=tinysrgb&w=600',
    type: 'vacation',
    status: 'For Rent',
    featured: false,
    description: 'Cozy mountain cabin with stunning views, perfect for year-round getaways. Close to ski resorts and hiking trails.',
    yearBuilt: 2019,
    garage: 2,
    amenities: ['Mountain View', 'Hot Tub', 'Fireplace', 'Deck'],
    address: {
      street: '100 Alpine Way',
      city: 'Aspen',
      state: 'CO',
      zipCode: '81611',
      country: 'USA',
    },
    agent: {
      name: 'Michael Brown',
      phone: '+1 (970) 555-4321',
      email: 'michael@vacationhomes.com',
      image: 'https://randomuser.me/api/portraits/men/5.jpg',
    },
    locationType: 'india',
    createdAt: '2023-05-15',
    updatedAt: '2023-05-15',
  },
  {
    id: '6',
    title: 'Modern City Apartment',
    price: 3500,
    location: 'Manhattan, New York, USA',
    bedrooms: 2,
    bathrooms: 2,
    area: 1200,
    image: 'https://images.pexels.com/photos/1571463/pexels-photo-1571463.jpeg?auto=compress&cs=tinysrgb&w=600',
    type: 'residential',
    status: 'For Rent',
    featured: true,
    description: 'Stylish apartment in the heart of the city. Features modern appliances, in-unit laundry, and access to building amenities.',
    yearBuilt: 2022,
    amenities: ['Doorman', 'Gym', 'Roof Deck', 'Laundry in Unit'],
    address: {
      street: '200 Park Avenue',
      city: 'New York',
      state: 'NY',
      zipCode: '10166',
      country: 'USA',
    },
    agent: {
      name: 'Emily Davis',
      phone: '+1 (212) 555-7890',
      email: 'emily@cityliving.com',
      image: 'https://randomuser.me/api/portraits/women/6.jpg',
    },
    locationType: 'dubai',
    createdAt: '2023-06-01',
    updatedAt: '2023-06-01',
  },
  {
    id: '7',
    title: 'Lakeside Mansion',
    price: 7500000,
    location: 'Lake Geneva, Wisconsin, USA',
    bedrooms: 8,
    bathrooms: 7.5,
    area: 12000,
    image: 'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=600',
    type: 'luxury',
    status: 'For Sale',
    featured: true,
    description: 'Magnificent lakeside estate with private dock, tennis court, and guest house. Perfect for entertaining with expansive grounds and luxurious finishes.',
    yearBuilt: 2020,
    garage: 4,
    amenities: ['Private Dock', 'Tennis Court', 'Guest House', 'Home Theater', 'Wine Cellar'],
    address: {
      street: '1 Lakeshore Drive',
      city: 'Lake Geneva',
      state: 'WI',
      zipCode: '53147',
      country: 'USA',
    },
    agent: {
      name: 'David Wilson',
      phone: '+1 (262) 555-2468',
      email: 'david@luxuryestates.com',
      image: 'https://randomuser.me/api/portraits/men/7.jpg',
    },
    locationType: 'india',
    createdAt: '2023-07-10',
    updatedAt: '2023-07-10',
  },
  {
    id: '8',
    title: 'Retail Space in Downtown',
    price: 1800000,
    location: 'Chicago, Illinois, USA',
    bedrooms: 0,
    bathrooms: 2,
    area: 3000,
    image: 'https://images.pexels.com/photos/1571468/pexels-photo-1571468.jpeg?auto=compress&cs=tinysrgb&w=600',
    type: 'commercial',
    status: 'For Sale',
    featured: true,
    description: 'Prime retail space in a high-traffic area. Great visibility and easy access. Perfect for retail shops, restaurants, or offices.',
    yearBuilt: 2017,
    amenities: ['High Ceilings', 'Storefront', 'Restrooms', 'Loading Dock'],
    address: {
      street: '500 Michigan Avenue',
      city: 'Chicago',
      state: 'IL',
      zipCode: '60611',
      country: 'USA',
    },
    agent: {
      name: 'Jennifer Lee',
      phone: '+1 (312) 555-1357',
      email: 'jennifer@commercialspaces.com',
      image: 'https://randomuser.me/api/portraits/women/8.jpg',
    },
    locationType: 'dubai',
    createdAt: '2023-08-01',
    updatedAt: '2023-08-01',
  }
];

// Helper functions
export const getPropertyById = (id: string): Property | undefined => {
  return properties.find(property => property.id === id);
};

export const getPropertiesByType = (type: string): Property[] => {
  return properties.filter(property => property.type === type);
};

export const getFeaturedProperties = (): Property[] => {
  return properties.filter(property => property.featured);
};

export const getPropertiesByLocation = (location: 'india' | 'dubai'): Property[] => {
  return properties.filter(property => property.locationType === location);
};
