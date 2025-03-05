"use client"

import { useEffect, useState } from "react";

interface ProfileData{
  dni: string;
  nombre: string;
  fechaNacimiento: string;
  genero: string;
  telefono: string;
  correo: string;
  tipoPerfil: string;
}

export default function ProfilePage() {

  const [profileData, setProfileData] = useState<ProfileData | null>(null);
  const userId = 1;

  useEffect(() => {
    fetch(`http://localhost:8080/api/profile/${userId}`)
        .then(response => {
            if (!response.ok) {
                throw new Error("Error al obtener el perfil");
            }
            return response.json();
        })
        .then(data => setProfileData(data))
        .catch(error => console.error(error));
}, [userId]);

if (!profileData) {
  return <div>Cargando...</div>;
}

  /*const profileData = {
    dni: "12345678",
    fullName: "Juan Pérez",
    birthDate: "15/05/1995",
    gender: "Masculino",
    phone: "987654321",
    email: "juan.perez@example.com",
    profileType: "Estudiante",
  }*/

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="px-6 py-4 border-b border-gray-200">
        <h1 className="text-2xl font-semibold text-gray-800">Perfil</h1>
      </div>
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ProfileField label="DNI" value={profileData.dni} />
          <ProfileField label="Nombre y Apellido" value={profileData.nombre} />
          <ProfileField label="Fecha de Nacimiento" value={profileData.fechaNacimiento} />
          <ProfileField label="Género" value={profileData.genero} />
          <ProfileField label="Teléfono" value={profileData.telefono} />
          <ProfileField label="Correo" value={profileData.correo} />
          <ProfileField label="Tipo de Perfil" value={profileData.tipoPerfil} />
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
  
  