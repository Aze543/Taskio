export default function MyTasks({ tasks, loading }) {
  return (
    <div className="container mt-4">
      <h2 className="mb-4 mx-2 fw-bold">Your Task</h2>
      {loading && <p className="my-2">Loading Tasks...</p>}

      <div className="card shadow-sm mt-3">
        <div className="card-body">
          <div className="table-responsive">
            <table className="table align-middle">
              <thead className="table-light">
                <tr>
                  <th scope="col">Task Name</th>
                  <th scope="col">Status</th>
                  <th scope="col">Deadline</th>
                </tr>
              </thead>
              <tbody>
                {tasks?.map((task, index) => (
                  <tr key={index}>
                    <td>{task.title}</td>
                    <td>
                      <span className={`mt-2 tag ${task.type}`}>
                        {task.tag}
                      </span>
                    </td>
                    <td>{task.deadline}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
