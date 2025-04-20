import { Suspense } from "react";
import OrdersTable from "../_components/OrdersTable";
import { getOrders } from "../_actions/orders";

export const dynamic = "force-dynamic";

export default async function AdminSalesPage({ searchParams }) {
  const page = Number(searchParams.page) || 1;
  const perPage = Number(searchParams.perPage) || 10; // Ensure `perPage` is properly read

  try {
    const { orders, totalPages, currentPage } = await getOrders(page, perPage); // Pass `perPage`
    if (orders.length === 0) {
      return (
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-6">Admin Sales Dashboard</h1>
          <div className="text-red-500">No orders found.</div>
        </div>
      );
    }
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Admin Sales Dashboard</h1>
        <OrdersTable
          initialOrders={orders}
          totalPages={totalPages}
          currentPage={currentPage}
          perPage={perPage} // Pass `perPage` correctly
        />
      </div>
    );
  } catch (error) {
    console.error("Error fetching orders for admin sales page:", error);
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Admin Sales Dashboard</h1>
        <div className="text-red-500">An error occurred while fetching the data.</div>
      </div>
    );
  }
}
