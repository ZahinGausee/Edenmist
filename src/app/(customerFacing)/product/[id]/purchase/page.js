
import prisma from "@/src/db/db";
import { notFound } from "next/navigation";
import CheckoutForm from "../../../_components/CheckoutForm";
import Checkout from "../../../_components/CheckoutPage";
import AddressCard from "../../../_components/AddressCard";
import Checkout1 from "../../../_components/CheckoutPage";
import { Suspense } from "react"
import { getUserAddress, getProductDetails } from "../../../actions/checkout"
import CheckoutPageClient from "../../../_components/CheckoutPage";

export const metadata = {
  title: "Checkout - Eden Mist",
  description: "Complete your purchase of natural hair care products from Eden Mist.",
  openGraph: {
    title: "Checkout - Eden Mist",
    description: "Complete your purchase of natural hair care products from Eden Mist.",
    type: "website",
    url: "https://www.edenmist.com/checkout",
    images: [
      {
        url: "https://www.edenmist.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Eden Mist Checkout",
      },
    ],
  },
}

export default async function PurchasePage({ params }) {
  const { id } = await params;
  const product = await prisma.products.findUnique({
    where: { product_id: id },
  });
   const plainProduct = {
    ...product,
    price: product.price.toNumber(), // or price.toString()
   };
  if (product == null) return notFound();
  
  return (
    <>
  <CheckoutPage product_id={id}/>
  </>
  );
}

async function CheckoutPage({product_id}) {
  const address = await getUserAddress()
  const product = await getProductDetails(product_id) // Replace with actual product ID
  const plainProduct = {
    ...product,
    price: product.price.toString(), // or price.toString()
  };
  return (
    <>
    <Suspense fallback={<div>Loading...</div>}>
      <CheckoutPageClient initialAddress={address} initialProduct={product} />
    </Suspense>
    {/* <CheckoutForm product={plainProduct} address={address}/> */}
    </>
  )

}