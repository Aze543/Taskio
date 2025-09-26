export default function CompletedTasks({ tasks, loading }) {
  return (
    <div className="container mt-4">
      <h2 className="mb-4 mx-2 fw-bold">Completed Task</h2>
      {loading && <p className="my-2">Loading Tasks...</p>}

      <div className="card shadow-sm mt-3">
        <div className="card-body">
          <div className="table-responsive">
            <table className="table align-middle">
              <thead className="table-light">
                <tr>
                  <th scope="col">Task Name</th>
                  <th scope="col">Deadline</th>
                  <th scope="col ">Date Accomplished</th>
                </tr>
              </thead>
              <tbody>
                {tasks?.map((task, index) => (
                  <tr key={index}>
                    <td>{task.title}</td>
                    <td>{task.deadline}</td>
                    {task.checked === true && <td>{task.date_finished}</td>}
                    {task.checked === false && <td>Not Accomplished</td>}
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
