"use client"

import type React from "react"

import { Home, ClipboardList, Calendar, User } from "lucide-react"
import DashboardLayout from "@/components/dashboard-layout"
import { DashboardProvider } from "@/contexts/dashboard-context"
import type { MenuItem } from "@/components/dashboard-layout"

const studentMenuItems: MenuItem[] = [
  { icon: Home, label: "Inicio", href: "/student/dashboard" },
  { icon: ClipboardList, label: "Notas", href: "/student/dashboard/grades" },
  { icon: Calendar, label: "Horario", href: "/student/dashboard/schedule" },
  { icon: User, label: "Perfil", href: "/student/dashboard/profile" },
]

export default function StudentDashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const studentUser = {
    name: "Juan Pérez",
    role: "Estudiante",
    email: "juan.perez@example.com",
  }

  return (
    <DashboardProvider initialUser={studentUser} initialNotifications={2}>
      <DashboardLayout title="Dashboard Estudiante" menuItems={studentMenuItems}>
        {children}
      </DashboardLayout>
    </DashboardProvider>
  )
}

