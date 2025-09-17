import React from 'react';
import PageHeader from '@/components/page-header';
import { Card, CardContent } from '@/components/ui/card';
import { Shield, Lock, Mail, Phone, Info } from 'lucide-react';

const PrivacyPolicyPage = () => {
  const lastUpdated = 'September 17, 2024';

  return (
    <div className="min-h-screen bg-gray-50">
      <PageHeader 
        title="Privacy Policy"
        subtitle="Your privacy is important to us"
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Card className="bg-white rounded-xl shadow-sm">
          <CardContent className="p-8">
            <div className="prose max-w-none">
              <p className="text-gray-600 mb-6">
                Last Updated: {lastUpdated}
              </p>

              <div className="mb-8">
                <p className="text-gray-700 mb-4">
                  At Right Property Hub, we are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our services.
                </p>
              </div>

              <div className="space-y-8">
                <section>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                    <Shield className="w-6 h-6 mr-2 text-primary" />
                    1. Information We Collect
                  </h2>
                  <div className="ml-8 space-y-4">
                    <p className="text-gray-700">
                      We may collect the following types of information:
                    </p>
                    <ul className="list-disc pl-6 space-y-2 text-gray-700">
                      <li><strong>Personal Information:</strong> Name, email address, phone number, and other contact details.</li>
                      <li><strong>Property Preferences:</strong> Your property requirements, budget, and location preferences.</li>
                      <li><strong>Usage Data:</strong> Information about how you interact with our website and services.</li>
                      <li><strong>Communication Data:</strong> Records of our interactions with you, including emails and calls.</li>
                    </ul>
                  </div>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                    <Lock className="w-6 h-6 mr-2 text-primary" />
                    2. How We Use Your Information
                  </h2>
                  <div className="ml-8 space-y-4">
                    <p className="text-gray-700">
                      We use your information to:
                    </p>
                    <ul className="list-disc pl-6 space-y-2 text-gray-700">
                      <li>Provide and maintain our real estate services</li>
                      <li>Match you with suitable properties based on your preferences</li>
                      <li>Communicate with you about properties, viewings, and updates</li>
                      <li>Improve our website and services</li>
                      <li>Comply with legal obligations</li>
                    </ul>
                  </div>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                    <Mail className="w-6 h-6 mr-2 text-primary" />
                    3. Information Sharing and Disclosure
                  </h2>
                  <div className="ml-8 space-y-4">
                    <p className="text-gray-700">
                      We may share your information with:
                    </p>
                    <ul className="list-disc pl-6 space-y-2 text-gray-700">
                      <li>Real estate agents and property developers to facilitate viewings and purchases</li>
                      <li>Service providers who assist in our operations</li>
                      <li>Legal authorities when required by law</li>
                      <li>Business partners in connection with a merger or acquisition</li>
                    </ul>
                  </div>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                    <Shield className="w-6 h-6 mr-2 text-primary" />
                    4. Data Security
                  </h2>
                  <div className="ml-8">
                    <p className="text-gray-700">
                      We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no internet transmission is completely secure, and we cannot guarantee absolute security.
                    </p>
                  </div>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                    <Info className="w-6 h-6 mr-2 text-primary" />
                    5. Your Rights
                  </h2>
                  <div className="ml-8 space-y-4">
                    <p className="text-gray-700">
                      You have the right to:
                    </p>
                    <ul className="list-disc pl-6 space-y-2 text-gray-700">
                      <li>Access, update, or delete your personal information</li>
                      <li>Opt-out of marketing communications</li>
                      <li>Withdraw consent for data processing</li>
                      <li>Lodge a complaint with a data protection authority</li>
                    </ul>
                  </div>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">
                    6. Changes to This Privacy Policy
                  </h2>
                  <div className="ml-8">
                    <p className="text-gray-700">
                      We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last Updated" date.
                    </p>
                  </div>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">
                    7. Contact Us
                  </h2>
                  <div className="ml-8">
                    <p className="text-gray-700 mb-4">
                      If you have any questions about this Privacy Policy, please contact us at:
                    </p>
                    <div className="space-y-2 text-gray-700">
                      <p className="flex items-center">
                        <Mail className="w-5 h-5 mr-2 text-primary" />
                        solutions@rightpropertyhub.com
                      </p>
                      <p className="flex items-center">
                        <Phone className="w-5 h-5 mr-2 text-primary" />
                        India: +91 9030225223 | Dubai: +971 50 575 5424
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

export default PrivacyPolicyPage;
