import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
    MapPin,
    Phone,
    Mail,
    Facebook,
    Twitter,
    Instagram,
    Linkedin,
} from "lucide-react";

const Footer = () => {
    const currentYear = new Date().getFullYear();
    const socialIcons = [
        { icon: Facebook, url: "#" },
        { icon: Twitter, url: "#" },
        { icon: Instagram, url: "#" },
        { icon: Linkedin, url: "#" },
        { icon: Mail, url: "mailto:info@rightpropertyhub.com" },
    ];

    const navLinks = [
        { href: "/", label: "Home" },
        { href: "/properties", label: "Properties" },
        { href: "/about", label: "About" },
        { href: "/blog", label: "Insights" },
        { href: "/contact", label: "Contact" },
    ];

    return (
        <footer className="w-full bg-[#eef2f3] border-t border-gray-100">
            {/* Top Section: Quote & Contact */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 md:py-16">
                <div className="flex flex-col space-y-8 md:space-y-0 md:flex-row justify-between items-start">
                    {/* Quote */}
                    <div className="w-full md:w-2/3">
                        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-coco-light text-gray-900 leading-tight">
                            Your perfect property journey starts with{" "}
                            <span className="font-coco-regular">
                                expert guidance
                            </span>
                        </h2>
                    </div>

                    {/* Contact Details */}
                    <div className="w-full md:w-auto text-left md:text-right">
                        <div className="space-y-3">
                            <div className="flex items-start">
                                <MapPin className="w-4 h-4 mt-0.5 mr-2 text-gray-600 flex-shrink-0 md:hidden" />
                                <div className="flex flex-col items-start">
                                    <p className="text-sm sm:text-base">123 Real Estate Ave</p>
                                    <p className="text-sm sm:text-base">Property City, PC 12345</p>
                                </div>
                            </div>
                            <div className="flex items-center">
                                <Phone className="w-4 h-4 mr-2 text-gray-600 flex-shrink-0 md:hidden" />
                                <a 
                                    href="tel:+919876543210" 
                                    className="text-sm sm:text-base text-gray-700 hover:text-gray-900 font-medium transition-colors"
                                >
                                    +91 9876543210
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Middle Section: Navigation & Social */}
            <div className="py-2">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="border-t border-b border-gray-300 py-4">
                        <div className="flex flex-col space-y-6 md:space-y-0 md:flex-row items-center justify-between">
                            {/* Navigation Links */}
                            <div className="w-full md:flex-1">
                                <nav className="flex flex-wrap justify-center md:justify-start gap-4 sm:gap-6">
                                    {navLinks.map(({ href, label }) => (
                                        <Link
                                            key={href}
                                            href={href}
                                            className="text-xs sm:text-sm text-gray-700 hover:text-gray-900 transition-colors font-medium"
                                        >
                                            {label}
                                        </Link>
                                    ))}
                                </nav>
                            </div>

                            {/* Logo - Centered on mobile, positioned between nav and social on desktop */}
                            <div className="order-first md:order-none my-2 md:my-0 px-4 md:px-8">
                                <Link href="/" className="block w-20 md:w-24 lg:w-28">
                                    <Image
                                        src="/images/logo.png"
                                        alt="Right Property Hub"
                                        width={112}
                                        height={56}
                                        className="w-full h-auto"
                                        priority
                                    />
                                </Link>
                            </div>

                            {/* Social Icons */}
                            <div className="w-full md:flex-1">
                                <div className="flex justify-center md:justify-end items-center space-x-4 sm:space-x-6">
                                    {socialIcons.map(
                                        ({ icon: Icon, url }, index) => (
                                            <a
                                                key={index}
                                                href={url}
                                                className="text-gray-400 hover:text-gray-900 transition-colors"
                                                aria-label={`Social media link ${
                                                    index + 1
                                                }`}
                                            >
                                                <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                                            </a>
                                        )
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Section: Copyright */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 pt-10 md:pt-16">
                <div className="flex flex-col space-y-4 sm:space-y-0 sm:flex-row justify-between items-center text-xs sm:text-sm text-gray-500">
                    <div className="text-center sm:text-left">
                        <p>&copy; {currentYear} Right Property Hub. All rights reserved.</p>
                    </div>
                    <div className="flex flex-wrap justify-center items-center gap-3 sm:gap-6">
                        <Link
                            href="/privacy"
                            className="hover:text-gray-900 transition-colors whitespace-nowrap"
                        >
                            Privacy Policy
                        </Link>
                        <Link
                            href="/terms"
                            className="hover:text-gray-900 transition-colors whitespace-nowrap"
                        >
                            Terms of Service
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
