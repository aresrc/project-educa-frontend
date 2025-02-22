import Link from "next/link"
import Image from "next/image"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#00ffff]">
      {/* Header */}
      <header className="bg-black text-white p-4">
        <h1 className="text-center text-4xl font-bold">EDUCATOON</h1>
      </header>

      {/* Navigation */}
      <nav className="bg-gray-200 p-2 flex justify-between items-center">
        <div className="flex space-x-1">
          <Link href="#" className="bg-white px-4 py-1 hover:bg-gray-100">
            Ciclo
          </Link>
          <Link href="#" className="bg-white px-4 py-1 hover:bg-gray-100">
            Sedes
          </Link>
          <Link href="#" className="bg-white px-4 py-1 hover:bg-gray-100">
            propósito
          </Link>
          <Link href="#" className="bg-white px-4 py-1 hover:bg-gray-100">
            contáctenos
          </Link>
        </div>
        <Link href="/login" className="bg-white px-4 py-1 hover:bg-gray-100">
          Iniciar sesión
        </Link>
      </nav>

      {/* Main Content */}
      <main className="container mx-auto p-8">
        <div className="bg-white inline-block px-4 py-2 mb-8">
          <h2 className="text-xl text-blue-800">Sobre la institución</h2>
        </div>

        <div className="grid md:grid-cols-2 gap-8 bg-white p-6 rounded-lg">
          <div>
            <Image
              src="/images/estudiante.jpg"
              alt="Estudiantes estudiando"
              width={500}
              height={300}
              className="rounded-lg"
            />
          </div>
          <div className="space-y-4">
            <p className="text-gray-800">
              Educatoon es una academia preuniversitaria brinda enseñanza de calidad en materias de ciencia y
              humanidades, fue fundada para ayudar a las personas de bajos recursos que estén interesados en ingresar a
              una universidad, esta academia es financiada por el gobierno peruano y otras organizaciones tipo
              ONG&apos;s, Educatoon es una organización sin fines de lucro que prepara a estudiantes a ingresar a una
              universidad estatal mas no universidad de pago.
            </p>
            <p className="text-gray-800">
              Nuestros programas están diseñados de acuerdo a las exigencias del examen de admisión de la universidad
              que desea postular y con una metodología adecuada para cada nivel de preparación.
            </p>
          </div>
        </div>
      </main>
    </div>
  )
}


