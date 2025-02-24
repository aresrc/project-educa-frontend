"use client"

import { useEffect, useState } from "react"
import { Chart as ChartJS, ArcElement, Tooltip, Legend} from "chart.js"
import { Pie } from "react-chartjs-2"

ChartJS.register(ArcElement, Tooltip, Legend)

interface Grade {
  id: number
  score: number
  cycle: string
  date: string
  details: EvaluationDetail[]
}

interface EvaluationDetail {
  course: string
  correct: number
  incorrect: number
  unanswered: number
}

export default function GradesPage() {
  const [grades] = useState<Grade[]>([
    { 
      id: 1,
      score: 85,
      cycle: "2024-I",
      date: "2024-03-15",
      details: [
        { course: "Álgebra", correct: 15, incorrect: 3, unanswered: 2 },
        { course: "Aritmética", correct: 18, incorrect: 1, unanswered: 1 },
        { course: "Lenguaje", correct: 14, incorrect: 4, unanswered: 2 },
        { course: "Historia", correct: 16, incorrect: 2, unanswered: 2 },
      ],
    },
    { 
      id: 2,
      score: 92,
      cycle: "2024-I",
      date: "2024-04-02",
      details: [
        { course: "Álgebra", correct: 18, incorrect: 1, unanswered: 1 },
        { course: "Aritmética", correct: 19, incorrect: 0, unanswered: 1 },
        { course: "Lenguaje", correct: 17, incorrect: 2, unanswered: 1 },
        { course: "Historia", correct: 18, incorrect: 1, unanswered: 1 },
      ],
    },
    { id: 3,
      score: 78,
      cycle: "2024-II",
      date: "2024-05-20",
      details: [
        { course: "Álgebra", correct: 14, incorrect: 4, unanswered: 2 },
        { course: "Aritmética", correct: 16, incorrect: 3, unanswered: 1 },
        { course: "Lenguaje", correct: 13, incorrect: 5, unanswered: 2 },
        { course: "Historia", correct: 15, incorrect: 3, unanswered: 2 },
      ],
    },
  ])

  const [selectedGradeId, setSelectedGradeId] = useState<number | null>(null)

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.slice(1)
      const id = Number.parseInt(hash, 10)
      setSelectedGradeId(isNaN(id) ? null : id)
    }

    handleHashChange()
    window.addEventListener("hashchange", handleHashChange)
    return () => window.removeEventListener("hashchange", handleHashChange)
  }, [])

  const handleReview = (id: number) => {
    window.location.hash = `#${id}`
    // Aquí iría la lógica para revisar la nota
  }

  const handleBack = () => {
    window.location.hash = ""
  }

  const calculateScore = (detail: EvaluationDetail) => {
    return detail.correct * 20 + detail.incorrect * -4 + detail.unanswered * 0
  }

  const selectedGrade = grades.find((grade) => grade.id === selectedGradeId)

  const prepareChartData = (grade: Grade) => {
    const totalQuestions = grade.details.reduce(
      (sum, detail) => sum + detail.correct + detail.incorrect + detail.unanswered,
      0,
    )

    const courseScores = grade.details.map((detail) => ({
      course: detail.course,
      score: calculateScore(detail),
    }))

    const totalIncorrect = grade.details.reduce((sum, detail) => sum + detail.incorrect, 0)
    const totalUnanswered = grade.details.reduce((sum, detail) => sum + detail.unanswered, 0)

    const data = {
      labels: [...courseScores.map((cs) => cs.course), "Incorrectas (Total)", "Sin responder (Total)"],
      datasets: [
        {
          data: [
            ...courseScores.map((cs) => cs.score / (totalQuestions * 20) * 100) ,
            (totalIncorrect / totalQuestions) * 100,
            (totalUnanswered / totalQuestions) * 100,
          ],
          backgroundColor:  ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#FF9F40", "#9966FF"],
        },
      ],        
    }
    return data
  }

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="px-6 py-4 border-b border-gray-200">
        <h1 className="text-2xl font-semibold text-gray-800">Notas</h1>
      </div>
      <div className="p-6">
        {selectedGrade ? (
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-800">Detalles de la Evaluación</h2>
              <button
                onClick={handleBack}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition-colors"
              >
                Volver
              </button>
            </div>
            <div className="mb-4">
              <p className="text-gray-600">Fecha: {selectedGrade.date}</p>
              <p className="text-gray-600">Ciclo: {selectedGrade.cycle}</p>
              <p className="text-gray-600">Puntaje Total: {selectedGrade.score}</p>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
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
                        Correctas
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Incorrectas
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Sin responder
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Puntaje
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {selectedGrade.details.map((detail, index) => (
                      <tr key={index}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{detail.course}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{detail.correct}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{detail.incorrect}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{detail.unanswered}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{calculateScore(detail)}</div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Distribución de Puntajes</h3>
                <Pie data={prepareChartData(selectedGrade)} />
              </div>
            </div>
          </div>
        ) : (
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
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
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
        )}
      </div>
    </div>
  )
}
  
  