"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Home, ClipboardList, Calendar, User, Menu, X, LogOut } from "lucide-react"
import {logout} from "@/services/auth"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [isSidebarOpenMobile, setSidebarOpenMobile] = useState(false)
  const [isSidebarOpenDesktop, setSidebarOpenDesktop] = useState(true)
  const [isSmallScreen, setIsSmallScreen] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const checkScreenSize = () => {
      setIsSmallScreen(window.innerWidth < 1024)
      setSidebarOpenDesktop(window.innerWidth >= 1024)
    }

    checkScreenSize()
    window.addEventListener("resize", checkScreenSize)
    return () => window.removeEventListener("resize", checkScreenSize)
  }, [])

  const menuItems = [
    { icon: Home, label: "Inicio", href: "/student/dashboard" },
    { icon: ClipboardList, label: "Notas", href: "/student/dashboard/grades" },
    { icon: Calendar, label: "Horario", href: "/student/dashboard/schedule" },
    { icon: User, label: "Perfil", href: "/student/dashboard/profile" },
  ]

  const toggleSidebar = () => {
    if (isSmallScreen) {
      setSidebarOpenMobile(!isSidebarOpenMobile)
    } else {
      setSidebarOpenDesktop(!isSidebarOpenDesktop)
    }
  }

  const handleLogout = () => {
    // Aquí iría la lógica para cerrar la sesión
    console.log("Cerrando sesión...")
    // Redirigir al usuario a la página de inicio de sesión
    router.push("/login")
  }

  const isSidebarOpen = isSmallScreen ? isSidebarOpenMobile : isSidebarOpenDesktop

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-40 h-screen transition-transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } bg-white border-r border-gray-200 w-64 lg:translate-x-0 flex flex-col`}
      >
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-xl font-semibold text-gray-800">Dashboard</h2>
          <button onClick={toggleSidebar} className="p-2 rounded-lg hover:bg-gray-100 lg:hidden">
            <X className="h-5 w-5" />
          </button>
        </div>
        <nav className="flex-grow p-4 space-y-2">
          {menuItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100 text-gray-700 hover:text-gray-900"
            >
              <item.icon className="h-5 w-5" />
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>
        <div className="p-4 border-t">
          <button
            onClick={logout}
            className="flex items-center gap-3 p-3 w-full rounded-lg hover:bg-red-100 text-red-600 hover:text-red-700"
          >
            <LogOut className="h-5 w-5" />
            <span>Cerrar Sesión</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className={`p-4 ${isSidebarOpenDesktop ? "lg:ml-64" : ""}`}>
        <div className="mb-4 flex items-center justify-between">
          <button onClick={toggleSidebar} className="p-2 rounded-lg hover:bg-gray-100 lg:hidden">
            <Menu className="h-6 w-6" />
          </button>
        </div>
        {children}
      </div>
    </div>
  )
}

