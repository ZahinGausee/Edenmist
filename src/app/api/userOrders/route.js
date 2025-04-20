import prisma from "@/src/db/db";
import { authOptions } from "@/src/lib/auth";
import { getServerSession } from "next-auth"; // Ensure next-auth is configured correctly

export async function GET(req) {
  const session = await getServerSession(authOptions);

  // Check if the user is authenticated
  if (!session || !session.user) {
    return new Response(JSON.stringify({ message: "Unauthorized" }), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    });
  }
  const userEmail = session.user.email
  try {
    // Fetch user orders based on email
    const user = await prisma.user.findUnique({
        where: { email: userEmail },
      });

      if (!user) {
        return res.status(404).json({ message: "User not found." });
      }

      // Use the user_id to fetch user-specific orders
      const orders = await prisma.orders.findMany({
        where: { user_id: user.id },
        include: {
          order_items: {
            include: {
              products: true,
            },
          },
        },
      });


    // Return the user data
    return new Response(JSON.stringify(orders), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error fetching orders:", error);

    // Handle internal server error
    return new Response(JSON.stringify({ message: "Failed to fetch orders." }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
