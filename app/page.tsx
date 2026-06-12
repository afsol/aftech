"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Shield,
  Sun,
  Camera,
  Zap,
  Users,
  Award,
  Clock,
  ChevronRight,
  Eye,
  ShoppingBag,
  LucideCameraOff,
  CameraOff,
  AArrowDown,
  ArrowDown01,
  SquareArrowDown,
  ArrowDown,
  Cctv,
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

          <div className="grid md:grid-cols-2 gap-8">
            <Card className="group hover:shadow-xl transition-all duration-300 border-l-4 border-l-blue-600">
              <CardHeader>
                <div className="flex items-center space-x-4">
                  <div className="bg-blue-100 p-3 rounded-lg group-hover:bg-blue-600 transition-colors">
                    <ArrowDown className="h-8 w-8 text-blue-600 group-hover:text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-xl">CCTV Installation</CardTitle>
                    <CardDescription>Complete surveillance solutions</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-600">
                  Professional installation of high-definition security cameras, DVR/NVR systems, and remote monitoring
                  solutions for homes and businesses.
                </p>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                    <span>HD & 4K Camera Systems</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                    <span>Night Vision Technology</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                    <span>Mobile App Integration</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                    <span>24/7 Remote Monitoring</span>
                  </li>
                </ul>
                {/* <Button className="w-full bg-blue-600 hover:bg-blue-700">Learn More</Button> */}
              </CardContent>
            </Card>

            <Card className="group hover:shadow-xl transition-all duration-300 border-l-4 border-l-orange-500">
              <CardHeader>
                <div className="flex items-center space-x-4">
                  <div className="bg-orange-100 p-3 rounded-lg group-hover:bg-orange-500 transition-colors">
                    <Sun className="h-8 w-8 text-orange-500 group-hover:text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-xl">Solar Installation</CardTitle>
                    <CardDescription>Renewable energy solutions</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-600">
                  Complete solar power systems including panels, inverters, batteries, and grid-tie solutions to reduce
                  your electricity bills significantly.
                </p>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                    <span>Residential & Commercial Systems</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                    <span>Grid-Tie & Off-Grid Solutions</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                    <span>Battery Backup Systems</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                    <span>Maintenance & Support</span>
                  </li>
                </ul>
                {/* <Button className="w-full bg-orange-500 hover:bg-orange-600">Learn More</Button> */}
              </CardContent>
            </Card>
          </div>

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
          {/* <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {[
              { name: "IP Cameras", icon: Camera, color: "bg-blue-500" },
              { name: "DVR Systems", icon: Shield, color: "bg-green-500" },
              { name: "Solar Panels", icon: Sun, color: "bg-orange-500" },
              { name: "Inverters", icon: Zap, color: "bg-purple-500" },
              { name: "Batteries", icon: Award, color: "bg-red-500" },
              { name: "Accessories", icon: Users, color: "bg-indigo-500" },
            ].map((category, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow cursor-pointer group">
                <CardContent className="p-6">
                  <div
                    className={`${category.color} p-4 rounded-full w-16 h-16 mx-auto mb-4 group-hover:scale-110 transition-transform`}
                  >
                    <category.icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="font-semibold text-gray-900">{category.name}</h3>
                </CardContent>
              </Card>
            ))}
          </div> */}
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
          <CategoryRow id={8} />
          <CategoryRow id={3} />
          <CategoryRow id={4} />
          <CategoryRow id={5} />
          <CategoryRow id={2} />
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

// import { useState, useEffect } from "react"
// import { Button } from "@/components/ui/button"
// import { Card, CardContent } from "@/components/ui/card"
// import { Badge } from "@/components/ui/badge"
// import {
//   Shield,
//   Sun,
//   Camera,
//   Zap,
//   Award,
//   Clock,
//   ChevronRight,
//   Phone,
//   Mail,
//   MapPin,
//   Menu,
//   X,
//   Star,
//   CheckCircle,
//   ArrowRight,
//   PlayCircle,
//   Wifi,
//   Lock,
//   Eye,
//   Users,
//   TrendingUp,
//   Headphones,
//   ShoppingBag,
//   Search
// } from "lucide-react"

// export default function HomePage() {
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
//   const [activeTab, setActiveTab] = useState('cctv')
//   const [isScrolled, setIsScrolled] = useState(false)

//   useEffect(() => {
//     const handleScroll = () => {
//       setIsScrolled(window.scrollY > 20)
//     }
//     window.addEventListener('scroll', handleScroll)
//     return () => window.removeEventListener('scroll', handleScroll)
//   }, [])

//   const navigationItems = [
//     { name: "Home", href: "#" },
//     { name: "Services", href: "#services" },
//     { name: "Products", href: "#products" },
//     { name: "About", href: "#about" },
//     { name: "Contact", href: "#contact" },
//   ]

//   const brandLogos = [
//     { name: "Hikvision", popular: true },
//     { name: "Dahua", popular: true },
//     { name: "EZVIZ", popular: false },
//     { name: "IMOU", popular: false },
//     { name: "Uniview", popular: false },
//     { name: "ZKTeco", popular: false }
//   ]

//   const cctvPackages = [
//     {
//       cameras: "2",
//       price: "27,000",
//       features: ["2MP HD Cameras", "4CH DVR", "500GB HDD", "Installation", "1 Year Warranty"]
//     },
//     {
//       cameras: "4",
//       price: "34,000",
//       popular: true,
//       features: ["2MP HD Cameras", "4CH DVR", "1TB HDD", "Installation", "1 Year Warranty"]
//     },
//     {
//       cameras: "8",
//       price: "59,000",
//       features: ["2MP HD Cameras", "8CH DVR", "2TB HDD", "Installation", "1 Year Warranty"]
//     }
//   ]

//   const whyChooseUs = [
//     {
//       icon: Award,
//       title: "Certified Professionals",
//       description: "Expert technicians with years of experience"
//     },
//     {
//       icon: Clock,
//       title: "24/7 Support",
//       description: "Round-the-clock customer service"
//     },
//     {
//       icon: Shield,
//       title: "Quality Guarantee",
//       description: "Genuine products with warranty"
//     },
//     {
//       icon: TrendingUp,
//       title: "Best Prices",
//       description: "Competitive rates in Islamabad"
//     }
//   ]

//   return (
//     <div className="min-h-screen bg-white">
//       {/* Top Bar */}
//       <div className="bg-gradient-to-r from-blue-900 to-blue-800 text-white py-2 text-sm">
//         <div className="container mx-auto px-4 flex flex-col sm:flex-row justify-between items-center gap-2">
//           <div className="flex items-center gap-4 flex-wrap justify-center">
//             <a href="tel:+923360518240" className="flex items-center gap-2 hover:text-blue-200">
//               <Phone className="h-4 w-4" />
//               <span>+92-336-518240</span>
//             </a>
//             <a href="mailto:info@aftechnologies.pk" className="flex items-center gap-2 hover:text-blue-200">
//               <Mail className="h-4 w-4" />
//               <span>info@aftechnologies.pk</span>
//             </a>
//           </div>
//           <div className="text-center">
//             <span className="text-blue-200">⚡ Special Offer: Get 10% OFF on Solar Packages!</span>
//           </div>
//         </div>
//       </div>

//       {/* Main Header */}
//       <header className={`sticky top-0 z-50 bg-white transition-all duration-300 ${isScrolled ? 'shadow-lg' : 'shadow-md'}`}>
//         <div className="container mx-auto px-4">
//           <div className="flex items-center justify-between py-4">
//             <div className="flex items-center gap-3">
//               <div className="bg-blue-600 text-white p-2 rounded-lg">
//                 <Shield className="h-8 w-8" />
//               </div>
//               <div>
//                 <h1 className="text-xl font-bold text-blue-900">AF TECHNOLOGIES</h1>
//                 <p className="text-xs text-gray-600">SECURITY SOLUTIONS</p>
//               </div>
//             </div>

//             <nav className="hidden lg:flex items-center gap-8">
//               {navigationItems.map((item) => (
//                 <a
//                   key={item.name}
//                   href={item.href}
//                   className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
//                 >
//                   {item.name}
//                 </a>
//               ))}
//             </nav>

//             <div className="flex items-center gap-3">
//               <Button variant="ghost" size="icon" className="hidden md:flex">
//                 <Search className="h-5 w-5" />
//               </Button>
//               <Button className="hidden md:flex bg-blue-600 hover:bg-blue-700 text-white">
//                 <Phone className="h-4 w-4 mr-2" />
//                 Call Now
//               </Button>
//               <Button
//                 variant="ghost"
//                 size="icon"
//                 className="lg:hidden"
//                 onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
//               >
//                 {isMobileMenuOpen ? <X /> : <Menu />}
//               </Button>
//             </div>
//           </div>

//           {/* Mobile Menu */}
//           {isMobileMenuOpen && (
//             <div className="lg:hidden border-t py-4">
//               <nav className="flex flex-col gap-4">
//                 {navigationItems.map((item) => (
//                   <a
//                     key={item.name}
//                     href={item.href}
//                     className="text-gray-700 hover:text-blue-600 font-medium py-2"
//                     onClick={() => setIsMobileMenuOpen(false)}
//                   >
//                     {item.name}
//                   </a>
//                 ))}
//               </nav>
//             </div>
//           )}
//         </div>
//       </header>

//       {/* Hero Section - Modern Design */}
//       <section className="relative bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 text-white py-20 overflow-hidden">
//         <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjAzIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-30"></div>
        
//         <div className="container mx-auto px-4 relative z-10">
//           <div className="grid lg:grid-cols-2 gap-12 items-center">
//             <div className="space-y-6">
//               <Badge className="bg-orange-500 text-white border-none px-4 py-2 text-sm">
//                 🏆 #1 Security Solutions in Islamabad
//               </Badge>
//               <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
//                 Professional CCTV & Solar Installation
//               </h1>
//               <p className="text-xl text-blue-100 leading-relaxed">
//                 Protect your property with advanced surveillance systems and save on electricity bills with premium solar solutions.
//               </p>
              
//               <div className="flex flex-col sm:flex-row gap-4 pt-4">
//                 <Button size="lg" className="bg-orange-500 hover:bg-orange-600 text-white text-lg px-8">
//                   Get Free Quote
//                   <ArrowRight className="ml-2 h-5 w-5" />
//                 </Button>
//                 <Button size="lg" variant="outline" className="border-2 border-white text-black hover:bg-white hover:text-blue-900 text-lg px-8">
//                   <PlayCircle className="mr-2 h-5 w-5" />
//                   Watch Demo
//                 </Button>
//               </div>

//               <div className="flex gap-8 pt-6 border-t border-white/20">
//                 <div>
//                   <div className="text-3xl font-bold">500+</div>
//                   <div className="text-blue-200 text-sm">Projects Done</div>
//                 </div>
//                 <div>
//                   <div className="text-3xl font-bold">5+</div>
//                   <div className="text-blue-200 text-sm">Years Experience</div>
//                 </div>
//                 <div>
//                   <div className="text-3xl font-bold">100%</div>
//                   <div className="text-blue-200 text-sm">Satisfaction</div>
//                 </div>
//               </div>
//             </div>

//             <div className="relative hidden lg:block">
//               <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
//                 <img
//                   src="/hero.png?height=400&width=600"
//                   alt="CCTV Installation"
//                   className="rounded-lg shadow-2xl"
//                 />
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Brand Logos Section */}
//       <section className="py-12 bg-gray-50 border-y">
//         <div className="container mx-auto px-4">
//           <div className="text-center mb-8">
//             <h3 className="text-lg font-semibold text-gray-900">Authorized Dealer of Top Brands</h3>
//           </div>
//           <div className="grid grid-cols-3 md:grid-cols-6 gap-8 items-center">
//             {brandLogos.map((brand, idx) => (
//               <div key={idx} className="text-center">
//                 <div className="bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
//                   <div className="text-2xl font-bold text-gray-700">{brand.name}</div>
//                   {brand.popular && <Badge className="mt-2 bg-blue-600 text-white text-xs">Popular</Badge>}
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* CCTV Packages - Tabbed Section */}
//       <section id="products" className="py-20">
//         <div className="container mx-auto px-4">
//           <div className="text-center mb-12">
//             <Badge className="mb-4 bg-blue-100 text-blue-700">Featured Packages</Badge>
//             <h2 className="text-4xl font-bold text-gray-900 mb-4">CCTV Camera Packages</h2>
//             <p className="text-xl text-gray-600 max-w-2xl mx-auto">
//               Complete installation packages with genuine products and warranty
//             </p>
//           </div>

//           <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
//             {cctvPackages.map((pkg, idx) => (
//               <Card key={idx} className={`relative hover:shadow-2xl transition-all duration-300 ${pkg.popular ? 'border-2 border-blue-600 transform scale-105' : ''}`}>
//                 {pkg.popular && (
//                   <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
//                     <Badge className="bg-orange-500 text-white px-4 py-1">MOST POPULAR</Badge>
//                   </div>
//                 )}
//                 <CardContent className="p-6">
//                   <div className="text-center mb-6">
//                     <div className="bg-blue-100 text-blue-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
//                       <Camera className="h-8 w-8" />
//                     </div>
//                     <h3 className="text-2xl font-bold text-gray-900 mb-2">{pkg.cameras} Camera Package</h3>
//                     <div className="flex items-baseline justify-center gap-1">
//                       <span className="text-sm text-gray-500">PKR</span>
//                       <span className="text-4xl font-bold text-blue-600">{pkg.price}</span>
//                     </div>
//                   </div>
                  
//                   <ul className="space-y-3 mb-6">
//                     {pkg.features.map((feature, i) => (
//                       <li key={i} className="flex items-center gap-2">
//                         <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
//                         <span className="text-gray-700">{feature}</span>
//                       </li>
//                     ))}
//                   </ul>

//                   <Button className={`w-full ${pkg.popular ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-900 hover:bg-gray-800'} text-white`}>
//                     Order Now
//                     <ArrowRight className="ml-2 h-4 w-4" />
//                   </Button>
//                 </CardContent>
//               </Card>
//             ))}
//           </div>

//           <div className="text-center mt-8">
//             <Button variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-50">
//               View All Packages
//               <ChevronRight className="ml-2 h-4 w-4" />
//             </Button>
//           </div>
//         </div>
//       </section>

//       {/* Services Section */}
//       <section id="services" className="py-20 bg-gray-50">
//         <div className="container mx-auto px-4">
//           <div className="text-center mb-16">
//             <Badge className="mb-4 bg-orange-100 text-orange-700">Our Services</Badge>
//             <h2 className="text-4xl font-bold text-gray-900 mb-4">Complete Security & Energy Solutions</h2>
//             <p className="text-xl text-gray-600 max-w-3xl mx-auto">
//               Professional installation with quality products and expert support
//             </p>
//           </div>

//           <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
//             {[
//               { icon: Camera, title: "CCTV Installation", desc: "HD cameras with remote monitoring", color: "blue" },
//               { icon: Sun, title: "Solar Systems", desc: "Complete solar solutions for homes", color: "orange" },
//               { icon: Wifi, title: "Wireless Cameras", desc: "WiFi enabled smart cameras", color: "purple" },
//               { icon: Lock, title: "Access Control", desc: "Biometric & card access systems", color: "green" }
//             ].map((service, idx) => (
//               <Card key={idx} className="group hover:shadow-xl transition-all duration-300 cursor-pointer border-t-4 border-t-blue-600">
//                 <CardContent className="p-6 text-center">
//                   <div className={`bg-${service.color}-100 p-4 rounded-full w-20 h-20 mx-auto mb-4 group-hover:scale-110 transition-transform`}>
//                     <service.icon className={`h-12 w-12 text-${service.color}-600`} />
//                   </div>
//                   <h3 className="text-xl font-semibold text-gray-900 mb-2">{service.title}</h3>
//                   <p className="text-gray-600 mb-4">{service.desc}</p>
//                   <Button variant="ghost" className="text-blue-600 p-0 h-auto hover:bg-transparent">
//                     Learn More <ArrowRight className="ml-2 h-4 w-4" />
//                   </Button>
//                 </CardContent>
//               </Card>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Why Choose Us */}
//       <section className="py-20 bg-white">
//         <div className="container mx-auto px-4">
//           <div className="grid lg:grid-cols-2 gap-12 items-center">
//             <div>
//               <Badge className="mb-4 bg-blue-100 text-blue-700">Why Choose Us</Badge>
//               <h2 className="text-4xl font-bold text-gray-900 mb-6">
//                 Your Trusted Security Partner in Islamabad
//               </h2>
//               <p className="text-lg text-gray-600 mb-8">
//                 With over 5 years of experience and 500+ successful installations, we provide reliable security solutions with premium quality products.
//               </p>

//               <div className="grid sm:grid-cols-2 gap-6">
//                 {whyChooseUs.map((item, idx) => (
//                   <div key={idx} className="flex gap-4">
//                     <div className="bg-blue-100 p-3 rounded-lg h-fit">
//                       <item.icon className="h-6 w-6 text-blue-600" />
//                     </div>
//                     <div>
//                       <h3 className="font-semibold text-gray-900 mb-1">{item.title}</h3>
//                       <p className="text-gray-600 text-sm">{item.description}</p>
//                     </div>
//                   </div>
//                 ))}
//               </div>

//               <div className="mt-8 p-6 bg-blue-50 rounded-lg border-l-4 border-blue-600">
//                 <div className="flex items-center gap-3 mb-2">
//                   <Star className="h-5 w-5 text-yellow-500 fill-current" />
//                   <span className="font-bold text-2xl text-gray-900">4.9/5.0</span>
//                 </div>
//                 <p className="text-gray-600">Based on 100+ customer reviews</p>
//               </div>
//             </div>

//             <div className="grid grid-cols-2 gap-4">
//               <div className="space-y-4">
//                 <img src="/why-choose.jpg?height=500&width=600" alt="Installation 1" className="rounded-lg shadow-lg" />
//                 <img src="/hero.png?height=400&width=600" alt="Installation 2" className="rounded-lg shadow-lg" />
//               </div>
//               <div className="space-y-4 pt-8">
//                 <img src="/hero.png?height=400&width=600" alt="Installation 3" className="rounded-lg shadow-lg" />
//                 <img src="/why-choose.jpg?height=500&width=600" alt="Installation 4" className="rounded-lg shadow-lg" />
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* CTA Section */}
//       <section className="py-20 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
//         <div className="container mx-auto px-4 text-center">
//           <h2 className="text-4xl font-bold mb-6">Ready to Secure Your Property?</h2>
//           <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
//             Get a free consultation and quote for your CCTV or Solar installation. Our experts are ready to help.
//           </p>
//           <div className="flex flex-col sm:flex-row gap-4 justify-center">
//             <Button size="lg" className="bg-orange-500 hover:bg-orange-600 text-white text-lg px-8">
//               <Phone className="mr-2 h-5 w-5" />
//               Call: +92-336-518240
//             </Button>
//             <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-blue-800 bg-transparent text-lg px-8">
//               <Mail className="mr-2 h-5 w-5" />
//               Get Free Quote
//             </Button>
//           </div>
//         </div>
//       </section>

//       {/* Footer */}
//       <footer className="bg-gray-900 text-white py-16">
//         <div className="container mx-auto px-4">
//           <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
//             <div>
//               <div className="flex items-center gap-3 mb-4">
//                 <div className="bg-blue-600 p-2 rounded-lg">
//                   <Shield className="h-6 w-6" />
//                 </div>
//                 <div>
//                   <h3 className="text-lg font-bold">AF TECHNOLOGIES</h3>
//                   <p className="text-xs text-gray-400">SECURITY SOLUTIONS</p>
//                 </div>
//               </div>
//               <p className="text-gray-400 text-sm">
//                 Leading provider of CCTV and Solar installation services in Islamabad.
//               </p>
//             </div>

//             <div>
//               <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
//               <div className="space-y-2">
//                 {["Home", "Services", "Products", "About", "Contact"].map((link) => (
//                   <a key={link} href="#" className="block text-gray-400 hover:text-white transition-colors text-sm">
//                     {link}
//                   </a>
//                 ))}
//               </div>
//             </div>

//             <div>
//               <h3 className="text-lg font-semibold mb-4">Services</h3>
//               <div className="space-y-2">
//                 {["CCTV Installation", "Solar Systems", "Wireless Cameras", "Biometric Systems"].map((service) => (
//                   <a key={service} href="#" className="block text-gray-400 hover:text-white transition-colors text-sm">
//                     {service}
//                   </a>
//                 ))}
//               </div>
//             </div>

//             <div>
//               <h3 className="text-lg font-semibold mb-4">Contact Info</h3>
//               <div className="space-y-3">
//                 <div className="flex items-center gap-3">
//                   <Phone className="h-5 w-5 text-blue-400" />
//                   <span className="text-gray-400 text-sm">+92-336-518240</span>
//                 </div>
//                 <div className="flex items-center gap-3">
//                   <Mail className="h-5 w-5 text-blue-400" />
//                   <span className="text-gray-400 text-sm">info@aftechnologies.pk</span>
//                 </div>
//                 <div className="flex items-start gap-3">
//                   <MapPin className="h-5 w-5 text-blue-400 flex-shrink-0" />
//                   <span className="text-gray-400 text-sm">Shop 10, Zam Zama Center, PWD Phase 2, Islamabad</span>
//                 </div>
//               </div>
//             </div>
//           </div>

//           <div className="border-t border-gray-800 pt-8 text-center">
//             <p className="text-gray-400 text-sm">
//               © {new Date().getFullYear()} AF TECHNOLOGIES. All rights reserved.
//             </p>
//           </div>
//         </div>
//       </footer>
//     </div>
//   )
// }