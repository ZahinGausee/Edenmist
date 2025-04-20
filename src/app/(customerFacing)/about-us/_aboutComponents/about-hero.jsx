import Image from "next/image"
import { Button } from "@/src/components/ui/button"

export default function AboutHero() {
  return (
    <section className="relative min-h-[80vh] flex items-center bg-slate-50">
      <div className="container mx-auto px-4 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 text-center lg:text-left">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              Transforming Hair Care
              <span className="block text-primary">Naturally</span>
            </h1>
            <p className="text-lg text-gray-600 max-w-xl mx-auto lg:mx-0">
              We believe in the power of nature. Our journey began with a simple mission: to create effective hair care
              solutions using the finest natural ingredients.
            </p>
            <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
              <Button size="lg">Learn More</Button>
              <Button size="lg" variant="outline">
                Watch Our Story
              </Button>
            </div>
          </div>
          <div className="relative h-[500px] rounded-2xl overflow-hidden">
            <Image
              src="/rosemary1.jpg?height=1000&width=800"
              alt="Natural hair care ingredients"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

