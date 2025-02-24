"use client"

interface ScheduleItem {
  id: number
  course: string
  day: string
  startTime: string
  endTime: string
  color: string // Para mantener consistencia en los colores
}

export default function SchedulePage() {
  // Simulación de datos que vendrían de una BD
  const scheduleData: ScheduleItem[] = [
    {
      id: 1,
      course: "Álgebra",
      day: "Lunes",
      startTime: "8:00",
      endTime: "11:00",
      color: "bg-red-500",
    },
    {
      id: 2,
      course: "Aritmética",
      day: "Martes",
      startTime: "8:00",
      endTime: "11:00",
      color: "bg-blue-400",
    },
    {
      id: 3,
      course: "Lenguaje",
      day: "Martes",
      startTime: "11:00",
      endTime: "13:00",
      color: "bg-yellow-400",
    },
    {
      id: 4,
      course: "Historia",
      day: "Jueves",
      startTime: "8:00",
      endTime: "10:00",
      color: "bg-orange-400",
    },
  ]

  const hours = ["8:00-9:00", "9:00-10:00", "10:00-11:00", "11:00-12:00", "12:00-13:00", "13:00-14:00"]

  const days = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"]

  // Función para verificar si hay una clase en una hora y día específicos
  const getClassForTimeSlot = (hour: string, day: string) => {
    const [slotStart] = hour.split("-")

    return scheduleData.find((item) => {
      const slotHour = Number.parseInt(slotStart.split(":")[0])
      const startHour = Number.parseInt(item.startTime.split(":")[0])
      const endHour = Number.parseInt(item.endTime.split(":")[0])

      return item.day === day && slotHour >= startHour && slotHour < endHour
    })
  }

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="px-6 py-4 border-b border-gray-200">
        <h1 className="text-2xl font-semibold text-gray-800">Horario</h1>
      </div>
      <div className="p-6">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr>
                <th className="border border-gray-300 bg-blue-600 text-white p-2">Hora</th>
                {days.map((day) => (
                  <th key={day} className="border border-gray-300 bg-blue-600 text-white p-2">
                    {day}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {hours.map((hour, index) => (
                <tr key={index}>
                  <td className="border border-gray-300 p-2 text-center">{hour}</td>
                  {days.map((day) => {
                    const classInfo = getClassForTimeSlot(hour, day)
                    return (
                      <td
                        key={`${day}-${hour}`}
                        className={`border border-gray-300 p-2 text-center ${
                          classInfo ? `${classInfo.color} text-white` : ""
                        }`}
                      >
                        {classInfo?.course || ""}
                      </td>
                    )
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
  
  