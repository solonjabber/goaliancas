import { Header } from "@/components/layout/header"
import { WhyChooseUs } from "@/components/home/why-choose-us"
import { CTASection } from "@/components/home/cta-section"
import { Footer } from "@/components/layout/footer"
import { HeroBanner } from "@/components/layout/hero-banner"
import { HeroSearch } from "@/components/home/hero-search"
import { CategoryCards } from "@/components/layout/category-cards"
import { FeaturedProducts } from "@/components/layout/featured-products"
import { NewReleases } from "@/components/layout/new-releases"
import { LuxuryShowcase } from "@/components/layout/luxury-showcase"
import { Phone, Award, Shield, Heart } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main>
        {/* Hero Banner */}
        <HeroBanner />

        {/* Search Section */}
        <HeroSearch />

        {/* Category Cards */}
        <CategoryCards />

        {/* Featured Products */}
        <FeaturedProducts />

        {/* New Releases */}
        <NewReleases />

        {/* Luxury Showcase Banner */}
        <LuxuryShowcase />

        {/* Why Choose Us */}
        <WhyChooseUs />

        {/* CTA Section */}
        <CTASection />
      </main>

      <Footer />
    </div>
  )
}
