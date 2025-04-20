import { Leaf, DropletsIcon as Drop, Star, Users } from "lucide-react"

export default function ValuesSection() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Our Values</h2>
          <p className="text-lg text-gray-600">
            These core principles guide everything we do, from research to production.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="text-center space-y-4">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
              <Leaf className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold">Natural Ingredients</h3>
            <p className="text-gray-600">We use only the finest natural ingredients, sourced responsibly.</p>
          </div>

          <div className="text-center space-y-4">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
              <Drop className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold">Pure Formula</h3>
            <p className="text-gray-600">No harmful chemicals, just pure natural goodness for your hair.</p>
          </div>

          <div className="text-center space-y-4">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
              <Star className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold">Quality First</h3>
            <p className="text-gray-600">Rigorous testing ensures the highest quality in every bottle.</p>
          </div>

          <div className="text-center space-y-4">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
              <Users className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold">Customer Focus</h3>
            <p className="text-gray-600">Your satisfaction and results are our top priority.</p>
          </div>
        </div>
      </div>
    </section>
  )
}

