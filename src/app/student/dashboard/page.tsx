export default function DashboardPage() {
    // Esta información vendría de tu base de datos
    const studentInfo = {
      name: "Juan Pérez",
      code: "2024-0001",
      program: "Preparación Universidad Nacional",
      cycle: "2024-I",
      status: "Activo",
      attendance: "85%",
      lastAccess: "2024-02-21",
    }
  
    return (
      <div className="space-y-6">
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h1 className="text-2xl font-semibold text-gray-800">Información del Estudiante</h1>
          </div>
          <div className="p-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <h2 className="text-sm font-medium text-gray-500">Nombre Completo</h2>
                  <p className="mt-1 text-lg text-gray-800">{studentInfo.name}</p>
                </div>
                <div>
                  <h2 className="text-sm font-medium text-gray-500">Código de Estudiante</h2>
                  <p className="mt-1 text-lg text-gray-800">{studentInfo.code}</p>
                </div>
                <div>
                  <h2 className="text-sm font-medium text-gray-500">Programa</h2>
                  <p className="mt-1 text-lg text-gray-800">{studentInfo.program}</p>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <h2 className="text-sm font-medium text-gray-500">Ciclo Actual</h2>
                  <p className="mt-1 text-lg text-gray-800">{studentInfo.cycle}</p>
                </div>
                <div>
                  <h2 className="text-sm font-medium text-gray-500">Estado</h2>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    {studentInfo.status}
                  </span>
                </div>
                <div>
                  <h2 className="text-sm font-medium text-gray-500">Asistencia</h2>
                  <p className="mt-1 text-lg text-gray-800">{studentInfo.attendance}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
  
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Próximas Evaluaciones</h2>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium">Matemática</p>
                  <p className="text-sm text-gray-500">Examen Parcial</p>
                </div>
                <p className="text-sm text-gray-600">28 Feb</p>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium">Física</p>
                  <p className="text-sm text-gray-500">Práctica Calificada</p>
                </div>
                <p className="text-sm text-gray-600">1 Mar</p>
              </div>
            </div>
          </div>
  
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Asistencia Reciente</h2>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium">Química</p>
                  <p className="text-sm text-gray-500">20 Feb 2024</p>
                </div>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  Presente
                </span>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium">Lenguaje</p>
                  <p className="text-sm text-gray-500">19 Feb 2024</p>
                </div>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  Presente
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
  
  
  
  