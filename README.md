# 🚀 Temporal AI

**Temporal AI** is a full-stack application that allows users to log in, access their profile, update their details, and persist changes through a Temporal workflow — ensuring instant and consistent updates to the database using background job execution.

---

## 📸 Demo

> (You can add a screenshot or GIF here if available)

---

## 🛠 Tech Stack

- **Frontend:** React + Vite
- **Backend:** Node.js + Express + MongoDB
- **Workflow Orchestration:** [Temporal.io](https://temporal.io/)
- **Containerization:** Docker + Docker Compose

---

## 🧠 Temporal Workflow Usage

This project leverages **Temporal** to manage the user profile update process in the background. Instead of connecting to the database repeatedly, a **`userUpdateWorkflow`** is triggered on each update, and Temporal handles the persistence and reliability of the update.

---

## 📂 Folder Structure

```
project-root/
├── backend/
│   ├── activities/userActivities.ts
│   ├── models/User.ts
│   ├── routes/userRoutes.ts
│   ├── workflows/userWorkflows.ts
│   ├── .env
│   └── index.ts
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   ├── auth/
│   │   │   ├── auth0-context.ts
│   │   │   ├── AuthProvider.tsx
│   │   │   └── useAuth0.ts
│   │   ├── Pages/
│   │   │   ├── Profile.css
│   │   │   └── Profile.tsx
│   │   ├── App.tsx
│   │   └── main.tsx
│   ├── index.html
│   ├── package.json
│   └── package-lock.json
├── docker-compose/
│   └── docker-compose.yml
└── README.md
```

---

## 🧪 Environment Variables

### 🔐 Frontend (`.env`)
```env
VITE_AUTH0_DOMAIN=dev-0fbpkzbuaedmrghn.us.auth0.com
VITE_AUTH0_CLIENT_ID=hx0sTLTqCvHgEzyCi0ycKqeVFjETyY4I
```

### 🔐 Backend (`.env`)
```env
MONGO_URI=mongodb+srv://badri:singh@cluster0.frdj16f.mongodb.net/temperolAiDB?retryWrites=true&w=majority&appName=Cluster0
CRUD_CRUD_API=https://crudcrud.com/api/e3d4956e451f42e097be001f8d5f1ffd
```

### 🐳 Docker (`docker-compose/.env`)
```env
COMPOSE_PROJECT_NAME=temporal
CASSANDRA_VERSION=3.11.9
ELASTICSEARCH_VERSION=7.17.27
MYSQL_VERSION=8
TEMPORAL_VERSION=1.27.2
TEMPORAL_ADMINTOOLS_VERSION=1.27.2-tctl-1.18.2-cli-1.3.0
TEMPORAL_UI_VERSION=2.34.0
POSTGRESQL_VERSION=16
POSTGRES_PASSWORD=temporal
POSTGRES_USER=temporal
POSTGRES_DEFAULT_PORT=5432
OPENSEARCH_VERSION=2.5.0
```

---

## 🚀 Local Development Setup

### 1. Clone the Repository

```bash
git clone https://github.com/badrisinghoo7/temporal-ai.git
cd temporal-ai
```

---

### 2. Start Temporal Services via Docker

```bash
cd docker-compose
docker-compose up -d
```

> This will start Temporal server and UI.  
> Temporal UI: [http://localhost:8080](http://localhost:8080)

---

### 3. Run Backend

```bash
cd backend
npm install
npm run dev
```

> Backend runs on: [http://localhost:5000](http://localhost:5000)

---

### 4. Run Frontend

```bash
cd frontend
npm install
npm run dev
```

> Frontend runs on: [http://localhost:5173](http://localhost:5173)

---

## ✅ Features

* 🔐 Login using Auth0
* 👤 View & update profile details
* ⚙️ Backend orchestrated using Temporal workflows
* 🧠 Async updates with Temporal queue
* 🐳 Easy Docker-based setup

---

## 🧠 Temporal Workflow Logic

* User clicks **Update Profile**
* Backend route `/api/users/:id` triggers a **PUT** request
* Temporal client starts a workflow (`updateUserWorkflow`) with task queue `user-queue`
* Temporal worker handles the DB update using activities
* Ensures reliable background execution with retries and monitoring

---

## ✨ Author

👨‍💻 [@badrisinghoo7](https://github.com/badrisinghoo7)

---

## 📜 License

This project is licensed under the MIT License. See `LICENSE` for details.
