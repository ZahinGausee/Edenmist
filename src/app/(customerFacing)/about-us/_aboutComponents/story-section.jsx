import Image from "next/image"
import { Card, CardContent } from "@/src/components/ui/card"

export default function StorySection() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Our Story</h2>
          <p className="text-lg text-gray-600">
            From a small experiment in our kitchen to a beloved hair care brand, our journey has been driven by passion
            and commitment to natural beauty.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <Card className="bg-slate-50 border-none">
            <CardContent className="p-6 space-y-4">
              <div className="relative h-48 rounded-lg overflow-hidden">
                <Image src="/placeholder.svg?height=400&width=600" alt="The beginning" fill className="object-cover" />
              </div>
              <h3 className="text-xl font-semibold">The Beginning</h3>
              <p className="text-gray-600">
                Started in 2023 with a vision to revolutionize hair care using the power of rosemary.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-slate-50 border-none">
            <CardContent className="p-6 space-y-4">
              <div className="relative h-48 rounded-lg overflow-hidden">
                <Image
                  src="/placeholder.svg?height=400&width=600"
                  alt="Research and Development"
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="text-xl font-semibold">Research & Development</h3>
              <p className="text-gray-600">Years of research led to our breakthrough Rosemary Hair Water formula.</p>
            </CardContent>
          </Card>

          <Card className="bg-slate-50 border-none lg:col-span-1">
            <CardContent className="p-6 space-y-4">
              <div className="relative h-48 rounded-lg overflow-hidden">
                <Image src="/placeholder.svg?height=400&width=600" alt="Today" fill className="object-cover" />
              </div>
              <h3 className="text-xl font-semibold">Today</h3>
              <p className="text-gray-600">Helping thousands achieve their hair goals with natural solutions.</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}

