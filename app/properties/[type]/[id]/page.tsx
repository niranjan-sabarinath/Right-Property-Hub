"use client";

import React, { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import PropertyCard from "@/components/property-card";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
    MapPin,
    Bed,
    Bath,
    Ruler,
    Phone,
    Mail,
    Heart,
    ArrowLeft,
} from "lucide-react";
import {
    getPropertyById,
    getPropertiesByType,
    type Property,
} from "@/data/properties";

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

    // Get property data from global properties
    const property = getPropertyById(effectiveId as string);

    // Redirect to 404 if property not found
    const router = useRouter();
    if (!property) {
        router.push("/404");
        return null;
    }

    // Get similar properties of the same type
    const similarProperties = getPropertiesByType(effectiveType as string)
        .filter((p) => p.id !== effectiveId) // Exclude current property
        .slice(0, 4); // Limit to 4 similar properties

    return (
        <div className="min-h-screen flex flex-col">
            <main className="flex-1 pt-10">
                {/* Back button */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <Link
                        href={`/properties/${property?.propertyLocation}`}
                        className="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors group"
                    >
                        <ArrowLeft className="w-5 h-5 mr-2 transition-transform group-hover:-translate-x-1" />
                        Back to {property?.propertyLocation === 'dubai' ? 'Dubai' : 'India'} Properties
                    </Link>
                </div>

                <div className="bg-gray-50 pb-8">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            {/* Left Column - Property Gallery and Details */}
                            <div className="lg:col-span-2 space-y-8">
                                {/* Property Gallery */}
                                <div className="space-y-4">
                                    <div className="relative h-[500px] w-full rounded-xl overflow-hidden shadow-lg">
                                        <Image
                                            src={
                                                property.images
                                                    ? property.images[
                                                          activeImage
                                                      ] || property.image
                                                    : property.image
                                            }
                                            alt={`${property.title} main image`}
                                            fill
                                            className="object-cover transition-opacity duration-300"
                                            priority
                                        />
                                        <button
                                            onClick={() =>
                                                setIsFavorite(!isFavorite)
                                            }
                                            className="absolute top-4 right-4 p-2.5 bg-white/90 backdrop-blur-sm rounded-full shadow-md hover:bg-white transition-colors"
                                            aria-label={
                                                isFavorite
                                                    ? "Remove from favorites"
                                                    : "Add to favorites"
                                            }
                                        >
                                            <Heart
                                                className={`w-5 h-5 ${
                                                    isFavorite
                                                        ? "fill-red-500 text-red-500"
                                                        : "text-gray-400"
                                                }`}
                                            />
                                        </button>
                                    </div>

                                    {/* Thumbnails */}
                                    <div className="flex gap-3 overflow-x-auto pb-2 -mx-2 px-2 md:pl-4">
                                        {(
                                            property.images || [property.image]
                                        ).map((img, index) => {
                                            const imageSrc =
                                                typeof img === "string"
                                                    ? img
                                                    : img;
                                            return (
                                                <button
                                                    key={index}
                                                    className={`relative h-20 w-20 flex-shrink-0 rounded-lg overflow-hidden transition-all top-1 duration-200 ${
                                                        activeImage === index
                                                            ? "ring-2 ring-primary ring-offset-2"
                                                            : "opacity-70 hover:opacity-100 hover:scale-105"
                                                    }`}
                                                    onClick={() =>
                                                        setActiveImage(index)
                                                    }
                                                    aria-label={`View image ${
                                                        index + 1
                                                    }`}
                                                >
                                                    <Image
                                                        src={imageSrc}
                                                        alt=""
                                                        fill
                                                        className="object-cover"
                                                    />
                                                </button>
                                            );
                                        })}
                                    </div>
                                </div>

                                <div className="max-w-7xl mx-auto">
                                    <div className="w-full">
                                        <Card>
                                            <CardHeader>
                                                <CardTitle className="uppercase">
                                                {property.title}
                                                </CardTitle>
                                            </CardHeader>
                                            <hr className="mx-6" />
                                            <CardContent>
                                                <div className="mt-4">
                                                    <p className="text-gray-600">
                                                        {property.description ||
                                                            "No description available for this property."}
                                                    </p>
                                                </div>

                                                <div className="mt-8">
                                                    <h3 className="text-xl font-semibold mb-4">
                                                        Property Details
                                                    </h3>
                                                    <div className="grid grid-cols-2 gap-4">
                                                        <div className="flex justify-between py-2 border-b">
                                                            <span className="text-gray-600">
                                                                Property Type
                                                            </span>
                                                            <span className="font-medium capitalize">
                                                                {property.type}
                                                            </span>
                                                        </div>
                                                        {property.yearBuilt && (
                                                            <div className="flex justify-between py-2 border-b">
                                                                <span className="text-gray-600">
                                                                    Year Built
                                                                </span>
                                                                <span className="font-medium">
                                                                    {
                                                                        property.yearBuilt
                                                                    }
                                                                </span>
                                                            </div>
                                                        )}
                                                        {property.garage !==
                                                            undefined && (
                                                            <div className="flex justify-between py-2 border-b">
                                                                <span className="text-gray-600">
                                                                    Garage
                                                                </span>
                                                                <span className="font-medium">
                                                                    {
                                                                        property.garage
                                                                    }{" "}
                                                                    {property.garage ===
                                                                    1
                                                                        ? "space"
                                                                        : "spaces"}
                                                                </span>
                                                            </div>
                                                        )}
                                                        <div className="flex justify-between py-2 border-b">
                                                            <span className="text-gray-600">
                                                                Status
                                                            </span>
                                                            <span
                                                                className={`font-medium ${
                                                                    property.status ===
                                                                        "For Sale" ||
                                                                    property.status ===
                                                                        "For Rent"
                                                                        ? "text-green-600"
                                                                        : "text-gray-600"
                                                                }`}
                                                            >
                                                                {
                                                                    property.status
                                                                }
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>

                                                {property.amenities &&
                                                    property.amenities.length >
                                                        0 && (
                                                        <div className="mt-8">
                                                            <h3 className="text-xl font-semibold mb-4">
                                                                Features
                                                            </h3>
                                                            <div className="grid grid-cols-2 gap-2">
                                                                {property.amenities.map(
                                                                    (
                                                                        amenity,
                                                                        index
                                                                    ) => (
                                                                        <div
                                                                            key={
                                                                                index
                                                                            }
                                                                            className="flex items-center"
                                                                        >
                                                                            <span className="w-2 h-2 bg-primary rounded-full mr-2"></span>
                                                                            <span>
                                                                                {
                                                                                    amenity
                                                                                }
                                                                            </span>
                                                                        </div>
                                                                    )
                                                                )}
                                                            </div>
                                                        </div>
                                                    )}
                                            </CardContent>
                                        </Card>
                                    </div>
                                </div>
                            </div>

                            {/* Right Column - Property Info and Company Contact */}
                            <div className="space-y-6">
                                <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                                    <div className="p-6">
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <h1 className="text-2xl font-bold text-gray-900">
                                                    {property.price}
                                                    {property.status ===
                                                        "For Rent" && (
                                                        <span className="text-sm text-gray-500 ml-1">
                                                            /month
                                                        </span>
                                                    )}
                                                </h1>
                                                <div className="flex items-center text-gray-600 mt-1">
                                                    <MapPin className="h-4 w-4 mr-1.5 flex-shrink-0" />
                                                    <span className="text-sm">
                                                        {property.location}
                                                    </span>
                                                </div>
                                            </div>
                                            <span
                                                className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                                                    property.status ===
                                                    "For Sale"
                                                        ? "bg-green-100 text-green-800"
                                                        : property.status ===
                                                          "For Rent"
                                                        ? "bg-blue-100 text-blue-800"
                                                        : property.status ===
                                                          "Sold"
                                                        ? "bg-red-100 text-red-800"
                                                        : "bg-gray-100 text-gray-800"
                                                }`}
                                            >
                                                {property.status}
                                            </span>
                                        </div>

                                        <div className="grid grid-cols-3 gap-4 mt-6">
                                            <div className="text-center p-3 bg-gray-50 rounded-lg">
                                                <Bed className="h-6 w-6 text-primary mx-auto mb-1" />
                                                <div className="text-sm text-gray-500">
                                                    Bedrooms
                                                </div>
                                                <div className="font-medium text-gray-900">
                                                    {property.bedrooms}
                                                </div>
                                            </div>
                                            <div className="text-center p-3 bg-gray-50 rounded-lg">
                                                <Bath className="h-6 w-6 text-primary mx-auto mb-1" />
                                                <div className="text-sm text-gray-500">
                                                    Bathrooms
                                                </div>
                                                <div className="font-medium text-gray-900">
                                                    {property.bathrooms}
                                                </div>
                                            </div>
                                            <div className="text-center p-3 bg-gray-50 rounded-lg">
                                                <Ruler className="h-6 w-6 text-primary mx-auto mb-1" />
                                                <div className="text-sm text-gray-500">
                                                    Area
                                                </div>
                                                <div className="font-medium text-gray-900">
                                                    {property.area}
                                                    {typeof property.area ===
                                                    "number"
                                                        ? " sq.ft"
                                                        : ""}
                                                </div>
                                            </div>
                                        </div>

                                        {property.yearBuilt && (
                                            <div className="mt-4 pt-4 border-t border-gray-100">
                                                <div className="flex justify-between py-1">
                                                    <span className="text-gray-600">
                                                        Year Built
                                                    </span>
                                                    <span className="font-medium">
                                                        {property.yearBuilt}
                                                    </span>
                                                </div>
                                            </div>
                                        )}
                                        {property.garage !== undefined && (
                                            <div className="flex justify-between py-1">
                                                <span className="text-gray-600">
                                                    Garage
                                                </span>
                                                <span className="font-medium">
                                                    {property.garage}{" "}
                                                    {property.garage === 1
                                                        ? "space"
                                                        : "spaces"}
                                                </span>
                                            </div>
                                        )}
                                        <div className="flex justify-between py-1">
                                            <span className="text-gray-600">
                                                Property Type
                                            </span>
                                            <span className="font-medium capitalize">
                                                {property.type}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Agent Contact */}
                                    <div className="border-t border-gray-100 p-6">
                                        <h3 className="text-lg font-semibold mb-4">
                                            Contact Agent
                                        </h3>
                                        {property.agent ? (
                                            <div className="space-y-4">
                                                <div className="flex items-center space-x-4">
                                                    {property.agent.image ? (
                                                        <div className="relative h-14 w-14 rounded-full overflow-hidden">
                                                            <Image
                                                                src={
                                                                    property
                                                                        .agent
                                                                        .image
                                                                }
                                                                alt={
                                                                    property
                                                                        .agent
                                                                        .name
                                                                }
                                                                fill
                                                                className="object-cover"
                                                            />
                                                        </div>
                                                    ) : (
                                                        <div className="h-14 w-14 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                                                            <span className="text-xl font-medium">
                                                                {property.agent.name
                                                                    .split(" ")
                                                                    .map(
                                                                        (n) =>
                                                                            n[0]
                                                                    )
                                                                    .join("")
                                                                    .toUpperCase()}
                                                            </span>
                                                        </div>
                                                    )}
                                                    <div>
                                                        <h4 className="font-medium text-gray-900">
                                                            {
                                                                property.agent
                                                                    .name
                                                            }
                                                        </h4>
                                                        <p className="text-sm text-gray-500">
                                                            Real Estate Agent
                                                        </p>
                                                    </div>
                                                </div>

                                                <div className="space-y-2">
                                                    {property.agent.phone && (
                                                        <a
                                                            href={`tel:${property.agent.phone}`}
                                                            className="flex items-center text-gray-700 hover:text-primary transition-colors p-2 -mx-2 rounded-lg hover:bg-gray-50"
                                                        >
                                                            <Phone className="h-5 w-5 mr-2 text-gray-400" />
                                                            {
                                                                property.agent
                                                                    .phone
                                                            }
                                                        </a>
                                                    )}
                                                    {property.agent.email && (
                                                        <a
                                                            href={`mailto:${property.agent.email}`}
                                                            className="flex items-center text-gray-700 hover:text-primary transition-colors p-2 -mx-2 rounded-lg hover:bg-gray-50"
                                                        >
                                                            <Mail className="h-5 w-5 mr-2 text-gray-400" />
                                                            {
                                                                property.agent
                                                                    .email
                                                            }
                                                        </a>
                                                    )}
                                                </div>

                                                <p className="text-gray-600 mb-4">
                                                    No agent information
                                                    available
                                                </p>
                                            </div>
                                        ) : (
                                            <div className="text-center py-4">
                                                <p className="text-gray-600 mb-4">
                                                    No agent information
                                                    available
                                                </p>
                                                <Button
                                                    asChild
                                                    className="w-full"
                                                >
                                                    <Link href="/contact">
                                                        Contact Us
                                                    </Link>
                                                </Button>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Company Contact Info */}
                                <div className="bg-white rounded-xl shadow-lg p-6 mt-6 hidden md:block">
                                    <div className="flex flex-col items-center text-center">
                                        {/* Logo */}
                                        <div>
                                            <div className="flex justify-center">
                                                <Image
                                                    src="/images/logo.png"
                                                    alt="Right Property Hub Logo"
                                                    width={60}
                                                    height={60}
                                                    className="h-15 w-auto"
                                                />
                                            </div>
                                        </div>

                                        {/* Contact Info */}
                                        <div className="space-y-3 w-full">
                                            <div className="flex items-center justify-center text-gray-700">
                                                <Mail className="h-5 w-5 mr-2 text-primary" />
                                                <a
                                                    href="mailto:info@rightpropertyhub.com"
                                                    className="hover:text-primary transition-colors"
                                                >
                                                    info@rightpropertyhub.com
                                                </a>
                                            </div>
                                            <div className="flex items-center justify-center text-gray-700">
                                                <Phone className="h-5 w-5 mr-2 text-primary" />
                                                <a
                                                    href="tel:+1234567890"
                                                    className="hover:text-primary transition-colors"
                                                >
                                                    +1 (234) 567-890
                                                </a>
                                            </div>
                                        </div>

                                        {/* Social Icons */}
                                        <div className="flex space-x-4 mt-4">
                                            <a
                                                href="#"
                                                className="text-gray-500 hover:text-primary transition-colors"
                                                aria-label="Facebook"
                                            >
                                                <svg
                                                    className="h-6 w-6"
                                                    fill="currentColor"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                                                </svg>
                                            </a>
                                            <a
                                                href="#"
                                                className="text-gray-500 hover:text-primary transition-colors"
                                                aria-label="Twitter"
                                            >
                                                <svg
                                                    className="h-6 w-6"
                                                    fill="currentColor"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                                                </svg>
                                            </a>
                                            <a
                                                href="#"
                                                className="text-gray-500 hover:text-primary transition-colors"
                                                aria-label="Instagram"
                                            >
                                                <svg
                                                    className="h-6 w-6"
                                                    fill="currentColor"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12.001 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                                                </svg>
                                            </a>
                                            <a
                                                href="#"
                                                className="text-gray-500 hover:text-primary transition-colors"
                                                aria-label="LinkedIn"
                                            >
                                                <svg
                                                    className="h-6 w-6"
                                                    fill="currentColor"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                                                </svg>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Similar Properties */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <div className="container mx-auto">
                        <h2 className="text-2xl font-bold mb-6">
                            Similar Properties
                        </h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {similarProperties.length > 0 ? (
                                similarProperties.map((similarProperty) => (
                                    <div
                                        key={similarProperty.id}
                                        className="hover:shadow-lg transition-shadow duration-200 rounded-xl overflow-hidden"
                                    >
                                        <PropertyCard
                                            property={{
                                                ...similarProperty,
                                                price: similarProperty.price,
                                                location:
                                                    similarProperty.location,
                                                bedrooms:
                                                    similarProperty.bedrooms,
                                                bathrooms:
                                                    similarProperty.bathrooms,
                                                area: similarProperty.area,
                                                image: similarProperty.image,
                                                type: similarProperty.type,
                                                status: similarProperty.status,
                                            }}
                                        />
                                    </div>
                                ))
                            ) : (
                                <div className="col-span-full text-center py-8">
                                    <p className="text-gray-500">
                                        No similar properties found.
                                    </p>
                                    <Link
                                        href={`/properties/${effectiveType}`}
                                        className="mt-4 inline-flex items-center text-primary hover:underline"
                                    >
                                        Browse all {effectiveType} properties
                                        <svg
                                            className="w-4 h-4 ml-1.5"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M14 5l7 7m0 0l-7 7m7-7H3"
                                            />
                                        </svg>
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default PropertyDetailPage;
