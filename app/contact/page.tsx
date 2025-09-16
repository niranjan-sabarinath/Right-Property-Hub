'use client';

import React, { useState } from 'react';
import Navigation from '@/components/navigation';
import Footer from '@/components/footer';
import PageHeader from '@/components/page-header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock,
  Send,
  MessageSquare,
  Calendar,
  Users
} from 'lucide-react';
import { toast } from 'sonner';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    inquiryType: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the form data to your backend
    toast.success('Thank you for your message! We\'ll get back to you within 24 hours.');
    setFormData({
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: '',
      inquiryType: ''
    });
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const officeLocations = [
    {
      name: 'India Office',
      address: '123 Real Estate Avenue\nMumbai, MH 400001',
      phone: '+91 9030225223',
      email: 'solutions@rightpropertyhub.com',
      hours: 'Mon-Sat: 9:00 AM - 8:00 PM\nSun: 10:00 AM - 6:00 PM'
    },
    {
      name: 'Dubai Office',
      address: '456 Business Bay\nDubai, UAE',
      phone: '+971 50 575 5424',
      email: 'dubai@rightpropertyhub.com',
      hours: 'Mon-Fri: 9:00 AM - 7:00 PM\nSat: 10:00 AM - 5:00 PM'
    }
  ];

  const contactMethods = [
    {
      icon: Phone,
      title: 'Call Us',
      description: 'Speak directly with our team',
      value: 'India: +91 9030225223\nDubai: +971 50 575 5424',
      action: 'Call Now'
    },
    {
      icon: Mail,
      title: 'Email Us',
      description: 'Send us a detailed message',
      value: 'solutions@rightpropertyhub.com',
      action: 'Send Email'
    },
    {
      icon: MessageSquare,
      title: 'Live Chat',
      description: 'Chat with us in real-time',
      value: 'Available 24/7',
      action: 'Start Chat'
    },
    {
      icon: Calendar,
      title: 'Schedule Meeting',
      description: 'Book a consultation',
      value: 'Available slots',
      action: 'Book Now'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      {/* Hero Section */}
      <PageHeader 
        title="Get in Touch"
        subtitle="Have questions? We're here to help. Contact us today and our team will get back to you as soon as possible."
      />

      {/* Contact Methods */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactMethods.map((method, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow group">
                <CardContent className="pt-8 pb-6">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                    <method.icon className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{method.title}</h3>
                  <p className="text-gray-600 text-sm mb-3">{method.description}</p>
                  <p className="text-primary font-medium text-sm mb-4">{method.value}</p>
                  <Button size="sm" variant="outline" className="w-full">
                    {method.action}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form & Office Info */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Send className="w-6 h-6" />
                  <span>Send Us a Message</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">Full Name *</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => handleChange('name', e.target.value)}
                        required
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email Address *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleChange('email', e.target.value)}
                        required
                        className="mt-1"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => handleChange('phone', e.target.value)}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="inquiryType">Inquiry Type</Label>
                      <Select value={formData.inquiryType} onValueChange={(value) => handleChange('inquiryType', value)}>
                        <SelectTrigger className="mt-1">
                          <SelectValue placeholder="Select inquiry type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="buying">Buying Property</SelectItem>
                          <SelectItem value="selling">Selling Property</SelectItem>
                          <SelectItem value="renting">Renting Property</SelectItem>
                          <SelectItem value="investment">Investment Advice</SelectItem>
                          <SelectItem value="valuation">Property Valuation</SelectItem>
                          <SelectItem value="general">General Inquiry</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="subject">Subject *</Label>
                    <Input
                      id="subject"
                      value={formData.subject}
                      onChange={(e) => handleChange('subject', e.target.value)}
                      required
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="message">Message *</Label>
                    <Textarea
                      id="message"
                      rows={5}
                      value={formData.message}
                      onChange={(e) => handleChange('message', e.target.value)}
                      required
                      className="mt-1"
                      placeholder="Tell us more about how we can help you..."
                    />
                  </div>

                  <Button type="submit" className="w-full" size="lg">
                    <Send className="w-4 h-4 mr-2" />
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Office Information */}
            <div className="space-y-6">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Visit Our Offices</h2>
                <p className="text-gray-600 mb-8">
                  We have multiple locations to serve you better. Visit us at any of our offices 
                  or schedule an appointment for a personalized consultation.
                </p>
              </div>

              {officeLocations.map((office, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle className="text-xl">{office.name}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <MapPin className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                      <div>
                        <p className="font-medium text-gray-900">Address</p>
                        <p className="text-gray-600 whitespace-pre-line">{office.address}</p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-3">
                      <Phone className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                      <div>
                        <p className="font-medium text-gray-900">Phone</p>
                        <p className="text-gray-600">{office.phone}</p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-3">
                      <Mail className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                      <div>
                        <p className="font-medium text-gray-900">Email</p>
                        <p className="text-gray-600">{office.email}</p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-3">
                      <Clock className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                      <div>
                        <p className="font-medium text-gray-900">Hours</p>
                        <p className="text-gray-600 whitespace-pre-line">{office.hours}</p>
                      </div>
                    </div>

                    <Button variant="outline" className="w-full mt-4">
                      Get Directions
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
            <p className="text-xl text-gray-600">
              Quick answers to common questions
            </p>
          </div>

          <div className="space-y-6">
            {[
              {
                question: 'How quickly can you respond to my inquiry?',
                answer: 'We typically respond to all inquiries within 2-4 hours during business hours, and within 24 hours for inquiries received outside business hours.'
              },
              {
                question: 'Do you charge for initial consultations?',
                answer: 'No, initial consultations are completely free. We believe in understanding your needs before discussing how we can help you achieve your real estate goals.'
              },
              {
                question: 'What areas do you serve?',
                answer: 'We serve the entire metropolitan area including downtown, suburbs, waterfront, and hill communities. If you\'re unsure about your area, please contact us.'
              },
              {
                question: 'Can you help with both buying and selling?',
                answer: 'Absolutely! Our team has expertise in all aspects of real estate including buying, selling, renting, and investment properties. We provide comprehensive real estate services.'
              }
            ].map((faq, index) => (
              <Card key={index}>
                <CardContent className="pt-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{faq.question}</h3>
                  <p className="text-gray-600">{faq.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-xl mb-8 text-blue-100">
            Don't wait - your perfect property is just a conversation away. 
            Contact us today and let's make your real estate dreams a reality.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary">
              <Phone className="w-4 h-4 mr-2" />
              Call Us Now
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary">
              <Calendar className="w-4 h-4 mr-2" />
              Schedule Consultation
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ContactPage;