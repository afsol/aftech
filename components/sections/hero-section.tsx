import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ChevronRight, ShieldCheck, Activity, Cpu } from "lucide-react"
import Image from "next/image"

export default function HeroSection() {
  return (
    <section className="relative bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 text-white py-24 lg:py-32 overflow-hidden">
      {/* Premium subtle tech background overlay */}
      <div className="absolute inset-0 opacity-[0.05] pointer-events-none bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:32px_32px]"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Side Content Column */}
          <div className="space-y-8 max-w-2xl">
            
            {/* Dynamic, Broad Authority Badge */}
            <Badge className="bg-blue-600/20 text-blue-400 hover:bg-blue-600/30 border border-blue-500/30 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider rounded-full w-fit flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-blue-400" />
              #1 Enterprise Infrastructure Solutions in Islamabad
            </Badge>
            
            {/* Broad, Awesome Main Heading */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-[1.1] tracking-tight bg-gradient-to-r from-white via-slate-100 to-slate-400 bg-clip-text text-transparent">
              Next-Gen Engineering & Security Infrastructures
            </h1>
            
            {/* Inclusive, High-Value Subtitle Layer */}
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
              Design, deployment, and operational maintenance frameworks engineered for corporate complexes, critical energy nodes, and smart environments. We deliver integrated high-availability assets across the Capital region.
            </p>

            {/* Strategic Keyword Row for SEO Matrix (Hidden on Mobile for Space) */}
            <div className="hidden sm:flex flex-wrap gap-x-6 gap-y-2 pt-2 border-t border-slate-800 text-xs text-slate-400 font-medium">
              <span className="flex items-center gap-1.5"><Cpu className="h-3.5 w-3.5 text-blue-500" /> ALL IP & Analog CCTV</span>
              <span className="flex items-center gap-1.5"><Activity className="h-3.5 w-3.5 text-blue-500" /> Premium Solar Solutions</span>
              <span className="flex items-center gap-1.5"><ShieldCheck className="h-3.5 w-3.5 text-blue-500" /> Structured Core Networks</span>
            </div>
            
            {/* Interactive Call to Action Deck */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl h-14 px-8 shadow-lg shadow-blue-600/20 transition-all duration-300">
                Explore Core Services
                <ChevronRight className="ml-2 h-5 w-5" />
              </Button>
              <Button 
  size="lg" 
  variant="outline" 
  className="bg-black hover:bg-slate-800 text-white hover:text-slate-100 border-black hover:border-slate-800 font-semibold rounded-xl h-14 px-8 transition-colors duration-300"
>
  Request Engineering Spec
</Button>
            </div>
          </div>
          
          {/* Right Side Visual Block */}
          <div className="relative w-full lg:max-w-xl mx-auto" data-aos="fade-left">
            {/* Visual glow accent layer behind image */}
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl blur opacity-20 group-hover:opacity-30 transition duration-1000"></div>
            
            <div className="relative bg-slate-900 border border-slate-800 rounded-2xl p-3 shadow-2xl">
              <Image
                src="/hero.png?height=450&width=600"
                alt="AF Technologies Core Operational Dashboard"
                width={600}
                height={450}
                priority
                className="rounded-xl object-cover w-full h-auto min-h-[300px]"
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}