"use client"

import type React from "react"

import { Home, Users, User } from "lucide-react"
import DashboardLayout from "@/components/dashboard-layout"
import { DashboardProvider } from "@/contexts/dashboard-context"
import type { MenuItem } from "@/components/dashboard-layout"

const adminMenuItems: MenuItem[] = [
  { icon: Home, label: "Inicio", href: "/admin/dashboard" },
  { icon: Users, label: "Usuarios", href: "/admin/dashboard/users" },
  { icon: User, label: "Perfil", href: "/admin/dashboard/profile" },
]

export default function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // En una aplicación real, estos datos vendrían de una API o de la sesión
  const adminUser = {
    name: "Admin Principal",
    role: "Administrador",
    email: "admin@educatoon.com",
    lastLogin: "2024-03-01 08:30",
  }

  return (
    <DashboardProvider initialUser={adminUser} initialNotifications={3}>
      <DashboardLayout title="Admin Dashboard" menuItems={adminMenuItems}>
        {children}
      </DashboardLayout>
    </DashboardProvider>
  )
}

