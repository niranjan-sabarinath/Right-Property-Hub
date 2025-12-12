import React from 'react';
import PageHeader from '@/components/page-header';
import { Card, CardContent } from '@/components/ui/card';
import { FileText, AlertTriangle, Home, Phone, Mail } from 'lucide-react';

const TermsOfServicePage = () => {
  const effectiveDate = 'September 17, 2024';

  return (
    <div className="min-h-screen bg-gray-50">
      <PageHeader 
        title="Terms of Service"
        subtitle="Please read these terms carefully before using our services"
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Card className="bg-white rounded-xl shadow-sm">
          <CardContent className="p-8">
            <div className="prose max-w-none">
              <p className="text-gray-600 mb-6">
                Effective Date: {effectiveDate}
              </p>

              <div className="mb-8">
                <p className="text-gray-700 mb-4">
                  Welcome to Right Property Hub. These Terms of Service ("Terms") govern your access to and use of our website, services, and applications (collectively, the "Services"). By accessing or using our Services, you agree to be bound by these Terms.
                </p>
              </div>

              <div className="space-y-8">
                <section>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                    <FileText className="w-6 h-6 mr-2 text-primary" />
                    1. Services Overview
                  </h2>
                  <div className="ml-8">
                    <p className="text-gray-700">
                      Right Property Hub provides real estate services including property listings, property valuation, and connecting buyers with sellers. We act as an intermediary and do not own the properties listed on our platform.
                    </p>
                  </div>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                    <AlertTriangle className="w-6 h-6 mr-2 text-primary" />
                    2. User Responsibilities
                  </h2>
                  <div className="ml-8 space-y-4">
                    <p className="text-gray-700">
                      When using our Services, you agree to:
                    </p>
                    <ul className="list-disc pl-6 space-y-2 text-gray-700">
                      <li>Provide accurate and complete information</li>
                      <li>Comply with all applicable laws and regulations</li>
                      <li>Not engage in fraudulent or misleading activities</li>
                      <li>Respect the intellectual property rights of others</li>
                      <li>Not use our Services for any unlawful purpose</li>
                    </ul>
                  </div>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">
                    3. Property Listings
                  </h2>
                  <div className="ml-8">
                    <p className="text-gray-700 mb-4">
                      While we strive to provide accurate and up-to-date property information, we cannot guarantee the accuracy, completeness, or reliability of any property listings. We recommend that you:
                    </p>
                    <ul className="list-disc pl-6 space-y-2 text-gray-700">
                      <li>Verify all property details independently</li>
                      <li>Conduct your own due diligence</li>
                      <li>Consult with appropriate professionals (e.g., lawyers, surveyors) before making any decisions</li>
                    </ul>
                  </div>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">
                    4. Intellectual Property
                  </h2>
                  <div className="ml-8">
                    <p className="text-gray-700">
                      All content on our platform, including text, graphics, logos, and software, is the property of Right Property Hub or its content suppliers and is protected by intellectual property laws. You may not reproduce, distribute, or create derivative works without our prior written consent.
                    </p>
                  </div>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">
                    5. Limitation of Liability
                  </h2>
                  <div className="ml-8">
                    <p className="text-gray-700 mb-4">
                      To the maximum extent permitted by law, Right Property Hub shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from:
                    </p>
                    <ul className="list-disc pl-6 space-y-2 text-gray-700">
                      <li>Your use or inability to use our Services</li>
                      <li>Any unauthorized access to or use of our servers</li>
                      <li>Any interruption or cessation of transmission to or from our Services</li>
                      <li>Any bugs, viruses, or similar that may be transmitted through our Services</li>
                    </ul>
                  </div>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">
                    6. Indemnification
                  </h2>
                  <div className="ml-8">
                    <p className="text-gray-700">
                      You agree to indemnify and hold harmless Right Property Hub and its affiliates, officers, agents, and employees from any claims, liabilities, damages, losses, and expenses arising from your use of our Services or violation of these Terms.
                    </p>
                  </div>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">
                    7. Governing Law
                  </h2>
                  <div className="ml-8">
                    <p className="text-gray-700">
                      These Terms shall be governed by and construed in accordance with the laws of India, without regard to its conflict of law principles. Any disputes arising under or in connection with these Terms shall be subject to the exclusive jurisdiction of the courts located in Mumbai, India.
                    </p>
                  </div>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">
                    8. Changes to Terms
                  </h2>
                  <div className="ml-8">
                    <p className="text-gray-700">
                      We reserve the right to modify these Terms at any time. We will provide notice of any changes by updating the "Effective Date" at the top of this page. Your continued use of our Services after such changes constitutes your acceptance of the new Terms.
                    </p>
                  </div>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">
                    9. Contact Information
                  </h2>
                  <div className="ml-8">
                    <p className="text-gray-700 mb-4">
                      If you have any questions about these Terms, please contact us at:
                    </p>
                    <div className="space-y-2 text-gray-700">
                      <p className="flex items-center">
                        <Home className="w-5 h-5 mr-2 text-primary" />
                        Right Property Hub
                      </p>
                      <p className="flex items-center">
                        <Mail className="w-5 h-5 mr-2 text-primary" />
                        solutions@rightpropertyhub.com
                      </p>
                      <p className="flex items-center">
                        <Phone className="w-5 h-5 mr-2 text-primary" />
                        +1 (615) 880-0775
                      </p>
                    </div>
                  </div>
                </section>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TermsOfServicePage;
