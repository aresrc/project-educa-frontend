"use client"

import type React from "react"

import { useState } from "react"
import { Search, Filter, Plus, X, AlertTriangle } from "lucide-react"

interface User {
  id: number
  name: string
  email: string
  role: string
  status: string
  // Campos adicionales para la edición
  dni: string
  birthDate: string
  gender: string
  phone: string
  password?: string // Opcional para edición
  profileType: string
}

interface UserFormData {
  id?: number
  dni: string
  name: string
  birthDate: string
  gender: string
  phone: string
  email: string
  password: string
  profileType: string
  status?: string
}

export default function UsersPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [showNewModal, setShowNewModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [userToDelete, setUserToDelete] = useState<string | null>(null)
  const [formData, setFormData] = useState<UserFormData>({
    dni: "",
    name: "",
    birthDate: "",
    gender: "",
    phone: "",
    email: "",
    password: "",
    profileType: "",
  })

  // Datos de ejemplo - en una aplicación real, estos vendrían de una API
  const [users, setUsers] = useState<User[]>([
    {
      id: 1,
      name: "Juan Pérez",
      email: "juan.perez@example.com",
      role: "Estudiante",
      status: "Activo",
      dni: "12345678",
      birthDate: "1995-05-15",
      gender: "Masculino",
      phone: "987654321",
      profileType: "Estudiante",
    },
    {
      id: 2,
      name: "María Rodríguez",
      email: "maria.rodriguez@example.com",
      role: "Estudiante",
      status: "Activo",
      dni: "87654321",
      birthDate: "1997-08-20",
      gender: "Femenino",
      phone: "987123456",
      profileType: "Estudiante",
    },
    {
      id: 3,
      name: "Carlos Gómez",
      email: "carlos.gomez@example.com",
      role: "Profesor",
      status: "Activo",
      dni: "23456789",
      birthDate: "1985-03-10",
      gender: "Masculino",
      phone: "912345678",
      profileType: "Profesor",
    },
    {
      id: 4,
      name: "Ana López",
      email: "ana.lopez@example.com",
      role: "Estudiante",
      status: "Inactivo",
      dni: "34567890",
      birthDate: "1998-11-25",
      gender: "Femenino",
      phone: "945678123",
      profileType: "Estudiante",
    },
    {
      id: 5,
      name: "Pedro Martínez",
      email: "pedro.martinez@example.com",
      role: "Coordinador",
      status: "Activo",
      dni: "45678901",
      birthDate: "1980-07-05",
      gender: "Masculino",
      phone: "978123456",
      profileType: "Coordinador",
    },
    {
      id: 6,
      name: "Laura Sánchez",
      email: "laura.sanchez@example.com",
      role: "Profesor",
      status: "Activo",
      dni: "56789012",
      birthDate: "1988-09-15",
      gender: "Femenino",
      phone: "912345678",
      profileType: "Profesor",
    },
    {
      id: 7,
      name: "Miguel Torres",
      email: "miguel.torres@example.com",
      role: "Estudiante",
      status: "Activo",
      dni: "67890123",
      birthDate: "1996-02-28",
      gender: "Masculino",
      phone: "945612378",
      profileType: "Estudiante",
    },
    {
      id: 8,
      name: "Sofía Ramírez",
      email: "sofia.ramirez@example.com",
      role: "Estudiante",
      status: "Inactivo",
      dni: "78901234",
      birthDate: "1999-12-10",
      gender: "Femenino",
      phone: "978456123",
      profileType: "Estudiante",
    },
  ])

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleNewUser = () => {
    setFormData({
      dni: "",
      name: "",
      birthDate: "",
      gender: "",
      phone: "",
      email: "",
      password: "",
      profileType: "",
    })
    setShowNewModal(true)
  }

  const handleEditUser = (user: User) => {
    setFormData({
      id: user.id,
      dni: user.dni,
      name: user.name,
      birthDate: user.birthDate,
      gender: user.gender,
      phone: user.phone,
      email: user.email,
      password: "", // No mostramos la contraseña actual por seguridad
      profileType: user.profileType,
      status: user.status,
    })
    setShowEditModal(true)
  }

  const handleDeleteClick = (userEmail: string) => {
    setUserToDelete(userEmail)
    setShowDeleteModal(true)
  }

  const handleConfirmDelete = async () => {
    if (userToDelete) {
      console.log("Eliminando usuario con correo:", userToDelete);

      try {
          const response = await fetch(`http://localhost:8080/api/usuarios/eliminar/${userToDelete}`, {
              method: "DELETE",
              headers: {
                  "Content-Type": "application/json",
              },
          });

          if (!response.ok) {
              throw new Error(`Error al eliminar el usuario: ${response.statusText}`);
          }

          console.log("Usuario eliminado correctamente.");

          // Actualizar la lista de usuarios en el frontend
          const updatedUsers = users.filter((user) => user.email !== userToDelete);
          setUsers(updatedUsers);

          // Cerrar el modal y limpiar el estado
          setShowDeleteModal(false);
          setUserToDelete(null);
      } catch (error) {
          console.error("Error al eliminar el usuario:", error);
      }
  }
  }

  const handleSubmitNew = async (e: React.FormEvent) => {
    e.preventDefault()
    // Aquí iría la lógica para enviar los datos a la API
    console.log("Datos del nuevo usuario:", formData)

    const formattedDate = new Date(formData.birthDate).toISOString().split('T')[0];

    // Preparar el payload con la estructura correcta
    const payload = {
      nombre: formData.name,
      fechaNacimiento: formattedDate,
      dni: formData.dni,
      genero: formData.gender,
      telefono: formData.phone,
      correo: formData.email,
      contrasenia: formData.password, // Asegúrate de tener este campo en el formulario
      tipoPerfil: formData.profileType,
  };

  try {
    const response = await fetch("http://localhost:8080/api/usuarios/registrar", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
    });

    if (!response.ok) {
        throw new Error(`Error en la solicitud: ${response.statusText}`);
    }

    const result = await response.text(); // Suponiendo que el controlador devuelve un string
    console.log(result);

    // Simular la creación del nuevo usuario en el frontend
    const newUser: User = {
        id: users.length + 1,
        name: formData.name,
        email: formData.email,
        role: formData.profileType,
        status: "Activo",
        dni: formData.dni,
        birthDate: formData.birthDate,
        gender: formData.gender,
        phone: formData.phone,
        profileType: formData.profileType,
    };

    setUsers([...users, newUser]);
    setShowNewModal(false);

} catch (error) {
    console.error("Error al registrar el usuario:", error);
}
  }

  const handleSubmitEdit = async (e: React.FormEvent) => {
    e.preventDefault()
    // Aquí iría la lógica para enviar los datos actualizados a la API
    console.log("Datos actualizados del usuario:", formData)

    // Construir el payload con los datos actualizados
    const payload = {
      nombre: formData.name,
      fechaNacimiento: new Date(formData.birthDate).toISOString().split('T')[0],
      dni: formData.dni,
      genero: formData.gender,
      telefono: formData.phone,
      correo: formData.email,
      contrasenia: formData.password,
      tipoPerfil: formData.profileType,
    };

    try {
      const response = await fetch(`http://localhost:8080/api/usuarios/actualizar/${formData.email}`, {
          method: "PUT",
          headers: {
              "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
      });

      if (!response.ok) {
          throw new Error(`Error en la solicitud: ${response.statusText}`);
      }

      console.log("Usuario actualizado correctamente.");

      // Simular la actualización en el frontend
      const updatedUsers = users.map((user) =>
          user.email === formData.email
              ? { ...user, ...payload }
              : user
      );

      setUsers(updatedUsers);
      setShowEditModal(false);

  } catch (error) {
      console.error("Error al actualizar el usuario:", error);
  }

    // Simulamos la actualización del usuario
    /*const updatedUsers = users.map((user) =>
      user.id === formData.id
        ? {
            ...user,
            name: formData.name,
            email: formData.email,
            role: formData.profileType,
            status: formData.status || user.status,
            dni: formData.dni,
            birthDate: formData.birthDate,
            gender: formData.gender,
            phone: formData.phone,
            profileType: formData.profileType,
          }
        : user,
    )

    setUsers(updatedUsers)
    setShowEditModal(false)
    */
  }

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-800">Gestión de Usuarios</h1>
        <button
          className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          onClick={handleNewUser}
        >
          <Plus className="h-4 w-4" />
          <span>Nuevo Usuario</span>
        </button>
      </div>
      <div className="p-6">
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar usuarios..."
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
                  Nombre
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Email
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Rol
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Estado
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
              {filteredUsers.map((user) => (
                <tr key={user.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{user.name}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{user.email}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{user.role}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        user.status === "Activo" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                      }`}
                    >
                      {user.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button onClick={() => handleEditUser(user)} className="text-green-600 hover:text-green-900 mr-3">
                      Editar
                    </button>
                    <button onClick={() => handleDeleteClick(user.email)} className="text-red-600 hover:text-red-900">
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal para Nuevo Usuario */}
      {showNewModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
              <h2 className="text-xl font-semibold text-gray-800">Nuevo Usuario</h2>
              <button onClick={() => setShowNewModal(false)} className="text-gray-500 hover:text-gray-700">
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="p-6">
              <form onSubmit={handleSubmitNew} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="dni" className="block text-sm font-medium text-gray-700">
                      DNI
                    </label>
                    <input
                      type="text"
                      id="dni"
                      name="dni"
                      value={formData.dni}
                      onChange={handleInputChange}
                      className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                      Nombre
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="birthDate" className="block text-sm font-medium text-gray-700">
                      Fecha de Nacimiento
                    </label>
                    <input
                      type="date"
                      id="birthDate"
                      name="birthDate"
                      value={formData.birthDate}
                      onChange={handleInputChange}
                      className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="gender" className="block text-sm font-medium text-gray-700">
                      Género
                    </label>
                    <select
                      id="gender"
                      name="gender"
                      value={formData.gender}
                      onChange={handleInputChange}
                      className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
                      required
                    >
                      <option value="">Seleccionar género</option>
                      <option value="Masculino">Masculino</option>
                      <option value="Femenino">Femenino</option>
                      <option value="Otro">Otro</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                      Teléfono
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                      Correo
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                      Contraseña
                    </label>
                    <input
                      type="password"
                      id="password"
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="profileType" className="block text-sm font-medium text-gray-700">
                      Tipo de Perfil
                    </label>
                    <select
                      id="profileType"
                      name="profileType"
                      value={formData.profileType}
                      onChange={handleInputChange}
                      className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
                      required
                    >
                      <option value="">Seleccionar tipo de perfil</option>
                      <option value="ESTUDIANTE">Estudiante</option>
                      <option value="PROFESOR">Profesor</option>
                      <option value="COORDINADOR">Coordinador</option>
                      <option value="ADMINISTRADOR">Administrador</option>
                    </select>
                  </div>
                </div>
                <div className="flex justify-end gap-2 mt-6">
                  <button
                    type="button"
                    onClick={() => setShowNewModal(false)}
                    className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                  >
                    Guardar
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Modal para Editar Usuario */}
      {showEditModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
              <h2 className="text-xl font-semibold text-gray-800">Editar Usuario</h2>
              <button onClick={() => setShowEditModal(false)} className="text-gray-500 hover:text-gray-700">
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="p-6">
              <form onSubmit={handleSubmitEdit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="dni" className="block text-sm font-medium text-gray-700">
                      DNI
                    </label>
                    <input
                      type="text"
                      id="dni"
                      name="dni"
                      value={formData.dni}
                      onChange={handleInputChange}
                      className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                      Nombre
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="birthDate" className="block text-sm font-medium text-gray-700">
                      Fecha de Nacimiento
                    </label>
                    <input
                      type="date"
                      id="birthDate"
                      name="birthDate"
                      value={formData.birthDate}
                      onChange={handleInputChange}
                      className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="gender" className="block text-sm font-medium text-gray-700">
                      Género
                    </label>
                    <select
                      id="gender"
                      name="gender"
                      value={formData.gender}
                      onChange={handleInputChange}
                      className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
                      required
                    >
                      <option value="">Seleccionar género</option>
                      <option value="Masculino">Masculino</option>
                      <option value="Femenino">Femenino</option>
                      <option value="Otro">Otro</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                      Teléfono
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                      Correo
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                      Contraseña{" "}
                      <span className="text-xs text-gray-500">(Dejar en blanco para mantener la actual)</span>
                    </label>
                    <input
                      type="password"
                      id="password"
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                  </div>
                  <div>
                    <label htmlFor="profileType" className="block text-sm font-medium text-gray-700">
                      Tipo de Perfil
                    </label>
                    <select
                      id="profileType"
                      name="profileType"
                      value={formData.profileType}
                      onChange={handleInputChange}
                      className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
                      required
                    >
                      <option value="">Seleccionar tipo de perfil</option>
                      <option value="ESTUDIANTE">Estudiante</option>
                      <option value="PROFESOR">Profesor</option>
                      <option value="COORDINADOR">Coordinador</option>
                      <option value="ADMINISTRADOR">Administrador</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="status" className="block text-sm font-medium text-gray-700">
                      Estado
                    </label>
                    <select
                      id="status"
                      name="status"
                      value={formData.status}
                      onChange={handleInputChange}
                      className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
                      required
                    >
                      <option value="Activo">Activo</option>
                      <option value="Inactivo">Inactivo</option>
                    </select>
                  </div>
                </div>
                <div className="flex justify-end gap-2 mt-6">
                  <button
                    type="button"
                    onClick={() => setShowEditModal(false)}
                    className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                  >
                    Actualizar
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Confirmación para Eliminar Usuario */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md">
            <div className="px-6 py-4 border-b border-gray-200 flex items-center">
              <AlertTriangle className="h-6 w-6 text-red-500 mr-2" />
              <h2 className="text-xl font-semibold text-gray-800">Confirmar Eliminación</h2>
            </div>
            <div className="p-6">
              <p className="text-gray-700 mb-6">
                ¿Está seguro de que desea eliminar este usuario? Esta acción no se puede deshacer.
              </p>
              <div className="flex justify-end gap-2">
                <button
                  onClick={() => setShowDeleteModal(false)}
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleConfirmDelete}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                  Eliminar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

