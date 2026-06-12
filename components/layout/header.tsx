"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, X, Search, ShoppingCart, Phone, Mail,} from "lucide-react"
import { FaFacebookF, FaInstagram } from "react-icons/fa";
import Image from "next/image"

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const navigationItems = [
    { name: "Home", href: "/" },
    { name: "Services", href: "/services" },
    { name: "Products", href: "products?page=1&per_page=12" },
    { name: "Contact", href: "/contact" },
  ]

  return (
    <>
      <div className="bg-blue-900 text-white py-2 text-sm">
        <div className="container px-4 flex justify-between items-center">
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2">
              <Phone className="h-4 w-4" />
              <span>+92-336-518240</span>
            </div>
            <div className="flex items-center space-x-2">
              <Mail className="h-4 w-4" />
              <span>info@aftechnologies.pk</span>
            </div>
          </div>
          <div className="hidden md:flex items-center space-x-4">
            <span>Follow Us:</span>
            <div className="flex space-x-2">
              <Link href="#" className="hover:text-white-300">
                <FaFacebookF className="bg-white rounded p-1 text-gray-600 hover:text-blue-600 h-5 w-5" />
              </Link>
              <Link href="#" className="hover:text-blue-300">
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
                  src="/af-logo.png"  // <-- your image path here
                  alt="AF Technologies Logo"
                  width={80}  // same as `h-8` (2rem)
                  height={80}
                  className="object-contain"
                />
              </div>
              <div>
                <h1 className="text-xl font-bold text-blue-900">TECHNOLOGIES</h1>
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
              <Button className="hidden md:flex bg-blue-600 hover:bg-blue-700">Get Quote</Button>
              <Button variant="ghost" size="icon" className="lg:hidden" onClick={toggleMobileMenu}>
                {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
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
                    <Button className="w-full bg-blue-600 hover:bg-blue-700">Get Quote</Button>
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
  )
}
