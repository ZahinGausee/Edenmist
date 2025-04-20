
import prisma from '@/src/db/db'
import React from 'react'
import { notFound } from 'next/navigation'
import ProductOverview from '@/src/components/ProductPage'
import { getServerSession } from 'next-auth';
import { authOptions } from '@/src/lib/auth';


export default async function ProductDetailPage(
  { 
    params
  }) 
{
  const { id } = await params;
   const product = await prisma.products.findUnique({ where: { product_id: id} });

   if (!product) {
   return notFound()
 }
   const plainProduct = {
     ...product,
     price: product.price.toNumber(), // or price.toString()
    };

    console.log(id)
    
  const session = await getServerSession(authOptions);
  let userData = null;
  console.log(session)
  if (session) {
    try {
      userData = await prisma.user.findUnique({ where: { email: session.user.email } });
    } catch (error) {
      console.error("Error fetching user data:", error);
      userData = null; // Graceful fallback in case of errors
    }
  }
  
  return (
    <ProductOverview productData={plainProduct} userData={userData}/>
  )
}
