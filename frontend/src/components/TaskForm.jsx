import { useEffect, useState } from "react";

function TaskForm({ onSubmit, editingTask, onCancel }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("Pending");
  const [priority, setPriority] = useState("Medium");

  useEffect(() => {
    if (editingTask) {
      setTitle(editingTask.title || "");
      setDescription(editingTask.description || "");
      setStatus(editingTask.status || "Pending");
      setPriority(editingTask.priority || "Medium");
    } else {
      setTitle("");
      setDescription("");
      setStatus("Pending");
      setPriority("Medium");
    }
  }, [editingTask]);

  const handleSubmit = (e) => {
    e.preventDefault();

    onSubmit({
      title,
      description,
      status,
      priority,
    });

    if (!editingTask) {
      setTitle("");
      setDescription("");
      setStatus("Pending");
      setPriority("Medium");
    }
  };

  return (
    <div className="form-container">
      <h2>{editingTask ? "Edit Task" : "Create New Task"}</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Task title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <textarea
          placeholder="Task description"
          rows="4"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="Pending">Pending</option>
          <option value="Completed">Completed</option>
        </select>

        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
        >
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>

        <button type="submit">
          {editingTask ? "Update Task" : "Create Task"}
        </button>

        {editingTask && (
          <button type="button" onClick={onCancel}>
            Cancel
          </button>
        )}
      </form>
    </div>
  );
}

export default TaskForm;