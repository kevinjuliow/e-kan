"use client"

import { Session } from "next-auth";
import { SessionProvider } from "next-auth/react"

interface Props  {
  children?: React.ReactNode
  session?: Session | undefined | null;
}

export const Provider = ({ children, session }: Props) => {
  return <SessionProvider session={session}>{children}</SessionProvider>
}
