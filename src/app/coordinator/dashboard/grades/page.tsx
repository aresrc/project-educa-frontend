"use client"

import { useState } from "react"
import { Search, Filter } from "lucide-react"

interface CourseGrade {
  id: number
  course: string
  section: string
  teacher: string
  studentsCount: number
  evaluationsCount: number
  lastUpdate: string
}

export default function CoordinatorGradesPage() {
  const [searchTerm, setSearchTerm] = useState("")

  // Datos de ejemplo - en una aplicación real, estos vendrían de una API
  const [courses, setCourses] = useState<CourseGrade[]>([
    {
      id: 1,
      course: "Álgebra",
      section: "A",
      teacher: "Carlos Gómez",
      studentsCount: 35,
      evaluationsCount: 3,
      lastUpdate: "2024-03-01",
    },
    {
      id: 2,
      course: "Física",
      section: "B",
      teacher: "María López",
      studentsCount: 28,
      evaluationsCount: 2,
      lastUpdate: "2024-02-28",
    },
    {
      id: 3,
      course: "Química",
      section: "A",
      teacher: "Pedro Martínez",
      studentsCount: 32,
      evaluationsCount: 4,
      lastUpdate: "2024-03-02",
    },
    {
      id: 4,
      course: "Historia",
      section: "C",
      teacher: "Ana Rodríguez",
      studentsCount: 30,
      evaluationsCount: 2,
      lastUpdate: "2024-02-25",
    },
    {
      id: 5,
      course: "Lenguaje",
      section: "B",
      teacher: "José Sánchez",
      studentsCount: 33,
      evaluationsCount: 3,
      lastUpdate: "2024-03-03",
    },
  ])

  // Filtramos los cursos según el término de búsqueda
  const filteredCourses = courses.filter(
    (course) =>
      course.course.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.section.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.teacher.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="px-6 py-4 border-b border-gray-200">
        <h1 className="text-2xl font-semibold text-gray-800">Registro de Notas</h1>
      </div>
      <div className="p-6">
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar por curso, sección o profesor..."
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
                  Curso
                </th>
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
                  Evaluaciones
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Última Actualización
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Acción
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredCourses.map((course) => (
                <tr key={course.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{course.course}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{course.section}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{course.teacher}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{course.studentsCount}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{course.evaluationsCount}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{course.lastUpdate}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button className="text-green-600 hover:text-green-900 mr-3">Ver Notas</button>
                    <button className="text-blue-600 hover:text-blue-900">Registrar</button>
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

