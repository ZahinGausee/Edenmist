"use server"

import prisma from "@/src/db/db"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/src/lib/auth"

export async function getUserAddress() {
  const session = await getServerSession(authOptions)
  if (!session?.user?.email) return null

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    select: {
      name: true,
      username: true,
      streetAddress: true,
      city: true,
      state: true,
      pinCode: true,
      mobile: true,
    },
  })

  return user
}

export async function getProductDetails(productId) {
  const product = await prisma.products.findUnique({
    where: { product_id: productId },
    include: { categories: true },
  })

  return product
}


