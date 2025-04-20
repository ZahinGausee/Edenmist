import { AnimatedTestimonialsDemo } from '@/src/components/demo/AnimatedTestimonialsDemo'
import { AuroraBackgroundDemo } from '@/src/components/demo/AuroraBackgroundDemo'
import { ThreeDCardDemo } from '@/src/components/demo/ThreeDCardDemo'
import Shop from '@/src/app/(customerFacing)/_components/Shop'
import React from 'react'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/src/lib/auth'



const CustomerPage = async () => {
  const session = await getServerSession(authOptions);
  console.log(session)


  return (
    <>
    <AuroraBackgroundDemo/>
    <ThreeDCardDemo/>
    <Shop/>
    <AnimatedTestimonialsDemo/>
    </>
  )
}

export default CustomerPage