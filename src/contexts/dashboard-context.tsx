"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

export interface UserProfile {
  name: string
  role: string
  email: string
  lastLogin?: string
}

interface DashboardContextType {
  user: UserProfile | null
  notifications: number
  setUser: (user: UserProfile | null) => void
  setNotifications: (count: number) => void
}

const DashboardContext = createContext<DashboardContextType | undefined>(undefined)

export function DashboardProvider({
  children,
  initialUser = null,
  initialNotifications = 0,
}: {
  children: ReactNode
  initialUser?: UserProfile | null
  initialNotifications?: number
}) {
  const [user, setUser] = useState<UserProfile | null>(initialUser)
  const [notifications, setNotifications] = useState(initialNotifications)

  return (
    <DashboardContext.Provider
      value={{
        user,
        notifications,
        setUser,
        setNotifications,
      }}
    >
      {children}
    </DashboardContext.Provider>
  )
}

export function useDashboard() {
  const context = useContext(DashboardContext)
  if (context === undefined) {
    throw new Error("useDashboard must be used within a DashboardProvider")
  }
  return context
}

