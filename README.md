# Multi-Franchise Backend API

Backend desarrollado con **Node.js, Express y Sequelize** para gestionar un sistema de **franquicias con productos y órdenes**.

Este sistema permite que múltiples franquicias operen dentro de la misma plataforma, gestionando productos, usuarios y ventas de manera independiente.

Los usuarios pueden registrarse, iniciar sesión y realizar compras en cualquier franquicia disponible.

---

# Tecnologías utilizadas

* Node.js
* Express
* Sequelize
* MySQL
* JWT (JSON Web Token)
* Postman (para pruebas de API)

---

# Arquitectura del sistema

El sistema está diseñado como una **arquitectura multi-tenant**, donde varias franquicias comparten la misma base de datos pero mantienen sus datos aislados mediante `franchise_id`.

Relaciones principales:

```
User
 │
 ├── FranchiseUser
 │        │
 │        └── Franchise
 │
 └── Orders
         │
         └── OrderItems
                  │
                  └── Product
```

---

# Modelos principales

## User

Usuarios registrados en la plataforma.

Campos principales:

* id
* name
* email
* password

---

## Franchise

Representa una franquicia dentro del sistema.

Campos:

* id
* nombre

---

## FranchiseUser

Tabla intermedia que relaciona usuarios con franquicias.

Campos:

* user_id
* franchise_id
* role

Permite que un usuario tenga diferentes roles dentro de diferentes franquicias.

Ejemplo:

* admin
* manager
* employee

---

## Product

Productos disponibles en cada franquicia.

Campos:

* id
* name
* description
* price
* stock
* franchise_id

Cada producto pertenece a una franquicia específica.

---

## Order

Representa una orden de compra realizada por un usuario.

Campos:

* id
* user_id
* franchise_id
* total

---

## OrderItem

Productos incluidos dentro de una orden.

Campos:

* id
* order_id
* product_id
* quantity
* price

---

# Seguridad

La autenticación del sistema utiliza **JWT (JSON Web Token)**.

Cada petición protegida debe incluir el token en el header:

```
Authorization: Bearer TOKEN
```

Para identificar la franquicia desde la cual se realiza la operación se usa el header:

```
x-franchise-id: 1
```

Esto permite separar los datos entre diferentes franquicias.

---

# Endpoints principales

---

# Autenticación

## Registro

POST /api/auth/register

Body:

```json
{
  "name": "usuario",
  "email": "usuario@email.com",
  "password": "123456"
}
```

---

## Login

POST /api/auth/login

Body:

```json
{
  "email": "usuario@email.com",
  "password": "123456"
}
```

Respuesta:

```
JWT TOKEN
```

---

# Franquicias

## Crear franquicia

POST /api/franchises

Body:

```json
{
  "nombre": "Franquicia Centro"
}
```

---

## Obtener todas las franquicias

GET /api/franchises

---

## Obtener franquicia por ID

GET /api/franchises/:id

---

## Actualizar franquicia

PUT /api/franchises/:id

---

## Eliminar franquicia

DELETE /api/franchises/:id

---

# Asignar usuario a franquicia

POST /api/franchises/users

Body:

```json
{
  "user_id": 1,
  "franchise_id": 1,
  "role": "admin"
}
```

---

# Productos

## Crear producto

POST /api/products

Headers:

```
Authorization: Bearer TOKEN
x-franchise-id: 1
```

Body:

```json
{
  "name": "Coca Cola",
  "description": "Bebida gaseosa",
  "price": 5000,
  "stock": 20
}
```

---

## Obtener productos

GET /api/products

---

# Órdenes

## Crear orden

POST /api/orders

Headers:

```
Authorization: Bearer TOKEN
x-franchise-id: 1
```

Body:

```json
{
  "items": [
    {
      "product_id": 1,
      "quantity": 2
    }
  ]
}
```

---

# Funcionamiento del sistema de órdenes

Cuando se crea una orden el sistema realiza los siguientes pasos:

1. Inicia una transacción en la base de datos
2. Crea la orden
3. Agrega los productos en `order_items`
4. Calcula el total de la orden
5. Reduce el stock de los productos
6. Confirma la transacción

Si ocurre un error en cualquier paso, todos los cambios se cancelan.

---

# Flujo de compra

```
Usuario
   ↓
Login
   ↓
Selecciona productos
   ↓
POST /api/orders
   ↓
Crear orden
   ↓
Guardar productos de la orden
   ↓
Reducir stock
   ↓
Calcular total
```

---

# Instalación del proyecto

Clonar repositorio:

```
git clone https://github.com/Albert21Arg/Plataforma-multi-franquicia-JS.git
```

Entrar al proyecto:

```
cd backend-franquicias
```

Instalar dependencias:

```
npm install
```

Configurar variables de entorno:

```
DB_HOST=
DB_USER=
DB_PASSWORD=
DB_NAME=
JWT_SECRET=
```

Ejecutar el servidor:

```
npm run dev
```

---

# Estado actual del proyecto

Actualmente el backend incluye:

* Autenticación con JWT
* Registro y login de usuarios
* Sistema multi-franquicia
* CRUD de franquicias
* Asignación de usuarios a franquicias
* CRUD de productos
* Sistema de órdenes
* Reducción automática de stock
* Transacciones en base de datos

---

# Mejoras futuras

* Roles y permisos por franquicia
* Historial de órdenes
* Dashboard de ventas
* Reportes de ventas
* Paginación en productos
* Filtros por categoría
* Documentación de API con Swagger
* Sistema de carrito de compras
* Panel administrativo

```
```
