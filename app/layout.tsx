import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";

const inter = Inter({ 
  subsets: ["latin"],
  display: 'swap',
  preload: true,
});

export const metadata: Metadata = {
  title: {
    default: "Right Property Hub - Your Search Ends Here",
    template: "%s | Right Property Hub"
  },
  description: "Find your perfect property with Right Property Hub. Professional real estate services, premium listings, and expert guidance for properties in India and Dubai.",
  keywords: [
    "real estate",
    "property for sale",
    "property for rent",
    "luxury homes",
    "commercial property",
    "residential property",
    "India real estate",
    "Dubai property",
    "property investment",
    "property listings",
    "buy property",
    "sell property",
    "real estate agent",
    "property portal",
    "property search",
    "premium properties"
  ],
  authors: [{ name: "Right Property Hub", url: "https://rightpropertyhub.com" }],
  creator: "Right Property Hub",
  publisher: "Right Property Hub",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://rightpropertyhub.com"),
  alternates: {
    canonical: "https://rightpropertyhub.com",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://rightpropertyhub.com",
    title: "Right Property Hub - Your Search Ends Here",
    description: "Find your perfect property with Right Property Hub. Professional real estate services, premium listings, and expert guidance for properties in India and Dubai.",
    siteName: "Right Property Hub",
    images: [
      {
        url: "/images/logo.png",
        width: 1200,
        height: 630,
        alt: "Right Property Hub - Real Estate Platform",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Right Property Hub - Your Search Ends Here",
    description: "Find your perfect property with Right Property Hub. Professional real estate services, premium listings, and expert guidance.",
    images: ["/images/logo.png"],
    creator: "@rightpropertyhub",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  category: "real estate",
  classification: "Real Estate Portal",
  referrer: "origin-when-cross-origin",
  other: {
    "theme-color": "#2563eb",
    "msapplication-TileColor": "#2563eb",
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "default",
    "apple-mobile-web-app-title": "Right Property Hub",
    "application-name": "Right Property Hub",
    "mobile-web-app-capable": "yes",
  },
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "RealEstateAgent",
        "name": "Right Property Hub",
        "description": "Professional real estate services, premium listings, and expert guidance for properties in India and Dubai",
        "url": "https://rightpropertyhub.com",
        "logo": "https://rightpropertyhub.com/images/logo.png",
        "image": "https://rightpropertyhub.com/images/logo.png",
        "telephone": ["+91 9030225223", "+971 50 575 5424"],
        "email": "solutions@rightpropertyhub.com",
        "address": [
            {
                "@type": "PostalAddress",
                "addressLocality": "Hyderabad",
                "addressRegion": "Telangana",
                "addressCountry": "India",
                "streetAddress": "Srinagar colony, Banjarahills, Hyderabad"
            },
            {
                "@type": "PostalAddress", 
                "addressLocality": "Dubai",
                "addressCountry": "UAE",
                "streetAddress": "Al Karama, Dubai"
            }
        ],
        "sameAs": [
            "https://www.facebook.com/share/178YN4zHWH/?mibextid=wwXIfr",
            "https://youtube.com/@rightpropertyhubrphub?si=0pm2aHwij-YGLlXR",
            "https://www.instagram.com/right_property_hub?igsh=MW8ybDA0ZjB0c3M5bQ%3D%3D&utm_source=qr",
            "http://www.linkedin.com/in/right-property-hub-0533a6385"
        ],
        "openingHours": [
            "Mo-Fr 09:00-20:00",
            "Sa 09:00-20:00", 
            "Su 10:00-18:00"
        ],
        "hasOfferCatalog": {
            "@type": "OfferCatalog",
            "name": "Real Estate Services",
            "itemListElement": [
                {
                    "@type": "Offer",
                    "itemOffered": {
                        "@type": "Service",
                        "name": "Property Sales"
                    }
                },
                {
                    "@type": "Offer", 
                    "itemOffered": {
                        "@type": "Service",
                        "name": "Property Rentals"
                    }
                },
                {
                    "@type": "Offer",
                    "itemOffered": {
                        "@type": "Service",
                        "name": "Property Valuation"
                    }
                }
            ]
        }
    };

    return (
        <html lang="en" itemScope itemType="https://schema.org/WebPage">
            <head>
                {/* Favicon and Icons */}
                <link rel="icon" href="/favicon.ico" sizes="any" />
                <link rel="icon" href="/icon.png" type="image/png" sizes="32x32" />
                <link rel="apple-touch-icon" href="/apple-icon.png" />
                <link rel="shortcut icon" href="/favicon.ico" />
                
                {/* Structured Data */}
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
                />
            </head>
            <body className={inter.className}>
                <Navigation />
                {children}
                <Footer />
                <Toaster />
            </body>
        </html>
    );
}
