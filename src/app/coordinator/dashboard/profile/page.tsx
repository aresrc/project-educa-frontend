"use client"

import { useEffect, useState } from "react"
import { useDashboard } from "@/contexts/dashboard-context"

interface ProfileData {
  dni: string
  fullName: string
  birthDate: string
  gender: string
  phone: string
  email: string
  profileType: string
}

export default function CoordinatorProfilePage() {
  const { user } = useDashboard()
  const [profileData, setProfileData] = useState<ProfileData | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulamos la carga de datos
    setTimeout(() => {
      setProfileData({
        dni: "45678901",
        fullName: user?.name || "Carlos Rodríguez",
        birthDate: "05/07/1980",
        gender: "Masculino",
        phone: "978123456",
        email: user?.email || "carlos.rodriguez@educatoon.com",
        profileType: user?.role || "Coordinador",
      })
      setIsLoading(false)
    }, 300)
  }, [user])

  if (isLoading) {
    return <div className="text-center p-4">Cargando perfil...</div>
  }

  if (!profileData) {
    return <div className="text-center p-4">No se encontraron datos del perfil.</div>
  }

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="px-6 py-4 border-b border-gray-200">
        <h1 className="text-2xl font-semibold text-gray-800">Perfil de Coordinador</h1>
      </div>
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ProfileField label="DNI" value={profileData.dni} />
          <ProfileField label="Nombre y Apellido" value={profileData.fullName} />
          <ProfileField label="Fecha de Nacimiento" value={profileData.birthDate} />
          <ProfileField label="Género" value={profileData.gender} />
          <ProfileField label="Teléfono" value={profileData.phone} />
          <ProfileField label="Correo" value={profileData.email} />
          <ProfileField label="Tipo de Perfil" value={profileData.profileType} />
        </div>
      </div>
    </div>
  )
}

function ProfileField({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <h2 className="text-sm font-medium text-gray-500">{label}</h2>
      <p className="mt-1 text-lg text-gray-800">{value}</p>
    </div>
  )
}

