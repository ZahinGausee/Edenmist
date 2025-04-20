
"use server"
import React from 'react'
import Navbar from './Navbar'
import { getServerSession } from 'next-auth'
import { authOptions } from '../lib/auth'

async function SessionWrapper() {
    const session = await getServerSession(authOptions);
  return (
    <></>
  )
}

export default SessionWrapper