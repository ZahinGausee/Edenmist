import prisma from "@/src/db/db";
import { authOptions } from "@/src/lib/auth";
import { getServerSession } from "next-auth"; //Adjust path based on your auth setup

export async function POST(req) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return new Response(JSON.stringify({ message: "Unauthorized" }), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    });
  }
  const userEmail = session.user.email;

  try {
    const addressData = await req.json();
    const user = await prisma.user.findUnique({
      where: { email: userEmail },
    });
    if (!user) {
      return new Response(JSON.stringify({ message: "User not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    const updatedUser = await prisma.user.update({
      where: { email: userEmail },
      data: {
        streetAddress: addressData.data.streetAddress,
        city: addressData.data.city,
        state: addressData.data.state,
        pinCode: addressData.data.pinCode,
        mobile: addressData.data.mobile,
      },
    });
    return new Response(JSON.stringify(updatedUser), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error updating address:", error);
    return new Response(JSON.stringify({ message: "Internal Server Error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
