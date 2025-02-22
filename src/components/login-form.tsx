"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { AlertCircle } from "lucide-react"
import { login } from "@/services/auth"
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const router = useRouter();

  const handleSubmit = async(e: React.FormEvent) => {
    e.preventDefault()
    // Aquí iría la lógica de autenticación
    if (!email || !password) {
      setError("Por favor, complete todos los campos.")
    } else {
      setError("")
      console.log("Intento de inicio de sesión con:", email, password)
      try{
        await login(email, password);
        router.push("/student/dashboard");
      } catch (err) {
        setError("Credenciales inválidas");
      }
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="email">Correo Electrónico</Label>
        <Input
          id="email"
          type="email"
          placeholder="tu@ejemplo.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="password">Contraseña</Label>
        <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
      </div>
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          <div className="flex items-center">
            <AlertCircle className="h-4 w-4 mr-2" />
            <span>{error}</span>
          </div>
        </div>
      )}
      <Button type="submit" className="w-full bg-green-600 hover:bg-green-700">
        Iniciar Sesión
      </Button>
    </form>
  )
}