# Task Management System

A full-stack Task Management System that allows users to create, view, update, delete, and organize tasks by status and priority.

## Technologies Used

### Backend

- Python
- Django
- Django REST Framework
- SQLite
- django-cors-headers

### Frontend

- React
- Vite
- JavaScript
- Axios
- CSS

## Features

- View all tasks
- Create new tasks
- Edit existing tasks
- Delete tasks
- Mark tasks as Pending or Completed
- Filter tasks by status
- Set task priority
- Display task creation date
- Success notifications
- Responsive dashboard interface
- Loading and error messages

## Project Structure

```text
task-management-system/
│
├── backend/
│   ├── config/
│   ├── tasks/
│   │   ├── migrations/
│   │   ├── models.py
│   │   ├── serializers.py
│   │   ├── urls.py
│   │   └── views.py
│   ├── manage.py
│   └── requirements.txt
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── TaskForm.jsx
│   │   │   └── TaskList.jsx
│   │   ├── services/
│   │   │   └── taskApi.js
│   │   ├── App.jsx
│   │   ├── App.css
│   │   └── main.jsx
│   ├── package.json
│   └── vite.config.js
│
└── README.md
```

## Task Fields

Each task contains:

| Field | Description |
|---|---|
| `id` | Unique task identifier |
| `title` | Task title |
| `description` | Task description |
| `status` | Pending or Completed |
| `priority` | Low, Medium, or High |
| `createdAt` | Date and time the task was created |

## Backend Setup

### 1. Clone the repository

```bash
git clone https://github.com/marleneuwamahoro/Klab-upskill-coding-challenge-2026.git
cd Klab-upskill-coding-challenge-2026
```

### 2. Go to the backend

```bash
cd backend
```

### 3. Create a virtual environment

```bash
python3 -m venv .venv
```

### 4. Activate the virtual environment

Linux/macOS:

```bash
source .venv/bin/activate
```

### 5. Install dependencies

```bash
pip install -r requirements.txt
```

### 6. Run database migrations

```bash
python3 manage.py migrate
```

### 7. Start the Django server

```bash
python3 manage.py runserver
```

The backend will run at:

```text
http://127.0.0.1:8000/
```

## Frontend Setup

Open another terminal.

### 1. Go to the frontend

From the project root:

```bash
cd frontend
```

### 2. Install dependencies

```bash
npm install
```

### 3. Start the development server

```bash
npm run dev
```

The frontend will normally run at:

```text
http://localhost:5173/
```

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/tasks/` | Get all tasks |
| GET | `/api/tasks/<id>/` | Get one task |
| POST | `/api/tasks/` | Create a task |
| PUT | `/api/tasks/<id>/` | Update a task |
| DELETE | `/api/tasks/<id>/` | Delete a task |

## Filtering

Tasks can be filtered by their status.

### Pending Tasks

```text
GET /api/tasks/?status=PENDING
```

### Completed Tasks

```text
GET /api/tasks/?status=COMPLETED
```

## Example Task

```json
{
  "title": "Complete KLab Challenge",
  "description": "Finish the task management system",
  "status": "PENDING",
  "priority": "HIGH"
}
```

## Technical Decisions

### Django REST Framework

Django REST Framework was used to build the backend REST API because it provides serializers, API views, validation, and easy database integration.

### SQLite

SQLite was selected as the database because it is lightweight and suitable for this task management application.

### React

React was used to build the frontend because it makes it easy to create reusable components and manage application state.

### Axios

Axios is used to communicate between the React frontend and the Django REST API.

### CORS

`django-cors-headers` was configured to allow the React development server to communicate with the Django backend.

## Additional Features

In addition to the required CRUD functionality, the application includes:

- Task priority levels
- Pending and Completed status
- Status filtering
- Dashboard task statistics
- Success notifications
- Responsive user interface
- Loading and error messages

## Running the Application

Start the backend first:

```bash
cd backend
source .venv/bin/activate
python3 manage.py runserver
```

Then start the frontend in another terminal:

```bash
cd frontend
npm install
npm run dev
```

Open the application in your browser:

```text
http://localhost:5173/
```

## Author

Marlene Uwamahoro