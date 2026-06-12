import AboutHero from "@/components/about/about-hero"
import AboutStats from "@/components/about/about-stats"
import TeamSection from "@/components/about/team-section"
import CompanyHistory from "@/components/about/company-history"

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      <AboutHero />
      <AboutStats />
      <CompanyHistory />
      <TeamSection />
    </div>
  )
}
