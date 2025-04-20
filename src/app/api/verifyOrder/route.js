import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/src/lib/auth";
import prisma from "@/src/db/db";

const generatedSignature = (razorpayOrderId, razorpayPaymentId) => {
  const keySecret = process.env.RAZORPAY_KEY_SECRET;
  return crypto
    .createHmac("sha256", keySecret)
    .update(razorpayOrderId + "|" + razorpayPaymentId)
    .digest("hex");
};

export async function POST(request) {
  try {
    const { orderId, razorpayPaymentId, razorpaySignature, productId, quantity, totalPrice, address } = await request.json();

    // Verify Payment Signature
    const signature = generatedSignature(orderId, razorpayPaymentId);
    if (signature !== razorpaySignature) {
      return NextResponse.json(
        { message: "Payment Verification Failed", isOk: false },
        { status: 400 }
      );
    }

    // Fetch user session
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ message: "Unauthorized", isOk: false }, { status: 401 });
    }

    // Fetch user details
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      return NextResponse.json({ message: "User not found", isOk: false }, { status: 404 });
    }

    // Handle stock deduction and order creation using a transaction
    const result = await prisma.$transaction(async (tx) => {
      // Check if the product has enough stock
      const product = await tx.products.findUnique({
        where: { product_id: productId },
        select: { stock: true, price: true },
      });

      if (!product || product.stock < quantity) {
        throw new Error("Insufficient stock available");
      }

      // Deduct stock
      await tx.products.update({
        where: { product_id: productId },
        data: { stock: { decrement: quantity } },
      });

      // Create order
      const order = await tx.orders.create({
        data: {
          order_id: orderId,
          user_id: user.id,
          total_price: totalPrice,
          status: "pending",
          order_items: {
            create: [
              {
                product_id: productId,
                quantity: quantity,
                price: product.price, // Use actual product price
              },
            ],
          },
        },
      });

      // Update user address if provided
      if (address) {
        await tx.user.update({
          where: { id: user.id },
          data: {
            name: address.name || user.name,
            streetAddress: address.streetAddress || user.streetAddress,
            city: address.city || user.city,
            state: address.state || user.state,
            pinCode: address.pinCode || user.pinCode,
            mobile: address.mobile || user.mobile,
          },
        });
      }

      return order;
    });

    return NextResponse.json(
      { message: "Payment Verification & Order Placed Successfully", isOk: true, order: result },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ message: error.message, isOk: false }, { status: 500 });
  }
}
