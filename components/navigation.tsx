"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, Home, Info, BookOpen, Building, ArrowRight, ChevronDown } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const Navigation = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [isPropertiesOpen, setIsPropertiesOpen] = useState(false);
    // Close dropdown when clicking outside or when route changes
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const target = event.target as HTMLElement;
            if (isPropertiesOpen && !target.closest('.relative')) {
                setIsPropertiesOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isPropertiesOpen]);

    // Close dropdown when route changes
    useEffect(() => {
        const handleRouteChange = () => {
            setIsPropertiesOpen(false);
            setIsOpen(false);
        };
        
        // Listen for route changes
        const handleRouteStart = () => handleRouteChange();
        
        window.addEventListener('routeChangeStart', handleRouteStart);
        window.addEventListener('popstate', handleRouteStart);
        
        return () => {
            window.removeEventListener('routeChangeStart', handleRouteStart);
            window.removeEventListener('popstate', handleRouteStart);
        };
    }, []);

    const pathname = usePathname();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const navItems = [
        { href: "/", label: "DISCOVER", icon: Home },
        { 
            label: "PROPERTIES", 
            icon: Building,
            isDropdown: true,
            items: [
                { href: "/properties/india", label: "India Properties" },
                { href: "/properties/dubai", label: "Dubai Properties" }
            ]
        },
        { href: "/about", label: "OUR STORY", icon: Info },
        { href: "/blog", label: "INSIGHTS", icon: BookOpen },
    ];

    return (
        <nav
            className={cn(
                "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
                isScrolled
                    ? "glass-effect shadow-lg py-0"
                    : "bg-transparent py-0"
            )}
            style={{
                pointerEvents: 'auto' // Ensure pointer events are enabled
            }}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-32 w-full">
                    {/* Logo */}
                    <Link
                        href="/"
                        className="flex items-center space-x-3 group flex-shrink-0"
                        onClick={(e) => {
                            e.preventDefault();
                            setIsOpen(false);
                            setIsPropertiesOpen(false);
                            // Use window.location for navigation to ensure it works on home page
                            if (window.location.pathname !== '/') {
                                window.location.href = '/';
                            }
                        }}
                    >
                        <div className="relative transform group-hover:scale-105 transition-transform duration-200">
                            <Image
                                src="/images/logo.png"
                                alt="Right Property Hub Logo"
                                height={180}
                                width={180}
                                className="h-16 w-auto md:h-32"
                                priority
                            />
                        </div>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-8 ml-20">
                        {navItems.map((item) => {
                            const isActive = item.href ? pathname === item.href : pathname.startsWith('/properties/');
                            
                            if (item.isDropdown) {
                                return (
                                    <div key={item.label} className="relative">
                                        <button
                                            type="button"
                                            className={cn(
                                                "flex items-center px-3 py-1 text-sm font-medium transition-colors duration-200 rounded-full whitespace-nowrap",
                                                "hover:text-gray-900 focus:outline-none",
                                                (isActive || isPropertiesOpen)
                                                    ? "text-gray-900 font-semibold"
                                                    : "text-gray-600"
                                            )}
                                            onClick={(e) => {
                                                e.preventDefault();
                                                e.stopPropagation();
                                                setIsPropertiesOpen(!isPropertiesOpen);
                                            }}
                                            aria-expanded={isPropertiesOpen}
                                            aria-haspopup="true"
                                        >
                                            {item.label}
                                            <ChevronDown className={`ml-1 h-4 w-4 transition-transform duration-200 ${isPropertiesOpen ? 'transform rotate-180' : ''}`} />
                                        </button>
                                        
                                        {/* Dropdown Menu */}
                                        <motion.div 
                                            initial={{ opacity: 0, y: 10, display: 'none' }}
                                            animate={isPropertiesOpen ? { 
                                                opacity: 1, 
                                                y: 0, 
                                                display: 'block',
                                                transitionEnd: { display: 'block' }
                                            } : { 
                                                opacity: 0, 
                                                y: 10,
                                                transitionEnd: { display: 'none' }
                                            }}
                                            transition={{ duration: 0.2, ease: 'easeOut' }}
                                            className="absolute left-0 mt-2 w-64 bg-white rounded-xl shadow-xl overflow-hidden border border-gray-100 z-50"
                                        >
                                            <div className="py-1.5">
                                                {item.items.map((subItem, index) => (
                                                    <motion.div
                                                        key={subItem.href}
                                                        initial={{ x: -10, opacity: 0 }}
                                                        animate={{ x: 0, opacity: 1 }}
                                                        transition={{ delay: 0.05 * index, duration: 0.2 }}
                                                    >
                                                        <Link
                                                            href={subItem.href}
                                                            onClick={(e) => {
                                                                e.preventDefault();
                                                                setIsOpen(false);
                                                                setIsPropertiesOpen(false);
                                                                // Use window.location for navigation to ensure it works on home page
                                                                window.location.href = subItem.href;
                                                            }}
                                                            className={cn(
                                                                "block px-5 py-3 text-sm font-medium transition-all duration-200 flex items-center group w-full",
                                                                "hover:bg-primary/5 hover:text-primary cursor-pointer",
                                                                pathname === subItem.href 
                                                                    ? "text-primary bg-primary/5 font-semibold" 
                                                                    : "text-gray-700"
                                                            )}
                                                        >
                                                            <span className="relative group-hover:translate-x-1 transition-transform duration-200">
                                                                {subItem.label}
                                                                <span className={cn(
                                                                    "absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300",
                                                                    pathname === subItem.href ? 'w-full' : 'group-hover:w-full'
                                                                )}></span>
                                                            </span>
                                                            <ArrowRight className="ml-2 h-3.5 w-3.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                                                        </Link>
                                                        {index < item.items.length - 1 && (
                                                            <div className="mx-3 h-px bg-gray-100 last:hidden"></div>
                                                        )}
                                                    </motion.div>
                                                ))}
                                            </div>
                                        </motion.div>
                                    </div>
                                );
                            }
                            
                            // Only render Link if href is defined
                            if (!item.href) return null;
                            
                            return (
                                <div key={item.href} className="relative group">
                                    <Link
                                        href={item.href}
                                        onClick={(e) => {
                                            e.preventDefault();
                                            setIsOpen(false);
                                            setIsPropertiesOpen(false);
                                            // Use window.location for navigation to ensure it works on home page
                                            window.location.href = item.href;
                                        }}
                                        className={cn(
                                            "relative px-3 py-2 text-sm font-medium transition-colors duration-200 rounded-full whitespace-nowrap block cursor-pointer",
                                            "hover:text-gray-900",
                                            isActive
                                                ? "text-gray-900 font-semibold"
                                                : "text-gray-600"
                                        )}
                                    >
                                        {item.label}
                                        <span className={cn(
                                            "absolute -bottom-1 left-3 right-3 h-0.5 bg-primary transition-all duration-300 transform scale-x-0 group-hover:scale-x-100",
                                            isActive ? 'scale-x-100' : ''
                                        )}></span>
                                    </Link>
                                </div>
                            );
                        })}
                    </div>

                    {/* CTA Link - Pushed to the right */}
                    <div className="hidden md:flex ml-auto">
                        <div className="relative group">
                            <Link
                                href="/contact"
                                onClick={(e) => {
                                    e.preventDefault();
                                    setIsOpen(false);
                                    setIsPropertiesOpen(false);
                                    // Use window.location for navigation to ensure it works on home page
                                    window.location.href = '/contact';
                                }}
                                className={cn(
                                    "flex items-center justify-center space-x-2 font-semibold text-sm transition-all duration-300 cursor-pointer",
                                    isScrolled
                                        ? "bg-gray-900 text-white border-2 border-gray-900 hover:bg-gray-800 hover:border-gray-800"
                                        : "bg-gray-900 text-white border-2 border-gray-900 hover:bg-gray-800 hover:border-gray-800",
                                    "px-4 py-1.5 rounded-full shadow-md hover:shadow-lg relative overflow-hidden group"
                                )}
                            >
                                <span className="relative z-10">Get in Touch</span>
                                <ArrowRight className="w-4 h-4 relative z-10 group-hover:translate-x-1 transition-transform duration-200" />
                                <span className="absolute inset-0 bg-gray-800 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                            </Link>
                        </div>
                    </div>

                    {/* Mobile Menu - Moved to the right */}
                    <div className="md:hidden">
                        <Sheet open={isOpen} onOpenChange={setIsOpen}>
                            <SheetTrigger asChild>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="ml-auto"
                                >
                                    <Menu className="h-6 w-6" />
                                </Button>
                            </SheetTrigger>
                        <SheetContent side="right" className="w-80">
                            <div className="flex flex-col space-y-6 mt-8">
                                {navItems.flatMap((item) => {
                                    if (item.isDropdown) {
                                        return [
                                            <div key={item.label} className="w-full">
                                                <button
                                                    onClick={() => setIsPropertiesOpen(!isPropertiesOpen)}
                                                    className={cn(
                                                        "w-full flex items-center justify-between px-4 py-2 text-left rounded-full transition-colors",
                                                        "hover:bg-gray-100 focus:outline-none",
                                                        pathname.startsWith('/properties/')
                                                            ? "bg-gray-100 text-gray-900 font-semibold"
                                                            : "text-gray-600"
                                                    )}
                                                >
                                                    <div className="flex items-center space-x-3">
                                                        <item.icon className="w-5 h-5" />
                                                        <span className="font-medium">{item.label}</span>
                                                    </div>
                                                    <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${isPropertiesOpen ? 'transform rotate-180' : ''}`} />
                                                </button>
                                                
                                                {isPropertiesOpen && (
                                                    <motion.div 
                                                        initial={{ opacity: 0, height: 0 }}
                                                        animate={{ opacity: 1, height: 'auto' }}
                                                        exit={{ opacity: 0, height: 0 }}
                                                        transition={{ duration: 0.2 }}
                                                        className="pl-8 mt-1 space-y-0.5 overflow-hidden"
                                                    >
                                                        {item.items.map((subItem, index) => (
                                                            <motion.div
                                                                key={subItem.href}
                                                                initial={{ x: -10, opacity: 0 }}
                                                                animate={{ x: 0, opacity: 1 }}
                                                                transition={{ delay: 0.05 * index, duration: 0.2 }}
                                                                className="w-full"
                                                            >
                                                                <Link
                                                                    href={subItem.href}
                                                                    onClick={(e) => {
                                                                        e.preventDefault();
                                                                        setIsOpen(false);
                                                                        setIsPropertiesOpen(false);
                                                                        // Use window.location for navigation to ensure it works on home page
                                                                        window.location.href = subItem.href;
                                                                    }}
                                                                    className={cn(
                                                                        "block px-4 py-2.5 text-sm rounded-lg transition-all duration-200 flex items-center cursor-pointer",
                                                                        "hover:bg-primary/5 hover:text-primary",
                                                                        pathname === subItem.href
                                                                            ? "text-primary bg-primary/5 font-semibold"
                                                                            : "text-gray-600"
                                                                    )}
                                                                >
                                                                    <span className="relative">
                                                                        {subItem.label}
                                                                        <span className={cn(
                                                                            "absolute -bottom-0.5 left-0 w-0 h-0.5 bg-primary transition-all duration-300",
                                                                            pathname === subItem.href ? 'w-full' : 'group-hover:w-full'
                                                                        )}></span>
                                                                    </span>
                                                                    <ArrowRight className="ml-2 h-3.5 w-3.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                                                                </Link>
                                                            </motion.div>
                                                        ))}
                                                    </motion.div>
                                                )}
                                            </div>
                                        ];
                                    }
                                    
                                    // Only render Link if href is defined
                                    if (!item.href) return null;
                                    
                                    return [
                                        <Link
                                            key={item.href}
                                            href={item.href}
                                            onClick={(e) => {
                                                e.preventDefault();
                                                setIsOpen(false);
                                                setIsPropertiesOpen(false);
                                                // Use window.location for navigation to ensure it works on home page
                                                window.location.href = item.href;
                                            }}
                                            className={cn(
                                                "flex items-center space-x-3 px-4 py-2 rounded-full transition-colors w-full cursor-pointer",
                                                "hover:bg-gray-100",
                                                pathname === item.href
                                                    ? "bg-gray-100 text-gray-900 font-semibold"
                                                    : "text-gray-600"
                                            )}
                                        >
                                            <item.icon className="w-5 h-5" />
                                            <span className="font-medium">
                                                {item.label}
                                            </span>
                                        </Link>
                                    ];
                                })}
                                <Link
                                    href="/contact"
                                    onClick={() => setIsOpen(false)}
                                    className="flex items-center space-x-2 mx-4 text-gray-900 font-bold hover:text-primary transition-colors duration-200"
                                >
                                    <span>Get in Touch</span>
                                    <ArrowRight className="w-4 h-4" />
                                </Link>
                            </div>
                        </SheetContent>
                        </Sheet>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navigation;
