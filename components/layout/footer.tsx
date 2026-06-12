import Link from "next/link"
import { Phone, Mail, MapPin } from "lucide-react"
import Image from "next/image"

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-16">
      <div className="container px-4">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
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
                <h3 className="text-lg font-bold">AF TECHNOLOGIES</h3>
                <p className="text-sm text-gray-400">SECURITY SOLUTIONS</p>
              </div>
            </div>
            <p className="text-gray-400">
              Leading provider of CCTV and Solar installation services in Islamabad. Committed to delivering quality
              solutions for your security and energy needs.
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Services</h3>
            <div className="space-y-2">
              <Link href="/services" className="block text-gray-400 hover:text-white transition-colors">
                CCTV Installation
              </Link>
              <Link href="/services" className="block text-gray-400 hover:text-white transition-colors">
                Solar Systems
              </Link>
              <Link href="/services" className="block text-gray-400 hover:text-white transition-colors">
                Maintenance
              </Link>
              <Link href="/services" className="block text-gray-400 hover:text-white transition-colors">
                Consultation
              </Link>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Products</h3>
            <div className="space-y-2">
              <Link href="/products" className="block text-gray-400 hover:text-white transition-colors">
                IP Cameras
              </Link>
              <Link href="/products" className="block text-gray-400 hover:text-white transition-colors">
                DVR/NVR Systems
              </Link>
              <Link href="/products" className="block text-gray-400 hover:text-white transition-colors">
                Solar Panels
              </Link>
              <Link href="/products" className="block text-gray-400 hover:text-white transition-colors">
                Inverters
              </Link>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Contact Info</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-blue-400" />
                <span className="text-gray-400">+92-336-0518240</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-blue-400" />
                <span className="text-gray-400">info@aftechnologies.pk</span>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-5 h-5">
                  <MapPin className="h-5 w-5 text-blue-400" />
                </div>
                <span className="text-gray-400">Shop#: 10 Ground Flor Zam Zama Center, Behind Al-Noor Chemist PWD Society Main Road, Near UFONE franchise, Phase 2 Pakistan Town, Islamabad.</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-center">
          <p className="text-gray-400">
            © {new Date().getFullYear()} AF TECHNOLOGIES SECURITY SOLUTIONS All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
