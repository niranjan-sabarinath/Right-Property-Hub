import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Navigation from '@/components/navigation';
import Footer from '@/components/footer';
import PageHeader from '@/components/page-header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Users, 
  Award, 
  TrendingUp, 
  Home, 
  Shield, 
  Heart, 
  Star,
  Linkedin,
  Mail,
  Phone,
  GitCompare,
  Info
} from 'lucide-react';

const values = [
  {
    icon: Shield,
    title: 'Integrity',
    description: 'We conduct business with the highest level of integrity, transparency, and ethical standards.'
  },
  {
    icon: Heart,
    title: 'Client-Focused',
    description: 'Our clients\' needs and satisfaction are at the center of everything we do.'
  },
  {
    icon: Award,
    title: 'Excellence',
    description: 'We strive for excellence in every transaction and interaction.'
  },
  {
    icon: Users,
    title: 'Teamwork',
    description: 'We believe in collaboration and working together to achieve the best outcomes.'
  },
];

const team = [
  {
    name: 'Sarah Johnson',
    role: 'Founder & CEO',
    image: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400',
    bio: 'With over 15 years in real estate, Sarah founded Right Property Hub with a vision to revolutionize the property buying experience.',
    specialties: ['Luxury Properties', 'Commercial Real Estate', 'Investment Properties'],
    email: 'sarah@rightpropertyhub.com',
    linkedin: '#'
  },
  {
    name: 'Michael Chen',
    role: 'Senior Property Advisor',
    image: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400',
    bio: 'Michael brings expertise in residential properties and has helped hundreds of families find their perfect homes.',
    specialties: ['Residential Sales', 'First-time Buyers', 'Family Homes'],
    email: 'michael@rightpropertyhub.com',
    linkedin: '#'
  },
  {
    name: 'Emily Rodriguez',
    role: 'Investment Specialist',
    image: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=400',
    bio: 'Emily specializes in investment properties and helps clients build wealth through strategic real estate investments.',
    specialties: ['Investment Analysis', 'Portfolio Management', 'Market Research'],
    email: 'emily@rightpropertyhub.com',
    linkedin: '#'
  },
  {
    name: 'David Park',
    role: 'Market Analyst',
    image: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=400',
    bio: 'David provides in-depth market analysis and insights to help clients make informed real estate decisions.',
    specialties: ['Market Analysis', 'Property Valuation', 'Trends Research'],
    email: 'david@rightpropertyhub.com',
    linkedin: '#'
  },
];

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 font-gotham-light">
      <PageHeader 
        title="Right Property Hub"
        subtitle="Your Search Ends Here"
      />

      {/* Founder's Vision & Mission */}
      <section className="py-16 bg-gradient-to-br from-primary/5 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="flex flex-col md:flex-row">
              {/* Founder's Image - 75% height */}
              <div className="w-full md:w-5/12 lg:w-2/5 relative py-6 md:py-8 flex items-center">
                <div className="aspect-[2/2.25] w-full max-w-[350px] mx-auto">
                  <Image
                    src="/images/founder.jpg"
                    alt="Founder - Right Property Hub"
                    fill
                    className="object-cover"
                    priority
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 40vw, 30vw"
                  />
                </div>
              </div>
              
              {/* Founder's Message */}
              <div className="w-full md:w-7/12 lg:w-3/5 p-6 md:p-8 lg:p-12 flex flex-col justify-center">
                <div className="mb-6">
                  <h3 className="text-sm font-semibold text-primary uppercase tracking-wider mb-2">
                    RAVALI Vision & Mission
                  </h3>
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                    Founder, Right Property Hub
                  </h2>
                  <p className="text-gray-600 mb-6">
                    A woman entrepreneur with a post graduate and a deep-rooted passion for helping people make smart and confident real estate investments.
                  </p>
                </div>
                
                <div className="space-y-4 text-gray-700">
                  <p>
                    I founded Right Property Hub with one goal in mind: to provide people with pure, trustworthy, and lifetime property services that go beyond just buying a home.
                  </p>
                  <p>
                    I believe in quality over quantity, transparency over transactions, and in relationships that last a lifetime. With a proven track record of helping clients find the right property at the right price, in the right location, I proudly stand as a woman making mark in the real estate industry.
                  </p>
                  <p>
                    I don't just help you buy a property - I help you build a future.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Introduction Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto mb-16">
            <p className="text-lg text-gray-600 mb-8">
              At Right Property Hub, we're dedicated to making your real estate journey simple, stress-free, and successful. We believe that finding your dream property and turning it into a home should be an exciting and seamless experience. That's why we bring all the essential services under one roof, providing a one-stop solution for every step of your property journey.
            </p>
            <p className="text-lg text-gray-600">
              Our team of experts is committed to transparency and personalized service, ensuring you have the right guidance and support from the moment you start searching to the day you move in.
            </p>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Values</h2>
            <div className="w-20 h-1 bg-primary mx-auto"></div>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center mb-4 mx-auto">
                <Shield className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3 text-center">Trust and Transparency</h3>
              <p className="text-gray-600 text-center">Clear communication, verified & approved projects, and ethical guidance at every step.</p>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-green-50 rounded-full flex items-center justify-center mb-4 mx-auto">
                <Heart className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3 text-center">Client-First Service</h3>
              <p className="text-gray-600 text-center">Personalized recommendations and seamless coordination across all services throughout the journey.</p>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-purple-50 rounded-full flex items-center justify-center mb-4 mx-auto">
                <Award className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3 text-center">Quality and Accountability</h3>
              <p className="text-gray-600 text-center">Curated partners, measurable standards, and 100% client satisfaction.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Vision & Mission Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12">
            <div className="bg-blue-50 p-8 rounded-lg">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Vision</h2>
              <p className="text-gray-700">
                To be the most trusted and comprehensive partner for every individual and family looking to buy, build, and beautify their home. We aim to simplify the complex world of real estate by offering end-to-end solutions that are accessible, efficient, and tailored to your needs.
              </p>
            </div>
            
            <div className="bg-gray-50 p-8 rounded-lg">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h2>
              <p className="text-gray-700 mb-4">
                To deliver exceptional value by providing a complete suite of high-quality property services. We are committed to:
              </p>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start">
                  <span className="text-primary mr-2">•</span>
                  <span>Simplifying Home Buying with transparency and care</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">•</span>
                  <span>Designing Dream Spaces that reflect your style</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">•</span>
                  <span>Providing Financial Clarity for home loans</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">•</span>
                  <span>Building Lasting Relationships through professional service</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Services</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">Comprehensive solutions for all your property needs</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <Home className="w-5 h-5 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Home Buying</h3>
              <p className="text-gray-600 text-sm">Find your perfect property with expert guidance through every step of the purchase process.</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <div className="w-5 h-5 bg-green-600 rounded-sm transform rotate-45"></div>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Home Interior</h3>
              <p className="text-gray-600 text-sm">Transform your space with beautiful, functional interiors that reflect your personal style.</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center mb-4">
                <TrendingUp className="w-5 h-5 text-yellow-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Home Loan Assistance</h3>
              <p className="text-gray-600 text-sm">Navigate the home loan process with ease and secure the best terms for your needs.</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                <div className="w-5 h-5 bg-purple-600 rounded-sm"></div>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Architecture & Landscaping</h3>
              <p className="text-gray-600 text-sm">Professional design services to enhance your property's structure and outdoor spaces.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Why Choose Us?</h2>
          
          {/* Trust & Certification Badge */}
          <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 mb-12 max-w-2xl mx-auto">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <div className="flex-shrink-0 bg-white p-3 rounded-full shadow-sm">
                <Shield className="w-8 h-8 text-blue-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1">Trusted & Certified</h3>
                <p className="text-gray-600 text-sm">
                  RERA Certified: <span className="font-medium">A02500004422</span>
                </p>
              </div>
            </div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="flex items-start">
              <div className="flex-shrink-0 mt-1">
                <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                  <svg className="w-3 h-3 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
              <p className="ml-3 text-lg text-gray-700 text-left">One-stop solution for all property needs</p>
            </div>
            <div className="flex items-start">
              <div className="flex-shrink-0 mt-1">
                <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                  <svg className="w-3 h-3 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
              <p className="ml-3 text-lg text-gray-700 text-left">Trusted expertise & transparent process</p>
            </div>
            <div className="flex items-start">
              <div className="flex-shrink-0 mt-1">
                <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                  <svg className="w-3 h-3 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
              <p className="ml-3 text-lg text-gray-700 text-left">Personalized services to match your vision</p>
            </div>
            <div className="flex items-start">
              <div className="flex-shrink-0 mt-1">
                <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                  <svg className="w-3 h-3 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
              <p className="ml-3 text-lg text-gray-700 text-left">Committed to customer satisfaction</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;