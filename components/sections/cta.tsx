import { Button } from "@/components/ui/button"
import { Mail, Phone } from "lucide-react"

export default function CTA() {
  return (
    <section className="py-20 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="container px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Secure Your Property?</h2>
          <p className="text-xl mb-8 text-blue-100 max-w-2xl mx-auto">
            Get a free consultation and quote for your CCTV or Solar installation project. Our experts are ready to help
            you choose the best solution.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-orange-500 hover:bg-orange-600 text-white">
              <Phone className="mr-2 h-5 w-5" />
              <a href="tel:+923360518240">Call Now: +92-336-05-18-240</a>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-blue-800 bg-transparent"
            >
              <Mail className="mr-2 h-5 w-5" />
              Get Free Quote
            </Button>
          </div>
        </div>
      </section>
  )
}
