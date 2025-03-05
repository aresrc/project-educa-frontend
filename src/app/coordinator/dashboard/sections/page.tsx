"use client"

import { useState } from "react"
import { Search, Filter, Plus, Users } from "lucide-react"

interface Section {
  id: number
  name: string
  course: string
  teacher: string
  studentsCount: number
  schedule: string
  room: string
}

export default function CoordinatorSectionsPage() {
  const [searchTerm, setSearchTerm] = useState("")

  // Datos de ejemplo - en una aplicación real, estos vendrían de una API
  const [sections, setSections] = useState<Section[]>([
    {
      id: 1,
      name: "Matemáticas A",
      course: "Álgebra",
      teacher: "Carlos Gómez",
      studentsCount: 35,
      schedule: "Lunes y Miércoles 8:00 - 10:00",
      room: "Aula 101",
    },
    {
      id: 2,
      name: "Física B",
      course: "Física General",
      teacher: "María López",
      studentsCount: 28,
      schedule: "Martes y Jueves 10:00 - 12:00",
      room: "Laboratorio 3",
    },
    {
      id: 3,
      name: "Química A",
      course: "Química General",
      teacher: "Pedro Martínez",
      studentsCount: 32,
      schedule: "Lunes y Viernes 14:00 - 16:00",
      room: "Laboratorio 2",
    },
    {
      id: 4,
      name: "Historia C",
      course: "Historia del Perú",
      teacher: "Ana Rodríguez",
      studentsCount: 30,
      schedule: "Miércoles y Viernes 8:00 - 10:00",
      room: "Aula 205",
    },
    {
      id: 5,
      name: "Lenguaje B",
      course: "Comunicación",
      teacher: "José Sánchez",
      studentsCount: 33,
      schedule: "Martes y Jueves 14:00 - 16:00",
      room: "Aula 103",
    },
  ])

  // Filtramos las secciones según el término de búsqueda
  const filteredSections = sections.filter(
    (section) =>
      section.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      section.course.toLowerCase().includes(searchTerm.toLowerCase()) ||
      section.teacher.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-800">Gestión de Secciones</h1>
        <button className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
          <Plus className="h-4 w-4" />
          <span>Nueva Sección</span>
        </button>
      </div>
      <div className="p-6">
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar por sección, curso o profesor..."
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
                  Estudiantes
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Horario
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
              {filteredSections.map((section) => (
                <tr key={section.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{section.name}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{section.course}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{section.teacher}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{section.studentsCount}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{section.schedule}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{section.room}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button className="text-blue-600 hover:text-blue-900 mr-3">Editar</button>
                    <button className="text-green-600 hover:text-green-900 mr-3">
                      <Users className="h-4 w-4 inline mr-1" />
                      Asignar
                    </button>
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

