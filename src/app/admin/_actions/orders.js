"use server";

import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";

const prisma = new PrismaClient();
export async function getOrders(page = 1, perPage = 10) {
  const skip = (page - 1) * perPage;
  
  try {
    const orders = await prisma.orders.findMany({
      skip,
      take: perPage, // Use perPage here instead of limit
      orderBy: { created_at: "desc" },
      include: {
        user: {
          select: {
            name: true,
            email: true,
            mobile: true,
            streetAddress: true,
            city: true,
            state: true,
            pinCode: true,
          },
        },
        order_items: {
          include: {
            products: {
              select: {
                name: true,
              },
            },
          },
        },
      },
    });

    const totalOrders = await prisma.orders.count();

    return {
      orders,
      totalPages: Math.ceil(totalOrders / perPage), // Use perPage for total pages calculation
      currentPage: page,
    };
  } catch (error) {
    console.error("Error fetching orders:", error);
    return {
      orders: [],
      totalPages: 0,
      currentPage: 1,
    };
  }
}

export async function updateOrderStatus(orderId, status) {
  await prisma.orders.update({
    where: { order_id: orderId },
    data: { status }, // Ensure that status field handles the 'approved' status
  });

  revalidatePath("/admin/sales");
}


