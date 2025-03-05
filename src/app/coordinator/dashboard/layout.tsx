"use client"

import type React from "react"

import { Home, ClipboardList, Users, Calendar, User } from "lucide-react"
import DashboardLayout from "@/components/dashboard-layout"
import { DashboardProvider } from "@/contexts/dashboard-context"
import type { MenuItem } from "@/components/dashboard-layout"

const coordinatorMenuItems: MenuItem[] = [
  { icon: Home, label: "Inicio", href: "/coordinator/dashboard" },
  { icon: ClipboardList, label: "Notas", href: "/coordinator/dashboard/grades" },
  { icon: Users, label: "Secciones", href: "/coordinator/dashboard/sections" },
  { icon: Calendar, label: "Horario", href: "/coordinator/dashboard/schedule" },
  { icon: User, label: "Perfil", href: "/coordinator/dashboard/profile" },
]

export default function CoordinatorDashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // En una aplicación real, estos datos vendrían de una API o de la sesión
  const coordinatorUser = {
    name: "Carlos Rodríguez",
    role: "Coordinador",
    email: "carlos.rodriguez@educatoon.com",
    lastLogin: "2024-03-05 09:15",
  }

  return (
    <DashboardProvider initialUser={coordinatorUser} initialNotifications={1}>
      <DashboardLayout title="Panel del Coordinador" menuItems={coordinatorMenuItems}>
        {children}
      </DashboardLayout>
    </DashboardProvider>
  )
}

