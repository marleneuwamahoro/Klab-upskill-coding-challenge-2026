function TaskList({ tasks, onEdit, onDelete, onToggleStatus }) {
  if (tasks.length === 0) {
    return (
      <div className="empty-state">
        <p>No tasks found.</p>
      </div>
    );
  }

  return (
    <div className="table-container">
      <table className="task-table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Status</th>
            <th>Priority</th>
            <th>Created</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {tasks.map((task) => (
            <tr key={task.id}>
              <td>
                <strong>{task.title}</strong>
              </td>

              <td>{task.description}</td>

              <td>
                {task.status === "COMPLETED"
                  ? "Completed"
                  : "Pending"}
              </td>

              <td>{task.priority}</td>

              <td>
                {new Date(task.createdAt).toLocaleDateString()}
              </td>

              <td>
                <div className="table-actions">
                  <button
                    onClick={() => onToggleStatus(task)}
                  >
                    {task.status === "COMPLETED"
                      ? "Pending"
                      : "Complete"}
                  </button>

                  <button
                    onClick={() => onEdit(task)}
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => onDelete(task.id)}
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TaskList;