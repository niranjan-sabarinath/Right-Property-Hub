import React from 'react';
import Image from 'next/image';
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
  Phone
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
    <div className="min-h-screen bg-white">
      <Navigation />

      {/* Hero Section */}
      <PageHeader 
        title="About Right Property Hub"
        subtitle="We're more than just a real estate company. We're your trusted partners in finding the perfect property, backed by years of experience, local expertise, and an unwavering commitment to excellence."
      />

      {/* Story Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Our Story</h2>
              <div className="space-y-6 text-gray-700 leading-relaxed">
                <p>
                  Founded in 2008, Right Property Hub began with a simple yet powerful vision: to transform 
                  the real estate experience by putting our clients first. What started as a small team of 
                  passionate real estate professionals has grown into one of the region's most trusted property companies.
                </p>
                <p>
                  Over the years, we've built our reputation on the foundation of integrity, expertise, and 
                  exceptional service. We believe that buying or selling a property is one of life's most 
                  important decisions, and we're honored to guide our clients through this journey.
                </p>
                <p>
                  Today, we continue to innovate and evolve, embracing new technologies and market insights 
                  while staying true to our core values of honesty, dedication, and results-driven service.
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square rounded-2xl overflow-hidden">
                <Image
                  src="https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=800"
                  alt="Right Property Hub Office"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Values</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              The principles that guide everything we do
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="text-center p-6 hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <value.icon className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{value.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Meet Our Team</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Experienced professionals dedicated to your success
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <div className="relative w-32 h-32 mx-auto mb-4">
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      className="rounded-full object-cover"
                    />
                  </div>
                  
                  <h3 className="text-xl font-semibold text-gray-900 mb-1">{member.name}</h3>
                  <p className="text-primary font-medium mb-3">{member.role}</p>
                  <p className="text-gray-600 text-sm leading-relaxed mb-4">{member.bio}</p>
                  
                  <div className="space-y-3">
                    
                    <div className="flex justify-center space-x-2">
                      <Button size="icon" variant="ghost" className="h-8 w-8">
                        <Mail className="w-4 h-4" />
                      </Button>
                      <Button size="icon" variant="ghost" className="h-8 w-8">
                        <Linkedin className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Awards & Recognition */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Awards & Recognition</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Recognition for our commitment to excellence
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                year: '2023',
                award: 'Top Real Estate Company',
                organization: 'Regional Business Awards',
                description: 'Recognized for outstanding service and client satisfaction'
              },
              {
                year: '2022',
                award: 'Excellence in Customer Service',
                organization: 'Real Estate Association',
                description: 'Awarded for consistently exceeding client expectations'
              },
              {
                year: '2021',
                award: 'Innovation in Technology',
                organization: 'PropTech Awards',
                description: 'Recognition for implementing cutting-edge property technology'
              }
            ].map((award, index) => (
              <Card key={index} className="text-center p-6">
                <CardContent className="pt-6">
                  <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Award className="w-8 h-8 text-yellow-600" />
                  </div>
                  <div className="text-2xl font-bold text-primary mb-2">{award.year}</div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{award.award}</h3>
                  <p className="text-sm text-primary font-medium mb-2">{award.organization}</p>
                  <p className="text-gray-600 text-sm">{award.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AboutPage;