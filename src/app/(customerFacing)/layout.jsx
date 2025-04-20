import Navbar from "@/src/components/Navbar"
import { Footer } from "@/src/components/ui/footer"
import Footer2 from "./_components/Footer"
import { SessionProvider } from "@/src/context/AuthContext"
import { Toaster } from "./_components/toaster"
import { getServerSession } from "next-auth"
import { authOptions } from "@/src/lib/auth"

export const dynamic = "force-dynamic"

export default async function CustomerLayout({ children }) {
  const session = await getServerSession(authOptions);
  
  return (
    <SessionProvider initialSession={session}>
      <Navbar/>
      <div className="container sm:max-w-full md:max-w-full">{children}</div>
      <Toaster/>
      <Footer2/>
    </SessionProvider>
  )
}