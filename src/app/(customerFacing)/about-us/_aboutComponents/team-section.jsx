import Image from "next/image"
import { Card, CardContent } from "@/src/components/ui/card"

export default function TeamSection() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Meet Our Team</h2>
          <p className="text-lg text-gray-600">
            Passionate experts dedicated to revolutionizing hair care with natural solutions.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3].map((member) => (
            <Card key={member} className="overflow-hidden">
              <CardContent className="p-0">
                <div className="relative h-64">
                  <Image
                    src="/placeholder.svg?height=400&width=300"
                    alt={`Team member ${member}`}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6 text-center">
                  <h3 className="text-xl font-semibold mb-1">Sarah Johnson</h3>
                  <p className="text-primary mb-4">Product Specialist</p>
                  <p className="text-gray-600">Expert in natural hair care formulations with 5+ years of experience.</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

