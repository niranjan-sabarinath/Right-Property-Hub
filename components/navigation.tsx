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
  const isHomePage = pathname === '/';

  useEffect(() => {
    if (isHomePage) {
      const handleScroll = () => {
        setIsScrolled(window.scrollY > 20);
      };
      window.addEventListener('scroll', handleScroll, { passive: true });
      return () => window.removeEventListener('scroll', handleScroll);
    } else {
      setIsScrolled(true);
    }
  }, [isHomePage]);

  const navItems = [
    { href: '/', label: 'DISCOVER', icon: Home },
    { href: '/properties', label: 'PROPERTIES', icon: Building },
    { href: '/about', label: 'OUR STORY', icon: Info },
    { href: '/blog', label: 'INSIGHTS', icon: BookOpen },
  ];

  return (
    <nav className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-2rem)] max-w-6xl">
      <div className={cn(
        "transition-all duration-500 w-full",
        isScrolled 
          ? "backdrop-blur-md bg-white/80 shadow-lg rounded-full border py-1.5 px-6" 
          : "backdrop-blur-md bg-white/5 rounded-full py-1.5 px-6 w-auto"
      )}>
      <div className="mx-auto">
        <div className="flex items-center justify-between h-14">
          {/* Logo */}
          <Link 
            href="/" 
            className="flex items-center space-x-3 group transition-transform duration-300 hover:scale-105"
          >
            <div className="relative">
              <Image
                src="/images/logo.png"
                alt="Right Property Hub Logo"
                height={isScrolled ? 70 : 80}
                width={isScrolled ? 70 : 80}
                className="transition-all duration-500 object-contain"
                priority
              />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className={cn(
            "hidden md:flex items-center space-x-1 mx-auto",
            !isScrolled && "px-4 py-1.5"
          )}>
            {navItems.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className={cn(
                  "relative px-4 py-2 text-sm font-medium transition-all duration-300 rounded-full",
                  isScrolled 
                    ? pathname === href 
                      ? "text-gray-900 font-semibold"
                      : "text-gray-700 hover:text-gray-900"
                    : pathname === href 
                      ? "text-white font-medium relative after:content-[''] after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-1/2 after:h-0.5 after:bg-white after:rounded-full" 
                      : "text-white/70 hover:text-white",
                  "hover:scale-105 transform transition-transform"
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
              className={cn(
                "flex items-center space-x-2 font-medium text-sm transition-all duration-300 px-4 py-2.5 rounded-full",
                isScrolled 
                  ? "bg-gray-900 text-white hover:bg-gray-800 shadow-md"
                  : "bg-white text-gray-900 hover:bg-gray-100 shadow-lg",
                "hover:scale-105 transform"
              )}
            >
              <span>Get in Touch</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Mobile Menu */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button 
                variant="ghost" 
                size="icon" 
                className={cn(
                  "md:hidden transition-all duration-300 hover:bg-white/20",
                  isScrolled ? "text-gray-900" : "text-white"
                )}
              >
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-72 bg-white/95 backdrop-blur-sm border-l border-white/20">
              <div className="flex flex-col space-y-2 mt-8 p-2">
                {navItems.map(({ href, label, icon: Icon }) => (
                  <Link
                    key={href}
                    href={href}
                    onClick={() => setIsOpen(false)}
                    className={cn(
                      "flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200",
                      pathname === href 
                        ? "bg-gray-100 text-gray-900 font-medium" 
                        : "text-gray-700 hover:bg-gray-50"
                    )}
                  >
                    <Icon className="w-5 h-5" />
                    <span>{label}</span>
                  </Link>
                ))}
                <Link 
                  href="/contact" 
                  onClick={() => setIsOpen(false)}
                  className="mt-4 flex items-center justify-center space-x-2 px-4 py-3 bg-gray-900 text-white rounded-xl font-medium hover:bg-gray-800 transition-colors"
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