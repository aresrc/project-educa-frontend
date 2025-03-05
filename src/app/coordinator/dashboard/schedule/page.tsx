"use client"

import { useState } from "react"
import { Search, Filter, Plus } from "lucide-react"

interface ScheduleItem {
  id: number
  section: string
  course: string
  teacher: string
  day: string
  startTime: string
  endTime: string
  room: string
}

export default function CoordinatorSchedulePage() {
  const [searchTerm, setSearchTerm] = useState("")

  // Datos de ejemplo - en una aplicación real, estos vendrían de una API
  const [schedules, setSchedules] = useState<ScheduleItem[]>([
    {
      id: 1,
      section: "Matemáticas A",
      course: "Álgebra",
      teacher: "Carlos Gómez",
      day: "Lunes",
      startTime: "8:00",
      endTime: "10:00",
      room: "Aula 101",
    },
    {
      id: 2,
      section: "Matemáticas A",
      course: "Álgebra",
      teacher: "Carlos Gómez",
      day: "Miércoles",
      startTime: "8:00",
      endTime: "10:00",
      room: "Aula 101",
    },
    {
      id: 3,
      section: "Física B",
      course: "Física General",
      teacher: "María López",
      day: "Martes",
      startTime: "10:00",
      endTime: "12:00",
      room: "Laboratorio 3",
    },
    {
      id: 4,
      section: "Física B",
      course: "Física General",
      teacher: "María López",
      day: "Jueves",
      startTime: "10:00",
      endTime: "12:00",
      room: "Laboratorio 3",
    },
    {
      id: 5,
      section: "Química A",
      course: "Química General",
      teacher: "Pedro Martínez",
      day: "Lunes",
      startTime: "14:00",
      endTime: "16:00",
      room: "Laboratorio 2",
    },
    {
      id: 6,
      section: "Química A",
      course: "Química General",
      teacher: "Pedro Martínez",
      day: "Viernes",
      startTime: "14:00",
      endTime: "16:00",
      room: "Laboratorio 2",
    },
  ])

  // Filtramos los horarios según el término de búsqueda
  const filteredSchedules = schedules.filter(
    (schedule) =>
      schedule.section.toLowerCase().includes(searchTerm.toLowerCase()) ||
      schedule.course.toLowerCase().includes(searchTerm.toLowerCase()) ||
      schedule.teacher.toLowerCase().includes(searchTerm.toLowerCase()) ||
      schedule.day.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-800">Asignación de Horarios</h1>
        <button className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
          <Plus className="h-4 w-4" />
          <span>Nuevo Horario</span>
        </button>
      </div>
      <div className="p-6">
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar por sección, curso, profesor o día..."
              className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
            <Filter className="h-4 w-4" />
            <span>Filtrar</span>
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Sección
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Curso
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Profesor
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Día
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Hora Inicio
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Hora Fin
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Aula
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredSchedules.map((schedule) => (
                <tr key={schedule.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{schedule.section}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{schedule.course}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{schedule.teacher}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{schedule.day}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{schedule.startTime}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{schedule.endTime}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{schedule.room}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button className="text-blue-600 hover:text-blue-900 mr-3">Editar</button>
                    <button className="text-red-600 hover:text-red-900">Eliminar</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

