"use client";

import React, { useState, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import PropertyCard from "@/components/property-card";
import { Badge } from "@/components/ui/badge";
import {
    MapPin,
    Bed,
    Bath,
    Ruler,
    Phone,
    Mail,
    Heart,
    Calendar,
    Car,
    Home,
    ChevronRight,
    Share2,
    Check,
    Facebook,
    Youtube,
    Instagram,
    Linkedin,
} from "lucide-react";
import {
    getPropertyById,
    getPropertiesByLocation,
    type Property,
} from "@/data/properties";

// ─── Animation Variants ────────────────────────────────────────────────
const fadeInUp = {
    hidden: { opacity: 0, y: 24 },
    visible: (delay: number = 0) => ({
        opacity: 1,
        y: 0,
        transition: { type: "spring" as const, stiffness: 80, damping: 18, delay },
    }),
};

const staggerContainer = {
    hidden: { opacity: 1 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.07, delayChildren: 0.1 },
    },
};

const fadeInScale = {
    hidden: { opacity: 0, scale: 0.92 },
    visible: {
        opacity: 1,
        scale: 1,
        transition: { type: "spring" as const, stiffness: 100, damping: 20 },
    },
};

// ─── Helper ─────────────────────────────────────────────────────────────
const getPropertyLocation = (property: Property): "india" | "dubai" => {
    if (property.locationType) return property.locationType;
    if (
        property.location.toLowerCase().includes("dubai") ||
        property.location.toLowerCase().includes("uae")
    )
        return "dubai";
    return "india";
};

const OFFICE_CONTACTS = {
    india: {
        phone: "+971 50 575 5424",
        email: "solutions@rightpropertyhub.com",
        hours: "Mon-Sat: 9 AM – 8 PM, Sun: 10 AM – 6 PM",
    },
    dubai: {
        phone: "+971 50 575 5424",
        email: "dubai@rightpropertyhub.com",
        hours: "Mon-Fri: 9 AM – 7 PM, Sat: 10 AM – 5 PM",
    },
};

const SOCIAL_LINKS = [
    {
        label: "Facebook",
        href: "https://www.facebook.com/share/178YN4zHWH/?mibextid=wwXIfr",
        Icon: Facebook,
    },
    {
        label: "YouTube",
        href: "https://youtube.com/@rightpropertyhubrphub?si=0pm2aHwij-YGLlXR",
        Icon: Youtube,
    },
    {
        label: "Instagram",
        href: "https://www.instagram.com/right_property_hub?igsh=MW8ybDA0ZjB0c3M5bQ%3D%3D&utm_source=qr",
        Icon: Instagram,
    },
    {
        label: "LinkedIn",
        href: "http://www.linkedin.com/in/right-property-hub-0533a6385",
        Icon: Linkedin,
    },
];

// ─── Status Color Map ────────────────────────────────────────────────────
const statusStyle: Record<string, string> = {
    "For Sale": "bg-emerald-500/90 text-white",
    "For Rent": "bg-blue-500/90 text-white",
    Sold: "bg-red-500/90 text-white",
    Rented: "bg-purple-500/90 text-white",
};

// ─── Component ──────────────────────────────────────────────────────────
interface PropertyDetailPageProps {
    params: { type: string; id: string };
}

const PropertyDetailPage = ({ params }: PropertyDetailPageProps) => {
    const { type, id } = params;
    const routerParams = useParams();
    const effectiveId = (routerParams.id || id) as string;
    const effectiveType = (routerParams.type || type) as string;

    const [activeImage, setActiveImage] = useState(0);
    const [isFavorite, setIsFavorite] = useState(false);
    const [copied, setCopied] = useState(false);

    const property = getPropertyById(effectiveId);
    const router = useRouter();

    if (!property) {
        router.push("/404");
        return null;
    }

    const propertyLocation = getPropertyLocation(property);
    const contact = OFFICE_CONTACTS[propertyLocation];

    const images =
        property.images && property.images.length > 0
            ? property.images
            : [property.image];

    const similarProperties = getPropertiesByLocation(propertyLocation)
        .filter((p) => p.id !== property.id)
        .slice(0, 4);

    // Build quick-stats list
    const stats: { icon: React.ReactNode; label: string; value: string }[] = [];
    if (property.bedrooms > 0)
        stats.push({
            icon: <Bed className="h-5 w-5" />,
            label: "Bedrooms",
            value: String(property.bedrooms),
        });
    if (property.bathrooms > 0)
        stats.push({
            icon: <Bath className="h-5 w-5" />,
            label: "Bathrooms",
            value: String(property.bathrooms),
        });
    stats.push({
        icon: <Ruler className="h-5 w-5" />,
        label: "Area",
        value:
            typeof property.area === "number"
                ? `${property.area} sq.ft`
                : String(property.area),
    });
    stats.push({
        icon: <Home className="h-5 w-5" />,
        label: "Type",
        value: property.type.charAt(0).toUpperCase() + property.type.slice(1),
    });
    if (property.yearBuilt)
        stats.push({
            icon: <Calendar className="h-5 w-5" />,
            label: "Year",
            value: String(property.yearBuilt),
        });
    if (property.garage !== undefined && property.garage > 0)
        stats.push({
            icon: <Car className="h-5 w-5" />,
            label: "Garage",
            value: `${property.garage} ${property.garage === 1 ? "space" : "spaces"}`,
        });

    const handleShare = useCallback(async () => {
        const url = window.location.href;
        try {
            await navigator.clipboard.writeText(url);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch {
            // fallback
        }
    }, []);

    // ─── Render ──────────────────────────────────────────────────────────
    return (
        <div className="min-h-screen bg-gray-50">

            {/* ─── Hero Image ─────────────────────────────────────────── */}
            <motion.section
                initial="hidden"
                animate="visible"
                variants={fadeInUp}
                custom={0}
                className="relative"
            >
                {/* Hero bleeds behind the fixed h-32 navbar */}
                <div className="relative h-[420px] sm:h-[500px] lg:h-[600px] w-full overflow-hidden">
                    <Image
                        src={images[activeImage]}
                        alt={`${property.title} — image ${activeImage + 1}`}
                        fill
                        className="object-cover transition-all duration-500"
                        priority
                        sizes="100vw"
                    />
                    {/* Gradient Overlay — darker top to let white nav text breathe */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/20" />

                    {/* Breadcrumb — inside hero, positioned below the navbar */}
                    <div className="absolute top-36 left-0 right-0 z-10 hidden sm:block">
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                            <nav className="flex items-center text-sm text-white/70 space-x-2">
                                <Link href="/" className="hover:text-white transition-colors">Home</Link>
                                <ChevronRight className="h-3.5 w-3.5" />
                                <Link
                                    href={`/properties/${propertyLocation}`}
                                    className="hover:text-white transition-colors"
                                >
                                    {propertyLocation === "dubai" ? "Dubai" : "India"} Properties
                                </Link>
                                <ChevronRight className="h-3.5 w-3.5" />
                                <span className="text-white font-medium truncate max-w-[200px]">
                                    {property.title}
                                </span>
                            </nav>
                        </div>
                    </div>

                    {/* Action buttons — glass style, positioned below navbar */}
                    <div className="absolute top-36 right-4 sm:right-6 lg:right-8 flex items-center gap-2 z-10">
                        <button
                            onClick={handleShare}
                            className="flex items-center justify-center h-10 w-10 rounded-full bg-white/15 backdrop-blur-md border border-white/20 hover:bg-white/25 transition-colors"
                            aria-label="Share property"
                        >
                            {copied ? (
                                <Check className="h-5 w-5 text-green-400" />
                            ) : (
                                <Share2 className="h-5 w-5 text-white" />
                            )}
                        </button>
                        <button
                            onClick={() => setIsFavorite(!isFavorite)}
                            className="flex items-center justify-center h-10 w-10 rounded-full bg-white/15 backdrop-blur-md border border-white/20 hover:bg-white/25 transition-colors"
                            aria-label={
                                isFavorite
                                    ? "Remove from favorites"
                                    : "Add to favorites"
                            }
                        >
                            <Heart
                                className={`h-5 w-5 transition-colors ${isFavorite
                                    ? "fill-red-500 text-red-500"
                                    : "text-white"
                                    }`}
                            />
                        </button>
                    </div>

                    {/* Overlaid Property Info */}
                    <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 lg:p-8">
                        <div className="max-w-7xl mx-auto">
                            <div className="flex flex-wrap items-end justify-between gap-3">
                                <div className="space-y-2">
                                    <Badge
                                        className={`${statusStyle[property.status] ||
                                            "bg-gray-700 text-white"
                                            } text-xs px-3 py-1 rounded-full border-0`}
                                    >
                                        {property.status}
                                    </Badge>
                                    <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white drop-shadow-lg">
                                        {property.title}
                                    </h1>
                                    <div className="flex items-center gap-1.5 text-white/90 text-sm sm:text-base">
                                        <MapPin className="h-4 w-4 flex-shrink-0" />
                                        {property.location}
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white drop-shadow-lg">
                                        {property.price}
                                        {property.status === "For Rent" && (
                                            <span className="text-base font-normal text-white/70 ml-1">
                                                /month
                                            </span>
                                        )}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Thumbnail Strip */}
                {images.length > 1 && (
                    <div className="bg-white border-b border-gray-100">
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
                            <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1">
                                {images.map((img, i) => (
                                    <button
                                        key={i}
                                        onClick={() => setActiveImage(i)}
                                        className={`relative h-16 w-20 sm:h-20 sm:w-24 flex-shrink-0 rounded-lg overflow-hidden transition-all duration-200 ${activeImage === i
                                            ? "ring-2 ring-primary ring-offset-2 opacity-100"
                                            : "opacity-60 hover:opacity-100"
                                            }`}
                                        aria-label={`View image ${i + 1}`}
                                    >
                                        <Image
                                            src={typeof img === "string" ? img : img}
                                            alt=""
                                            fill
                                            className="object-cover"
                                            sizes="96px"
                                        />
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </motion.section>

            {/* ─── Quick Stats Bar ────────────────────────────────────── */}
            <motion.section
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-40px" }}
                variants={staggerContainer}
                className="bg-white border-b border-gray-100 shadow-sm"
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-1">
                        {stats.map((stat, i) => (
                            <motion.div
                                key={stat.label}
                                variants={fadeInScale}
                                className="flex items-center gap-3 flex-shrink-0 px-4 py-3 rounded-xl bg-gray-50 border border-gray-100 min-w-[130px]"
                            >
                                <div className="flex items-center justify-center h-10 w-10 rounded-lg bg-primary/10 text-primary">
                                    {stat.icon}
                                </div>
                                <div>
                                    <p className="text-xs text-gray-500 uppercase tracking-wide">
                                        {stat.label}
                                    </p>
                                    <p className="text-sm font-semibold text-gray-900">
                                        {stat.value}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </motion.section>

            {/* ─── Main Content ───────────────────────────────────────── */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-10">
                    {/* ── Left Column ─────────────────────────────────── */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Description */}
                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: "-40px" }}
                            variants={fadeInUp}
                            custom={0.1}
                            className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sm:p-8"
                        >
                            <h2 className="text-xl font-bold text-gray-900 mb-4">
                                About This Property
                            </h2>
                            <p className="text-gray-600 leading-relaxed text-[15px]">
                                {property.description ||
                                    "No description available for this property. Contact us for more details."}
                            </p>
                        </motion.div>

                        {/* Property Details */}
                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: "-40px" }}
                            variants={fadeInUp}
                            custom={0.15}
                            className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sm:p-8"
                        >
                            <h2 className="text-xl font-bold text-gray-900 mb-5">
                                Property Details
                            </h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-0">
                                {[
                                    {
                                        label: "Property Type",
                                        value:
                                            property.type
                                                .charAt(0)
                                                .toUpperCase() +
                                            property.type.slice(1),
                                    },
                                    {
                                        label: "Status",
                                        value: property.status,
                                        highlight: true,
                                    },
                                    ...(property.bedrooms > 0
                                        ? [
                                            {
                                                label: "Bedrooms",
                                                value: String(
                                                    property.bedrooms
                                                ),
                                            },
                                        ]
                                        : []),
                                    ...(property.bathrooms > 0
                                        ? [
                                            {
                                                label: "Bathrooms",
                                                value: String(
                                                    property.bathrooms
                                                ),
                                            },
                                        ]
                                        : []),
                                    {
                                        label: "Area",
                                        value:
                                            typeof property.area === "number"
                                                ? `${property.area} sq.ft`
                                                : String(property.area),
                                    },
                                    ...(property.yearBuilt
                                        ? [
                                            {
                                                label: "Year Built",
                                                value: String(
                                                    property.yearBuilt
                                                ),
                                            },
                                        ]
                                        : []),
                                    ...(property.garage !== undefined &&
                                        property.garage > 0
                                        ? [
                                            {
                                                label: "Garage",
                                                value: `${property.garage} ${property.garage === 1 ? "space" : "spaces"}`,
                                            },
                                        ]
                                        : []),
                                    ...(property.address?.city
                                        ? [
                                            {
                                                label: "City",
                                                value: property.address.city,
                                            },
                                        ]
                                        : []),
                                    ...(property.address?.country
                                        ? [
                                            {
                                                label: "Country",
                                                value: property.address
                                                    .country,
                                            },
                                        ]
                                        : []),
                                ].map((item, i) => (
                                    <div
                                        key={item.label}
                                        className="flex justify-between items-center py-3 border-b border-gray-100 last:border-0"
                                    >
                                        <span className="text-sm text-gray-500">
                                            {item.label}
                                        </span>
                                        <span
                                            className={`text-sm font-medium ${item.highlight &&
                                                (property.status ===
                                                    "For Sale" ||
                                                    property.status ===
                                                    "For Rent")
                                                ? "text-emerald-600"
                                                : "text-gray-900"
                                                }`}
                                        >
                                            {item.value}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </motion.div>

                        {/* Amenities */}
                        {property.amenities &&
                            property.amenities.length > 0 && (
                                <motion.div
                                    initial="hidden"
                                    whileInView="visible"
                                    viewport={{ once: true, margin: "-40px" }}
                                    variants={fadeInUp}
                                    custom={0.2}
                                    className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sm:p-8"
                                >
                                    <h2 className="text-xl font-bold text-gray-900 mb-5">
                                        Amenities & Features
                                    </h2>
                                    <motion.div
                                        variants={staggerContainer}
                                        initial="hidden"
                                        whileInView="visible"
                                        viewport={{ once: true }}
                                        className="flex flex-wrap gap-2"
                                    >
                                        {property.amenities.map(
                                            (amenity, i) => (
                                                <motion.span
                                                    key={i}
                                                    variants={fadeInScale}
                                                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-gray-50 border border-gray-100 text-sm text-gray-700 hover:bg-primary/5 hover:border-primary/20 hover:text-primary transition-colors"
                                                >
                                                    <Check className="h-3.5 w-3.5 text-primary flex-shrink-0" />
                                                    {amenity}
                                                </motion.span>
                                            )
                                        )}
                                    </motion.div>
                                </motion.div>
                            )}

                        {/* Address */}
                        {property.address &&
                            (property.address.street ||
                                property.address.city) && (
                                <motion.div
                                    initial="hidden"
                                    whileInView="visible"
                                    viewport={{ once: true, margin: "-40px" }}
                                    variants={fadeInUp}
                                    custom={0.25}
                                    className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sm:p-8"
                                >
                                    <h2 className="text-xl font-bold text-gray-900 mb-4">
                                        Location
                                    </h2>
                                    <div className="flex items-start gap-3">
                                        <div className="flex items-center justify-center h-10 w-10 rounded-lg bg-primary/10 text-primary flex-shrink-0 mt-0.5">
                                            <MapPin className="h-5 w-5" />
                                        </div>
                                        <div className="text-[15px] text-gray-600 leading-relaxed">
                                            {[
                                                property.address.street,
                                                property.address.city,
                                                property.address.state,
                                                property.address.zipCode,
                                                property.address.country,
                                            ]
                                                .filter(Boolean)
                                                .join(", ")}
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                    </div>

                    {/* ── Right Column (Sticky Sidebar) ──────────────── */}
                    <div className="space-y-6 lg:sticky lg:top-24 lg:self-start">
                        {/* Price Card */}
                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: "-40px" }}
                            variants={fadeInUp}
                            custom={0.1}
                            className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden"
                        >
                            <div className="bg-gradient-to-br from-primary/5 via-white to-primary/5 p-6">
                                <div className="flex items-start justify-between gap-3">
                                    <div>
                                        <p className="text-2xl sm:text-3xl font-bold text-gray-900">
                                            {property.price}
                                        </p>
                                        {property.status === "For Rent" && (
                                            <span className="text-sm text-gray-500">
                                                per month
                                            </span>
                                        )}
                                    </div>
                                    <Badge
                                        className={`${statusStyle[property.status] ||
                                            "bg-gray-700 text-white"
                                            } text-xs px-3 py-1 rounded-full border-0 flex-shrink-0`}
                                    >
                                        {property.status}
                                    </Badge>
                                </div>
                                <div className="flex items-center gap-1.5 mt-3 text-gray-500 text-sm">
                                    <MapPin className="h-4 w-4 flex-shrink-0" />
                                    {property.location}
                                </div>
                            </div>

                            {/* Quick Stats in sidebar */}
                            <div className="grid grid-cols-3 border-t border-gray-100">
                                {property.bedrooms > 0 && (
                                    <div className="text-center py-4 border-r border-gray-100">
                                        <Bed className="h-5 w-5 text-primary mx-auto mb-1" />
                                        <p className="text-xs text-gray-500">
                                            Beds
                                        </p>
                                        <p className="text-sm font-semibold text-gray-900">
                                            {property.bedrooms}
                                        </p>
                                    </div>
                                )}
                                {property.bathrooms > 0 && (
                                    <div className="text-center py-4 border-r border-gray-100">
                                        <Bath className="h-5 w-5 text-primary mx-auto mb-1" />
                                        <p className="text-xs text-gray-500">
                                            Baths
                                        </p>
                                        <p className="text-sm font-semibold text-gray-900">
                                            {property.bathrooms}
                                        </p>
                                    </div>
                                )}
                                <div className="text-center py-4">
                                    <Ruler className="h-5 w-5 text-primary mx-auto mb-1" />
                                    <p className="text-xs text-gray-500">
                                        Area
                                    </p>
                                    <p className="text-sm font-semibold text-gray-900 truncate px-2">
                                        {typeof property.area === "number"
                                            ? `${property.area} sqft`
                                            : property.area}
                                    </p>
                                </div>
                            </div>

                            {/* CTA */}
                            <div className="p-5 border-t border-gray-100">
                                <a
                                    href={`tel:${contact.phone.replace(/[^+\d]/g, "")}`}
                                    className="flex items-center justify-center gap-2 w-full py-3 px-4 rounded-xl bg-primary text-white font-semibold text-sm hover:bg-primary/90 transition-colors shadow-sm"
                                >
                                    <Phone className="h-4 w-4" />
                                    Call Now
                                </a>
                                <a
                                    href={`https://wa.me/${contact.phone.replace(/[^+\d]/g, "")}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center justify-center gap-2 w-full mt-2 py-3 px-4 rounded-xl border-2 border-primary text-primary font-semibold text-sm hover:bg-primary/5 transition-colors"
                                >
                                    WhatsApp
                                </a>
                            </div>
                        </motion.div>

                        {/* Contact Card */}
                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: "-40px" }}
                            variants={fadeInUp}
                            custom={0.2}
                            className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6"
                        >
                            <div className="flex flex-col items-center text-center">
                                <Image
                                    src="/images/logo.png"
                                    alt="Right Property Hub"
                                    width={56}
                                    height={56}
                                    className="h-14 w-auto mb-3"
                                />
                                <h3 className="font-semibold text-gray-900 text-sm">
                                    Right Property Hub
                                </h3>
                                <p className="text-xs text-gray-500 mt-1">
                                    {contact.hours}
                                </p>
                            </div>

                            <div className="mt-5 space-y-3">
                                <a
                                    href={`tel:${contact.phone.replace(/[^+\d]/g, "")}`}
                                    className="flex items-center gap-3 text-sm text-gray-600 hover:text-primary transition-colors"
                                >
                                    <div className="flex items-center justify-center h-9 w-9 rounded-lg bg-primary/10 text-primary flex-shrink-0">
                                        <Phone className="h-4 w-4" />
                                    </div>
                                    {contact.phone}
                                </a>
                                <a
                                    href={`mailto:${contact.email}`}
                                    className="flex items-center gap-3 text-sm text-gray-600 hover:text-primary transition-colors"
                                >
                                    <div className="flex items-center justify-center h-9 w-9 rounded-lg bg-primary/10 text-primary flex-shrink-0">
                                        <Mail className="h-4 w-4" />
                                    </div>
                                    {contact.email}
                                </a>
                            </div>

                            {/* Social Links */}
                            <div className="flex items-center justify-center gap-3 mt-5 pt-5 border-t border-gray-100">
                                {SOCIAL_LINKS.map((social) => (
                                    <a
                                        key={social.label}
                                        href={social.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        aria-label={social.label}
                                        className="flex items-center justify-center h-9 w-9 rounded-full bg-gray-50 text-gray-500 hover:bg-primary/10 hover:text-primary transition-colors"
                                    >
                                        <social.Icon className="h-4 w-4" />
                                    </a>
                                ))}
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>

            {/* ─── Similar Properties ─────────────────────────────────── */}
            {similarProperties.length > 0 && (
                <motion.section
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-60px" }}
                    variants={fadeInUp}
                    custom={0}
                    className="bg-white border-t border-gray-100"
                >
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
                        <div className="flex items-center justify-between mb-8">
                            <h2 className="text-2xl font-bold text-gray-900">
                                Similar Properties
                            </h2>
                            <Link
                                href={`/properties/${propertyLocation}`}
                                className="text-sm font-medium text-primary hover:underline hidden sm:inline-flex items-center gap-1"
                            >
                                View All
                                <ChevronRight className="h-4 w-4" />
                            </Link>
                        </div>
                        <motion.div
                            variants={staggerContainer}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
                        >
                            {similarProperties.map((p) => (
                                <motion.div
                                    key={p.id}
                                    variants={fadeInScale}
                                    className="rounded-xl overflow-hidden"
                                >
                                    <PropertyCard property={p} />
                                </motion.div>
                            ))}
                        </motion.div>
                        <div className="mt-6 text-center sm:hidden">
                            <Link
                                href={`/properties/${propertyLocation}`}
                                className="text-sm font-medium text-primary hover:underline inline-flex items-center gap-1"
                            >
                                View All Properties
                                <ChevronRight className="h-4 w-4" />
                            </Link>
                        </div>
                    </div>
                </motion.section>
            )}

            {/* Empty state for no similar properties */}
            {similarProperties.length === 0 && (
                <section className="bg-white border-t border-gray-100">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">
                            Similar Properties
                        </h2>
                        <p className="text-gray-500 mb-4">
                            No similar properties found at the moment.
                        </p>
                        <Link
                            href={`/properties/${propertyLocation}`}
                            className="inline-flex items-center gap-1 text-primary font-medium hover:underline"
                        >
                            Browse all{" "}
                            {propertyLocation === "dubai"
                                ? "Dubai"
                                : "India"}{" "}
                            properties
                            <ChevronRight className="h-4 w-4" />
                        </Link>
                    </div>
                </section>
            )}
        </div>
    );
};

export default PropertyDetailPage;
