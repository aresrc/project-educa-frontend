"use client"

import { useDashboard } from "@/contexts/dashboard-context"

export default function AdminDashboardPage() {
  const { user } = useDashboard()

  const stats = [
    { label: "Total Estudiantes", value: 1250 },
    { label: "Total Profesores", value: 45 },
    { label: "Cursos Activos", value: 32 },
    { label: "Sedes", value: 5 },
  ]

  const recentActivities = [
    { action: "Nuevo estudiante registrado", date: "2024-03-01", user: "Juan Pérez" },
    { action: "Actualización de horario", date: "2024-02-28", user: "María Rodríguez" },
    { action: "Nuevo profesor contratado", date: "2024-02-27", user: "Carlos Gómez" },
    { action: "Cambio de sede", date: "2024-02-26", user: "Ana López" },
  ]

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b border-gray-200">
          <h1 className="text-2xl font-semibold text-gray-800">Panel de Administración</h1>
        </div>
        <div className="p-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <h2 className="text-sm font-medium text-gray-500">Nombre</h2>
                <p className="mt-1 text-lg text-gray-800">{user?.name}</p>
              </div>
              <div>
                <h2 className="text-sm font-medium text-gray-500">Rol</h2>
                <p className="mt-1 text-lg text-gray-800">{user?.role}</p>
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <h2 className="text-sm font-medium text-gray-500">Último Acceso</h2>
                <p className="mt-1 text-lg text-gray-800">{user?.lastLogin}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-lg shadow p-6">
            <h2 className="text-sm font-medium text-gray-500">{stat.label}</h2>
            <p className="mt-2 text-3xl font-bold text-gray-800">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800">Actividad Reciente</h2>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {recentActivities.map((activity, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium">{activity.action}</p>
                  <p className="text-sm text-gray-500">Usuario: {activity.user}</p>
                </div>
                <p className="text-sm text-gray-600">{activity.date}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

