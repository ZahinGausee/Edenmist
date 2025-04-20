"use client";
import { useState, useEffect } from "react";
import { useCustomSession } from "@/src/context/AuthContext";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/src/components/ui/table";
import { Button } from "@/src/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/src/components/ui/dialog";
import { formatIndianCurrency } from "@/src/lib/formatter";
import LoadingOverlay from "../_components/LoadingOverlay";

export default function OrdersTable() {
  const session = useCustomSession();
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!session?.user) {
      setLoading(false); // Stop loading if no session
      return;
    }

    fetch("/api/userOrders")
      .then((res) => res.json())
      .then((data) => {
        const sortedOrders = data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
        setOrders(sortedOrders);
      })
      .catch((err) => console.error("Failed to fetch orders:", err))
      .finally(() => setLoading(false));
  }, [session]);

  const openDialog = (order) => {
    setSelectedOrder(order);
    setDialogOpen(true);
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-[50vh] px-6 text-center text-gray-500">
        <LoadingOverlay>Loading your orders...</LoadingOverlay>
      </div>
    );
  }

  if (!session?.user) {
    return (
      <div className="flex flex-col items-center justify-center h-[50vh] px-6 text-center text-gray-600">
        Please login to view your orders.
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-4xl p-6">
      <div className="bg-white shadow-lg rounded-xl overflow-hidden">
        <div className="border-b border-gray-200 p-5 text-lg font-semibold text-gray-800">
          📦 My Orders
        </div>
        <Table className="w-full">
          <TableHeader className="bg-gray-50">
            <TableRow>
              <TableHead className="text-left text-gray-600">Order</TableHead>
              <TableHead className="text-left text-gray-600">Date</TableHead>
              <TableHead className="text-left text-gray-600">Status</TableHead>
              <TableHead className="text-right text-gray-600">Total</TableHead>
              <TableHead className="text-right text-gray-600">More Info</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.length > 0 ? (
              orders.map((order) => (
                <TableRow key={order.order_id} className="hover:bg-gray-100 transition-all duration-200">
                  <TableCell className="py-4">
                    {order.order_items.map((item) => item.products.name).join(", ")}
                  </TableCell>
                  <TableCell className="py-4">
                    {new Date(order.created_at).toLocaleDateString()}
                  </TableCell>
                  <TableCell className="py-4">
                    <span
                      className={`px-3 py-1 text-sm font-medium rounded-full shadow-sm ${
                        order.status === "completed"
                          ? "bg-green-300 text-green-900 border border-green-300"
                          : order.status === "pending"
                          ? "bg-yellow-100 text-yellow-800 border border-yellow-300"
                          : order.status === "cancelled"
                          ? "bg-red-100 text-red-800 border border-red-300"
                          : order.status === "approved"
                          ? "bg-teal-200 text-teal-800 border border-teal-300"
                          : "bg-gray-100 text-gray-700 border border-gray-300"
                      }`}
                    >
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </span>
                  </TableCell>
                  <TableCell className="text-right py-4">
                    {formatIndianCurrency(order.total_price)}
                  </TableCell>
                  <TableCell className="text-right py-4">
                    <Button
                      size="sm"
                      variant="outline"
                      className="hover:bg-blue-500 hover:text-white transition-all duration-200"
                      onClick={() => openDialog(order)}
                    >
                      View
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-6 text-gray-500">
                  No orders placed yet. Start shopping to see your orders here!
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="mt-4 text-sm text-gray-600 text-center">
        Need help? Email us at{" "}
        <a href="mailto:edenmist01@gmail.com" className="text-blue-500 font-medium">
          edenmist01@gmail.com
        </a>{" "}
        with your order ID.
      </div>

      {/* Order Details Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Order Details</DialogTitle>
          </DialogHeader>
          {selectedOrder && (
            <div className="text-gray-700">
              <p><strong>Order ID:</strong> {selectedOrder.order_id}</p>
              <p><strong>Total Price: </strong>{formatIndianCurrency(selectedOrder.total_price)}</p>
              <p><strong>Status:</strong>{" "}
                <span
                  className={`px-2 py-1 rounded-lg text-sm font-medium ${
                    selectedOrder.status === "completed"
                      ? "bg-green-300 text-green-900 border border-green-300"
                      : selectedOrder.status === "pending"
                      ? "bg-yellow-100 text-yellow-800 border border-yellow-300"
                      : selectedOrder.status === "cancelled"
                      ? "bg-red-100 text-red-800 border border-red-300"
                      : selectedOrder.status === "approved"
                      ? "bg-teal-200 text-teal-800 border border-teal-300"
                      : "bg-gray-100 text-gray-700 border border-gray-300"
                  }`}
                >
                  {selectedOrder.status.charAt(0).toUpperCase() + selectedOrder.status.slice(1)}
                </span>
              </p>
              <p><strong>Order Date:</strong> {new Date(selectedOrder.created_at).toLocaleString()}</p>
              <h4 className="mt-4 font-semibold">Items:</h4>
              <ul className="list-disc ml-6 text-gray-600">
                {selectedOrder.order_items.map((item) => (
                  <li key={item.item_id}>
                    {item.products.name} - {item.quantity} x {formatIndianCurrency(item.price)}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
