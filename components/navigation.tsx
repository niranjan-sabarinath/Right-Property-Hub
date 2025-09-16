"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu, Home, Info, BookOpen, Building, ArrowRight, ChevronDown, MapPin } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"
import { navVariants, logoVariants, navItemVariants, ctaVariants } from "@/lib/animations"

type NavLink = {
  href: string;
  label: string;
  icon?: React.ComponentType<{ className?: string }>;
};

type NavItem = (NavLink & {
  icon: React.ComponentType<{ className?: string }>;
  items?: never;
}) | {
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  items: NavLink[];
  href?: never;
};

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()
  const isHomePage = pathname === "/"

  useEffect(() => {
    if (isHomePage) {
      const handleScroll = () => {
        setIsScrolled(window.scrollY > 20)
      }
      window.addEventListener("scroll", handleScroll, { passive: true })
      return () => window.removeEventListener("scroll", handleScroll)
    } else {
      setIsScrolled(true)
    }
  }, [isHomePage])

  const navItems = [
    { href: "/", label: "DISCOVER", icon: Home },
    { 
      label: "PROPERTIES", 
      icon: Building,
      items: [
        { 
          href: "/properties/india", 
          label: "India Properties",
          icon: MapPin,
          description: "Explore our premium properties across India"
        },
        { 
          href: "/properties/dubai", 
          label: "Dubai Properties",
          icon: MapPin,
          description: "Discover luxury properties in Dubai"
        }
      ]
    },
    { href: "/about", label: "OUR STORY", icon: Info },
    { href: "/blog", label: "INSIGHTS", icon: BookOpen },
  ]

  

  return (
    <nav className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-2rem)] max-w-6xl">
      <motion.div
        variants={navVariants}
        animate={isScrolled ? "expanded" : "floating"}
        className="transition-all duration-500 w-full rounded-full border border-white/30 py-1.5 px-6 shadow-lg"
      >
        <div className="mx-auto">
          <div className="flex items-center justify-between h-14 md:h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-3 group">
              <motion.div
                variants={logoVariants}
                animate={isScrolled ? "expanded" : "floating"}
                className="relative"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Image
                  src="/images/logo.png"
                  alt="Right Property Hub Logo"
                  height={100}
                  width={100}
                  className="transition-all duration-500 object-contain"
                  priority
                />
              </motion.div>
            </Link>

            {/* Desktop Navigation */}
            <div className={cn("hidden md:flex items-center space-x-1 mx-auto", !isScrolled && "px-4 py-1.5")}>
              <AnimatePresence>
                {navItems.map((item, index) => {
                  if (item.href) {
                    return (
                      <motion.div
                        key={item.href}
                        custom={index}
                        variants={navItemVariants}
                        initial="hidden"
                        animate="visible"
                        whileHover="hover"
                      >
                        <Link
                          href={item.href}
                          className={cn(
                            "relative px-4 py-2 text-sm font-medium transition-all tracking-wider font-coco-regular duration-300 rounded-full flex items-center gap-1",
                            isScrolled
                              ? pathname === item.href
                                ? "text-gray-900 font-semibold"
                                : "text-gray-700 hover:text-gray-900"
                              : pathname === item.href
                                ? "text-white font-medium relative after:content-[''] after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-1/2 after:h-0.5 after:bg-white after:rounded-full"
                                : "text-white/70 hover:text-white",
                          )}
                        >
                          {item.label}
                        </Link>
                      </motion.div>
                    )
                  } else if (item.items) {
                    return (
                      <motion.div
                        key={item.label}
                        custom={index}
                        variants={navItemVariants}
                        initial="hidden"
                        animate="visible"
                      >
                        <DropdownMenu>
                          <DropdownMenuTrigger className={cn(
                            "group relative px-4 py-2 text-sm font-medium transition-all tracking-wider font-coco-regular duration-300 rounded-full flex items-center gap-1 focus:outline-none",
                            isScrolled
                              ? pathname.startsWith("/properties")
                                ? "text-primary font-semibold"
                                : "text-gray-700 hover:text-primary"
                              : pathname.startsWith("/properties")
                                ? "text-white font-medium"
                                : "text-white/90 hover:text-white"
                          )}>
                            <span className="relative">
                              {item.label}
                              <span className={cn(
                                "absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300",
                                pathname.startsWith("/properties") ? "w-full" : "group-hover:w-full"
                              )} />
                            </span>
                            <ChevronDown className={cn(
                              "w-4 h-4 ml-1 transition-transform duration-200",
                              pathname.startsWith("/properties") && "rotate-180"
                            )} />
                          </DropdownMenuTrigger>
                          <DropdownMenuContent 
                            align="start" 
                            sideOffset={12}
                            className="w-64 p-2 border-0 rounded-xl shadow-xl bg-white/95 backdrop-blur-sm overflow-hidden"
                          >
                            <div className="space-y-1">
                              <h3 className="px-3 py-2 text-xs font-semibold tracking-wider text-gray-500 uppercase">
                                Explore Properties
                              </h3>
                              {item.items?.map((subItem) => (
                                <DropdownMenuItem key={subItem.href} asChild className="p-0">
                                  <Link
                                    href={subItem.href}
                                    className={cn(
                                      "flex items-start p-3 space-x-3 transition-colors rounded-lg group",
                                      "hover:bg-gray-50 focus:bg-gray-50"
                                    )}
                                  >
                                    <div className="flex items-center justify-center flex-shrink-0 w-8 h-8 mt-0.5 rounded-full bg-primary/10 text-primary">
                                      {subItem.icon && <subItem.icon className="w-4 h-4" />}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                      <p className="text-sm font-medium text-gray-900">
                                        {subItem.label}
                                      </p>
                                      {subItem.description && (
                                        <p className="mt-0.5 text-xs text-gray-500 line-clamp-2">
                                          {subItem.description}
                                        </p>
                                      )}
                                    </div>
                                    <ArrowRight className="w-4 h-4 ml-2 text-gray-400 transition-transform group-hover:translate-x-0.5" />
                                  </Link>
                                </DropdownMenuItem>
                              ))}
                            </div>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </motion.div>
                    )
                  }
                  return null;
                })}
              </AnimatePresence>
            </div>

            {/* CTA Link */}
            <div className="hidden md:flex">
              <motion.div
                variants={ctaVariants}
                initial="hidden"
                animate="visible"
                whileHover="hover"
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  href="/contact"
                  className={cn(
                    "flex items-center space-x-2 font-medium text-sm transition-all duration-300 px-4 py-2.5 rounded-full",
                    isScrolled
                      ? "bg-gray-900 text-white hover:bg-gray-800 shadow-md"
                      : "bg-white text-gray-900 hover:bg-gray-100 shadow-lg",
                  )}
                >
                  <span>Get in Touch</span>
                  <motion.div
                    animate={{ x: [0, 3, 0] }}
                    transition={{ repeat: Number.POSITIVE_INFINITY, duration: 2, ease: "easeInOut" }}
                  >
                    <ArrowRight className="w-4 h-4" />
                  </motion.div>
                </Link>
              </motion.div>
            </div>

            {/* Mobile Menu */}
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                  <Button
                    variant="ghost"
                    size="icon"
                    className={cn(
                      "md:hidden transition-all duration-300 hover:bg-white/20",
                      isScrolled ? "text-gray-900" : "text-white",
                    )}
                  >
                    <Menu className="h-6 w-6" />
                  </Button>
                </motion.div>
              </SheetTrigger>
              <SheetContent side="right" className="w-72 bg-white/95 backdrop-blur-sm border-l border-white/20">
                <motion.div
                  className="flex flex-col space-y-2 mt-8 p-2"
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ staggerChildren: 0.1 }}
                >
                  {navItems.map((item, index) => {
                    const { label, icon: Icon } = item;
                    
                    if (item.items) {
                      return (
                        <div key={label} className="w-full">
                          <div className="flex items-center space-x-3 px-4 py-3 text-gray-700">
                            <Icon className="w-5 h-5" />
                            <span className="font-medium">{label}</span>
                          </div>
                          <div className="pl-8 space-y-1">
                            {item.items.map((subItem) => (
                              <motion.div
                                key={subItem.href}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.1 + 0.1 }}
                              >
                                <Link
                                  href={subItem.href}
                                  onClick={() => setIsOpen(false)}
                                  className={cn(
                                    "flex items-center px-4 py-2 rounded-xl transition-all duration-200",
                                    pathname === subItem.href
                                      ? "bg-gray-100 text-gray-900 font-medium"
                                      : "text-gray-600 hover:bg-gray-50",
                                  )}
                                >
                                  <span>{subItem.label}</span>
                                </Link>
                              </motion.div>
                            ))}
                          </div>
                        </div>
                      );
                    }
                    
                    return (
                      <motion.div
                        key={item.href}
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="w-full"
                      >
                        <Link
                          href={item.href}
                          onClick={() => setIsOpen(false)}
                          className={cn(
                            "flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200",
                            pathname === item.href
                              ? "bg-gray-100 text-gray-900 font-medium"
                              : "text-gray-700 hover:bg-gray-50",
                          )}
                        >
                          <Icon className="w-5 h-5" />
                          <span>{label}</span>
                        </Link>
                      </motion.div>
                    );
                  })}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    whileHover={{ scale: 1.02 }}
                  >
                    <Link
                      href="/contact"
                      onClick={() => setIsOpen(false)}
                      className="mt-4 flex items-center justify-center space-x-2 px-4 py-3 bg-gray-900 text-white rounded-xl font-medium hover:bg-gray-800 transition-colors"
                    >
                      <span>Get in Touch</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </motion.div>
                </motion.div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </motion.div>
    </nav>
  )
}

export default Navigation
