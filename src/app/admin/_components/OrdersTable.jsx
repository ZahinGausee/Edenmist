"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { updateOrderStatus } from "../_actions/orders";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableHeader,
} from "@/src/components/ui/table"; // ShadCN Table
import { Button } from "@/src/components/ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/src/components/ui/dialog"; // ShadCN Dialog
import { formatIndianCurrency } from "@/src/lib/formatter";

export default function OrdersTable({
  initialOrders,
  totalPages,
  currentPage,
  perPage,
}) {
  const router = useRouter();
  const [ordersPerPage, setOrdersPerPage] = useState(perPage);

  const handleStatusUpdate = async (orderId, newStatus) => {
    await updateOrderStatus(orderId, newStatus);
    router.refresh();
  };

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      router.push(`/admin/sales?page=${newPage}&perPage=${ordersPerPage}`);
    }
  };

  const handlePerPageChange = (event) => {
    const newPerPage = Number(event.target.value);
    setOrdersPerPage(newPerPage);
    router.push(`/admin/sales?page=1&perPage=${newPerPage}`);
  };

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
    <div>
      <div className="flex justify-between mb-4">
        <div>
          <label htmlFor="perPage" className="mr-2">
            Orders per page:
          </label>
          <select
            id="perPage"
            value={ordersPerPage}
            onChange={handlePerPageChange}
            className="border rounded px-2 py-1"
          >
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
            <option value={250}>250</option>
          </select>
        </div>
        <div>
          <span>
            Page {currentPage} of {totalPages}
          </span>
        </div>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Order ID</TableHead>
            <TableHead>user</TableHead>
            <TableHead>Mobile</TableHead>
            <TableHead>Total Price</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>More Details</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {initialOrders.map((order) => (
            <TableRow key={order.order_id}>
              <TableCell>{order.order_id}</TableCell>
              <TableCell>
                {order.user.name} ({order.user.email})
              </TableCell>
              <TableCell>{order.user.mobile || "N/A"}</TableCell>
              <TableCell>{formatIndianCurrency(order.total_price)}</TableCell>
              <TableCell>
                <select
                  value={order.status}
                  onChange={(e) =>
                    handleStatusUpdate(order.order_id, e.target.value)
                  }
                  className={`border rounded px-2 py-1 ${getStatusColor(
                    order.status
                  )}`}
                >
                  <option value="pending">Pending 🟡</option>
                  <option value="completed">Completed ✅</option>
                  <option value="cancelled">Cancelled ❌</option>
                  <option value="shipped">Shipped 🟣</option>
                  <option value="approved">Approved 🟢</option> {/* Added approved */}
                </select>
              </TableCell>
              <TableCell>{new Date(order.created_at).toLocaleDateString()}</TableCell>
              <TableCell>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline">View</Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogTitle>Order Details</DialogTitle>
                    <DialogDescription>
                      <p>
                        <strong>Name:</strong> {order.user.name}
                      </p>
                      <p>
                        <strong>Email:</strong> {order.user.email}
                      </p>
                      <p>
                        <strong>Mobile:</strong> {order.user.mobile || "N/A"}
                      </p>
                      <p>
                        <strong>Street Address:</strong>{" "}
                        {order.user.streetAddress || "N/A"}
                      </p>
                      <p>
                        <strong>City:</strong> {order.user.city || "N/A"}
                      </p>
                      <p>
                        <strong>State:</strong> {order.user.state || "N/A"}
                      </p>
                      <p>
                        <strong>Pincode:</strong> {order.user.pinCode || "N/A"}
                      </p>
                      <p>
                        <strong>Invoice:</strong> #{order.order_id}
                      </p>
                      <p>
                        <strong>Total Price:</strong>{" "}
                        {formatIndianCurrency(order.total_price)}
                      </p>
                      <p>
                        <strong>Status:</strong> {order.status}
                      </p>
                    </DialogDescription>
                  </DialogContent>
                </Dialog>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <div className="mt-4 flex justify-between">
        <Button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </Button>
        <Button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </Button>
      </div>
    </div>
  );
}

