"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Shield,
  Users,
  Award,
  Clock,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import HeroSection from "@/components/sections/hero-section"
import Header from "@/components/layout/header"
import Footer from "@/components/layout/footer"
import StatsSection from "@/components/home/statas"
import Testimonials from "@/components/sections/testimonial-section"
import CategoryRow from "@/components/sections/CategoryRow"
import FeaturedCategories from "@/components/sections/FeaturedCategories"
import CTA from "@/components/sections/cta"
import ServicesSection from "@/components/sections/HomeServices"

export default function HomePage() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  return (
    <div className="min-h-screen bg-white">
      
      {/* Main Header */}
      <Header />
      

      {/* Hero Section */}
      <HeroSection />

      {/* Quick Stats */}
      <StatsSection />
      
      <section id="services" className="py-20">
        <div className="container px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Professional Services</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From security surveillance to renewable energy solutions, we provide comprehensive installation and
              maintenance services.
            </p>
          </div>

            <ServicesSection />


          <div className="text-center mt-5">
            <Button asChild className="w-30 mt-5 bg-blue-600 hover:bg-blue-700">
              <Link href="/services" className="text-white-700 hover:text-white-600 font-medium transition-colors">Read More</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Product Categories */}
      <section id="products" className="py-20 bg-gray-50">
        <div className="container px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Featured Product Categories</h2>
            <p className="text-xl text-gray-600">Browse our extensive range of security and solar products</p>
          </div>

           <FeaturedCategories />

        </div>
      </section>

      {/* Product Showcase Section */}
      <section id="showcase" className="py-20">
        <div className="container px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Featured Products</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover our top-selling CCTV cameras, solar panels, and security equipment with competitive pricing
            </p>
          </div>

          {/* CCTV Products */}
          <CategoryRow id={1} />
          <CategoryRow id={2} />
          <CategoryRow id={3} />
          <CategoryRow id={4} />
          <CategoryRow id={5} />
          <CategoryRow id={6} />
          <CategoryRow id={8} />
          {/* Solar Products */}
          
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-gray-50">
        <div className="container px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Why Choose AF Technologies?
              </h2>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-blue-100 p-2 rounded-lg flex-shrink-0">
                    <Award className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Certified Professionals</h3>
                    <p className="text-gray-600">
                      Our team consists of certified technicians with years of experience in security and solar
                      installations.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="bg-green-100 p-2 rounded-lg flex-shrink-0">
                    <Clock className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Quick Installation</h3>
                    <p className="text-gray-600">
                      Fast and efficient installation process with minimal disruption to your daily routine.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="bg-orange-100 p-2 rounded-lg flex-shrink-0">
                    <Shield className="h-6 w-6 text-orange-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Quality Guarantee</h3>
                    <p className="text-gray-600">
                      We use only premium quality products with comprehensive warranty coverage.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="bg-purple-100 p-2 rounded-lg flex-shrink-0">
                    <Users className="h-6 w-6 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">24/7 Support</h3>
                    <p className="text-gray-600">
                      Round-the-clock customer support and maintenance services for your peace of mind.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative">
              <Image
                src="/why-choose.jpg?height=500&width=600"
                alt="Professional Installation"
                width={600}
                height={500}
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <Testimonials />

      {/* Contact CTA */}
      <CTA />

      {/* Footer */}
      <Footer />
    </div>
  )
}
