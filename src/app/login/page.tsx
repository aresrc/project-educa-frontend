import LoginForm from "@/components/login-form"
import { GraduationCap } from "lucide-react"

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 to-green-200 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="bg-green-600 p-4 flex items-center justify-center">
          <GraduationCap className="text-white h-12 w-12" />
        </div>
        <div className="p-6">
          <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">Academia Intranet</h1>
          <LoginForm />
        </div>
      </div>
    </div>
  )
}
