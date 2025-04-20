
import prisma from "@/src/db/db"
import { notFound } from "next/navigation"
import { CheckCircle, Package } from "lucide-react"
import Link from "next/link"


export default async function OrderConfirmationPage({ params }) {
  if (!params.orderId) {
    notFound()
  }

  const orderId = await params.orderId;
  const order = await prisma.orders.findUnique({
    where: { order_id: orderId},
    include: { order_items: true },
  })

  if (!order) {
    notFound()
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="bg-green-500 p-6 text-white text-center">
          <CheckCircle className="w-16 h-16 mx-auto mb-4" />
          <h1 className="text-3xl font-bold mb-2">Order Confirmed</h1>
          <p className="text-lg">Thank you for your order!</p>
        </div>

        <div className="p-6">
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">Order Details</h2>
            <p className="text-gray-600">Order ID: {order.order_id}</p>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">Item</h3>
            <ul className="space-y-4">
              {order.order_items.map((item) => (
                <li key={item.item_id} className="flex items-center justify-between border-b pb-2">
                  <div className="flex items-center">
                    <Package className="w-6 h-6 mr-2 text-gray-500" />
                    <span>Product ID: {item.product_id}</span>
                  </div>
                  <div className="text-right">
                    <p>Quantity: {item.quantity}</p>
                    <p className="font-semibold">₹{item.price.toFixed(2)}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-6 pt-4 border-t">
            <div className="flex justify-between items-center">
              <span className="text-lg font-semibold">Total:</span>
              <span className="text-2xl font-bold text-green-600">₹{order.total_price.toFixed(2)}</span>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 p-6 text-center">
          <p className="text-sm text-gray-600">
            If you have any questions about your order, please contact our customer support. For more information, please visit: <Link href="/my-orders" className="text-blue-300 hover:underline">My-Orders</Link>
          </p>
        </div>
      </div>
    </div>
  )
}

