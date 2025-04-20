import Razorpay from "razorpay";
import { NextResponse } from "next/server";

const razorpay = new Razorpay({
  key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

export async function POST(req) {
    const { product_id, amount, quantity } = await req.json();
    const order = await razorpay.orders.create({
      amount: amount,
      currency: "INR",
      receipt: `Order_${new Date().getTime()}`,
      notes: {
        productId: product_id,
        quantity: quantity,
      },
    });
    
    return NextResponse.json(order);
}