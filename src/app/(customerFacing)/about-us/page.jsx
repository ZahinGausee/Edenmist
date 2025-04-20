
import Image from "next/image"
import { ArrowRight, Leaf, DropletsIcon as Drop, Star, Users } from "lucide-react"
import { Button } from "@/src/components/ui/button"
import AboutHero from "./_aboutComponents/about-hero"
import StorySection from "./_aboutComponents/story-section"
import ValuesSection from "./_aboutComponents/values-section"
import TeamSection from "./_aboutComponents/team-section"

export const metadata = {
  title: "About Us | Natural Hair Care with Rosemary",
  description:
    "Discover our journey in creating natural hair care solutions. Our signature Rosemary Hair Water is crafted with pure ingredients for healthier, stronger hair.",
  openGraph: {
    title: "About Us | Natural Hair Care with Rosemary",
    description:
      "Discover our journey in creating natural hair care solutions. Our signature Rosemary Hair Water is crafted with pure ingredients for healthier, stronger hair.",
    images: ["/about-og.jpg"],
  },
}

export default function AboutPage() {
  return (
    <main className="min-h-screen">
      <AboutHero />
      <StorySection />
      <ValuesSection />
      <TeamSection />

      {/* Stats Section */}
      <section className="bg-slate-50 py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="space-y-2">
              <p className="text-4xl font-bold text-primary">10k+</p>
              <p className="text-sm text-gray-600">Happy Customers</p>
            </div>
            <div className="space-y-2">
              <p className="text-4xl font-bold text-primary">100%</p>
              <p className="text-sm text-gray-600">Natural Ingredients</p>
            </div>
            <div className="space-y-2">
              <p className="text-4xl font-bold text-primary">4.9</p>
              <p className="text-sm text-gray-600">Average Rating</p>
            </div>
            <div className="space-y-2">
              <p className="text-4xl font-bold text-primary">5+</p>
              <p className="text-sm text-gray-600">Years Research</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative overflow-hidden bg-primary text-white py-20">
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold">Join Our Natural Hair Care Journey</h2>
            <p className="text-lg text-primary-foreground/90">
              Experience the power of nature with our Rosemary Hair Water. Start your journey to healthier, more
              beautiful hair today.
            </p>
            <Button size="lg" variant="secondary" className="bg-white text-primary hover:bg-white/90">
              Shop Now <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
        <div className="absolute inset-0 opacity-10">
          <Image src="/placeholder.svg?height=600&width=1920" alt="Background pattern" fill className="object-cover" />
        </div>
      </section>
    </main>
  )
}

