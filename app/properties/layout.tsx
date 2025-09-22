import { ReactNode } from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Properties | Right Property Hub',
  description: 'Browse our exclusive collection of properties in India and Dubai.',
};

export default function PropertiesLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <div className="min-h-screen bg-gray-50 font-gotham-light">
      <main className="py-8 md:py-12">
        <div className="mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
