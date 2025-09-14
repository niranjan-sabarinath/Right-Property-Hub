"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Search, Building, ArrowRight } from "lucide-react";
import { motion, useAnimation, useInView } from "framer-motion";
import PropertyCarousel from "@/components/property-carousel";

// Components
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import PropertyCard from "@/components/property-card";
import PropertyFilters from "@/components/property-filters";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

// Sample data
const sampleProperties = [
    
    {
        id: "1",
        title: "Modern Downtown Penthouse",
        price: 850000,
        location: "Downtown, New York, USA",
        bedrooms: 3,
        bathrooms: 2,
        area: 2200,
        image: "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=600",
        type: "Apartment",
        status: "For Sale" as const,
        featured: true,
    },
    {
        id: "2",
        title: "Charming Family Home",
        price: 1200000,
        location: "Greenwich, Connecticut, USA",
        bedrooms: 4,
        bathrooms: 3,
        area: 3200,
        image: "https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=600",
        type: "House",
        status: "For Sale" as const,
        featured: true,
    },
    {
        id: "3",
        title: "Luxury Waterfront Villa",
        price: 2500000,
        location: "Miami Beach, Florida, USA",
        bedrooms: 5,
        bathrooms: 4,
        area: 4500,
        image: "https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=600",
        type: "Villa",
        status: "For Sale" as const,
        featured: true,
    },
    {
        id: "4",
        title: "Cozy Studio Apartment",
        price: 2200,
        location: "Manhattan, New York, USA",
        bedrooms: 1,
        bathrooms: 1,
        area: 750,
        image: "https://images.pexels.com/photos/2029667/pexels-photo-2029667.jpeg?auto=compress&cs=tinysrgb&w=600",
        type: "Studio",
        status: "For Rent" as const,
        featured: true,
    },
    {
        id: "5",
        title: "Executive Townhouse",
        price: 950000,
        location: "Beverly Hills, California, USA",
        bedrooms: 3,
        bathrooms: 2,
        area: 2800,
        image: "https://images.pexels.com/photos/1571468/pexels-photo-1571468.jpeg?auto=compress&cs=tinysrgb&w=600",
        type: "Townhouse",
        status: "For Sale" as const,
    },
    {
        id: "6",
        title: "Modern City Loft",
        price: 3800,
        location: "SoHo, New York, USA",
        bedrooms: 2,
        bathrooms: 2,
        area: 1400,
        image: "https://images.pexels.com/photos/1571453/pexels-photo-1571453.jpeg?auto=compress&cs=tinysrgb&w=600",
        type: "Apartment",
        status: "For Rent" as const,
    },
];

const testimonials = [
    {
        name: "Sarah Johnson",
        role: "Homebuyer",
        content:
            "Right Property Hub made my home buying experience seamless. Their team was professional, knowledgeable, and always available to answer my questions.",
        rating: 5,
        image: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150",
    },
    {
        name: "Michael Chen",
        role: "Property Investor",
        content:
            "I've worked with many real estate agencies, but Right Property Hub stands out. They helped me find the perfect investment properties with great ROI.",
        rating: 5,
        image: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150",
    },
    {
        name: "Emily Rodriguez",
        role: "First-time Seller",
        content:
            "Selling my first property was stress-free thanks to their expert guidance. They got me a great price and handled everything professionally.",
        rating: 5,
        image: "https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=150",
    },
];

const HomePage = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredProperties, setFilteredProperties] =
        useState(sampleProperties);
    const [filters, setFilters] = useState<any>({});

    useEffect(() => {
        let filtered = sampleProperties;

        // Apply search filter
        if (searchTerm) {
            filtered = filtered.filter(
                (property) =>
                    property.title
                        .toLowerCase()
                        .includes(searchTerm.toLowerCase()) ||
                    property.location
                        .toLowerCase()
                        .includes(searchTerm.toLowerCase()) ||
                    property.type
                        .toLowerCase()
                        .includes(searchTerm.toLowerCase())
            );
        }

        // Apply other filters
        if (filters.propertyType && filters.propertyType !== "all-types") {
            filtered = filtered.filter(
                (property) => property.type === filters.propertyType
            );
        }
        if (filters.status && filters.status !== "all-status") {
            filtered = filtered.filter(
                (property) => property.status === filters.status
            );
        }
        if (filters.bedrooms && filters.bedrooms !== "any-bedrooms") {
            filtered = filtered.filter(
                (property) => property.bedrooms >= parseInt(filters.bedrooms)
            );
        }
        if (filters.bathrooms && filters.bathrooms !== "any-bathrooms") {
            filtered = filtered.filter(
                (property) => property.bathrooms >= parseInt(filters.bathrooms)
            );
        }
        if (filters.location && filters.location !== "all-locations") {
            filtered = filtered.filter(
                (property) => property.location === filters.location
            );
        }
        if (filters.priceRange) {
            filtered = filtered.filter(
                (property) =>
                    property.price >= filters.priceRange[0] &&
                    property.price <= filters.priceRange[1]
            );
        }

        setFilteredProperties(filtered);
    }, [searchTerm, filters]);

    const featuredProperties = sampleProperties.filter(
        (property) => property.featured
    );

    return (
        <div className="min-h-screen bg-gray-50 ">
            <Navigation />

            {/* Hero Section */}
            <section className="relative min-h-screen flex items-end pb-16 sm:pb-0 overflow-hidden">
                {/* Background Image with Overlay */}
                <div className="inset-0 z-0">
                    <Image
                        src="/images/2.jpg"
                        alt="Luxury Home"
                        fill
                        className="object-cover"
                        priority
                    />
                    <div className="absolute inset-0 bg-black/60 md:bg-black/40" />
                </div>

                <div className="relative z-10 w-full mb-8 ">
                    <div className="px-4 sm:px-6 lg:px-12 flex flex-grow items-end h-full">
                        <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-start md:items-center w-full">
                            {/* Left Column - Title */}
                            <div className="animate-fade-in flex-1 w-full mt-16 md:mt-0">
                                <div className="flex flex-wrap gap-2 sm:gap-3 mb-4 sm:mb-6">
                                    {['Homes', 'Apartments', 'Residential'].map((badge) => (
                                        <span 
                                            key={badge}
                                            className="px-3 sm:px-4 py-1.5 sm:py-2 bg-white/10 backdrop-blur-sm text-white/90 text-xs sm:text-sm font-medium rounded-full border border-white/20 hover:bg-white/20 transition-colors duration-200 whitespace-nowrap"
                                        >
                                            {badge}
                                        </span>
                                    ))}
                                </div>
                                <h1 className="text-4xl sm:text-4xl md:text-5xl lg:text-[5rem] font-coco-light mb-6 md:mb-8 text-white/90 leading-tight">
                                    Homes built for memories, crafted for futures.
                                </h1>
                                <div className="w-full max-w-2xl relative pr-4 sm:pr-0">
                                    <div className="relative flex items-center sm:bg-white/10 sm:backdrop-blur-lg rounded-full border border-white/30 hover:border-white/40 transition-all duration-300 shadow-lg hover:shadow-xl">
                                        <Search className="absolute left-4 sm:left-6 h-4 w-4 sm:h-5 sm:w-5 text-white/80" />
                                        <Input
                                            type="text"
                                            placeholder="Search properties...."
                                            className="w-full pl-10 sm:pl-14 pr-24 sm:pr-28 py-3 sm:py-4 md:py-5 lg:py-6 bg-transparent border-0 focus-visible:ring-0 focus-visible:ring-offset-0 text-white placeholder-white/70 text-sm sm:text-base"
                                            value={searchTerm}
                                            onChange={(e) => setSearchTerm(e.target.value)}
                                            onKeyDown={(e) => {
                                                if (e.key === 'Enter' && searchTerm.trim()) {
                                                    window.location.href = `/properties?search=${encodeURIComponent(searchTerm)}`;
                                                }
                                            }}
                                        />
                                        <Button 
                                            asChild
                                            size="sm" 
                                            className="absolute right-[0.4rem] sm:right-[0.35rem] bg-white/20 backdrop-blur-md text-white hover:bg-white/30 transition-all duration-300 px-4 sm:px-6 py-1.5 sm:py-2 h-auto rounded-full text-xs sm:text-sm font-medium border border-white/20 hover:border-white/40 whitespace-nowrap"
                                        >
                                            <Link href={`/properties?search=${encodeURIComponent(searchTerm)}`}>
                                                <span className="hidden sm:inline">Search</span>
                                                <Search className="sm:hidden h-4 w-4" />
                                            </Link>
                                        </Button>
                                    </div>
                            </div>
                            </div>
                            
                            {/* Right Column - Description */}
                            <div className="animate-slide-up w-full md:w-auto mt-8 md:mt-0">
                                <p className="text-base sm:text-lg md:text-xl lg:text-2xl font-coco-light text-white/90 max-w-sm">
                                    Every great journey starts with finding the perfect
                                    place to call home. Let us guide you to properties that
                                    inspire your future, not just meet your needs.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Featured Properties */}
            <section className="pt-24 relative overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="mb-8 relative">
                        <div className="absolute -top-6 left-4 md:left-36 right-0 flex items-center z-0">
                            <span className="font-amsterdam text-2xl md:text-3xl text-gray-400 select-none pointer-events-none opacity-30">
                                Featured Properties
                            </span>
                        </div>
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4 relative z-10">
                            <h2 className="text-3xl md:text-6xl font-medium text-gray-900 font-coco-regular">
                                Discover Our Collection
                            </h2>
                            <Link
                                href="/properties"
                                className="hidden sm:inline-flex group items-center underline mt-4 text-lg font-medium text-gray-900 hover:text-gray-600 transition-colors"
                            >
                                Get to Know Us
                                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </div>
                        <p className="text-base md:text-lg text-gray-600 max-w-2xl font-coco-regular leading-6">
                            Discover our handpicked selection of premium
                            properties, designed to bring you closer to your
                            dream home.
                        </p>
                        <div className="relative mt-6">
                            <hr className="md:w-[calc(100%-25rem)] w-[calc(100%-4rem)] border-t border-gray-300" />
                            <div className="absolute right-[calc(25rem)] -top-4 w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center bg-gray-50">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="16"
                                    height="16"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="text-gray-400"
                                >
                                    <line x1="5" y1="12" x2="19" y2="12"></line>
                                    <polyline points="12 5 19 12 12 19"></polyline>
                                </svg>
                            </div>
                        </div>
                    </div>

                    {/* Desktop Grid View - Hidden on mobile */}
                    <div className="hidden md:grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8 md:mb-12">
                        {featuredProperties.map((property) => (
                            <div key={property.id} className="group cursor-pointer">
                                <div className="relative aspect-[2/3] overflow-hidden rounded-xl mb-4">
                                    <div className="relative w-full h-full">
                                        <Image
                                            src={property.image}
                                            alt={property.title}
                                            fill
                                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                                        />
                                        <motion.div
                                            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent z-10 pointer-events-none"
                                            initial={{ x: "-100%" }}
                                            animate={{ x: ["-100%", "100%"] }}
                                            transition={{
                                                x: {
                                                    repeat: Infinity,
                                                    repeatType: "loop",
                                                    duration: 3,
                                                    ease: "easeInOut",
                                                    repeatDelay: 1,
                                                },
                                            }}
                                            style={{ transform: "skewX(-20deg)" }}
                                        />
                                    </div>
                                    <div className="absolute top-3 left-3">
                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium ${
                                            property.status === "For Sale"
                                                ? "bg-green-100 text-green-800"
                                                : property.status === "For Rent"
                                                ? "bg-blue-100 text-blue-800"
                                                : "bg-gray-100 text-gray-800"
                                        }`}>
                                            {property.status}
                                        </span>
                                    </div>
                                </div>
                                <div className="ml-1">
                                    <h3 className="text-lg font-coco-regular text-gray-900 group-hover:text-primary transition-colors">
                                        {property.title}
                                    </h3>
                                    <p className="text-gray-600">
                                        <span className="text-sm font-coco-light">
                                            {property.location}
                                        </span>
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Mobile Carousel - Only visible on mobile */}
                    <div className="md:hidden mb-8">
                        <PropertyCarousel properties={featuredProperties} />
                    </div>
                </div>
            </section>

            <section className="py-12 md:py-20 bg-[#eef2f3] relative overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="mb-8 relative z-10">
                        <span className="inline-block px-3 py-1 text-sm font-medium border border-zinc-800 rounded-full mb-4">
                            What We Do
                        </span>
                        <h2 className="text-3xl md:text-6xl font-medium text-gray-900 font-coco-regular">
                            Guiding you through every step of buying, selling,
                            and living with confidence
                        </h2>
                    </div>
                    <div className="bg-neutral-900 p-4 sm:p-6 lg:p-8 rounded-lg">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-12">
                            {/* Property Image */}
                            <div className="relative h-64 sm:h-80 md:h-96 lg:h-[350px] overflow-hidden rounded-lg">
                                <Image
                                    src="https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=1200"
                                    alt="Luxury Property"
                                    fill
                                    className="object-cover"
                                    sizes="(max-width: 1024px) 100vw, 50vw"
                                    priority
                                />
                            </div>

                            {/* Content */}
                            <div className="sm:pr-8">
                                <p className="text-gray-300 sm:mb-6 text-base md:text-lg lg:text-xl xl:text-2xl font-coco-light tracking-wide">
                                    At Right Property Hub, we're dedicated to
                                    helping you find your dream property or get
                                    the best value when selling. Our experienced
                                    agents provide personalized service and
                                    expert guidance throughout your real estate
                                    journey. With us, every step is refined,
                                    seamless, and crafted to match your
                                    lifestyle.
                                </p>
                                <Link
                                    href="/about"
                                    className="mt-4 sm:mt-6 md:mt-8 inline-flex items-center bg-neutral-200 justify-center w-12 h-12 md:w-14 md:h-14 rounded-full border border-gray-600 hover:bg-white/10 transition-colors group"
                                >
                                    <ArrowRight className="w-6 h-6 text-black group-hover:text-primary transition-colors" />
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Property Listings with Filters */}
            <section className="py-20 relative overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="mb-8 relative z-10">
                        <div className="absolute -top-6 left-4 md:left-44 right-0 flex items-center z-0">
                        <span className="font-amsterdam text-2xl md:text-4xl text-gray-400 select-none pointer-events-none opacity-30">
                            Our Properties
                        </span>
                    </div>
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
                            <h2 className="text-3xl md:text-6xl font-medium text-gray-900 font-coco-regular">
                                Explore our premier spaces
                            </h2>
                            <Link
                                href="/properties"
                                className="hidden sm:inline-flex group items-center underline mt-4 text-lg font-medium text-gray-900 hover:text-gray-600 transition-colors"
                            >
                                See our Marketplace
                                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </div>
                        <p className="text-base md:text-lg text-gray-600 md:max-w-xl lg:max-w-2xl font-coco-regular leading-6">
                            Browse our complete collection of available
                            properties and discover the perfect place that fits
                            your lifestyle and future.
                        </p>
                        <div className="relative mt-6">
                            <hr className="border-t md:w-[calc(100%-25rem)] w-[calc(100%-4rem)] border-gray-300" />
                            <div className="absolute right-[calc(25rem)] -top-4 w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center bg-gray-50">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="16"
                                    height="16"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="text-gray-400"
                                >
                                    <line x1="5" y1="12" x2="19" y2="12"></line>
                                    <polyline points="12 5 19 12 12 19"></polyline>
                                </svg>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 md:gap-8">
                        {/* Filters */}
                        <div className="lg:col-span-1 mb-6 lg:mb-0">
                            <PropertyFilters
                                onFiltersChange={setFilters}
                                className="sticky top-24"
                            />
                        </div>

                        {/* Property Grid */}
                        <div className="lg:col-span-3">
                            <div className="mb-6 flex items-center justify-between">
                                <p className="text-gray-600">
                                    Showing {filteredProperties.length} of{" "}
                                    {sampleProperties.length} properties
                                </p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                                {filteredProperties.map((property) => (
                                    <PropertyCard
                                        key={property.id}
                                        property={property}
                                    />
                                ))}
                            </div>

                            {filteredProperties.length === 0 && (
                                <div className="text-center py-12">
                                    <Building className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                                    <h3 className="text-xl font-semibold text-gray-600 mb-2">
                                        No properties found
                                    </h3>
                                    <p className="text-gray-500">
                                        Try adjusting your filters to see more
                                        results.
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </section>

            {/* Testimonials */}
            <section className="py-16 bg-[#eef2f3] relative overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col md:flex-row items-start justify-between gap-8 relative z-10">
                        <div className="md:max-w-md md:pt-6">
                            <span className="inline-block px-3 py-1 text-sm font-medium border border-zinc-800 rounded-full mb-4">
                                Testimonials
                            </span>
                            <h2 className="text-3xl md:text-5xl font-medium text-gray-900 mb-6 font-coco-regular">
                                Discover what clients are saying about us
                            </h2>
                            <div className="flex space-x-4">
                                <button className="testimonial-prev p-3 rounded-full bg-white shadow-md hover:bg-gray-50 transition-colors">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-5 w-5 text-gray-600"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M15 19l-7-7 7-7"
                                        />
                                    </svg>
                                </button>
                                <button className="testimonial-next p-3 rounded-full bg-white shadow-md hover:bg-gray-50 transition-colors">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-5 w-5 text-gray-600"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M9 5l7 7-7 7"
                                        />
                                    </svg>
                                </button>
                            </div>
                        </div>

                        <div className="relative w-full overflow-y-hidden">
                            <div className="testimonial-track flex space-x-6 pt-2 overflow-x-auto scrollbar-hide snap-x snap-mandatory pr-12">
                                {testimonials.map((testimonial, index) => (
                                    <div
                                        key={index}
                                        className="flex-shrink-0 w-80 bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow snap-center"
                                    >
                                        <p className="text-gray-600 leading-relaxed mb-6 font-coco-regular">
                                            "{testimonial.content}"
                                        </p>
                                        <div className="flex items-center space-x-4 pt-8 border-t border-gray-100">
                                            <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
                                                <Image
                                                    src={testimonial.image}
                                                    alt={testimonial.name}
                                                    width={40}
                                                    height={40}
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>
                                            <div className="min-w-0">
                                                <p className="font-medium text-gray-900 text-sm">
                                                    {testimonial.name}
                                                </p>
                                                <p className="text-xs text-gray-500">
                                                    {testimonial.role}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Client Logos Marquee */}
            <section className="py-12 bg-white border-t border-b border-gray-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="mb-8 text-center">
                        <span className="inline-block px-3 py-1 text-sm font-medium border border-zinc-800 rounded-full mb-4">
                            Our Clients
                        </span>
                        <h3 className="text-2xl md:text-3xl font-medium text-gray-900 font-coco-light">
                            Trusted by the best in the business
                        </h3>
                    </div>

                    <div className="relative overflow-hidden">
                        <div className="relative py-6">
                            <div className="flex items-center animate-marquee whitespace-nowrap">
                                {[...Array(3)].map((_, loop) => (
                                    <div
                                        key={loop}
                                        className="inline-flex items-center space-x-12 md:space-x-24 mr-12 md:mr-24"
                                    >
                                        {[
                                            "Client 1",
                                            "Client 2",
                                            "Client 3",
                                            "Client 4",
                                            "Client 5",
                                            "Client 6",
                                        ].map((client, i) => (
                                            <div
                                                key={`${i}-${loop}`}
                                                className="inline-flex items-center justify-center opacity-60 hover:opacity-100 transition-opacity duration-300"
                                            >
                                                <span className="text-2xl md:text-3xl font-coco-light text-gray-700">
                                                    {client}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="relative py-24 overflow-hidden mt-10">
                {/* Background Image */}
                <div className="absolute inset-0 z-0">
                    <Image
                        src="/images/1.jpg"
                        alt="Luxury property"
                        fill
                        className="object-cover"
                        priority
                    />
                    <div className="absolute inset-0 bg-black/60" />
                </div>

                <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
                    <div className="space-y-8">
                        <h2 className="text-3xl md:text-6xl font-light text-white font-coco-regular">
                            Ready to Make your Dream Property a Reality ?
                        </h2>
                        <p className="text-xl text-gray-100 font-coco-light max-w-2xl mx-auto">
                            Explore a curated selection that aligns with your vision and goals.
                        </p>
                        <div>
                            <Button 
                                className="px-8 py-4 text-lg rounded-3xl bg-white text-gray-900 hover:bg-gray-100 transition-colors font-medium group"
                                size="lg"
                            >
                                View Properties
                                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                            </Button>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default HomePage;
