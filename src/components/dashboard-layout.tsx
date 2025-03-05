"use client"

import type React from "react"

import { useState, useEffect, type ReactNode } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Menu, X, LogOut, Bell } from "lucide-react"
import { useDashboard } from "@/contexts/dashboard-context"

export interface MenuItem {
  icon: React.ElementType
  label: string
  href: string
}

interface DashboardLayoutProps {
  children: ReactNode
  title: string
  menuItems: MenuItem[]
  onLogout?: () => void
}

export default function DashboardLayout({ children, title, menuItems, onLogout }: DashboardLayoutProps) {
  const [isSidebarOpenMobile, setSidebarOpenMobile] = useState(false)
  const [isSidebarOpenDesktop, setSidebarOpenDesktop] = useState(true)
  const [isSmallScreen, setIsSmallScreen] = useState(false)
  const router = useRouter()
  const { user, notifications } = useDashboard()

  useEffect(() => {
    const checkScreenSize = () => {
      setIsSmallScreen(window.innerWidth < 1024)
      setSidebarOpenDesktop(window.innerWidth >= 1024)
    }

    checkScreenSize()
    window.addEventListener("resize", checkScreenSize)
    return () => window.removeEventListener("resize", checkScreenSize)
  }, [])

  const toggleSidebar = () => {
    if (isSmallScreen) {
      setSidebarOpenMobile(!isSidebarOpenMobile)
    } else {
      setSidebarOpenDesktop(!isSidebarOpenDesktop)
    }
  }

  const handleLogout = () => {
    console.log("Cerrando sesión...")
    if (onLogout) {
      onLogout()
    }
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
          <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
          <button onClick={toggleSidebar} className="p-2 rounded-lg hover:bg-gray-100 lg:hidden">
            <X className="h-5 w-5" />
          </button>
        </div>

        {user && (
          <div className="p-4 border-b">
            <div className="text-sm font-medium text-gray-900">{user.name}</div>
            <div className="text-xs text-gray-500">{user.role}</div>
          </div>
        )}

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
            onClick={handleLogout}
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

          <div className="flex items-center gap-4">
            {notifications > 0 && (
              <div className="relative">
                <Bell className="h-6 w-6 text-gray-600" />
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {notifications}
                </span>
              </div>
            )}
            {user && <div className="text-sm font-medium text-gray-700 hidden md:block">{user.name}</div>}
          </div>
        </div>
        {children}
      </div>
    </div>
  )
}

