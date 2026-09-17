function TaskList({ tasks, onEdit, onDelete, onToggleStatus }) {
  if (tasks.length === 0) {
    return <p>No tasks found.</p>;
  }

  return (
    <div className="task-grid">
      {tasks.map((task) => (
        <div className="task-card" key={task.id}>
          <h3>{task.title}</h3>

          <p>{task.description}</p>

          <p>
            <strong>Status:</strong> {task.status}
          </p>

          <p>
            <strong>Priority:</strong> {task.priority}
          </p>

          <p>
            <strong>Created:</strong> {task.createdAt}
          </p>

          <div className="task-actions">
            <button onClick={() => onToggleStatus(task)}>
              {task.status === "Completed"
                ? "Mark Pending"
                : "Mark Completed"}
            </button>

            <button onClick={() => onEdit(task)}>
              Edit
            </button>

            <button onClick={() => onDelete(task.id)}>
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default TaskList;