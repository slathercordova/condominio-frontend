# 🏢 Condominios Frontend

Sistema de administración de condominios desarrollado con **React + TypeScript**, utilizando una arquitectura modular basada en **Features**, componentes reutilizables y separación de responsabilidades.

La aplicación es un sistema de gestión de condominios donde se puede realiza las siguientes features:

ACCIONES DEL ADMINISTRADOR

- CRUD de personas consumiendo servicios de reniec por decoleta
- Asignar unidades a las personas
- CRUD de edificios (configurar gasto mensual y distribución de cobro, por % o flat)
- Calcular porcentaje de participación de cada unidad, dependiendo de la configuración del edificio
- Calcular la deuda de cada unidad, dependiendo del monto ingresado y de la configuración del edificio
- CRUD de unidades

ACCIONES DEL PROPIETARIO
- Podrá consultar sus unidades en cards
- Podrá realizar el pago de su deuda simulada

AUTH
- Login exitoso
- Forgot Password (con envío de correo y nuevo token)
- Bloqueo por intentos erroneos

# Usuarios de prueba

El sistema de microservicios del back end ya contiene data pre cargada usando flyway, para utilizar el sistema deberán loguearse con los siguientes datos:

USUARIOS
ADMIN (Administrador)
LCORDOVA (propietario)

PASSWORD (aplica para todos los usuarios)
Sc191215*

---

# Tecnologías

- React
- TypeScript
- React Router
- Zustand
- Axios
- CSS Modules
- Lucide React

---

# Arquitectura del proyecto

```
src
│
├── app
│   └── rutas
├── common
│   ├── components
│   ├── constants
│   ├── layouts
│   ├── navbar
│   ├── security
│   ├── styles
│   └── types
│
├── features
│   ├── auth
│   ├── buildings
│   ├── catalogs
│   ├── persons
│   └── units
│
└── router
```

Cada **Feature** contiene todo lo necesario para funcionar de forma independiente.

Ejemplo:

```
persons
├── components
├── hooks
├── pages
├── services
└── types
```

---

# Organización de responsabilidades

## Pages

Las páginas únicamente:

- Componen la pantalla.
- Consumen Hooks.
- Renderizan componentes.

Ejemplo:

```tsx
const {
  error,
  persons,
  pagination,
  handleNuevaPersona,
  handleCloseModal,
  crudModalOpen,
  loadPersons,
  createPerson,
  deletePerson,
  loadingPersons,
  savingPerson,
  ...
} = usePersonPage();
```

---

## Hooks

Toda la lógica vive en Hooks.

Ejemplo:

```tsx
usePersonPage()

• cargar personas
• crear
• modificar
• eliminar
• abrir modal
• cerrar modal
• paginación
• loading
• errores
• ...
```

Los componentes únicamente reciben datos y callbacks.

---

## Components

Los componentes son reutilizables.

Ejemplo:

```
Button
Input
Select
Modal
Badge
Table
Pagination
Loading
Skeleton
ActionBar
ActionSection
FormGrid
FormItem
ConfirmDialog
EmptyState
PageHeader
PageContainer
```

---

# Componentes reutilizables

## Button

Puede recibir:
- modo
- icon
- disabled
- loading
- fullWidth

---

## Modal

Características:

- Tamaños
- Header
- Body
- Footer opcional
- Cierre por overlay
- Scroll interno

Los botones viven dentro del formulario.

---

## Table

Tabla genérica.

Soporta:

- Columnas dinámicas
- Render personalizado
- Width
- Alineación
- Selección de fila
- Hover
- Empty State

---

## Badge

Estados reutilizables.

```
success

danger

warning

info
```

Ejemplo:

```tsx
<Badge color="success">Activo</Badge>
```

---

## ActionBar

Contenedor superior para acciones principales.

---

## ActionSection

Contenedor inferior para acciones.

---

## FormGrid

Sistema de columnas basado en CSS Grid de 12 columnas.

Ejemplo:

```
6 + 6

4 + 4 + 4

3 + 3 + 3 + 3

8 + 4

9 + 3
```

---

## FormItem

Controla el ancho de cada campo.

Ejemplo:

```tsx
<FormItem colSpan={6}>
  <Input />
</FormItem>
```

Permite cambiar fácilmente la distribución del formulario.

---

# Diseño de formularios

```
FormGrid

↓

FormItem

↓

Input
```

---

# Diseño de páginas

```
PageHeader

↓

PageContainer

↓

ActionBar

↓

Tabla / Cards

↓

Pagination

↓

ActionSection
```

---

# Navegación

React Router.

---

# Estado global

Zustand.

Actualmente almacena:

- Usuario
- Tokens
- Roles
- Edificio seleccionado

---

# Autenticación

Login devuelve:

- Access Token
- Refresh Token
- Usuario
- Roles
- Edificio

Todo queda almacenado en Zustand.

---

# Notificaciones

Todas las operaciones muestran:

```
notification.success()

notification.error()
```

---

# Manejo de errores

Centralizado mediante:

```
handleApiError()
```

---

# Buenas prácticas

✅ Toda la lógica en Hooks.

✅ Componentes reutilizables.

✅ Servicios separados.

✅ DTO por Feature.

✅ CSS Modules.

✅ Tipado fuerte.

✅ Formularios con Grid.

✅ Componentes pequeños.

✅ Responsabilidad única.

---

# Flujo CRUD

```
Botón

↓

Abrir Modal

↓

Formulario

↓

Validaciones

↓

Hook

↓

Service

↓

Backend

↓

Notificación

↓

Actualizar lista
```

---

# Objetivo de la arquitectura

- Alta reutilización.
- Bajo acoplamiento.
- Fácil mantenimiento.
- Componentes independientes.
- Escalabilidad para nuevas Features.
- Aspecto similar a aplicaciones empresariales modernas.

# Autor

Proyecto integrador desarrollado por Slather Córdova Amez, para el curso de bootcamp de desarrollo web full stack con java.