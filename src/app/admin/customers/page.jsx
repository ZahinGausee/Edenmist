// Make sure you have a db client setup
import CustomersTable from "../_actions/customers";
import prisma from "@/src/db/db";

export default async function CustomersPage() {
  const customers = await prisma.user.findMany({
    orderBy: {
      createdAt: "desc",  // Sort users by their creation date in descending order (newest first)
    },
    include: {
      orders: {
        orderBy: {
          created_at: "desc",  // Sort orders by their creation date in descending order (newest first)
        },
        include: {
          order_items: {
            include: {
              products: true,  // Include related products for each order item
            },
          },
        },
      },
    },
  });
  

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Customers</h1>
      <CustomersTable customers={customers} />
    </div>
  );
}
