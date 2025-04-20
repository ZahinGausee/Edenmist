"use client";

import { useState } from "react";
import { StarIcon } from "@heroicons/react/20/solid";
import { Button, Radio, RadioGroup } from "@headlessui/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/src/components/ui/dialog";

const reviews = { href: "#", average: 4, totalCount: 117 };

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function DialogBox() {
  return (
    <Dialog>
  <DialogTrigger asChild>
    <button className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
      Buy Now
    </button>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Get Started with Your Purchase</DialogTitle>
      <DialogDescription>Please sign in to continue, or create a new account if you're new here.</DialogDescription>
    </DialogHeader>
    <div className="flex flex-col space-y-4 mt-4">
      {/* Sign In Button */}
      <a href="/login" className="text-center px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">
        Sign In
      </a>
      {/* Sign Up Button */}
      <a href="/sign-up" className="text-center px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
        Sign Up
      </a>
    </div>
  </DialogContent>
</Dialog>

  );
}

export default function ProductOverview({ productData, userData }) {
  const router = useRouter();
  
  const product = {
    name: productData.name,
    price: `₹${productData.price}`,
    images: [
      { src: "/product_image5.JPG", alt: "Front of Eden's Rosemary Water." },
      { src: "/product_image6.JPG", alt: "Front of Eden's Rosemary Water." },
      { src: "/product_image4.jpg", alt: "Front of Eden's Rosemary Water." },
      { src: "/product_image2.jpg", alt: "Front of Eden's Rosemary Water." },
    ],
    sizes: [{ name: productData.size, inStock: productData.stock > 0 }],
    description: "Discover the secret to naturally healthy, vibrant hair with Eden Mist Rosemary Water Spray. This premium hair care solution is designed to address common hair concerns like hair fall, thinning, and dullness, leaving your hair stronger, shinier, and full of life." + " " + productData.description,
    };

  const [selectedSize, setSelectedSize] = useState(product.sizes[0]);

  return (
    <div className="bg-white">
      <div className="pt-6">
        {/* Product Image Gallery */}
        <div className="mx-auto mt-6 max-w-2xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:gap-x-8 lg:px-8">
          <img alt={product.images[0].alt} src={product.images[0].src} className="hidden size-full rounded-lg object-cover lg:block" />
          <div className="hidden lg:grid lg:grid-cols-1 lg:gap-y-8">
            <img alt={product.images[1].alt} src={product.images[1].src} className="aspect-[3/2] w-full rounded-lg object-cover" />
            <img alt={product.images[2].alt} src={product.images[2].src} className="aspect-[3/2] w-full rounded-lg object-cover" />
          </div>
          <img alt={product.images[3].alt} src={product.images[3].src} className="aspect-[4/5] size-full object-cover sm:rounded-lg lg:aspect-auto" />
        </div>

        {/* Product Information */}
        <div className="mx-auto max-w-2xl px-4 pb-16 pt-10 sm:px-6 lg:max-w-7xl lg:grid lg:grid-cols-3 lg:grid-rows-[auto_auto_1fr] lg:gap-x-8 lg:px-8 lg:pb-24 lg:pt-16">
          <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
            <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
              Eden Mist Rosemary Water Spray for Hair Growth ({productData.size}), 100% Natural Hair Spray for Regrowth, Reduces Hair Fall, Strengthens Roots and Adds Shine
            </h1>
          </div>

          {/* Options */}
          <div className="mt-4 lg:row-span-3 lg:mt-0">
            <h2 className="sr-only">Product information</h2>
            <p className="text-3xl tracking-tight text-gray-900">{product.price}</p>

            {/* Reviews */}
            <div className="mt-6 flex items-center">
              {[...Array(5)].map((_, index) => (
                <StarIcon key={index} className={classNames(reviews.average > index ? "text-gray-900" : "text-gray-200", "size-5 shrink-0")} />
              ))}
              <p className="sr-only">{reviews.average} out of 5 stars</p>
              <a href={reviews.href} className="ml-3 text-sm font-medium text-indigo-600 hover:text-indigo-500">
                {reviews.totalCount} reviews
              </a>
            </div>

            {/* Size Selection */}
            <div className="mt-10">
              <h3 className="text-sm font-medium text-gray-900">Size</h3>
              <RadioGroup value={selectedSize} onChange={setSelectedSize} className="mt-4 grid grid-cols-4 gap-4 sm:grid-cols-8 lg:grid-cols-4">
                {product.sizes.map((size) => (
                  <Radio
                    key={size.name}
                    value={size}
                    disabled={!size.inStock}
                    className={classNames(
                      size.inStock ? "cursor-pointer bg-white text-gray-900 shadow-sm" : "cursor-not-allowed bg-gray-50 text-gray-200",
                      "group relative flex items-center justify-center rounded-md border px-4 py-3 text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none sm:flex-1 sm:py-6"
                    )}
                  >
                    <span>{size.name}</span>
                  </Radio>
                ))}
              </RadioGroup>
            </div>

            {/* Buy Now Button or Currently Unavailable */}
            {userData ? (
  selectedSize?.inStock ? (
    <Link
      href={`/product/${productData.product_id}/purchase`}
      className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
    >
      Buy Now
    </Link>
  ) : (
    <button
      disabled
      className="mt-10 flex w-full items-center justify-center rounded-md border border-gray-300 bg-gray-400 px-8 py-3 text-base font-medium text-gray-700 cursor-not-allowed"
    >
      Currently Unavailable
    </button>
  )
) : (
  <DialogBox />
)}

          </div>

          {/* Description */}
          <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pb-16 lg:pr-8 lg:pt-6">
            <h3 className="sr-only">Description</h3>
            <p className="text-base text-gray-900">{product.description}</p>

            <div className="mt-10">
              {/* <h2 className="text-sm font-medium text-gray-900">Details</h2>

              <div className="mt-4 space-y-6">
                <p className="text-sm text-gray-600">{product.details}</p>
              </div> */}
              <h2>
                <b>Why Choose Eden Mist Rosemary Water Spray?</b>
              </h2>
              <br />
              <ul role="list" className="list-disc space-y-2 pl-4 text-sm">
                <li className="text-gray-400">
                  <span className="text-gray-600">
                    <b>Promotes Hair Growth Naturally:</b> Infused with the pure
                    essence of rosemary, this spray stimulates hair follicles,
                    encouraging faster and healthier hair regrowth.
                  </span>
                </li>
                <li className="text-gray-400">
                  <span className="text-gray-600">
                    <b>Reduces Hair Fall:</b> Strengthens hair roots to minimize
                    breakage and prevent thinning.
                  </span>
                </li>
                <li className="text-gray-400">
                  <span className="text-gray-600">
                    <b>Adds Radiant Shine:</b> Revives dull, lifeless hair by
                    enhancing its natural shine and smoothness.
                  </span>
                </li>
                <li className="text-gray-400">
                  <span className="text-gray-600">
                    <b>100% Natural & Safe:</b> Free from parabens, sulfates,
                    and harmful chemicals, making it ideal for everyday use.
                  </span>
                </li>
                <li className="text-gray-400">
                  <span className="text-gray-600">
                    <b>Suitable for All:</b> Designed for men and women of all
                    ages and hair types, including straight, wavy, curly, and
                    coily textures.
                  </span>
                </li>
              </ul>
              <br />
              <h2>
                <b>How to Use</b>
              </h2>
              <br />
              <ol role="list" className="list-decimal space-y-2 pl-4 text-sm">
                <li>Spray evenly onto your scalp and hair from root to tip.</li>
                <li>Gently massage to improve absorption.</li>
                <li>
                  Use daily for best results, or as needed for a fresh,
                  revitalizing boost.
                </li>
              </ol>
              <br />
              <h2>
                <b>Why It Works</b>
              </h2>
              <div className="mt-4 space-y-6">
                <p className="text-sm text-gray-600">
                  Rosemary is a time-tested natural remedy known for its ability
                  to improve blood circulation in the scalp, strengthen hair
                  roots, and promote overall hair health. Eden Mist ensures you
                  get the finest rosemary water in a convenient spray bottle for
                  effortless application.
                </p>
                <div className="space-y-6">
                  <p className="text-base text-gray-900">
                    Transform your hair care routine with Eden Mist Rosemary
                    Water Spray and enjoy visibly healthier, thicker, and
                    shinier hair.
                  </p>
                </div>
              </div>
            </div>
          </div>

          
        </div>
      </div>
    </div>
  );
}
