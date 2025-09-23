"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useSearchParams } from "next/navigation";
import dynamic from "next/dynamic";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { properties } from "@/data/properties";
import { Property } from "@/data/properties";
import PropertyListing from "@/components/property-listing";

// Import the PropertyListing component's props type
import type { PropertyListingProps } from "@/components/property-listing";

// Define valid location types
type LocationType = "dubai" | "india";

// Import PropertyListing with SSR disabled to avoid hydration issues
const PropertyListingDynamic = dynamic<PropertyListingProps>(
    () => import("@/components/property-listing").then((mod) => mod.default),
    {
        ssr: false,
        loading: () => (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3].map((i) => (
                    <div
                        key={i}
                        className="rounded-xl overflow-hidden shadow-md"
                    >
                        <Skeleton className="h-48 w-full" />
                        <div className="p-4">
                            <Skeleton className="h-6 w-3/4 mb-2" />
                            <Skeleton className="h-4 w-1/2 mb-4" />
                            <div className="flex justify-between">
                                <Skeleton className="h-4 w-16" />
                                <Skeleton className="h-4 w-16" />
                                <Skeleton className="h-4 w-16" />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        ),
    }
);

// Location data
const locations = [
    { id: "dubai" as const, name: "Dubai" },
    { id: "india" as const, name: "India" },
] as const;

// Property type filter options
const propertyTypes = [
    { id: "all" as const, name: "All Types" },
    { id: "residential" as const, name: "Residential" },
    { id: "commercial" as const, name: "Commercial" },
    { id: "vacation" as const, name: "Vacation Homes" },
    { id: "luxury" as const, name: "Luxury Estates" },
] as const;

interface TypePageProps {
    params: {
        type: LocationType;
    };
}

// Get properties by location
const getPropertiesByLocation = (
    properties: Property[],
    location: LocationType
) => {
    return properties.filter((property) => property.locationType === location);
};

// Get the count of properties for each tab
const getPropertyCount = (
    status: string,
    properties: Property[],
    location: LocationType
) => {
    return properties.filter(
        (property) =>
            property.locationType === location &&
            (status === "all" || property.status === status)
    ).length;
};

// Format number to Indian currency format
const formatCurrency = (num: number): string => {
    return new Intl.NumberFormat("en-IN", {
        maximumFractionDigits: 0,
    }).format(num);
};

// Calculate EMI
const calculateEMI = (
    principal: number,
    rate: number,
    years: number
): number => {
    const monthlyRate = rate / 12 / 100;
    const numPayments = years * 12;
    return (
        (principal * monthlyRate * Math.pow(1 + monthlyRate, numPayments)) /
        (Math.pow(1 + monthlyRate, numPayments) - 1)
    );
};

export default function TypePage({ params }: TypePageProps) {
    const searchParams = useSearchParams();
    const [activeTab, setActiveTab] = useState<"all" | "sale" | "rent">("all");
    // Removed propertyType state as it's no longer needed
    // The property type is now determined by the URL parameter

    // Loan calculator state
    const [propertyPrice, setPropertyPrice] = useState<number>(5000000);
    const [downPayment, setDownPayment] = useState<number>(1000000);
    const [loanTerm, setLoanTerm] = useState<number>(20);
    const [interestRate, setInterestRate] = useState<number>(8.5);
    const [emi, setEmi] = useState<number>(0);
    const [totalInterest, setTotalInterest] = useState<number>(0);
    const [totalPayment, setTotalPayment] = useState<number>(0);
    const [ltvRatio, setLtvRatio] = useState<number>(80);

    // Calculate loan details
    const calculateLoanDetails = useCallback(() => {
        const loanAmount = propertyPrice - downPayment;
        const monthlyEmi = calculateEMI(loanAmount, interestRate, loanTerm);
        const totalMonths = loanTerm * 12;
        const totalPayment = monthlyEmi * totalMonths;
        const totalInterestPaid = totalPayment - loanAmount;
        const calculatedLtv = (loanAmount / propertyPrice) * 100;

        setEmi(monthlyEmi);
        setTotalInterest(totalInterestPaid);
        setTotalPayment(totalPayment);
        setLtvRatio(calculatedLtv);
    }, [propertyPrice, downPayment, loanTerm, interestRate]);

    // Update down payment when property price changes
    useEffect(() => {
        const newDownPayment = Math.round(propertyPrice * 0.2);
        setDownPayment(newDownPayment);
    }, [propertyPrice]);

    // Update down payment percentage
    useEffect(() => {
        const downPaymentPercent = Math.round(
            (downPayment / propertyPrice) * 100
        );
        setLtvRatio(100 - downPaymentPercent);
    }, [downPayment, propertyPrice]);

    // Recalculate when inputs change
    useEffect(() => {
        calculateLoanDetails();
    }, [calculateLoanDetails]);

    // Handle input changes
    const handlePropertyPriceChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        setPropertyPrice(Number(e.target.value));
    };

    const handleDownPaymentChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        setDownPayment(Number(e.target.value));
    };

    const handleLoanTermChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const years = Number(e.target.value);
        setLoanTerm(years);
    };

    const handleInterestRateChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        setInterestRate(Number(e.target.value));
    };

    // Get the current location from URL params
    const currentLocation = locations.find((loc) => loc.id === params.type);

    // Filter properties by location, status, and type
    const filteredProperties = React.useMemo(() => {
        let result = getPropertiesByLocation(properties, params.type);

        // Filter by status (sale/rent)
        if (activeTab === "sale") {
            result = result.filter(
                (property) => property.status === "For Sale"
            );
        } else if (activeTab === "rent") {
            result = result.filter(
                (property) => property.status === "For Rent"
            );
        }

        return result;
    }, [params.type, activeTab]);

    // Set the active tab based on URL params
    React.useEffect(() => {
        const status = searchParams.get("status");
        if (status === "sale" || status === "rent") {
            setActiveTab(status as "sale" | "rent");
        } else {
            setActiveTab("all");
        }

        // Set location from URL params if available
        const loc = searchParams.get("location");
        if (loc === "dubai" || loc === "india") {
            // setLocation(loc);
        } else {
            // setLocation('all');
        }
    }, [searchParams]);

    // Handle tab change (sale/rent)
    const handleTabChange = (tab: "all" | "sale" | "rent") => {
        setActiveTab(tab);
    };

    // Handle property type change is no longer needed as we've removed the type filter
    // The type is now determined by the URL parameter

    if (!currentLocation) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-4xl font-bold mb-4">404</h1>
                    <p className="text-xl">Location not found</p>
                    <Link
                        href="/"
                        className="mt-4 inline-block text-primary hover:underline"
                    >
                        Go back home
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <main className="container mx-auto py-8">
            {/* Property Listing */}
            <div className="mb-12 max-w-7xl mx-auto">
                {filteredProperties.length > 0 ? (
                    <PropertyListingDynamic
                        properties={filteredProperties}
                        filters={{
                            status: activeTab,
                            bedrooms: "all",
                            sort: "featured",
                            minPrice: "",
                            maxPrice: "",
                        }}
                        defaultLocation={params.type}
                        showLocationFilter={false}
                    />
                ) : (
                    <div className="text-center py-12">
                        <h3 className="text-lg font-medium text-gray-900 mb-2">
                            No properties found
                        </h3>
                        <p className="text-gray-500 mb-6">
                            Try adjusting your filters or check back later for
                            new listings.
                        </p>
                        <Button
                            variant="outline"
                            onClick={() => {
                                setActiveTab("all");
                            }}
                        >
                            Clear Filters
                        </Button>
                    </div>
                )}
            </div>

            {/* Home Loan Calculator Section */}
            <section className="py-12 md:py-16 bg-gradient-to-br bg-white w-full">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12 max-w-2xl mx-auto">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
                            Estimate Your Home Loan
                        </h2>
                        <p className="text-gray-600">
                            Calculate your monthly payments and plan your home
                            purchase with confidence
                        </p>
                    </div>

                    <div className="bg-white rounded-2xl shadow-lg overflow-hidden border">
                        <div className="grid grid-cols-1 lg:grid-cols-12">
                            {/* Input Section */}
                            <div className="lg:col-span-7 p-6 md:p-8">
                                {/* Property Price */}
                                <div className="mb-6">
                                    <div className="flex justify-between items-center mb-2">
                                        <label
                                            htmlFor="propertyPrice"
                                            className="block text-sm font-medium text-gray-700"
                                        >
                                            Property Value
                                        </label>
                                        <span className="text-sm text-gray-500">
                                            ₹{formatCurrency(propertyPrice)}
                                        </span>
                                    </div>
                                    <div className="relative">
                                        <input
                                            type="range"
                                            id="propertyPrice"
                                            min="100000"
                                            max="10000000"
                                            step="10000"
                                            value={propertyPrice}
                                            onChange={handlePropertyPriceChange}
                                            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary"
                                        />
                                        <div className="flex justify-between text-xs text-gray-500 mt-2 px-1">
                                            <span>10L</span>
                                            <span>25L</span>
                                            <span>50L</span>
                                            <span>75L</span>
                                            <span>1Cr+</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Down Payment */}
                                <div className="mb-6">
                                    <div className="flex justify-between items-center mb-2">
                                        <label
                                            htmlFor="downPayment"
                                            className="block text-sm font-medium text-gray-700"
                                        >
                                            Down Payment
                                        </label>
                                        <div className="text-right">
                                            <span className="text-sm font-medium">
                                                ₹{formatCurrency(downPayment)}
                                            </span>
                                            <span className="ml-2 text-xs text-gray-500">
                                                (
                                                {Math.round(
                                                    (downPayment /
                                                        propertyPrice) *
                                                        100
                                                )}
                                                %)
                                            </span>
                                        </div>
                                    </div>
                                    <div className="relative">
                                        <input
                                            type="range"
                                            min="10"
                                            max="90"
                                            step="1"
                                            value={Math.round(
                                                (downPayment / propertyPrice) *
                                                    100
                                            )}
                                            onChange={(e) => {
                                                const percent = parseInt(
                                                    e.target.value
                                                );
                                                setDownPayment(
                                                    Math.round(
                                                        (percent / 100) *
                                                            propertyPrice
                                                    )
                                                );
                                            }}
                                            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary"
                                        />
                                        <div className="flex justify-between text-xs text-gray-500 mt-2 px-1">
                                            <span>10%</span>
                                            <span>25%</span>
                                            <span>50%</span>
                                            <span>75%</span>
                                            <span>90%</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Loan Term */}
                                <div className="mb-6">
                                    <div className="flex justify-between items-center mb-2">
                                        <label
                                            htmlFor="loanTerm"
                                            className="block text-sm font-medium text-gray-700"
                                        >
                                            Loan Tenure
                                        </label>
                                        <span className="text-sm font-medium">
                                            {loanTerm} years
                                        </span>
                                    </div>
                                    <div className="relative">
                                        <input
                                            type="range"
                                            id="loanTerm"
                                            min="5"
                                            max="30"
                                            step="1"
                                            value={loanTerm}
                                            onChange={handleLoanTermChange}
                                            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary"
                                        />
                                        <div className="flex justify-between text-xs text-gray-500 mt-2 px-1">
                                            <span>5y</span>
                                            <span>10y</span>
                                            <span>15y</span>
                                            <span>20y</span>
                                            <span>25y</span>
                                            <span>30y</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Interest Rate */}
                                <div className="mb-2">
                                    <div className="flex justify-between items-center mb-2">
                                        <label
                                            htmlFor="interestRate"
                                            className="block text-sm font-medium text-gray-700"
                                        >
                                            Interest Rate
                                        </label>
                                        <div className="flex items-center">
                                            <span className="text-sm font-medium">
                                                {interestRate}%
                                            </span>
                                            <span className="ml-1 text-xs text-gray-500">
                                                p.a.
                                            </span>
                                        </div>
                                    </div>
                                    <div className="relative">
                                        <input
                                            type="range"
                                            id="interestRate"
                                            min="6"
                                            max="15"
                                            step="0.1"
                                            value={interestRate}
                                            onChange={handleInterestRateChange}
                                            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary"
                                        />
                                        <div className="flex justify-between text-xs text-gray-500 mt-2 px-1">
                                            <span>6%</span>
                                            <span>9%</span>
                                            <span>12%</span>
                                            <span>15%</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Results Section */}
                            <div className="lg:col-span-5 bg-primary text-white p-6 md:p-8">
                                <div className="h-full flex flex-col">
                                    <h3 className="text-xl font-bold mb-6">
                                        Your Monthly Payment
                                    </h3>

                                    <div className="flex-1 flex flex-col justify-center">
                                        <div className="text-center mb-8">
                                            <div className="text-4xl md:text-5xl font-bold mb-2">
                                                ₹{formatCurrency(emi)}
                                            </div>
                                            <div className="text-primary-100">
                                                per month
                                            </div>
                                        </div>

                                        <div className="space-y-4 mb-8">
                                            <div className="flex justify-between items-center pb-2 border-b border-primary-300/30">
                                                <span className="text-primary-100">
                                                    Loan Amount
                                                </span>
                                                <span className="font-medium">
                                                    ₹
                                                    {formatCurrency(
                                                        propertyPrice -
                                                            downPayment
                                                    )}
                                                </span>
                                            </div>
                                            <div className="flex justify-between items-center pb-2 border-b border-primary-300/30">
                                                <span className="text-primary-100">
                                                    Total Interest
                                                </span>
                                                <span className="font-medium">
                                                    ₹
                                                    {formatCurrency(
                                                        totalInterest
                                                    )}
                                                </span>
                                            </div>
                                            <div className="flex justify-between items-center pb-2 border-b border-primary-300/30">
                                                <span className="text-primary-100">
                                                    Total Payment
                                                </span>
                                                <span className="font-medium">
                                                    ₹
                                                    {formatCurrency(
                                                        totalPayment
                                                    )}
                                                </span>
                                            </div>
                                            <div className="flex justify-between items-center">
                                                <span className="text-primary-100">
                                                    LTV Ratio
                                                </span>
                                                <span className="px-3 py-1 bg-white/10 rounded-full text-sm font-medium">
                                                    {Math.round(ltvRatio)}%
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <Link href="/contact">
                                        <Button
                                            className="w-full bg-white text-primary hover:bg-gray-100 transition-colors py-3 px-6 rounded-lg font-semibold text-center"
                                        >
                                            Apply for Home Loan
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-8 text-center text-sm text-gray-500">
                        <p>
                            Rates and terms are subject to change. This is an
                            estimate only.
                        </p>
                    </div>
                </div>
            </section>

            {/* YouTube Videos Section */}
            <section className="pt-16 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-10">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">
                            Explore Our Properties on YouTube
                        </h2>
                        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                            Take a virtual tour of our featured properties and
                            get expert insights from our team
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[
                            {
                                title: "Luxury Properties Showcase",
                                description: "Explore our premium collection of luxury properties",
                                thumbnail: "/images/logo.png"
                            },
                            {
                                title: "Property Investment Guide",
                                description: "Expert tips for smart property investment decisions",
                                thumbnail: "/images/logo.png"
                            },
                            {
                                title: "Home Tour Series",
                                description: "Exclusive walkthroughs of our featured properties",
                                thumbnail: "/images/logo.png"
                            },
                        ].map((video, index) => (
                            <a
                                key={index}
                                href="https://youtube.com/@rightpropertyhubrphub"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-transform hover:-translate-y-1 block"
                                aria-label={`Watch ${video.title} on YouTube`}
                            >
                                <div className="relative pt-[56.25%] bg-gray-100">
                                    <Image
                                        src={video.thumbnail}
                                        alt={video.title}
                                        fill
                                        className="object-cover"
                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                    />
                                    <div className="absolute inset-0 flex items-center justify-center bg-black/20 hover:bg-black/30 transition-colors">
                                        <div className="bg-red-600 text-white rounded-full p-3 hover:bg-red-700 transition-colors">
                                            <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
                                                <path d="M8 5v14l11-7z" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                                <div className="p-4">
                                    <h3 className="font-medium text-gray-900 mb-1 line-clamp-2">{video.title}</h3>
                                    <p className="text-sm text-gray-600 line-clamp-2">{video.description}</p>
                                </div>
                            </a>
                        ))}
                    </div>

                    <div className="mt-12 text-center">
                        <Button asChild size="lg">
                            <a
                                href="https://youtube.com/@rightpropertyhubrphub?si=0pm2aHwij-YGLlXR"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 bg-red-500 hover:bg-red-600"
                            >
                                <svg
                                    className="w-5 h-5"
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                >
                                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                                </svg>
                                View More on YouTube
                            </a>
                        </Button>
                    </div>
                </div>
            </section>
        </main>
    );
}
