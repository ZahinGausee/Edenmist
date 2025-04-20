"use client";

import { useState } from "react";
import { Dialog, DialogTrigger, DialogContent } from "@/src/components/ui/dialog";
import { Button } from "@/src/components/ui/button";
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from "@/components/ui/collapsible";
import { ChevronDown, ChevronUp } from "lucide-react";
import { formatIndianCurrency } from "@/src/lib/formatter";

export default function CustomersTable({ customers }) {
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [openOrder, setOpenOrder] = useState(null); // Track which order is open
  const getStatusColor = (status) => {
    switch (status) {
      case "completed":
        return "bg-green-500 text-white"; // Green for completed
      case "pending":
        return "bg-yellow-500 text-white"; // Yellow for pending
      case "cancelled":
        return "bg-red-500 text-white"; // Red for cancelled
      case "shipped":
        return "bg-purple-200 text-gray-800"; // Light purple for shipped
      case "approved":
        return "bg-teal-400 text-white"; // Turquoise for approved
      default:
        return "bg-purple-200 text-gray-800"; // Light purple & grey for other statuses
    }
  };
  return (
    <div className="border rounded-lg shadow-md overflow-hidden bg-white">
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-100 border-b">
            <th className="p-4 text-left">Name</th>
            <th className="p-4 text-left">Email</th>
            <th className="p-4 text-left">Mobile</th>
            <th className="p-4 text-left">Orders</th>
            <th className="p-4 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((customer) => (
            <tr key={customer.id} className="border-b hover:bg-gray-50">
              <td className="p-4">{customer.name || "N/A"}</td>
              <td className="p-4">{customer.email || "N/A"}</td>
              <td className="p-4">{customer.mobile || "N/A"}</td>
              <td className="p-4">{customer.orders.length}</td>
              <td className="p-4">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      variant="outline"
                      onClick={() => setSelectedCustomer(customer)}
                      className="px-4 py-2 text-sm"
                    >
                      View Details
                    </Button>
                  </DialogTrigger>
                  {selectedCustomer && (
                    <DialogContent className="max-h-[80vh] overflow-y-auto p-6 bg-white rounded-lg shadow-lg">
                      <h2 className="text-2xl font-bold mb-4">{selectedCustomer.name}'s Details</h2>
                      <div className="space-y-2">
                        <p><strong>Email:</strong> {selectedCustomer.email}</p>
                        <p><strong>Mobile:</strong> {selectedCustomer.mobile || <span className="mt-3 text-gray-600">Not given yet</span>}</p>
                        <p>
                          <strong>Address:</strong> {selectedCustomer.streetAddress ? (`${selectedCustomer.streetAddress}, ${selectedCustomer.city}, ${selectedCustomer.state} - ${selectedCustomer.pinCode}`) : (<span className="mt-3 text-gray-600">Not availeble</span>)}
                        </p>
                      </div>

                      <h3 className="mt-6 text-xl font-semibold">Orders:</h3>
                      {selectedCustomer.orders.length > 0 ? (
                        selectedCustomer.orders.map((order) => (
                          <Collapsible
                            key={order.order_id}
                            className={`border rounded-lg p-4 my-3 ${getStatusColor(order.status)} shadow-sm transition-all duration-300`}
                            open={openOrder === order.order_id}
                            onOpenChange={() => setOpenOrder(openOrder === order.order_id ? null : order.order_id)}
                          >
                            <CollapsibleTrigger className="flex justify-between items-center w-full text-left font-semibold text-gray-800">
                              <span>
                                Order ID: {order.order_id} - {formatIndianCurrency(order.total_price)}
                              </span>
                              {openOrder === order.order_id ? (
                                <ChevronUp className="transition-transform duration-300" />
                              ) : (
                                <ChevronDown className="transition-transform duration-300" />
                              )}
                            </CollapsibleTrigger>
                            <CollapsibleContent className="mt-2 transition-all duration-300">
                              <p><strong>Status:</strong> {order.status}</p>
                              <p><strong>Order Date:</strong> {new Date(order.created_at).toLocaleDateString()}</p>

                              <h4 className="mt-3 font-semibold">Order Items:</h4>
                              <div className="grid gap-2 mt-2">
                                {order.order_items.map((item) => (
                                  <div key={item.item_id} className="border p-3 rounded-md bg-white text-black shadow-sm">
                                    <p><strong>Product:</strong> {item.products.name}</p>
                                    <p><strong>Quantity:</strong> {item.quantity}</p>
                                    <p><strong>Price:</strong> {formatIndianCurrency(item.price)}</p>
                                  </div>
                                ))}
                              </div>
                            </CollapsibleContent>
                          </Collapsible>
                        ))
                      ) : (
                        <p className="mt-3 text-gray-600">No orders found.</p>
                      )}
                    </DialogContent>
                  )}
                </Dialog>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
