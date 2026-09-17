import { useEffect, useState } from "react";
import "./App.css";

import {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
} from "./services/taskApi";

import TaskList from "./components/TaskList";
import TaskForm from "./components/TaskForm";

function App() {
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);
  const [filter, setFilter] = useState("ALL");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [notification, setNotification] = useState("");

  const showNotification = (message) => {
    setNotification(message);

    setTimeout(() => {
      setNotification("");
    }, 3000);
  };

  const loadTasks = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await getTasks();
      setTasks(data);
    } catch (error) {
      console.error(error);
      setError("Unable to load tasks.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTasks();
  }, []);

  const handleCreate = async (task) => {
    try {
      setError("");

      await createTask(task);
      await loadTasks();

      showNotification("Task created successfully!");
    } catch (error) {
      console.error(error);
      setError("Unable to create task.");
    }
  };

  const handleUpdate = async (task) => {
    try {
      setError("");

      await updateTask(editingTask.id, task);

      setEditingTask(null);
      await loadTasks();

      showNotification("Task updated successfully!");
    } catch (error) {
      console.error(error);
      setError("Unable to update task.");
    }
  };

  const handleDelete = async (id) => {
    try {
      setError("");

      await deleteTask(id);
      await loadTasks();

      showNotification("Task deleted successfully!");
    } catch (error) {
      console.error(error);
      setError("Unable to delete task.");
    }
  };

  const handleToggleStatus = async (task) => {
    const newStatus =
      task.status === "COMPLETED"
        ? "PENDING"
        : "COMPLETED";

    try {
      setError("");

      await updateTask(task.id, {
        title: task.title,
        description: task.description,
        status: newStatus,
        priority: task.priority,
      });

      await loadTasks();

      if (newStatus === "COMPLETED") {
        showNotification("Task marked as completed!");
      } else {
        showNotification("Task marked as pending!");
      }
    } catch (error) {
      console.error(error);
      setError("Unable to update task status.");
    }
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === "ALL") {
      return true;
    }

    return task.status === filter;
  });

  const totalTasks = tasks.length;

  const pendingTasks = tasks.filter(
    (task) => task.status === "PENDING"
  ).length;

  const completedTasks = tasks.filter(
    (task) => task.status === "COMPLETED"
  ).length;

  return (
    <div className="app">

      {/* Notification */}
      {notification && (
        <div className="notification">
          <span className="notification-icon">✓</span>
          <span>{notification}</span>
        </div>
      )}

      <header className="dashboard-header">
        <div>
          <p className="eyebrow">TASK MANAGEMENT</p>

          <h1>Task Management System</h1>

          <p className="subtitle">
            Create, organize and track your tasks in one place.
          </p>
        </div>

        <div className="header-icon">✓</div>
      </header>

      {error && (
        <div className="error-message">
          <span>!</span>
          {error}
        </div>
      )}

      <section className="stats-grid">

        <div className="stat-card">
          <div>
            <p>Total Tasks</p>
            <h2>{totalTasks}</h2>
          </div>

          <div className="stat-icon total">
            ✓
          </div>
        </div>

        <div className="stat-card">
          <div>
            <p>Pending</p>
            <h2>{pendingTasks}</h2>
          </div>

          <div className="stat-icon pending">
            ◷
          </div>
        </div>

        <div className="stat-card">
          <div>
            <p>Completed</p>
            <h2>{completedTasks}</h2>
          </div>

          <div className="stat-icon completed">
            ✓
          </div>
        </div>

      </section>

      <section className="content-grid">

        <div className="form-section">

          <TaskForm
            onSubmit={
              editingTask
                ? handleUpdate
                : handleCreate
            }
            editingTask={editingTask}
            onCancel={() => setEditingTask(null)}
          />

        </div>

        <div className="tasks-section">

          <div className="section-header">

            <div>
              <h2>My Tasks</h2>

              <p>
                {filteredTasks.length} tasks displayed
              </p>
            </div>

            <div className="filter-container">

              <button
                className={`filter-button ${
                  filter === "ALL" ? "active" : ""
                }`}
                onClick={() => setFilter("ALL")}
              >
                All
              </button>

              <button
                className={`filter-button ${
                  filter === "PENDING" ? "active" : ""
                }`}
                onClick={() => setFilter("PENDING")}
              >
                Pending
              </button>

              <button
                className={`filter-button ${
                  filter === "COMPLETED" ? "active" : ""
                }`}
                onClick={() => setFilter("COMPLETED")}
              >
                Completed
              </button>

            </div>

          </div>

          {loading ? (
            <div className="empty-state">
              <p>Loading tasks...</p>
            </div>
          ) : (
            <TaskList
              tasks={filteredTasks}
              onEdit={setEditingTask}
              onDelete={handleDelete}
              onToggleStatus={handleToggleStatus}
            />
          )}

        </div>

      </section>

    </div>
  );
}

export default App;