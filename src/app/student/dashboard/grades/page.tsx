"use client"

import { useState } from "react"

interface Grade {
  id: number
  score: number
  cycle: string
  date: string
}

export default function GradesPage() {
  const [grades] = useState<Grade[]>([
    { id: 1, score: 85, cycle: "2024-I", date: "2024-03-15" },
    { id: 2, score: 92, cycle: "2024-I", date: "2024-04-02" },
    { id: 3, score: 78, cycle: "2024-I", date: "2024-04-20" },
    { id: 4, score: 88, cycle: "2024-II", date: "2024-05-10" },
    { id: 5, score: 95, cycle: "2024-II", date: "2024-05-28" },
  ])

  const handleReview = (id: number) => {
    console.log(`Revisando nota con ID: ${id}`)
    // Aquí iría la lógica para revisar la nota
  }

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="px-6 py-4 border-b border-gray-200">
        <h1 className="text-2xl font-semibold text-gray-800">Notas</h1>
      </div>
      <div className="p-6">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Puntaje
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Ciclo
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Fecha
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Acción
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {grades.map((grade) => (
                <tr key={grade.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{grade.score}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{grade.cycle}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{grade.date}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button onClick={() => handleReview(grade.id)} className="text-green-600 hover:text-green-900">
                      Revisar
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
  
  