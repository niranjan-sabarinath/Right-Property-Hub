'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, Home, Info, BookOpen, Building, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { href: '/', label: 'DISCOVER', icon: Home },
    { href: '/properties', label: 'PROPERTIES', icon: Building },
    { href: '/about', label: 'OUR STORY', icon: Info },
    { href: '/blog', label: 'INSIGHTS', icon: BookOpen },
  ];

  return (
    <nav className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
      isScrolled 
        ? "glass-effect shadow-lg py-1" 
        : "bg-transparent py-2"
    )}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-12">
          {/* Logo */}
          <Link 
            href="/" 
            className="flex items-center space-x-3 group"
          >
            <div className="relative transform group-hover:scale-105 transition-transform duration-200">
              <Image
                src="/images/logo.png"
                alt="Right Property Hub Logo"
                height={90}
                width={90}
                className="object-contain"
                priority
              />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className={cn(
                  "relative px-3 py-1 text-sm font-medium transition-colors duration-200 rounded-full",
                  "hover:text-gray-900",
                  pathname === href 
                    ? "text-gray-900 font-semibold" 
                    : "text-gray-600"
                )}
              >
                {label}
              </Link>
            ))}
          </div>

          {/* CTA Link */}
          <div className="hidden md:flex">
            <Link 
              href="/contact" 
              className="flex items-center uppercase space-x-2 text-gray-900 font-semibold underline text-sm hover:text-primary transition-colors duration-200"
            >
              <span>Get in Touch</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Mobile Menu */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-80">
              <div className="flex flex-col space-y-6 mt-8">
                {navItems.map(({ href, label, icon: Icon }) => (
                  <Link
                    key={href}
                    href={href}
                    onClick={() => setIsOpen(false)}
                    className={cn(
                      "flex items-center space-x-3 px-4 py-2 rounded-full transition-colors",
                      "hover:bg-gray-100",
                      pathname === href 
                        ? "bg-gray-100 text-gray-900 font-semibold" 
                        : "text-gray-600"
                    )}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="font-medium">{label}</span>
                  </Link>
                ))}
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
    </nav>
  );
};

export default Navigation;