import { Phone, Mail } from "lucide-react"
import Link from "next/link"

export default function TopBar() {
  return (
    <div className="bg-blue-900 text-white py-2 text-sm">
      <div className="container px-4 flex justify-between items-center">
        <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-2">
            <Phone className="h-4 w-4" />
            <span>+92-51-123-4567</span>
          </div>
          <div className="flex items-center space-x-2">
            <Mail className="h-4 w-4" />
            <span>info@aftechnologies.pk</span>
          </div>
        </div>
        <div className="hidden md:flex items-center space-x-4">
          <span>Follow Us:</span>
          <div className="flex space-x-2">
            <Link href="#" className="hover:text-blue-300">
              Facebook
            </Link>
            <Link href="#" className="hover:text-blue-300">
              Instagram
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
