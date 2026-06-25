"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu, X, Search, ShoppingCart, Phone, Mail } from "lucide-react";
import { FaFacebookF, FaInstagram } from "react-icons/fa";
import Image from "next/image";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const navigationItems = [
    { name: "Home", href: "/" },
    { name: "Services", href: "/services" },
    { name: "Products", href: "products?page=1&per_page=12" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <>
      <div className="bg-blue-900 text-white py-2.5 text-sm">
        {/* The container transitions from stacked (flex-col) on mobile to side-by-side (md:flex-row) on desktop */}
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-3 md:gap-0">
          {/* Contact Info Section */}
          <div className="flex flex-col sm:flex-row items-center space-y-1.5 sm:space-y-0 sm:space-x-6 text-center">
            <div className="flex items-center space-x-2">
              <Phone className="h-4 w-4 text-blue-300" />
              <span>+92-336-518240</span>
            </div>
            <div className="flex items-center space-x-2">
              <Mail className="h-4 w-4 text-blue-300" />
              <span>info@aftechnologies.pk</span>
            </div>
          </div>

          {/* Social Links Section (Now visible everywhere, customized for mobile spacing) */}
          <div className="flex items-center space-x-3 md:space-x-4">
            <span className="text-gray-300 md:text-white text-xs md:text-sm">
              Follow Us:
            </span>
            <div className="flex space-x-2">
              <Link href="https://www.facebook.com/share/196b1ESQ7y/" className="transition-transform active:scale-95">
                <FaFacebookF className="bg-white rounded p-1 text-gray-600 hover:text-blue-600 h-5 w-5" />
              </Link>
              <Link href="https://www.instagram.com/aftechnologies2023?utm_source=qr&igsh=MXBna2xkeDJvbzVxZQ==" className="transition-transform active:scale-95">
                <FaInstagram className="bg-white rounded p-1 text-gray-600 hover:text-pink-500 h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      <header className="bg-white shadow-md sticky top-0 z-50">
        <div className="container px-4">
          <div className="flex items-center justify-between py-4">
            <Link href="/" className="flex items-center space-x-3">
              <div className="rounded-lg">
                <Image
                  src="/af-logo-12.png" // <-- your image path here
                  alt="AF Technologies Logo"
                  width={80} // same as `h-8` (2rem)
                  height={80}
                  className="object-contain"
                />
              </div>
              <div>
                <h1 className="text-xl font-bold text-blue-900">
                  TECHNOLOGIES
                </h1>
                <p className="text-sm text-gray-600">SECURITY SOLUTIONS</p>
              </div>
            </Link>

            <nav className="hidden lg:flex items-center space-x-8">
              {navigationItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
                >
                  {item.name}
                </Link>
              ))}
            </nav>

            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="icon" className="hidden md:flex">
                <Search className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="hidden md:flex">
                <ShoppingCart className="h-5 w-5" />
              </Button>
              <Link href="/quote" passHref>
                <Button className="hidden md:flex bg-blue-600 hover:bg-blue-700">
                  Get Quote
                </Button>
              </Link>
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden"
                onClick={toggleMobileMenu}
              >
                {isMobileMenuOpen ? (
                  <X className="h-5 w-5" />
                ) : (
                  <Menu className="h-5 w-5" />
                )}
              </Button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="absolute top-full left-0 w-full h-[100vh] bg-white shadow-lg border-t lg:hidden z-40">
              <div className="container px-4 py-6">
                <nav className="space-y-4">
                  {navigationItems.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="block text-gray-700 hover:text-blue-600 font-medium py-2 border-b border-gray-100"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  ))}
                  <div className="pt-4 space-y-3">
                    <Button className="w-full bg-blue-600 hover:bg-blue-700">
                      Get Quote
                    </Button>
                    <div className="flex space-x-2">
                      <Button variant="ghost" size="icon" className="flex-1">
                        <Search className="h-5 w-5" />
                      </Button>
                      <Button variant="ghost" size="icon" className="flex-1">
                        <ShoppingCart className="h-5 w-5" />
                      </Button>
                    </div>
                  </div>
                </nav>
              </div>
            </div>
          )}
        </div>
      </header>
    </>
  );
}
