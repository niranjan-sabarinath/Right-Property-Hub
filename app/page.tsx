"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { Search, Building, ArrowRight, ArrowLeft, MapPin, ChevronDown, IndianRupee, X } from "lucide-react"
import { parsePrice } from "@/lib/price-utils"
import { motion, useInView, useScroll, useTransform, AnimatePresence } from "framer-motion"
import PropertyCarousel from "@/components/property-carousel"
import PropertyCard from "@/components/property-card"
import PropertyFilters from "@/components/property-filters"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { getFeaturedProperties, getIndianProperties, type Property } from "@/data/properties"

const testimonials = [
  {
    name: "Aarav Sharma",
    role: "NRI Homebuyer",
    content:
      "As an NRI working in the US, I was skeptical about buying property in India. Right Property Hub's team made the entire process transparent and stress-free. Their virtual tours and legal assistance were exceptional!",
    rating: 5,
    image: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150",
  },
  {
    name: "Ishita Patel",
    role: "First-time Buyer",
    content:
      "Found my dream 2BHK in Mumbai suburbs within my budget, thanks to Right Property Hub. Their agent understood my needs perfectly and negotiated a great deal. Couldn't be happier with my new home!",
    rating: 5,
    image: "https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=150",
  },
  {
    name: "Rajiv Malhotra",
    role: "Property Investor",
    content:
      "Their market analysis helped me identify high-growth areas in Bangalore. The team's local expertise and network of developers gave me access to pre-launch offers I wouldn't have found otherwise.",
    rating: 5,
    image: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150",
  },
  {
    name: "Meera Iyer",
    role: "Senior Citizen",
    content:
      "After my husband's retirement, we wanted to downsize to a smaller home. Right Property Hub found us a perfect senior-friendly apartment with all amenities. Their patience and understanding made this transition smooth.",
    rating: 5,
    image: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150",
  },
  {
    name: "Vikram & Priya Khanna",
    role: "Young Couple",
    content:
      "We were first-time homebuyers with limited savings. The team helped us understand home loan options and found us a perfect starter home in Pune. Their end-to-end support was invaluable!",
    rating: 5,
    image: "https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=compress&cs=tinysrgb&w=150",
  },
]

const HomePage = () => {
  // State for search form
  const [searchParams, setSearchParams] = useState({
    location: "",
    type: "",
    priceRange: ""
  });

  // Handle search form submission
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Add search logic here
    console.log("Searching with params:", searchParams);
  };

  // Get all properties and filter Indian ones
  const allProperties = getIndianProperties()
  const indianProperties = allProperties.filter(
    (property) =>
      property.propertyLocation === "india" ||
      (property.location && property.location.toLowerCase().includes("india")) ||
      (property.price && property.price.includes("₹")),
  )

  const [filteredProperties, setFilteredProperties] = useState<Property[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const propertiesPerPage = 6
  const [filters, setFilters] = useState<{
    search: string
    sortBy: "price-high-low" | "price-low-high" | "none"
    propertyType: string
    bedrooms: string
    bathrooms: string
    location: string
    status: string
  }>({
    search: "",
    sortBy: "none",
    propertyType: "all-types",
    bedrooms: "any-bedrooms",
    bathrooms: "any-bathrooms",
    location: "all-locations",
    status: "all-status",
  })
  const [compareList, setCompareList] = useState<Array<Property>>([])

  // Initialize with Indian properties on first render
  useEffect(() => {
    setFilteredProperties(indianProperties)
  }, [indianProperties])

  // Apply filters whenever they change
  useEffect(() => {
    // Start with all Indian properties
    let filtered = [...indianProperties]

    // Apply search filter
    if (filters.search) {
      const searchTerm = filters.search.toLowerCase()
      filtered = filtered.filter(
        (property) =>
          property.title.toLowerCase().includes(searchTerm) ||
          property.location.toLowerCase().includes(searchTerm) ||
          property.type.toLowerCase().includes(searchTerm) ||
          property.amenities?.some((amenity) => amenity.toLowerCase().includes(searchTerm)),
      )
    }

    // Apply property type filter
    if (filters.propertyType && filters.propertyType !== "all-types") {
      filtered = filtered.filter((property) => property.type === filters.propertyType)
    }

    // Apply bedrooms filter
    if (filters.bedrooms && filters.bedrooms !== "any-bedrooms") {
      const minBedrooms = Number.parseInt(filters.bedrooms)
      filtered = filtered.filter((property) => property.bedrooms >= minBedrooms)
    }

    // Apply bathrooms filter
    if (filters.bathrooms && filters.bathrooms !== "any-bathrooms") {
      const minBathrooms = Number.parseInt(filters.bathrooms)
      filtered = filtered.filter((property) => property.bathrooms >= minBathrooms)
    }

    // Apply status filter
    if (filters.status && filters.status !== "all-status") {
      filtered = filtered.filter((property) => property.status === filters.status)
    }

    // Apply sorting
    if (filters.sortBy === "price-high-low") {
      filtered.sort((a, b) => parsePrice(b.price) - parsePrice(a.price))
    } else if (filters.sortBy === "price-low-high") {
      filtered.sort((a, b) => parsePrice(a.price) - parsePrice(b.price))
    }

    setFilteredProperties(filtered)
    setCurrentPage(1) // Reset to first page when filters change
  }, [filters])

  // Calculate pagination
  const indexOfLastProperty = currentPage * propertiesPerPage
  const indexOfFirstProperty = indexOfLastProperty - propertiesPerPage
  const currentProperties = filteredProperties.slice(indexOfFirstProperty, indexOfLastProperty)
  const totalPages = Math.max(1, Math.ceil(filteredProperties.length / propertiesPerPage))

  // Change page
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber)
  const nextPage = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages))
  const prevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1))

  const { scrollYProgress } = useScroll()
  const heroRef = useRef(null)
  const featuredRef = useRef(null)
  const servicesRef = useRef(null)
  const propertiesRef = useRef(null)
  const testimonialsRef = useRef(null)
  const ctaRef = useRef(null)

  const heroInView = useInView(heroRef, { once: true, margin: "-20%" })
  const featuredInView = useInView(featuredRef, {
    once: true,
    margin: "-20%",
  })
  const servicesInView = useInView(servicesRef, {
    once: true,
    margin: "-20%",
  })
  const propertiesInView = useInView(propertiesRef, {
    once: true,
    margin: "-20%",
  })
  const testimonialsInView = useInView(testimonialsRef, {
    once: true,
    margin: "-20%",
  })
  const ctaInView = useInView(ctaRef, { once: true, margin: "-20%" })

  const heroY = useTransform(scrollYProgress, [0, 0.3], [0, -100])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0.3])

  const featuredProperties = getFeaturedProperties().slice(0, 4)

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 60,
      scale: 0.95,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring" as const,
        stiffness: 100,
        damping: 15,
        duration: 0.8,
      },
    },
  }

  const slideUpVariants = {
    hidden: {
      opacity: 0,
      y: 100,
      clipPath: "inset(100% 0 0 0)",
    },
    visible: {
      opacity: 1,
      y: 0,
      clipPath: "inset(0% 0 0 0)",
      transition: {
        type: "spring" as const,
        stiffness: 80,
        damping: 20,
        duration: 1.2,
      },
    },
  }

  const morphVariants = {
    hidden: {
      opacity: 0,
      scale: 0.8,
      rotateX: -15,
      transformPerspective: 1000,
    },
    visible: {
      opacity: 1,
      scale: 1,
      rotateX: 0,
      transition: {
        type: "spring" as const,
        stiffness: 60,
        damping: 15,
        duration: 1.5,
      },
    },
  }

  const textRevealVariants = {
    hidden: {
      opacity: 0,
      y: 50,
      skewY: 5,
    },
    visible: {
      opacity: 1,
      y: 0,
      skewY: 0,
      transition: {
        type: "spring" as const,
        stiffness: 100,
        damping: 20,
        duration: 0.8,
      },
    },
  }

  const handleCompare = (property: Property) => {
    if (compareList.some((p) => p.id === property.id)) {
      setCompareList(compareList.filter((p) => p.id !== property.id))
    } else {
      setCompareList([...compareList, property])
    }
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <motion.section
        ref={heroRef}
        className="relative min-h-screen flex flex-col md:flex-row overflow-hidden md:p-2"
        style={{ y: heroY, opacity: heroOpacity }}
      >
        {/* Left Side - Light Background with Content */}
        <div className="w-full md:w-1/2 max-sm:min-h-screen bg-gradient-to-br from-primary/5 to-background p-8 md:p-16 flex flex-col justify-center items-center pt-20 md:pt-32">
          <motion.div
            className="max-w-2xl mx-auto"
            variants={containerVariants}
            initial="hidden"
            animate={heroInView ? "visible" : "hidden"}
          >
            <motion.h1
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight mb-6 font-coco-regular"
            >
              Find your Dream Home in <span className="text-primary">India</span>
            </motion.h1>
            <motion.p
              className="text-lg text-muted-foreground mb-8 max-w-lg font-coco-regular"
              variants={textRevealVariants}
            >
              Discover exclusive properties in prime locations across India. Get expert advice and personalized service to find your perfect home.
            </motion.p>

            <motion.div
              className="space-y-4 mb-8"
              variants={itemVariants}
            >
              <div className="flex items-center text-gray-700">
                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-blue-600"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <span>Premium Properties</span>
              </div>
              <div className="flex items-center text-gray-700">
                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-blue-600"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <span>Verified Listings</span>
              </div>
              <div className="flex items-center text-gray-700">
                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-blue-600"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <span>24/7 Customer Support</span>
              </div>
            </motion.div>

            <motion.div
              className="flex flex-col sm:flex-row gap-4 mb-8"
              variants={itemVariants}
            >
              <Link
                href="/properties"
                className="bg-primary hover:bg-primary/90 text-primary-foreground font-medium py-3 px-6 rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg"
              >
                Browse Properties
              </Link>
              <Link
                href="/contact"
                className="border-2 border-primary text-primary hover:bg-primary/10 font-medium py-3 px-6 rounded-lg transition-colors duration-200"
              >
                Contact Agent
              </Link>
            </motion.div>
          </motion.div>
        </div>

        {/* Right Side - Image Background with Search Overlay */}
        <div className="w-full md:w-1/2 relative md:min-h-screen">
          <div className="absolute inset-0">
            <Image
              src="https://png.pngtree.com/thumb_back/fh260/background/20250712/pngtree-stone-pathway-lined-with-red-flowers-and-greenery-leading-to-an-image_17612501.webp"
              alt="Luxury home in India"
              fill
              className="object-cover"
              priority
            />
            {/* <div className="absolute inset-0 bg-primary/90 mix-blend-multiply"></div> */}
          </div>

          {/* Search Overlay */}
          <div className="relative z-10 h-full flex items-center justify-center p-4 md:p-8">
            <motion.div
              className="w-full max-w-sm bg-background/95 backdrop-blur-sm rounded-2xl shadow-xl p-6 border border-border/50"
              variants={morphVariants}
              initial="hidden"
              animate={heroInView ? "visible" : "hidden"}
              whileHover={{ scale: 1.01, boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)' }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            >
              <form onSubmit={handleSearch} className="space-y-3">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <MapPin className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <input
                    type="text"
                    id="location"
                    value={searchParams.location || ''}
                    onChange={(e) => setSearchParams({ ...searchParams, location: e.target.value })}
                    placeholder="Search by location, city, or landmark"
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-border/50 bg-background/80 text-foreground focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none"
                  />
                  {searchParams.location && (
                    <button
                      type="button"
                      onClick={() => setSearchParams({ ...searchParams, location: '' })}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    >
                      <X className="h-4 w-4 text-muted-foreground hover:text-foreground" />
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="relative">
                    <select
                      id="type"
                      value={searchParams.type}
                      onChange={(e) => setSearchParams({ ...searchParams, type: e.target.value })}
                      className="w-full pl-3 pr-8 py-3 rounded-xl border border-border/50 bg-background/80 text-foreground focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none appearance-none"
                      required
                    >
                      <option value="">Any Type</option>
                      <option value="apartment">Apartment</option>
                      <option value="villa">Villa</option>
                      <option value="plot">Plot</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
                  </div>

                  <div className="relative">
                    <select
                      id="priceRange"
                      value={searchParams.priceRange}
                      onChange={(e) => setSearchParams({ ...searchParams, priceRange: e.target.value })}
                      className="w-full pl-3 pr-8 py-3 rounded-xl border border-border/50 bg-background/80 text-foreground focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none appearance-none"
                      required
                    >
                      <option value="">Any Price</option>
                      <option value="0-50">Under ₹50L</option>
                      <option value="50-100">₹50L - ₹1C</option>
                      <option value="100-200">₹1C - ₹2C</option>
                      <option value="200+">₹2C+</option>
                    </select>
                    <IndianRupee className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-medium py-3.5 px-6 rounded-xl transition-all duration-200 flex items-center justify-center space-x-2 shadow-md hover:shadow-lg"
                >
                  <Search className="h-5 w-5" />
                  <span>Search</span>
                </button>
              </form>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Featured Properties */}
      <motion.section
        ref={featuredRef}
        className="md:pt-24 pt-16 relative overflow-hidden"
        initial={{ opacity: 0 }}
        animate={featuredInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="mb-8 relative"
            variants={containerVariants}
            initial="hidden"
            animate={featuredInView ? "visible" : "hidden"}
          >
            <motion.div
              className="absolute -top-6 left-4 md:left-36 right-0 flex items-center z-0"
              initial={{ opacity: 0, x: -100 }}
              animate={featuredInView ? { opacity: 0.3, x: 0 } : { opacity: 0, x: -100 }}
              transition={{ duration: 1.2, delay: 0.3 }}
            >
              <span className="font-amsterdam text-2xl md:text-3xl text-gray-400 select-none pointer-events-none">
                Featured Properties
              </span>
            </motion.div>

            <motion.div
              className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 md:mb-4 relative z-10 text-center md:text-left"
              variants={itemVariants}
            >
              <motion.h2
                className="text-3xl md:text-6xl font-medium text-gray-900 font-coco-regular w-full md:w-auto"
                variants={textRevealVariants}
              >
                Discover Our Collection
              </motion.h2>
              <motion.div
                variants={itemVariants}
                whileHover={{ x: 10 }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 30,
                }}
              >
                <Link
                  href="/about"
                  className="hidden sm:inline-flex group items-center underline mt-4 text-lg font-medium text-gray-900 hover:text-gray-600 transition-colors"
                >
                  Get to Know Us
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </motion.div>
            </motion.div>

            <motion.p
              className="text-base md:text-lg text-gray-600 md:max-w-xl lg:max-w-2xl font-coco-regular leading-6"
              variants={textRevealVariants}
            >
              Discover our handpicked selection of premium properties, designed to bring you closer to your dream home.
            </motion.p>

            <motion.div className="relative mt-6" variants={itemVariants}>
              <motion.hr
                className="md:w-[calc(100%-25rem)] w-[calc(100%-4rem)] border-t border-gray-300"
                initial={{ scaleX: 0 }}
                animate={featuredInView ? { scaleX: 1 } : { scaleX: 0 }}
                transition={{ duration: 1, delay: 0.5 }}
                style={{ transformOrigin: "left" }}
              />
              <motion.div
                className="absolute right-[calc(25rem)] -top-4 w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center bg-gray-50"
                initial={{ scale: 0, rotate: -180 }}
                animate={featuredInView ? { scale: 1, rotate: 0 } : { scale: 0, rotate: -180 }}
                transition={{
                  duration: 0.8,
                  delay: 0.8,
                  type: "spring",
                  stiffness: 200,
                }}
              >
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
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Desktop Grid View - Hidden on mobile */}
          <motion.div
            className="hidden md:grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8 md:mb-12"
            variants={containerVariants}
            initial="hidden"
            animate={featuredInView ? "visible" : "hidden"}
          >
            {featuredProperties.map((property, index) => (
              <motion.div
                key={property.id}
                className="group cursor-pointer"
                variants={{
                  hidden: {
                    opacity: 0,
                    y: 80,
                    rotateY: -15,
                    transformPerspective: 1000,
                  },
                  visible: {
                    opacity: 1,
                    y: 0,
                    rotateY: 0,
                    transition: {
                      delay: index * 0.15,
                      type: "spring" as const,
                      stiffness: 80,
                      damping: 20,
                      duration: 1.2,
                    },
                  },
                }}
                whileHover={{
                  y: -10,
                  scale: 1.02,
                  transition: {
                    type: "spring" as const,
                    stiffness: 300,
                    damping: 30,
                  },
                }}
              >
                <motion.div
                  className="relative aspect-[2/3] overflow-hidden rounded-xl mb-4"
                  whileHover={{ borderRadius: "1.5rem" }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="relative w-full h-full">
                    <Image
                      src={property.image || "/placeholder.svg" || "/placeholder.svg"}
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
                          repeat: Number.POSITIVE_INFINITY,
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
                  <motion.div
                    className="absolute top-3 left-3"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{
                      delay: index * 0.15 + 0.5,
                    }}
                  >
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium ${
                        property.status === "For Sale"
                          ? "bg-green-100 text-green-800"
                          : property.status === "For Rent"
                            ? "bg-blue-100 text-blue-800"
                            : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {property.status}
                    </span>
                  </motion.div>
                </motion.div>
                <motion.div
                  className="ml-1"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.15 + 0.3 }}
                >
                  <h3
                    className="text-lg font-coco-regular text-gray-900 group-hover:text-primary transition-colors"
                  >
                    {property.title}
                  </h3>
                  <p className="text-gray-600">
                    <span className="text-sm font-coco-light">{property.location}</span>
                  </p>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>

          {/* Mobile Carousel - Only visible on mobile */}
          <div className="md:hidden mb-8">
            <PropertyCarousel properties={featuredProperties} />
          </div>
        </div>
      </motion.section>

      {/* Services Section */}
      <motion.section
        ref={servicesRef}
        className="py-12 md:py-20 bg-[#eef2f3] relative overflow-hidden"
        initial={{ opacity: 0 }}
        animate={servicesInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 1.2 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="mb-8 relative z-10"
            variants={containerVariants}
            initial="hidden"
            animate={servicesInView ? "visible" : "hidden"}
          >
            <motion.span
              className="inline-block px-3 py-1 text-sm font-medium border border-zinc-800 rounded-full mb-4"
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
            >
              What We Do
            </motion.span>
            <motion.h2
              className="text-3xl md:text-6xl font-medium text-gray-900 font-coco-regular"
              variants={textRevealVariants}
            >
              Guiding you through every step of buying, selling, and living with confidence
            </motion.h2>
          </motion.div>

          <motion.div
            className="bg-neutral-900 p-4 sm:p-6 lg:p-8 rounded-lg"
            variants={morphVariants}
            initial="hidden"
            animate={servicesInView ? "visible" : "hidden"}
            whileHover={{
              scale: 1.01,
              boxShadow: "0 25px 50px rgba(0,0,0,0.2)",
            }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 30,
            }}
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-12">
              {/* Property Image */}
              <motion.div
                className="relative h-64 sm:h-80 md:h-96 lg:h-[350px] overflow-hidden rounded-lg"
                initial={{ opacity: 0, x: -50 }}
                animate={servicesInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
                transition={{ duration: 1, delay: 0.3 }}
                whileHover={{ scale: 1.02 }}
              >
                <Image
                  src="https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=1200"
                  alt="Luxury Property"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority
                />
              </motion.div>

              {/* Content */}
              <motion.div
                className="sm:pr-8"
                initial={{ opacity: 0, x: 50 }}
                animate={servicesInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
                transition={{ duration: 1, delay: 0.5 }}
              >
                <motion.p
                  className="text-gray-300 sm:mb-6 text-base md:text-lg lg:text-xl xl:text-2xl font-coco-light tracking-wide"
                  variants={textRevealVariants}
                >
                  At Right Property Hub, we're dedicated to helping you find your dream property or get the best value
                  when selling. Our experienced agents provide personalized service and expert guidance throughout your
                  real estate journey. With us, every step is refined, seamless, and crafted to match your lifestyle.
                </motion.p>
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={servicesInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.8, delay: 0.8 }}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    href="/about"
                    className="mt-4 sm:mt-6 md:mt-8 inline-flex items-center bg-neutral-200 justify-center w-12 h-12 md:w-14 md:h-14 rounded-full border border-gray-600 hover:bg-white/10 transition-colors group"
                  >
                    <ArrowRight className="w-6 h-6 text-black group-hover:text-primary transition-colors" />
                  </Link>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Property Listings with Filters */}
      <motion.section
        ref={propertiesRef}
        id="properties-section"
        className="py-20 relative overflow-hidden"
        initial={{ opacity: 0 }}
        animate={propertiesInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 1 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="mb-8 relative z-10"
            variants={containerVariants}
            initial="hidden"
            animate={propertiesInView ? "visible" : "hidden"}
          >
            <motion.div
              className="absolute -top-6 left-4 md:left-44 right-0 flex items-center z-0"
              initial={{ opacity: 0, x: -100 }}
              animate={propertiesInView ? { opacity: 0.3, x: 0 } : { opacity: 0, x: -100 }}
              transition={{ duration: 1.2, delay: 0.3 }}
            >
              <span className="font-amsterdam text-2xl md:text-4xl text-gray-400 select-none pointer-events-none">
                Our Properties
              </span>
            </motion.div>

            <motion.div
              className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 md:mb-4"
              variants={itemVariants}
            >
              <motion.h2
                className="text-3xl md:text-6xl font-medium text-gray-900 font-coco-regular"
                variants={textRevealVariants}
              >
                Explore our premier spaces
              </motion.h2>
              <motion.div
                variants={itemVariants}
                whileHover={{ x: 10 }}
              >
                <Link
                  href="/properties/india"
                  className="hidden sm:inline-flex group items-center underline mt-4 text-lg font-medium text-gray-900 hover:text-gray-600 transition-colors"
                >
                  See our Marketplace
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </motion.div>
            </motion.div>

            <motion.p
              className="text-base md:text-lg text-gray-600 md:max-w-xl lg:max-w-2xl font-coco-regular leading-6"
              variants={textRevealVariants}
            >
              Browse our complete collection of available properties and discover the perfect place that fits your
              lifestyle and future.
            </motion.p>

            <motion.div className="relative mt-6" variants={itemVariants}>
              <motion.hr
                className="border-t md:w-[calc(100%-25rem)] w-[calc(100%-4rem)] border-gray-300"
                initial={{ scaleX: 0 }}
                animate={propertiesInView ? { scaleX: 1 } : { scaleX: 0 }}
                transition={{ duration: 1, delay: 0.5 }}
                style={{ transformOrigin: "left" }}
              />
              <motion.div
                className="absolute right-[calc(25rem)] -top-4 w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center bg-gray-50"
                initial={{ scale: 0, rotate: -180 }}
                animate={propertiesInView ? { scale: 1, rotate: 0 } : { scale: 0, rotate: -180 }}
                transition={{
                  duration: 0.8,
                  delay: 0.8,
                  type: "spring",
                  stiffness: 200,
                }}
              >
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
              </motion.div>
            </motion.div>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 lg:grid-cols-4 gap-6 md:gap-8"
            variants={containerVariants}
            initial="hidden"
            animate={propertiesInView ? "visible" : "hidden"}
          >
            {/* Filters */}
            <motion.div
              className="lg:col-span-1 mb-6 lg:mb-0"
              variants={slideUpVariants}
            >
              <PropertyFilters
                filters={filters}
                onFiltersChange={setFilters}
                className="sticky top-24"
              />
            </motion.div>

            {/* Property Grid */}
            <motion.div className="lg:col-span-3" variants={itemVariants}>
              <motion.div
                className="mb-6 flex items-center justify-between"
                variants={textRevealVariants}
              >
                <p className="text-gray-600">
                  Showing {filteredProperties.length} of {allProperties.length} properties
                </p>
              </motion.div>

              <motion.div
                className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8"
                variants={containerVariants}
                key={`page-${currentPage}`}
              >
                <AnimatePresence>
                  {currentProperties.map((property, index) => (
                    <motion.div
                      key={property.id}
                      variants={{
                        hidden: {
                          opacity: 0,
                          y: 50,
                          scale: 0.9,
                        },
                        visible: {
                          opacity: 1,
                          y: 0,
                          scale: 1,
                          transition: {
                            delay: index * 0.1,
                            type: "spring" as const,
                            stiffness: 100,
                            damping: 15,
                          },
                        },
                      }}
                      exit={{
                        opacity: 0,
                        scale: 0.8,
                        transition: {
                          duration: 0.3,
                        },
                      }}
                      layout
                    >
                      <PropertyCard
                        property={property}
                        isLoading={false} // Show skeleton for first 6 cards
                        onCompare={handleCompare}
                        isSelected={compareList.some((p) => p.id === property.id)}
                        showCompareButton={true}
                      />
                    </motion.div>
                  ))}
                </AnimatePresence>
              </motion.div>

              {/* Pagination Controls */}
              {totalPages > 1 && (
                <motion.div
                  className="w-full mt-12"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <div className="flex flex-col sm:flex-row justify-center items-center gap-4 w-full">
                    {/* Previous Button - Full width on mobile, auto on larger screens */}
                    <button
                      onClick={prevPage}
                      disabled={currentPage === 1}
                      className={`w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2.5 bg-gray-100 rounded-md ${
                        currentPage === 1
                          ? "text-gray-400 cursor-not-allowed"
                          : "text-primary hover:bg-gray-200"
                      } transition-colors`}
                    >
                      <ArrowLeft className="w-4 h-4 flex-shrink-0" />
                      <span className="whitespace-nowrap">Previous</span>
                    </button>

                    {/* Page Numbers - Scrollable on mobile */}
                    <div className="w-full sm:w-auto overflow-x-auto py-2 sm:py-0">
                      <div className="flex items-center justify-center gap-1 sm:gap-2 min-w-max px-4 sm:px-0">
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map((number) => (
                          <button
                            key={number}
                            onClick={() => paginate(number)}
                            className={`w-8 h-8 sm:w-10 sm:h-10 text-sm sm:text-base rounded-full flex-shrink-0 flex items-center justify-center ${
                              currentPage === number
                                ? "bg-primary text-white"
                                : "text-gray-700 hover:bg-gray-100"
                            }`}
                          >
                            {number}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Next Button - Full width on mobile, auto on larger screens */}
                    <button
                      onClick={nextPage}
                      disabled={currentPage === totalPages}
                      className={`w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2.5 bg-gray-100 rounded-md ${
                        currentPage === totalPages
                          ? "text-gray-400 cursor-not-allowed"
                          : "text-primary hover:bg-gray-200"
                      } transition-colors`}
                    >
                      <span className="whitespace-nowrap">Next</span>
                      <ArrowRight className="w-4 h-4 flex-shrink-0" />
                    </button>
                  </div>

                  {/* Page Info - Shows current page and total pages */}
                  <div className="text-center mt-4 text-sm text-gray-500">
                    Page {currentPage} of {totalPages}
                  </div>
                </motion.div>
              )}

              {filteredProperties.length === 0 && (
                <motion.div
                  className="text-center py-12"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <Building className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-600 mb-2">No properties found</h3>
                  <p className="text-gray-500">Try adjusting your filters to see more results.</p>
                </motion.div>
              )}
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* Testimonials */}
      <motion.section
        ref={testimonialsRef}
        className="py-16 bg-[#eef2f3] relative overflow-hidden"
        initial={{ opacity: 0 }}
        animate={testimonialsInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 1 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="flex flex-col md:flex-row items-start justify-between gap-8 relative z-10"
            variants={containerVariants}
            initial="hidden"
            animate={testimonialsInView ? "visible" : "hidden"}
          >
            <motion.div className="md:max-w-md md:pt-6" variants={itemVariants}>
              <motion.span
                className="inline-block px-3 py-1 text-sm font-medium border border-zinc-800 rounded-full mb-4"
                whileHover={{ scale: 1.05 }}
              >
                Testimonials
              </motion.span>
              <motion.h2
                className="text-3xl md:text-5xl font-medium text-gray-900 mb-6 font-coco-regular"
                variants={textRevealVariants}
              >
                Discover what clients are saying about us
              </motion.h2>
              <motion.div className="flex space-x-4" variants={itemVariants}>
                <motion.button
                  className="testimonial-prev p-3 rounded-full bg-white shadow-md hover:bg-gray-50 transition-colors"
                  whileHover={{ scale: 1.1, rotate: -5 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-gray-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </motion.button>
                <motion.button
                  className="testimonial-next p-3 rounded-full bg-white shadow-md hover:bg-gray-50 transition-colors"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-gray-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </motion.button>
              </motion.div>
            </motion.div>

            <motion.div className="relative w-full overflow-y-hidden" variants={slideUpVariants}>
              <motion.div
                className="testimonial-track flex space-x-6 pt-2 overflow-x-auto scrollbar-hide snap-x snap-mandatory pr-12"
                variants={containerVariants}
              >
                {testimonials.map((testimonial, index) => (
                  <motion.div
                    key={index}
                    className="flex-shrink-0 w-80 bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow snap-center"
                    variants={{
                      hidden: {
                        opacity: 0,
                        y: 50,
                        rotateX: -15,
                      },
                      visible: {
                        opacity: 1,
                        y: 0,
                        rotateX: 0,
                        transition: {
                          delay: index * 0.2,
                          type: "spring" as const,
                          stiffness: 100,
                          damping: 15,
                        },
                      },
                    }}
                    whileHover={{
                      y: -5,
                      scale: 1.02,
                      boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
                    }}
                  >
                    <p className="text-gray-600 leading-relaxed mb-6 font-coco-regular">"{testimonial.content}"</p>
                    <div className="flex items-center space-x-4 pt-8 border-t border-gray-100">
                      <motion.div
                        className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0"
                        whileHover={{ scale: 1.1 }}
                      >
                        <Image
                          src={testimonial.image || "/placeholder.svg" || "/placeholder.svg"}
                          alt={testimonial.name}
                          width={40}
                          height={40}
                          className="w-full h-full object-cover"
                        />
                      </motion.div>
                      <div className="min-w-0">
                        <p className="font-medium text-gray-900 text-sm">{testimonial.name}</p>
                        <p className="text-xs text-gray-500">{testimonial.role}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* Client Logos Marquee */}
      <section className="py-12 bg-white border-t border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="mb-8 text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <motion.span
              className="inline-block px-3 py-1 text-sm font-medium border border-zinc-800 rounded-full mb-4"
              whileHover={{ scale: 1.05 }}
            >
              Our Clients
            </motion.span>
            <h3 className="text-2xl md:text-3xl font-medium text-gray-900 font-coco-light">
              Trusted by the best in the business
            </h3>
          </motion.div>

          <div className="relative overflow-hidden">
            <div className="relative py-6">
              <motion.div
                className="flex items-center animate-marquee whitespace-nowrap"
                animate={{ x: [0, -1000] }}
                transition={{
                  x: {
                    repeat: Number.POSITIVE_INFINITY,
                    repeatType: "loop",
                    duration: 20,
                    ease: "linear",
                  },
                }}
              >
                {[...Array(3)].map((_, loop) => (
                  <div key={loop} className="inline-flex items-center space-x-12 md:space-x-24 mr-12 md:mr-24">
                    {["Client 1", "Client 2", "Client 3", "Client 4", "Client 5", "Client 6"].map((client, i) => (
                      <motion.div
                        key={`${i}-${loop}`}
                        className="inline-flex items-center justify-center opacity-60 hover:opacity-100 transition-opacity duration-300"
                        whileHover={{ scale: 1.1 }}
                      >
                        <span className="text-2xl md:text-3xl font-coco-light text-gray-700">{client}</span>
                      </motion.div>
                    ))}
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <motion.section
        ref={ctaRef}
        className="relative py-24 overflow-hidden "
        initial={{ opacity: 0 }}
        animate={ctaInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 1.2 }}
      >
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image src="/images/1.jpg" alt="Luxury property" fill className="object-cover" priority />
          <motion.div
            className="absolute inset-0 bg-black/60"
            initial={{ opacity: 0 }}
            animate={ctaInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 1.5 }}
          />
        </div>

        <motion.div
          className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10"
          variants={containerVariants}
          initial="hidden"
          animate={ctaInView ? "visible" : "hidden"}
        >
          <motion.div className="space-y-8" variants={itemVariants}>
            <motion.h2
              className="text-3xl md:text-6xl font-light text-white font-coco-regular"
              variants={textRevealVariants}
            >
              Ready to Make your Dream Property a Reality ?
            </motion.h2>
            <motion.p className="text-xl text-gray-100 font-coco-light max-w-2xl mx-auto" variants={textRevealVariants}>
              Explore a curated selection that aligns with your vision and goals.
            </motion.p>
            <motion.div variants={morphVariants} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link href="/properties/dubai">
                <Button
                  className="px-8 py-4 text-lg rounded-3xl bg-white text-gray-900 hover:bg-gray-100 transition-colors font-medium group"
                  size="lg"
                >
                  View Properties
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.section>
    </div>
  )
}

export default HomePage