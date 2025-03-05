"use client"

import { useDashboard } from "@/contexts/dashboard-context"

export default function CoordinatorDashboardPage() {
  const { user } = useDashboard()

  const stats = [
    { label: "Estudiantes Asignados", value: 450 },
    { label: "Secciones", value: 15 },
    { label: "Profesores", value: 18 },
    { label: "Evaluaciones Pendientes", value: 8 },
  ]

  const recentActivities = [
    { action: "Asignación de sección", date: "2024-03-05", student: "Juan Pérez", section: "Ciencias A" },
    { action: "Registro de notas", date: "2024-03-04", student: "María Rodríguez", course: "Física" },
    { action: "Cambio de horario", date: "2024-03-03", section: "Literatura B", teacher: "Ana López" },
    { action: "Asignación de profesor", date: "2024-03-02", teacher: "Pedro Gómez", section: "Matemáticas C" },
  ]

  const pendingApprovals = [
    { type: "Cambio de Sección", student: "Luis Torres", fromSection: "Física A", toSection: "Física B" },
    { type: "Examen Sustitutorio", student: "Carmen Díaz", course: "Química" },
    { type: "Cambio de Horario", section: "Historia A", fromTime: "Lunes 8:00", toTime: "Miércoles 10:00" },
  ]

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b border-gray-200">
          <h1 className="text-2xl font-semibold text-gray-800">Panel del Coordinador</h1>
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
                <h2 className="text-sm font-medium text-gray-500">Correo Electrónico</h2>
                <p className="mt-1 text-lg text-gray-800">{user?.email}</p>
              </div>
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

      <div className="grid md:grid-cols-2 gap-6">
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
                    <p className="text-sm text-gray-500">
                      {activity.student && `Estudiante: ${activity.student}`}
                      {activity.teacher && `Profesor: ${activity.teacher}`}
                      {activity.section && ` | Sección: ${activity.section}`}
                      {activity.course && ` | Curso: ${activity.course}`}
                    </p>
                  </div>
                  <p className="text-sm text-gray-600">{activity.date}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-800">Aprobaciones Pendientes</h2>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {pendingApprovals.map((approval, index) => (
                <div key={index} className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <p className="font-medium">{approval.type}</p>
                    <div className="flex space-x-2">
                      <button className="px-3 py-1 bg-green-500 text-white text-xs rounded hover:bg-green-600">
                        Aprobar
                      </button>
                      <button className="px-3 py-1 bg-red-500 text-white text-xs rounded hover:bg-red-600">
                        Rechazar
                      </button>
                    </div>
                  </div>
                  <p className="text-sm text-gray-500">
                    {approval.student && `Estudiante: ${approval.student}`}
                    {approval.fromSection && ` | De: ${approval.fromSection} a ${approval.toSection}`}
                    {approval.fromTime && ` | De: ${approval.fromTime} a ${approval.toTime}`}
                    {approval.course && ` | Curso: ${approval.course}`}
                    {approval.section && !approval.fromSection && ` | Sección: ${approval.section}`}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

