import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { MapPin, Phone, Mail, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-neutral-900 text-white m-6 mt-0 rounded-b-3xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center space-x-3 group">
              <div className="relative h-16 w-auto transform group-hover:scale-105 transition-transform duration-200">
                <Image
                  src="/images/logo.png"
                  alt="Right Property Hub Logo"
                  height={90}
                  width={180}
                  className="h-full w-auto object-contain"
                />
              </div>
            </Link>
            <p className="text-gray-300 text-sm leading-relaxed font-coco-light">
              Your trusted partner in finding the perfect property. We provide exceptional real estate services with a focus on quality, integrity, and client satisfaction.
            </p>
            <div className="flex space-x-4">
              {[Facebook, Twitter, Instagram, Linkedin].map((Icon, index) => (
                <Button
                  key={index}
                  variant="ghost"
                  size="icon"
                  className="text-gray-400 hover:text-primary hover:bg-primary/10"
                >
                  <Icon className="w-5 h-5" />
                </Button>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 font-coco-regular tracking-wide">Quick Links</h3>
            <div className="space-y-2 font-coco-light">
              {[
                { href: '/', label: 'Home' },
                { href: '/properties', label: 'Properties' },
                { href: '/about', label: 'About Us' },
                { href: '/blog', label: 'Blog' },
                { href: '/contact', label: 'Contact' },
              ].map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  className="block text-gray-300 hover:text-primary transition-colors text-sm"
                >
                  {label}
                </Link>
              ))}
            </div>
          </div>

          {/* Services */}
          <div className='font-coco-light'>
            <h3 className="text-lg font-semibold mb-4 font-coco-regular tracking-wide">Services</h3>
            <div className="space-y-2">
              {[
                'Property Sales',
                'Property Rentals',
                'Property Management',
                'Investment Consulting',
                'Market Analysis',
                'Property Valuation',
              ].map((service) => (
                <div key={service} className="text-gray-300 text-sm">
                  {service}
                </div>
              ))}
            </div>
          </div>

          {/* Contact & Newsletter */}
          <div>
            <h3 className="text-lg font-semibold mb-4 font-coco-regular tracking-wide">Contact Info</h3>
            <div className="space-y-3 ">
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                <span className="text-gray-300 text-sm">
                  123 Real Estate Ave<br />
                  Property City, PC 12345
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-primary" />
                <span className="text-gray-300 text-sm">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-primary" />
                <span className="text-gray-300 text-sm ">info@rightpropertyhub.com</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-400 text-sm ">
              © {currentYear} <span className="font-coco-light">Right Property Hub</span>. All rights reserved.
            </p>
            <div className="flex space-x-6 text-sm text-gray-400 font-coco-light">
              <Link href="#" className="hover:text-primary transition-colors">Privacy Policy</Link>
              <Link href="#" className="hover:text-primary transition-colors">Terms of Service</Link>
              <Link href="#" className="hover:text-primary transition-colors">Cookie Policy</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;