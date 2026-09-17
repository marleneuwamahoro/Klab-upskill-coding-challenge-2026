import { useEffect, useState } from "react";
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
  const [filter, setFilter] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

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
    } catch (error) {
      console.error(error);
      setError("Unable to delete task.");
    }
  };

  const handleToggleStatus = async (task) => {
    const newStatus =
      task.status === "Completed" ? "Pending" : "Completed";

    try {
      setError("");

      await updateTask(task.id, {
        title: task.title,
        description: task.description,
        status: newStatus,
        priority: task.priority,
      });

      await loadTasks();
    } catch (error) {
      console.error(error);
      setError("Unable to update task status.");
    }
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === "All") {
      return true;
    }

    return task.status === filter;
  });

  return (
    <div>
      <h1>Task Management System</h1>

      {error && <p>{error}</p>}

      <TaskForm
        onSubmit={editingTask ? handleUpdate : handleCreate}
        editingTask={editingTask}
        onCancel={() => setEditingTask(null)}
      />

      <hr />

      <div>
        <button onClick={() => setFilter("All")}>
          All
        </button>

        <button onClick={() => setFilter("Pending")}>
          Pending
        </button>

        <button onClick={() => setFilter("Completed")}>
          Completed
        </button>
      </div>

      {loading ? (
        <p>Loading tasks...</p>
      ) : (
        <TaskList
          tasks={filteredTasks}
          onEdit={setEditingTask}
          onDelete={handleDelete}
          onToggleStatus={handleToggleStatus}
        />
      )}
    </div>
  );
}

export default App;