# 🏢 Sistema de Gestión de Empresas

> Aplicación web para la gestión y registro de empresas desarrollada con React y Spring Boot

## 🚀 Stack Tecnológico

### Frontend
- **React 19** - Librería de UI moderna y reactiva
- **TypeScript** - Superset tipado de JavaScript
- **Vite** - Build tool ultrarrápido con hot-reloading
- **Tailwind CSS 4** - Framework de CSS utilitario
- **Radix UI** - Componentes accesibles y customizables
- **TanStack Query** - Manejo eficiente del estado del servidor
- **React Hook Form + Zod** - Validación robusta de formularios
- **Axios** - Cliente HTTP para comunicación con APIs

### Backend  
- **Java 21** - Lenguaje de programación robusto y estable
- **Spring Boot 3.5.5** - Framework para desarrollo de aplicaciones empresariales
- **Spring Data JPA** - Abstracción para persistencia de datos
- **PostgreSQL** - Base de datos relacional principal
- **H2** - Base de datos en memoria para testing
- **Maven** - Gestor de dependencias y build tool

## 📋 Descripción del Proyecto

Sistema web que permite gestionar información de empresas, incluyendo registro, consulta y visualización de datos empresariales como nombre, NIT, dirección y teléfono. La aplicación ofrece una interfaz intuitiva con formularios de captura y tablas de visualización de datos.

## 🏗️ Decisiones Técnicas

### **React con TypeScript y Vite**
Se eligió React por su amplio ecosistema, excelente documentación y alta demanda en el mercado. TypeScript aporta tipado estático que reduce errores en tiempo de desarrollo. Vite proporciona un entorno de desarrollo extremadamente rápido con hot-module replacement instantáneo.

### **Spring Boot con Java 21**  
Spring Boot fue seleccionado por su capacidad para crear APIs REST robustas con configuración mínima, su amplio ecosistema de integraciones y la estabilidad empresarial de Java. La versión 21 de Java ofrece las últimas mejoras en performance y características del lenguaje.

### **Arquitectura de Comunicación**
- **API REST** como interfaz de comunicación entre frontend y backend
- **Separación clara de responsabilidades** con controladores, servicios y repositorios
- **Validación en ambos extremos** para garantizar integridad de datos

### **Gestión de Estado y UI**
- **TanStack Query** para caché inteligente y sincronización de estado del servidor
- **Radix UI + Tailwind** para componentes accesibles con diseño moderno
- **React Hook Form** para manejo eficiente de formularios con validaciones

## 🚀 Cómo Iniciar el Proyecto

### Prerrequisitos
- **Node.js 18+** y npm
- **Java 21+** y Maven
- **PostgreSQL** (para producción)

### 🔧 Backend (Spring Boot)

1. Navega al directorio del backend:
```bash
cd backend
```

2. Configura la base de datos en `src/main/resources/application.properties` según tu entorno

3. Ejecuta la aplicación:
```bash
./mvnw spring-boot:run
```
*En Windows:*
```cmd
mvnw.cmd spring-boot:run
```

El servidor estará disponible en `http://localhost:8080`

### 💻 Frontend (React + Vite)

1. Navega al directorio del frontend:
```bash
cd frontend  
```

2. Instala las dependencias:
```bash
npm install
```

3. Inicia el servidor de desarrollo:
```bash
npm run dev
```

La aplicación estará disponible en `http://localhost:5173`

### 🗃️ Base de Datos

El proyecto incluye un script SQL (`backend/company.sql`) para crear la estructura de la tabla de empresas. Ejecuta este script en tu instancia de PostgreSQL antes de iniciar la aplicación.

## 📁 Estructura del Proyecto

```
prueba-tecnica-mente/
├── backend/                 # API REST con Spring Boot
│   ├── src/main/java/      # Código fuente Java
│   ├── src/main/resources/ # Configuraciones y recursos
│   └── pom.xml             # Configuración Maven
├── frontend/               # Aplicación React
│   ├── src/                # Código fuente TypeScript/React
│   ├── package.json        # Dependencias npm
│   └── vite.config.ts      # Configuración Vite
└── README.md              # Este archivo
```

---

💡 **Tip**: Para un desarrollo óptimo, ejecuta ambos servidores simultáneamente en terminales separadas.
