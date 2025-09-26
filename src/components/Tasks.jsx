export default function Tasks({ tasks, loading, handleDelete, handleStatus }) {
  return (
    <>
      <h2 className="mb-4 mx-2 fw-bold">Let's see your task!</h2>
      {loading && (
        <div className="d-flex justify-content-center my-3">
          <div
            className="spinner-border "
            style={{
              width: "3rem",
              height: "3rem",
              marginTop: "100px",
              color: "#06002b",
            }}
            role="status"
          >
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )}
      <div className="row g-4 mx-2">
        {tasks.map((task, index) => (
          <div key={index} className="col-12 col-md-6 col-lg-4">
            <div className="task-card position-relative p-3 rounded shadow-sm">
              <button
                className="position-absolute top-0 end-0 m-2 border-0 bg-transparent text-danger fw-bold"
                onClick={() => handleDelete(task.id)}
                style={{
                  fontSize: "1.75rem",
                  lineHeight: 1,
                  cursor: "pointer",
                }}
              >
                ✕
              </button>
              <span className={`tag ${task.type} mb-2`}>{task.tag}</span>
              <h5 className="fw-bold">{task.title}</h5>
              <p className="text-muted small">{task.content}</p>
              <div className="text-muted mb-2">📅 {task.deadline}</div>
              <div className="text-end">
                <button
                  style={{ borderRadius: "8px" }}
                  className={`btn btn-sm ${
                    task.tag === "Not Started"
                      ? "btn-primary"
                      : task.tag === "Ongoing"
                        ? "btn-success"
                        : "btn-secondary"
                  }`}
                  onClick={() => handleStatus(task.id, task.tag)}
                  disabled={task.tag === "Completed"}
                >
                  {task.tag === "Not Started"
                    ? "Start"
                    : task.tag === "Ongoing"
                      ? "Complete"
                      : "Completed"}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}
