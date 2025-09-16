import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Right Property Hub - Premier Real Estate",
    description:
        "Find your perfect property with Right Property Hub. Professional real estate services, premium listings, and expert guidance.",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <Navigation />
                {children}
                <Footer />
                <Toaster />
            </body>
        </html>
    );
}
