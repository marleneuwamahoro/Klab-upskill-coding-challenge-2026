import { useState } from "react";

function TaskForm({ onSubmit, editingTask, onCancel }) {
  const [title, setTitle] = useState(editingTask?.title || "");
  const [description, setDescription] = useState(
    editingTask?.description || ""
  );
  const [status, setStatus] = useState(editingTask?.status || "Pending");
  const [priority, setPriority] = useState(editingTask?.priority || "Medium");

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
    <form onSubmit={handleSubmit}>
      <h2>{editingTask ? "Edit Task" : "Create Task"}</h2>

      <input
        type="text"
        placeholder="Task title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />

      <textarea
        placeholder="Task description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <select value={status} onChange={(e) => setStatus(e.target.value)}>
        <option value="Pending">Pending</option>
        <option value="Completed">Completed</option>
      </select>

      <select value={priority} onChange={(e) => setPriority(e.target.value)}>
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
  );
}

export default TaskForm;