import { getServerSession } from "next-auth/next";
import { authOptions } from "@/src/app/api/auth/[...nextauth]/route";

export default async function ProtectedPage() {
  const session = await getServerSession(authOptions);

  if (session) {
    return <div>You must be logged in to view this page.</div>;
  }

  return <div>Welcome, {session.user}!</div>;
}
