"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu, Home, Info, BookOpen, Building, ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { navVariants, logoVariants, navItemVariants, ctaVariants } from "@/lib/animations"

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()
  const isHomePage = pathname === "/"

  useEffect(() => {
    if (isHomePage) {
      const handleScroll = () => {
        setIsScrolled(window.scrollY > 20)
      }
      window.addEventListener("scroll", handleScroll, { passive: true })
      return () => window.removeEventListener("scroll", handleScroll)
    } else {
      setIsScrolled(true)
    }
  }, [isHomePage])

  const navItems = [
    { href: "/", label: "DISCOVER", icon: Home },
    { href: "/properties", label: "PROPERTIES", icon: Building },
    { href: "/about", label: "OUR STORY", icon: Info },
    { href: "/blog", label: "INSIGHTS", icon: BookOpen },
  ]

  

  return (
    <nav className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-2rem)] max-w-6xl">
      <motion.div
        variants={navVariants}
        animate={isScrolled ? "expanded" : "floating"}
        className="transition-all duration-500 w-full rounded-full py-1.5 px-6 shadow-lg"
      >
        <div className="mx-auto">
          <div className="flex items-center justify-between h-14">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-3 group">
              <motion.div
                variants={logoVariants}
                animate={isScrolled ? "expanded" : "floating"}
                className="relative"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Image
                  src="/images/logo.png"
                  alt="Right Property Hub Logo"
                  height={isScrolled ? 70 : 80}
                  width={isScrolled ? 70 : 80}
                  className="transition-all duration-500 object-contain"
                  priority
                />
              </motion.div>
            </Link>

            {/* Desktop Navigation */}
            <div className={cn("hidden md:flex items-center space-x-1 mx-auto", !isScrolled && "px-4 py-1.5")}>
              <AnimatePresence>
                {navItems.map(({ href, label }, index) => (
                  <motion.div
                    key={href}
                    custom={index}
                    variants={navItemVariants}
                    initial="hidden"
                    animate="visible"
                    whileHover="hover"
                  >
                    <Link
                      href={href}
                      className={cn(
                        "relative px-4 py-2 text-sm font-medium transition-all tracking-wider font-coco-regular duration-300 rounded-full",
                        isScrolled
                          ? pathname === href
                            ? "text-gray-900 font-semibold"
                            : "text-gray-700 hover:text-gray-900"
                          : pathname === href
                            ? "text-white font-medium relative after:content-[''] after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-1/2 after:h-0.5 after:bg-white after:rounded-full"
                            : "text-white/70 hover:text-white",
                      )}
                    >
                      {label}
                    </Link>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* CTA Link */}
            <div className="hidden md:flex">
              <motion.div
                variants={ctaVariants}
                initial="hidden"
                animate="visible"
                whileHover="hover"
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  href="/contact"
                  className={cn(
                    "flex items-center space-x-2 font-medium text-sm transition-all duration-300 px-4 py-2.5 rounded-full",
                    isScrolled
                      ? "bg-gray-900 text-white hover:bg-gray-800 shadow-md"
                      : "bg-white text-gray-900 hover:bg-gray-100 shadow-lg",
                  )}
                >
                  <span>Get in Touch</span>
                  <motion.div
                    animate={{ x: [0, 3, 0] }}
                    transition={{ repeat: Number.POSITIVE_INFINITY, duration: 2, ease: "easeInOut" }}
                  >
                    <ArrowRight className="w-4 h-4" />
                  </motion.div>
                </Link>
              </motion.div>
            </div>

            {/* Mobile Menu */}
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                  <Button
                    variant="ghost"
                    size="icon"
                    className={cn(
                      "md:hidden transition-all duration-300 hover:bg-white/20",
                      isScrolled ? "text-gray-900" : "text-white",
                    )}
                  >
                    <Menu className="h-6 w-6" />
                  </Button>
                </motion.div>
              </SheetTrigger>
              <SheetContent side="right" className="w-72 bg-white/95 backdrop-blur-sm border-l border-white/20">
                <motion.div
                  className="flex flex-col space-y-2 mt-8 p-2"
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ staggerChildren: 0.1 }}
                >
                  {navItems.map(({ href, label, icon: Icon }, index) => (
                    <motion.div
                      key={href}
                      initial={{ opacity: 0, x: 30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ scale: 1.02, x: 5 }}
                    >
                      <Link
                        href={href}
                        onClick={() => setIsOpen(false)}
                        className={cn(
                          "flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200",
                          pathname === href
                            ? "bg-gray-100 text-gray-900 font-medium"
                            : "text-gray-700 hover:bg-gray-50",
                        )}
                      >
                        <Icon className="w-5 h-5" />
                        <span>{label}</span>
                      </Link>
                    </motion.div>
                  ))}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    whileHover={{ scale: 1.02 }}
                  >
                    <Link
                      href="/contact"
                      onClick={() => setIsOpen(false)}
                      className="mt-4 flex items-center justify-center space-x-2 px-4 py-3 bg-gray-900 text-white rounded-xl font-medium hover:bg-gray-800 transition-colors"
                    >
                      <span>Get in Touch</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </motion.div>
                </motion.div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </motion.div>
    </nav>
  )
}

export default Navigation
