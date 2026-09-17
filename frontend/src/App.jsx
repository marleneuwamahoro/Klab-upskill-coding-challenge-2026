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

  const loadTasks = async () => {
    try {
      const data = await getTasks();
      setTasks(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    loadTasks();
  }, []);

  const handleCreate = async (task) => {
    try {
      await createTask(task);
      await loadTasks();
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdate = async (task) => {
    try {
      await updateTask(editingTask.id, task);
      setEditingTask(null);
      await loadTasks();
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteTask(id);
      await loadTasks();
    } catch (error) {
      console.error(error);
    }
  };

  const handleToggleStatus = async (task) => {
    const newStatus =
      task.status === "Completed" ? "Pending" : "Completed";

    try {
      await updateTask(task.id, {
        title: task.title,
        description: task.description,
        status: newStatus,
        priority: task.priority,
      });

      await loadTasks();
    } catch (error) {
      console.error(error);
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

      <TaskForm
        onSubmit={editingTask ? handleUpdate : handleCreate}
        editingTask={editingTask}
        onCancel={() => setEditingTask(null)}
      />

      <hr />

      <div>
        <button onClick={() => setFilter("All")}>All</button>
        <button onClick={() => setFilter("Pending")}>Pending</button>
        <button onClick={() => setFilter("Completed")}>
          Completed
        </button>
      </div>

      <TaskList
        tasks={filteredTasks}
        onEdit={setEditingTask}
        onDelete={handleDelete}
        onToggleStatus={handleToggleStatus}
      />
    </div>
  );
}

export default App;