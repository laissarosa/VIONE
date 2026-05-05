# 🛍️ Vione — Fullstack E-commerce Project

## 🇧🇷 Versão em Português

## 📖 Visão Geral

Este projeto é uma simulação de e-commerce de roupas, desenvolvido para obtenção parcial de nota na disciplina **Laboratório de Programação**.

* **Backend**: API em Node.js + Express + Prisma + MySQL
* **Frontend**: SPA em React + Vite + React Router
* **Infra**: Docker Compose para orquestração

---

## 📂 Estrutura de Pastas

### 🔧 Backend (`backend`)

```
backend/
├── Dockerfile
├── .gitignore
├── package.json
├── prisma/              # schema, seed, migrations
└── src/
    ├── server.js
    ├── expressApp.js
    ├── database/
    │   └── db.js
    ├── middleware/
    │   └── authMiddleware.js
    ├── routes/          # auth, products, cart, favorites
    ├── controllers/     # auth, product, cart, favorites
    └── services/        # auth, user, token, password, etc.
```

### 🎨 Frontend (`frontend_react`)

```
frontend_react/
├── Dockerfile
├── .gitignore
├── package.json
├── vite.config.js
├── index.html
├── public/              # banners e imagens
└── src/
    ├── App.jsx
    ├── main.jsx
    ├── components/      # Navbar, Footer, etc.
    ├── context/         # Auth, Cart, Favorites
    ├── pages/           # home, auth, dashboard, etc.
    ├── services/
    │   └── api.js
    ├── styles/
    └── utils/
        └── formatCPF.js
```

---

## ⚙️ Backend — Funcionalidades

* Autenticação com JWT e bcrypt
* Middleware de validação
* CRUD de produtos com imagens
* Carrinho persistente por usuário
* Sistema de favoritos
* Seed automático de produtos

---

## 🎨 Frontend — Funcionalidades

### Rotas

```
/
/login
/dashboard
/categoria/:category/:subcategory
/produto/:id
/carrinho
/favoritos
/pagamento
```

### Context API

* Autenticação
* Carrinho
* Favoritos

### Funcionalidades

* Componentes reutilizáveis (Navbar, Sidebar, HeroBanner, Footer)
* Carrinho com fallback para localStorage
* Favoritos persistidos
* Simulação de checkout

---

## 🛠️ Tecnologias Usadas

### Backend

* Node.js
* Express
* Prisma ORM
* MySQL
* JWT
* bcrypt
* dotenv
* cors

### Frontend

* React 19
* Vite
* React Router DOM
* Context API
* Fetch API
* CSS customizado

### Infraestrutura

* Docker
* Docker Compose
* Nginx
* MySQL containerizado

---

## 🚀 Como Executar

### ▶️ Usando Docker Compose

No diretório raiz:

```bash
docker-compose up --build
```

* Backend: [http://localhost:3000](http://localhost:3000)
* Frontend: [http://localhost:5173](http://localhost:5173)

---

### ▶️ Executando Separadamente

#### Backend

Crie um `.env`:

```env
DATABASE_URL=...
JWT_SECRET=...
PORT=3000
```

Execute:

```bash
node src/server.js
```

#### Frontend

```bash
npm install
npm run dev
```

---

## 🔑 API Endpoints

### 🔐 Autenticação

```
POST /auth/register
POST /auth/login
```

### 📦 Produtos

```
GET /products
GET /products/:category
GET /products/:category/:subcategory
GET /products/item/:id
```

### 🛒 Carrinho

```
GET /cart/:userId
POST /cart/:userId/add
PUT /cart/:userId/update
DELETE /cart/:userId/remove
DELETE /cart/:userId/clear
```

### ❤️ Favoritos

```
GET /favorites/:userId
POST /favorites/:userId/toggle
```

---

## 📌 Observações

* Token JWT válido por 1 hora
* Carrinho:

  * Não autenticado → localStorage
  * Autenticado → backend
* Favoritos em localStorage
* CPF formatado automaticamente
* Checkout simulado (sem pagamento real)

---

# 🇺🇸 English Version

## 📖 Overview

This project is a clothing e-commerce simulation developed as part of a **Programming Laboratory course**.

* **Backend**: Node.js + Express + Prisma + MySQL
* **Frontend**: React SPA with Vite + React Router
* **Infrastructure**: Docker Compose

---

## 📂 Project Structure

### 🔧 Backend (`backend`)

```
backend/
├── prisma/
└── src/
```

### 🎨 Frontend (`frontend_react`)

```
frontend_react/
├── public/
└── src/
```

---

## ⚙️ Backend Features

* JWT authentication
* Password hashing with bcrypt
* Product CRUD
* Persistent shopping cart
* Favorites system
* Seed data generation

---

## 🎨 Frontend Features

### Routes

```
/login
/dashboard
/category/:category/:subcategory
/product/:id
/cart
/favorites
/payment
```

### Features

* Cart with localStorage fallback
* Favorites persistence
* Checkout simulation

---

## 🛠️ Tech Stack

### Backend

* Node.js, Express
* Prisma ORM
* MySQL
* JWT, bcrypt

### Frontend

* React 19
* Vite
* React Router

### DevOps

* Docker
* Docker Compose
* Nginx

---

## 🚀 Running the Project

### With Docker

```bash
docker-compose up --build
```

### Manually

```bash
node src/server.js
npm run dev
```

---

## 📌 Notes

* JWT expires in 1 hour
* Cart uses localStorage or backend depending on auth
* Favorites stored locally
* Checkout is simulated
