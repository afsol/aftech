import ContactForm from "@/components/contact/contact-form"
import ContactMap from "@/components/contact/google-map"
import Footer from "@/components/layout/footer"
// import ContactInfo from "@/components/contact/contact-info"
import Header from "@/components/layout/header"
import CTA from "@/components/sections/cta"
import { MapPin, Phone, Mail, Clock } from "lucide-react"

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Main Header */}
      <Header />
      <div className="w-full h-[100px] bg-blue-400 bg-gradient-to-r from-green-500 to-blue-500 flex items-center justify-center text-center">
        <span>Home / Contact</span>
      </div>

      <div className="container px-4 py-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Contact Us</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Get in touch with our experts for free consultation and quotes on CCTV and Solar installations
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          {/* Contact Form */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Send us a Message</h2>
            <ContactForm />
          </div>

          {/* Contact Information */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Find Our Office</h2>
            <ContactMap />
          </div>
        </div>

        {/* Quick Contact Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="group bg-white hover:shadow-lg transition-shadow p-6 rounded-lg shadow-md text-center">
            <MapPin className="h-8 w-8 text-blue-600 mx-auto mb-4 transition-transform group-hover:scale-110" />
            <h3 className="font-semibold text-gray-900 mb-2">Visit Us</h3>
            <p className="text-gray-600 text-sm">
              Shop#: 10 Zamzama Plaza,<br />PAKISTAN Town Phase 2, Islamabad
            </p>
          </div>

          <div className="group bg-white hover:shadow-lg transition-shadow p-6 rounded-lg shadow-md text-center">
            <Phone className="h-8 w-8 text-green-600 mx-auto mb-4 transition-transform group-hover:scale-110" />
            <h3 className="font-semibold text-gray-900 mb-2">Call Us</h3>
            <p className="text-gray-600 text-sm">+92-336-0518240</p>
          </div>

          <div className="group bg-white hover:shadow-lg transition-shadow p-6 rounded-lg shadow-md text-center">
            <Mail className="h-8 w-8 text-orange-600 mx-auto mb-4 transition-transform group-hover:scale-110" />
            <h3 className="font-semibold text-gray-900 mb-2">Email Us</h3>
            <p className="text-gray-600 text-sm">info@aftechnologies.pk</p>
          </div>

          <div className="group bg-white hover:shadow-lg transition-shadow p-6 rounded-lg shadow-md text-center">
            <Clock className="h-8 w-8 text-purple-600 mx-auto mb-4 transition-transform group-hover:scale-110" />
            <h3 className="font-semibold text-gray-900 mb-2">Working Hours</h3>
            <p className="text-gray-600 text-sm">Mon-Sat: 10AM-08PM</p>
          </div>
        </div>

      </div>
      <CTA />
      <Footer />
    </div>
  )
}
