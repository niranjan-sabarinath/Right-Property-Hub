"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Search, Building, ArrowRight } from "lucide-react";
import { motion, useAnimation, useInView } from "framer-motion";

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
            <section className="relative min-h-screen flex items-center overflow-hidden">
                {/* Background Image */}
                <div className="absolute inset-0 z-0">
                    <Image
                        src="https://e0.pxfuel.com/wallpapers/235/937/desktop-wallpaper-building-background-super-building-buildings.jpg"
                        alt="Luxury Home"
                        fill
                        className="object-cover"
                        priority
                    />
                    {/* Gradient overlay for better text contrast */}
                    <div className="absolute inset-0 bg-gradient-to-r from-white/90 via-white/60 to-transparent" />
                </div>

                <div className="relative z-10 text-left px-6 sm:px-8 lg:px-12 max-w-4xl pt-32 pb-40 md:pt-40 md:pb-48">
                    <h1 className="text-4xl sm:text-5xl md:text-6xl font-coco-regular mb-6 animate-fade-in text-gray-900">
                        A place for today, a story for tomorrow, a home for a lifetime.
                    </h1>
                    <p className="text-lg sm:text-xl md:text-2xl font-coco-light mb-8 text-gray-700 animate-slide-up max-w-2xl">
                        Every great journey starts with finding the perfect place to call home. 
                        Let us guide you to properties that don't just meet your needs, but inspire your future.
                    </p>

                    {/* Hero Search */}
                    <div className="bg-white/80 backdrop-blur-sm p-4 sm:p-5 max-w-2xl animate-scale-in rounded-lg border border-gray-200 shadow-lg">
                        <div className="flex flex-col md:flex-row gap-4">
                            <div className="flex-1 relative">
                                <Search className="absolute left-3 top-3.5 w-5 h-5 text-gray-500" />
                                <Input
                                    placeholder="Search by location, property type, or keyword..."
                                    value={searchTerm}
                                    onChange={(e) =>
                                        setSearchTerm(e.target.value)
                                    }
                                    className="pl-10 h-12 bg-white/90 border-gray-300 text-gray-900 placeholder-gray-500 focus:border-primary/50 focus-visible:ring-1 focus-visible:ring-primary/50 focus-visible:ring-offset-1"
                                />
                            </div>
                            <Button
                                size="lg"
                                variant="outline"
                                className="h-12 px-8 bg-primary text-white border-primary hover:bg-primary/90 hover:border-primary/90 transition-colors"
                            >
                                Search Properties
                            </Button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Featured Properties */}
            <section className="pt-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="mb-8">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
                            <h2 className="text-3xl md:text-6xl font-medium text-gray-900 font-coco-regular">
                                Discover
                            </h2>
                            <Link
                                href="/properties"
                                className="group inline-flex items-center underline mt-4 text-lg font-medium text-gray-900 hover:text-gray-600 transition-colors"
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
                        <hr className="mt-3" />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 mb-8 md:mb-12">
                        {featuredProperties.map((property) => (
                            <div
                                key={property.id}
                                className="group cursor-pointer"
                            >
                                {/* Image Container */}
                                <div className="relative aspect-[2/3] overflow-hidden rounded-xl mb-4">
                                    <div className="relative w-full h-full">
                                        <Image
                                            src={property.image}
                                            alt={property.title}
                                            fill
                                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                                        />
                                        {/* Shine Effect */}
                                        <motion.div
                                            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent z-10 pointer-events-none"
                                            initial={{ x: "-100%" }}
                                            animate={{
                                                x: ["-100%", "100%"],
                                            }}
                                            transition={{
                                                x: {
                                                    repeat: Infinity,
                                                    repeatType: "loop",
                                                    duration: 3,
                                                    ease: "easeInOut",
                                                    repeatDelay: 1,
                                                },
                                            }}
                                            style={{
                                                transform: "skewX(-20deg)",
                                            }}
                                        />
                                    </div>
                                    {/* Status Badge */}
                                    <div className="absolute top-3 left-3">
                                        <span
                                            className={`inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium ${
                                                property.status === "For Sale"
                                                    ? "bg-green-100 text-green-800"
                                                    : property.status ===
                                                      "For Rent"
                                                    ? "bg-blue-100 text-blue-800"
                                                    : "bg-gray-100 text-gray-800"
                                            }`}
                                        >
                                            {property.status}
                                        </span>
                                    </div>
                                </div>

                                {/* Property Info */}
                                <div className="ml-1">
                                    <h3 className="text-lg font-coco-regular text-gray-900 group-hover:text-primary transition-colors">
                                        {property.title}
                                    </h3>
                                    <p className="text-gray-600 flex items-center">
                                        <span className="text-sm font-coco-light">
                                            {property.location}
                                        </span>
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="py-12 md:py-20 md:pt-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <hr className="mb-8 md:mb-10" />
                    <div className="mb-8">
                        <span className="inline-block px-3 py-1 text-sm font-medium border border-zinc-800 rounded-full mb-4">
                            What We Do
                        </span>
                        <h2 className="text-3xl md:text-6xl font-medium text-gray-900 font-coco-regular">
                            Guiding you through every step of buying, selling,
                            and living with confidence
                        </h2>
                    </div>
                    <div className="bg-neutral-900 p-4 sm:p-6 lg:p-8 rounded-lg">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
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
                            <div className="pr-8">
                                <p className="text-gray-300 mb-6 text-base md:text-lg lg:text-xl xl:text-2xl font-coco-light tracking-wide">
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
                                    className="mt-6 md:mt-8 inline-flex items-center bg-neutral-200 justify-center w-12 h-12 md:w-14 md:h-14 rounded-full border border-gray-600 hover:bg-white/10 transition-colors group"
                                >
                                    <ArrowRight className="w-6 h-6 text-black group-hover:text-primary transition-colors" />
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Property Listings with Filters */}
            <section className="py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="mb-8">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
                            <h2 className="text-3xl md:text-6xl font-medium text-gray-900 font-coco-regular">
                                Homes for you
                            </h2>
                            <Link
                                href="/properties"
                                className="group inline-flex items-center underline mt-4 text-lg font-medium text-gray-900 hover:text-gray-600 transition-colors"
                            >
                                See our Marketplace
                                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </div>
                        <p className="text-base md:text-lg text-gray-600 max-w-2xl font-coco-regular leading-6">
                            Browse our complete collection of available
                            properties and discover the perfect place that fits
                            your lifestyle and future.
                        </p>
                        <hr className="mt-3" />
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
            <section className="py-16 bg-gray-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ">
                    <div className="flex flex-col md:flex-row items-start justify-between gap-8">
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

            {/* CTA Section */}
            <section className="relative py-24 overflow-hidden mx-6 rounded-t-3xl mt-10">
                {/* Background Image */}
                <div className="absolute inset-0 z-0">
                    <Image
                        src="https://www.constructionweekonline.in/cloud/2021/11/25/qql7Fgdl-luxury_1-3.jpg"
                        alt="Luxury property"
                        fill
                        className="object-cover"
                        priority
                    />
                    <div className="absolute inset-0 bg-black/50" />
                </div>

                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
                    <div className="grid lg:grid-cols-2 md:px-16 items-center text-center">
                        {/* Left Side - Work With Us */}
                        <div className="bg-black/60 p-8 py-16 text-white shadow-sm flex flex-col items-center">
                            <h2 className="text-2xl md:text-3xl font-light tracking-wider font-coco-regular">
                                WORK WITH US
                            </h2>
                            <p className="my-6 max-w-md font-coco-light">
                                We are committed to the highest level of
                                expertise, knowledge and service. Your real
                                estate inquiries are important to us, so please
                                expect a prompt reply.
                            </p>
                            <Button variant="outline" className="px-8 py-3 bg-transparent border-white text-white hover:border-gray-800 ">
                                Let's Connect
                            </Button>
                        </div>

                        {/* Right Side - Newsletter */}
                        <div className=" p-8 py-12 border text-white border-white border-l-0">
                            <h3 className="text-2xl font-light mb-2 tracking-wider font-coco-regular">
                                NEWSLETTER
                            </h3>
                            <p className="mb-6 font-coco-light">
                                Subscribe to get our weekly newsletter
                            </p>
                            <form className="mt-8">
                                <div className="flex flex-col sm:flex-row gap-4">
                                    <Input
                                        type="email"
                                        placeholder="Your email"
                                        className="flex-1 px-4 py-3 bg-transparent border-2 border-white/50 text-white placeholder-gray-300 focus:border-white/80 focus:ring-0"
                                        required
                                    />
                                    <Button
                                        type="submit"
                                        variant="outline"
                                        className="px-8 py-3 bg-transparent border-2 border-white/70 text-white hover:bg-white/10 hover:border-white transition-colors"
                                    >
                                        Subscribe
                                    </Button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default HomePage;
