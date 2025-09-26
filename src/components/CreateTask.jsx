import { Modal, Button } from "react-bootstrap"
import { useState } from "react"

function CreateTask({ addTask, setNewTask }) {
  const [show, setShow] = useState(false)

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const today = new Date()
  today.setHours(0, 0, 0, 0) 
  const todayStr = today.toLocaleDateString("en-CA")

  const handleSubmit = (e) => {
    e.preventDefault()
    const formData = new FormData(e.target)
    const taskData = {
      title: formData.get("title"),
      deadline: new Date(formData.get("endDate")).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
      content: formData.get("content"),
    }

    if (!taskData) return
    addTask(taskData)
    setNewTask("")
    setTitle("")
    setContent("")
    e.target.reset()
    handleClose()
  }

  return (
    <>
      <a
        href="#"
        className="add-task"
        onClick={(e) => {
          e.preventDefault()
          handleShow()
        }}
      >
        Add Task
      </a>

      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Create Task</Modal.Title>
        </Modal.Header>

        <form onSubmit={handleSubmit}>
          <Modal.Body>
            <div className="mb-3">
              <label className="form-label">Title</label>
              <input
                name="title"
                type="text"
                className="form-control"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter task title"
                maxLength={10}
                required
              />
              <small className="mx-2">characters: {title.length}/10</small>
            </div>

            <div className="row">
              <div className="col">
                <label className="form-label">End Date</label>
                <input
                  name="endDate"
                  type="date"
                  className="form-control"
                  min={todayStr}
                  required
                />
              </div>
            </div>

            <div className="mt-3">
              <label className="form-label">Description</label>
              <textarea
                name="content"
                className="form-control"
                rows="3"
                placeholder="Enter task description"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                maxLength={40}
                required
              />
              <small className="mx-2">characters: {content.length}/40</small>
            </div>
          </Modal.Body>

          <Modal.Footer>
            <Button type="submit" className="btn btn-gradient">
              Save Task
            </Button>
          </Modal.Footer>
        </form>
      </Modal>
    </>
  )
}

export default CreateTask
