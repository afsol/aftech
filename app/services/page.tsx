import Footer from "@/components/layout/footer"
import Header from "@/components/layout/header"
import CTA from "@/components/sections/cta"
import ServicesHero from "@/components/services/service"

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Main Header */}
      <Header />
      <div className="w-full h-[100px] bg-blue-400 bg-gradient-to-r from-green-500 to-blue-500 flex items-center justify-center text-center">
        <span>Home / Services</span>
      </div>

      <ServicesHero />

      {/* Contact CTA */}
      <CTA />

      {/* Footer */}
      <Footer />
    </div>
  )
}
