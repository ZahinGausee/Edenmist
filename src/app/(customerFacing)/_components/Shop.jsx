import { ProductCard } from "@/src/components/ProductCard";

const products = [
    {
      id: 1,
      name: 'Eden Mist Rosemary Water',
      href: '/product/eden-mist-rosemary-water-hair-rinse-200ml',
      imageSrc: '/product_image.JPG',
      imageAlt: "Front of Eden's Rosemary Water.",
      price: '₹200',
      size: '200ml',
    },
    {
      id: 2,
      name: 'Eden Mist Rosemary Water',
      href: '/product/eden-mist-rosemary-water-hair-rinse-400ml',
      imageSrc: '/product_image6.jpg',
      imageAlt: "Front of Eden's Rosemary Water.",
      price: '₹400',
      size: '400ml',
    },
    // More products...
  ]
  
function Shop() {
    return ( 
        <>
      <div className="bg-white">
        <div className="mx-auto max-w-2xl px-8 py-10 sm:px-8 sm:py-10 lg:max-w-7xl lg:px-10">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">Shop</h2>
          <p className="mt-2 text-sm text-gray-500">Check out our latest products. We currently started with Rosemary Water. It's 100% natural. It gives your hair defferent shine. It promotes hair growth. It's a hair spray for hair regrowth.</p>
          <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
            {products.map((product) => (
              <ProductCard key={product.id} {...product} />
            ))}
          </div>
        </div>
      </div>
      
      </>
    )
  }
  
export default Shop;