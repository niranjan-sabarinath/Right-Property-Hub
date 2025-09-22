'use client';

import React, { useRef, useState } from 'react';
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
  Loader,
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

  const [submitting, setSubmitting] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (submitting) return;
    setSubmitting(true);

    try {
      const formDataToSend = {
        title: "Right Property Hub Contact Enquiry",
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        subject: formData.subject,
        message: formData.message,
        inquiry_type: formData.inquiryType,
        form_source: "Contact Page"
      };

      const scriptURL = "https://script.google.com/macros/s/AKfycbyQM7LphryO6F07GJcheHWeRkqi7Wg1TjZerUXETD3EESgfRiRgpp2v57vh-jz_vYbIhw/exec";
      
      const response = await fetch(scriptURL, {
        method: "POST",
        headers: {
          "Content-Type": "text/plain;charset=utf-8",
        },
        body: JSON.stringify(formDataToSend),
      });

      if (response.ok) {
        toast.success('Thank you for your message! We\'ll get back to you within 24 hours.');
        setFormData({
          name: '',
          email: '',
          phone: '',
          subject: '',
          message: '',
          inquiryType: ''
        });
        formRef.current?.reset();
      } else {
        throw new Error('Failed to submit form');
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error('Failed to submit your message. Please try again.');
    } finally {
      setSubmitting(false);
    }
  }

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const officeLocations = [
    {
      name: 'India Office',
      address: 'Srinagar colony,\n Banjarahills, Hyderabad',
      phone: '+91 9030225223',
      email: 'solutions@rightpropertyhub.com',
      hours: 'Mon-Sat: 9:00 AM - 8:00 PM\nSun: 10:00 AM - 6:00 PM',
      lat: '19.0760',
      lng: '72.8777'
    },
    {
      name: 'Dubai Office',
      address: 'Karama, Dubai,\n UAE',
      phone: '+971 50 575 5424',
      email: 'dubai@rightpropertyhub.com',
      hours: 'Mon-Fri: 9:00 AM - 7:00 PM\nSat: 10:00 AM - 5:00 PM',
      lat: '25.2048',
      lng: '55.2708'
    }
  ];

  const contactMethods = [
    {
      icon: Phone,
      title: 'Call Us',
      description: 'Speak directly with our team',
      value: 'India: +91 9030225223\nDubai: +971 50 575 5424',
      action: 'Call Now',
      actionLink: 'tel:+919030225223'
    },
    {
      icon: Mail,
      title: 'Email Us',
      description: 'Send us a detailed message',
      value: 'solutions@rightpropertyhub.com',
      action: 'Send Email',
      actionLink: 'mailto:solutions@rightpropertyhub.com'
    },
    {
      icon: MapPin,
      title: 'Visit Us',
      description: 'Schedule a property visit',
      value: 'Hyderabad & Dubai',
      action: 'View Locations',
      actionLink: '#locations'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 font-gotham-light">
      <PageHeader 
        title="Get in Touch"
        subtitle="Have questions? We're here to help. Contact us today and our team will get back to you as soon as possible."
      />

      {/* Contact Methods */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {contactMethods.map((method, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow group">
                <CardContent className="pt-8 pb-6">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                    <method.icon className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{method.title}</h3>
                  <p className="text-gray-600 text-sm mb-3">{method.description}</p>
                  <p className="text-primary font-medium text-sm mb-4">{method.value}</p>
                  <a href={method.actionLink} className="w-full">
                    <Button size="sm" variant="outline" className="w-full">
                      {method.action}
                    </Button>
                  </a>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form & Office Info */}
      <section className="md:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Contact Form */}
            <div className="lg:col-span-1">
              <Card className='h-fit'>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Send className="w-6 h-6" />
                    <span>Send Us a Message</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className='p-4'>
                  <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 gap-4">
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
                          rows={4}
                          value={formData.message}
                          onChange={(e) => handleChange('message', e.target.value)}
                          required
                          className="mt-1"
                          placeholder="Tell us more about how we can help you..."
                        />
                      </div>
                    </div>

                    <Button 
                      type="submit" 
                      className="w-full" 
                      size="lg"
                      disabled={submitting}
                    >
                      {submitting ? (
                        <>
                          <Loader className="w-4 h-4 mr-2 animate-spin" />
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4 mr-2" />
                          Send Message
                        </>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Office Information and Map */}
            <div className="lg:col-span-2 space-y-6">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Visit Our Offices</h2>
                <p className="text-gray-600 mb-8">
                  We have multiple locations to serve you better. Visit us at any of our offices 
                  or schedule an appointment for a personalized consultation.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                      
                      {/* Map for this location */}
                      <div className="mt-4 rounded-md overflow-hidden h-[200px] min-h-[200px] w-full">
                        {office.name === 'India Office' ? (
                          <iframe 
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1903.282873416022!2d78.43673333857045!3d17.432615545865566!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb90d10b0f93fd%3A0x63192c22c87b682b!2sSrinagar%20Colony%2C%20Imam%20Guda%2C%20Yousufguda%2C%20Hyderabad%2C%20Telangana%20500073!5e0!3m2!1sen!2sin!4v1758135469029!5m2!1sen!2sin"
                            width="100%"
                            height="100%"
                            style={{ border: 0 }}
                            allowFullScreen
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            title="Mumbai Office Location"
                            className="w-full h-full"
                          ></iframe>
                        ) : (
                          <iframe 
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14435.07871120322!2d55.29470120047468!3d25.244681442883202!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f42d7bf391ce5%3A0xc92c59be702d25dd!2sAl%20Karama%20-%20Dubai%20-%20United%20Arab%20Emirates!5e0!3m2!1sen!2sin!4v1758135581496!5m2!1sen!2sin"
                            width="100%"
                            height="100%"
                            style={{ border: 0 }}
                            allowFullScreen
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            title="Dubai Office Location"
                            className="w-full h-full"
                          ></iframe>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;