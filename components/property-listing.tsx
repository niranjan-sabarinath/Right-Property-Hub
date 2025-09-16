"use client";

import React, { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Grid, List, GitCompare, X } from "lucide-react";
import PropertyCard, { PropertyCardSkeleton } from "@/components/property-card";
import { Button } from "@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Property } from "@/data/properties";

export interface PropertyListingProps {
    filters?: {
        status: string;
        type: 'residential' | 'commercial' | 'vacation' | 'luxury' | 'all';
        minPrice: string;
        maxPrice: string;
        bedrooms: string;
        sort: string;
    };
    defaultLocation?: string;
    showLocationFilter?: boolean;
    properties?: Property[];
}

const PropertyListing: React.FC<PropertyListingProps> = ({
    filters: initialFilters = {
        status: "all",
        type: "all",
        minPrice: "",
        maxPrice: "",
        bedrooms: "all",
        sort: "featured",
    },
    defaultLocation = "",
    showLocationFilter = true,
    properties: propProperties = [],
}) => {

    const [view, setView] = useState<"grid" | "list">("grid");
    const [isLoading, setIsLoading] = useState(true);
    const [compareMode, setCompareMode] = useState(false);
    const [selectedProperties, setSelectedProperties] = useState<string[]>([]);
    const [filters, setFilters] = useState({
        status: initialFilters.status || "all",
        type: initialFilters.type || "all",
        bedrooms: initialFilters.bedrooms || "all",
        sort: initialFilters.sort || "featured",
        minPrice: initialFilters.minPrice || "",
        maxPrice: initialFilters.maxPrice || "",
    });

    // Use provided properties or fallback to sample data
    const [properties, setProperties] = useState<Property[]>(propProperties || []);

    // Update properties if prop changes
    useEffect(() => {
        if (propProperties) {
            setProperties(propProperties);
        }
    }, [propProperties]);

    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0, transition: { duration: 0.3 } },
    };

    // Simulate data loading
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 1000);
        return () => clearTimeout(timer);
    }, []);

    // Utility function to update filters while preserving all required fields
    const updateFilters = (updates: Partial<typeof filters>) => {
        setFilters(prev => ({
            status: prev.status,
            type: prev.type,
            bedrooms: prev.bedrooms,
            sort: prev.sort,
            minPrice: prev.minPrice,
            maxPrice: prev.maxPrice,
            ...updates
        }));
    };

    const togglePropertySelection = (propertyId: string) => {
        setSelectedProperties((prev) => {
            if (prev.includes(propertyId)) {
                return prev.filter((id) => id !== propertyId);
            } else if (prev.length < 3) {
                return [...prev, propertyId];
            }
            return prev;
        });
    };

    // Filter properties based on filters
    const filteredProperties = useMemo(() => {
        return properties.filter((property) => {
            // Filter by status
            if (filters.status !== "all" && property.status !== filters.status) {
                return false;
            }

            // Filter by type if not 'all'
            if (filters.type !== "all" && property.type !== filters.type) {
                return false;
            }

            // Filter by bedrooms
            if (filters.bedrooms !== "all") {
                const bedrooms = parseInt(filters.bedrooms);
                if (property.bedrooms < bedrooms) {
                    return false;
                }
            }

            // Filter by price range
            const minPrice = parseInt(filters.minPrice);
            if (!isNaN(minPrice) && property.price < minPrice) {
                return false;
            }

            const maxPrice = parseInt(filters.maxPrice);
            if (!isNaN(maxPrice) && property.price > maxPrice) {
                return false;
            }

            // Filter by location if provided
            if (defaultLocation && !property.location.toLowerCase().includes(defaultLocation.toLowerCase())) {
                return false;
            }

            return true;
        });
    }, [properties, filters, defaultLocation]);

    // Sort properties
    const sortedProperties = useMemo(() => {
        let result = [...filteredProperties];

        // Apply sorting
        switch (filters.sort) {
            case "price-asc":
                result.sort((a, b) => a.price - b.price);
                break;
            case "price-desc":
                result.sort((a, b) => b.price - a.price);
                break;
            case "newest":
                result.sort((a, b) => (b.yearBuilt || 0) - (a.yearBuilt || 0));
                break;
            case "oldest":
                result.sort((a, b) => (a.yearBuilt || 0) - (b.yearBuilt || 0));
                break;
            default: // 'featured'
                result.sort(
                    (a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0)
                );
        }

        return result;
    }, [filteredProperties, filters.sort]);

    return (
        <div className="min-h-screen">
            <main className="py-12 md:py-16">
                <div className="container px-4 sm:px-6 lg:px-8 mx-auto">
                    {/* Page Header */}
                    <div className="text-center mb-4">
                        <h1 className="text-3xl md:text-5xl font-coco-regular tracking-tight text-foreground mb-3">
                            Properties in <span className="capitalize">{propProperties[0]?.locationType}</span>
                        </h1>
                        <p className="text-lg text-gray-600">
                            Discover our selection of premium properties
                        </p>
                    </div>

                    {/* View and filter controls */}
                    <div className="flex flex-col space-y-4 sm:space-y-0 sm:flex-row justify-between items-start sm:items-center mb-8">
                        <div className="flex items-center space-x-2 bg-muted/30 p-1.5 rounded-lg">
                            <Button
                                variant="ghost"
                                size="sm"
                                className={`rounded-md px-3 h-9 ${view === "grid" ? 'bg-white shadow-sm' : 'text-muted-foreground hover:bg-muted/50'}`}
                                onClick={() => setView("grid")}
                                aria-label="Grid view"
                            >
                                <Grid className="h-4 w-4 mr-1.5" />
                                <span>Grid</span>
                            </Button>
                            <Button
                                variant="ghost"
                                size="sm"
                                className={`rounded-md px-3 h-9 ${view === "list" ? 'bg-background shadow-sm' : 'text-muted-foreground hover:bg-muted/50'}`}
                                onClick={() => setView("list")}
                                aria-label="List view"
                            >
                                <List className="h-4 w-4 mr-1.5" />
                                <span>List</span>
                            </Button>
                            <Button
                                variant={compareMode ? "default" : "ghost"}
                                size="sm"
                                className="rounded-md px-3 h-9 gap-1.5"
                                onClick={() => setCompareMode(!compareMode)}
                            >
                                <GitCompare className="h-4 w-4" />
                                <span>Compare ({selectedProperties.length}/3)</span>
                            </Button>
                        </div>

                        <div className="w-full sm:w-auto">
                            <Select
                                value={filters.sort}
                                onValueChange={(value) => updateFilters({ sort: value })}
                            >
                                <SelectTrigger className="w-full sm:w-[200px] h-9">
                                    <SelectValue placeholder="Sort by" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="featured">Featured</SelectItem>
                                    <SelectItem value="price-asc">Price: Low to High</SelectItem>
                                    <SelectItem value="price-desc">Price: High to Low</SelectItem>
                                    <SelectItem value="newest">Newest</SelectItem>
                                    <SelectItem value="oldest">Oldest</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    {/* Filter controls */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-12 p-6 rounded-xl border border-gray-200 bg-gray-100">
                        <div className="space-y-1.5">
                            <label className="text-sm font-medium text-muted-foreground">
                                Property Type
                            </label>
                            <Select
                                value={filters.type}
                                onValueChange={(value) => updateFilters({ type: value as any })}
                            >
                                <SelectTrigger className="h-10">
                                    <SelectValue placeholder="Select type" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All Types</SelectItem>
                                    <SelectItem value="residential">Residential</SelectItem>
                                    <SelectItem value="commercial">Commercial</SelectItem>
                                    <SelectItem value="vacation">Vacation</SelectItem>
                                    <SelectItem value="luxury">Luxury</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-sm font-medium text-muted-foreground">
                                Status
                            </label>
                            <Select
                                value={filters.status}
                                onValueChange={(value) => updateFilters({ status: value })}
                            >
                                <SelectTrigger className="h-10">
                                    <SelectValue placeholder="Select status" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All Status</SelectItem>
                                    <SelectItem value="For Sale">For Sale</SelectItem>
                                    <SelectItem value="For Rent">For Rent</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-sm font-medium text-muted-foreground">
                                Bedrooms
                            </label>
                            <Select
                                value={filters.bedrooms}
                                onValueChange={(value) => updateFilters({ bedrooms: value })}
                            >
                                <SelectTrigger className="h-10">
                                    <SelectValue placeholder="Any" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">Any</SelectItem>
                                    <SelectItem value="1">1+ Bedroom</SelectItem>
                                    <SelectItem value="2">2+ Bedrooms</SelectItem>
                                    <SelectItem value="3">3+ Bedrooms</SelectItem>
                                    <SelectItem value="4">4+ Bedrooms</SelectItem>
                                    <SelectItem value="5">5+ Bedrooms</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="flex items-end">
                            <Button
                                variant="outline"
                                className="w-full h-10 bg-background hover:bg-muted/50"
                                onClick={() => {
                                    updateFilters({
                                        status: "all",
                                        type: "all",
                                        bedrooms: "all",
                                        sort: "featured",
                                        minPrice: "",
                                        maxPrice: ""
                                    });
                                }}
                            >
                                Clear Filters
                            </Button>
                        </div>
                    </div>

                    {/* Properties Grid */}
                    <div className="space-y-8">
                        {isLoading ? (
                            <div
                                className={
                                    view === "grid"
                                        ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                                        : "space-y-6"
                                }
                            >
                                {[1, 2, 3, 4, 5, 6].map((i) => (
                                    <PropertyCardSkeleton key={i} view={view} />
                                ))}
                            </div>
                        ) : sortedProperties.length > 0 ? (
                            <div
                                className={
                                    view === "grid"
                                        ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                                        : "space-y-8"
                                }
                            >
                                {sortedProperties.map((property) => (
                                    <PropertyCard
                                        key={property.id}
                                        property={property}
                                        view={view}
                                        isSelected={selectedProperties.includes(
                                            property.id
                                        )}
                                        onCompareToggle={
                                            togglePropertySelection
                                        }
                                        compareMode={compareMode}
                                    />
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-16 bg-card rounded-lg border border-border">
                                <h3 className="text-xl font-medium text-foreground mb-3">
                                    No Properties Found
                                </h3>
                                <p className="text-muted-foreground max-w-md mx-auto mb-6">
                                    We couldn't find any properties matching
                                    your criteria. Try adjusting your filters or
                                    search again.
                                </p>
                                <Button
                                    variant="outline"
                                    onClick={() => {
                                        updateFilters({
                                            status: "all",
                                            type: "all",
                                            bedrooms: "all",
                                            sort: "featured",
                                            minPrice: "",
                                            maxPrice: ""
                                        });
                                    }}
                                >
                                    Clear All Filters
                                </Button>
                            </div>
                        )}
                    </div>
                </div>

                {/* Comparison Modal */}
                <AnimatePresence>
                    {compareMode && selectedProperties.length > 0 && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
                        >
                            <motion.div
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                exit={{ y: 20, opacity: 0 }}
                                className="bg-background rounded-xl p-6 w-full max-w-6xl max-h-[90vh] overflow-y-auto border shadow-xl"
                            >
                                <div className="flex justify-between items-center mb-6">
                                    <h3 className="text-2xl font-semibold">
                                        Compare Properties (
                                        {selectedProperties.length})
                                    </h3>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        onClick={() => setCompareMode(false)}
                                    >
                                        <X className="h-5 w-5" />
                                    </Button>
                                </div>

                                <motion.div
                                    className="grid grid-cols-1 md:grid-cols-3 gap-6"
                                    variants={containerVariants}
                                    initial="hidden"
                                    animate="show"
                                >
                                    {selectedProperties.map((propertyId) => {
                                        const property = properties.find(
                                            (p) => p.id === propertyId
                                        );
                                        if (!property) return null;

                                        return (
                                            <motion.div
                                                key={propertyId}
                                                className="border rounded-xl overflow-hidden bg-card hover:shadow-lg transition-shadow duration-300"
                                                variants={itemVariants}
                                            >
                                                <PropertyCard
                                                    property={property}
                                                    view="list"
                                                    compareMode={false}
                                                    isSelected={false}
                                                />
                                            </motion.div>
                                        );
                                    })}
                                </motion.div>

                                <div className="mt-8 flex justify-end">
                                    <Button
                                        onClick={() => setCompareMode(false)}
                                    >
                                        Close Comparison
                                    </Button>
                                </div>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </main>
        </div>
    );
};

// Export the component as default
export default PropertyListing;