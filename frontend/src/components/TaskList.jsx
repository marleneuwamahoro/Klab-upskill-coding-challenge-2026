function TaskList({ tasks, onEdit, onDelete, onToggleStatus }) {
  return (
    <div>
      {tasks.map((task) => (
        <div key={task.id}>
          <h3>{task.title}</h3>

          <p>{task.description}</p>

          <p>Status: {task.status}</p>

          <p>Priority: {task.priority}</p>

          <button onClick={() => onToggleStatus(task)}>
            {task.status === "Completed" ? "Mark Pending" : "Mark Completed"}
          </button>

          <button onClick={() => onEdit(task)}>
            Edit
          </button>

          <button onClick={() => onDelete(task.id)}>
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}

export default TaskList;