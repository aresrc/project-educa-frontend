# Proyecto Frontend - Educatoon

Este es el proyecto frontend de Educatoon, una academia preuniversitaria que brinda enseñanza de calidad en materias de ciencia y humanidades.

## Estructura del Proyecto

El proyecto está organizado de la siguiente manera:

.gitignore
.next/
package.json
public/
src/
  app/
    admin/
    coordinator/
    student/
    components/
    contexts/
    lib/
    services/
  components/
src/middleware.ts
tailwind.config.ts
tsconfig.json

### Descripción de Carpetas

- **.next/**: Archivos generados por Next.js durante la construcción del proyecto.
- **public/**: Archivos públicos accesibles desde el navegador.
- **src/app/**: Contiene las diferentes páginas y componentes de la aplicación.
  - **admin/**: Páginas y componentes específicos para el panel de administración.
  - **coordinator/**: Páginas y componentes específicos para el panel de coordinadores.
  - **student/**: Páginas y componentes específicos para el panel de estudiantes.
  - **components/**: Componentes reutilizables en toda la aplicación.
  - **contexts/**: Contextos de React para manejar el estado global.
  - **lib/**: Librerías y utilidades.
  - **services/**: Servicios para interactuar con APIs.
- **src/components/**: Componentes reutilizables en toda la aplicación.
- **middleware.ts**: Middleware para manejar la autenticación.
- **tailwind.config.ts**: Configuración de Tailwind CSS.
- **tsconfig.json**: Configuración de TypeScript.

## Instalación

Sigue estos pasos para instalar y correr el proyecto en tu sistema:

### Prerrequisitos

- Node.js (versión 14 o superior)
- npm (versión 6 o superior)

### Pasos de Instalación

1. Clona el repositorio:

git clone https://github.com/tu-usuario/tu-repositorio.git
cd tu-repositorio

2. Instala las dependencias:

`npm install`

### Correr el Proyecto

Para correr el proyecto en modo desarrollo, utiliza el siguiente comando:

`npm run dev`

Esto iniciará el servidor de desarrollo y podrás acceder a la aplicación en http://localhost:3000.

### Construir el Proyecto

Para construir el proyecto para producción, utiliza el siguiente comando:

`npm run build`

Esto generará una versión optimizada del proyecto en la carpeta .next.

### Iniciar el Proyecto en Producción

Para iniciar el proyecto en modo producción, utiliza el siguiente comando:

`npm run start`

Esto iniciará el servidor en modo producción y podrás acceder a la aplicación en http://localhost:3000.

## Contribuir

Si deseas contribuir a este proyecto, por favor sigue estos pasos:

1. Haz un fork del repositorio.
2. Crea una nueva rama (git checkout -b feature/nueva-funcionalidad).
3. Realiza tus cambios y haz commit (git commit -am 'Agrega nueva funcionalidad').
4. Sube tus cambios a tu fork (git push origin feature/nueva-funcionalidad).
5. Abre un Pull Request.
