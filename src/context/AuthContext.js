
"use client"
import React from 'react'
import { Session } from "next-auth";
import { createContext, useContext, useState } from "react"


const SessionContext = createContext(null);

export function SessionProvider({ children, initialSession }) {
  const [session, setSession] = useState(initialSession);
  
  return (
    <SessionContext.Provider value={session}>
        {children}
    </SessionContext.Provider>
  )
}

export function useCustomSession() {
  return useContext(SessionContext);
}
