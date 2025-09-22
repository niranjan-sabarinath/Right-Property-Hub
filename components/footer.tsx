"use client"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { MapPin, Phone, Mail, Facebook, Instagram, Linkedin, Youtube } from "lucide-react"
import { Variants } from "framer-motion"
import { containerVariants, itemVariants, socialVariants, textRevealVariants, logoVariants } from "@/lib/animations"

const Footer = () => {
  const currentYear = new Date().getFullYear()
  const socialIcons = [
    { 
      icon: Facebook, 
      url: "https://www.facebook.com/share/178YN4zHWH/?mibextid=wwXIfr",
      hoverClass: "hover:bg-[#1877F2] hover:text-white" // Facebook blue
    },
    { 
      icon: Youtube, 
      url: "https://youtube.com/@rightpropertyhubrphub?si=0pm2aHwij-YGLlXR",
      hoverClass: "hover:bg-[#FF0000] hover:text-white" // YouTube red
    },
    { 
      icon: Instagram, 
      url: "https://www.instagram.com/right_property_hub?igsh=MW8ybDA0ZjB0c3M5bQ%3D%3D&utm_source=qr",
      hoverClass: "hover:bg-gradient-to-r hover:from-[#833AB4] hover:via-[#FD1D1D] hover:to-[#FCB045] hover:text-white" // Instagram gradient
    },
    { 
      icon: Linkedin, 
      url: "http://www.linkedin.com/in/right-property-hub-0533a6385",
      hoverClass: "hover:bg-[#0077B5] hover:text-white" // LinkedIn blue
    },
    { 
      icon: Mail, 
      url: "mailto:solutions@rightpropertyhub.com",
      hoverClass: "hover:bg-[#EA4335] hover:text-white" // Gmail red
    },
  ]

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/properties", label: "Properties" },
    { href: "/about", label: "About" },
    { href: "/blog", label: "Insights" },
    { href: "/contact", label: "Contact" },
  ]


  const footerLogoVariants = {
    hidden: {
      opacity: 0,
      scale: 0.5,
      rotate: -45,
    },
    visible: {
      opacity: 1,
      scale: 1,
      rotate: 0,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 20,
        delay: 0.5,
      },
    },
    hover: {
      scale: 1.1,
      rotate: 360,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 15,
      },
    },
  }

  const navLinkVariants: Variants = {
    hidden: {
      opacity: 0,
      x: -20,
    },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: 0.1 * i,
        duration: 0.3,
        ease: "easeOut",
      },
    }),
    hover: {
      scale: 1.05,
      color: "#000",
      transition: {
        duration: 0.2,
      },
    },
  }

  return (
    <footer className="w-full bg-[#eef2f3] border-t border-gray-100">
      {/* Top Section: Quote & Contact */}
      <motion.div
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 md:py-16"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <div className="flex flex-col space-y-8 md:space-y-0 md:flex-row justify-between items-start">
          {/* Quote */}
          <motion.div className="w-full md:w-2/3" variants={textRevealVariants}>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-orange-avenue text-gray-900">
              Your perfect property journey starts with{" "}
              <motion.span
                className="text-primary"
                whileHover={{
                  color: "#3b82f6",
                  transition: { duration: 0.3 },
                }}
              >
                expert guidance
              </motion.span>
            </h2>
          </motion.div>

          {/* Contact Details */}
          <motion.div 
            className="w-full md:w-auto mt-6 md:mt-0" 
            variants={itemVariants}
          >
            <div className="space-y-4 sm:space-y-3 text-left md:text-right">
              <motion.div
                className="flex items-start space-x-2 md:justify-end"
                whileHover={{ x: -5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <MapPin className="w-5 h-5 mt-0.5 text-gray-600 flex-shrink-0 md:hidden" />
                <div className="flex flex-col">
                  <p className="text-base font-medium text-gray-800">India: Srinagar colony, Banjarahills, Hyderabad</p>
                  <p className="text-base font-medium text-gray-800 mt-2">Dubai: Karama, Dubai</p>
                </div>
              </motion.div>
              <motion.div
                className="flex flex-col space-y-2"
                variants={itemVariants}
              >
                <motion.div 
                  className="flex items-center space-x-2 md:justify-end"
                  whileHover={{ x: -5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Phone className="w-4 h-4 text-gray-600 flex-shrink-0" />
                  <a
                    href="tel:+919030225223"
                    className="text-sm text-gray-700 hover:text-gray-900 font-medium transition-colors"
                  >
                    India: +91 9030225223
                  </a>
                </motion.div>
                <motion.div 
                  className="flex items-center space-x-2 md:justify-end"
                  whileHover={{ x: -5 }}
                  transition={{ type: "spring", stiffness: 300, delay: 0.1 }}
                >
                  <Phone className="w-4 h-4 text-gray-600 flex-shrink-0" />
                  <a
                    href="tel:+971505755424"
                    className="text-sm text-gray-700 hover:text-gray-900 font-medium transition-colors"
                  >
                    Dubai: +971 50 575 5424
                  </a>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Middle Section: Navigation & Social */}
      <div className="py-2">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="border-t border-b border-gray-300 py-4"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
          >
            <div className="flex flex-col space-y-6 md:space-y-0 md:flex-row items-center justify-between">
              {/* Navigation Links */}
              <div className="w-full md:flex-1">
                <nav className="flex flex-wrap justify-center md:justify-start gap-4 sm:gap-6">
                  {navLinks.map(({ href, label }, index) => (
                    <motion.div
                      key={href}
                      custom={index}
                      variants={navLinkVariants}
                      initial="hidden"
                      animate="visible"
                      whileHover="hover"
                    >
                      <Link
                        href={href}
                        className="text-xs sm:text-sm text-gray-700 hover:text-gray-900 transition-colors font-medium"
                      >
                        {label}
                      </Link>
                    </motion.div>
                  ))}
                </nav>
              </div>

              {/* Logo - Centered on mobile, positioned between nav and social on desktop */}
              <motion.div
                className="order-first md:order-none my-2 md:my-0 px-4 md:px-8"
                variants={logoVariants}
                initial="hidden"
                animate="visible"
                whileHover="hover"
              >
                <Link href="/" className="block w-20 md:w-24 lg:w-28">
                  <Image
                    src="/images/logo.png"
                    alt="Right Property Hub"
                    width={112}
                    height={56}
                    className="w-full h-auto"
                    priority
                  />
                </Link>
              </motion.div>

              {/* Social Icons */}
              <div className="w-full md:flex-1">
                <div className="flex justify-center md:justify-end items-center space-x-4 sm:space-x-6">
                  {socialIcons.map(({ icon: Icon, url, hoverClass }, index) => (
                    <motion.a
                      key={index}
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      custom={index}
                      variants={socialVariants}
                      initial="hidden"
                      animate="visible"
                      whileHover="hover"
                      whileTap={{ scale: 0.9 }}
                      className={`text-gray-700 transition-colors rounded-full p-2 ${hoverClass}`}
                      aria-label={`Social media link ${index + 1}`}
                    >
                      <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                    </motion.a>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom Section: Copyright */}
      <motion.div
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 pt-10 md:pt-16"
        variants={itemVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <div className="flex flex-col space-y-4 sm:space-y-0 sm:flex-row justify-between items-center text-xs sm:text-sm text-gray-500">
          <motion.div className="text-center sm:text-left" whileHover={{ scale: 1.02 }}>
            <p>&copy; {currentYear} Right Property Hub. All rights reserved.</p>
          </motion.div>
          <div className="flex flex-wrap justify-center items-center gap-3 sm:gap-6">
            <motion.div whileHover={{ x: -3 }}>
              <Link href="/privacy" className="hover:text-gray-900 transition-colors whitespace-nowrap">
                Privacy Policy
              </Link>
            </motion.div>
            <motion.div whileHover={{ x: -3 }}>
              <Link href="/terms" className="hover:text-gray-900 transition-colors whitespace-nowrap">
                Terms of Service
              </Link>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </footer>
  )
}

export default Footer
