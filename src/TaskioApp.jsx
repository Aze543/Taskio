import taskiologo from './assets/taskio_logo.png'
import { useState, useEffect } from 'react'
import apiRequest from './components/apiRequest'
import CreateTask from './components/CreateTask'
import { useUser } from '@clerk/clerk-react'
import Sidebar from './components/SideBar'
import Tasks from './components/Tasks'
import MyTasks from './components/MyTasks'
import CompletedTasks from './components/CompletedTasks'
import "bootstrap/dist/css/bootstrap.min.css"
import "./css/TaskioApp.css"

const TaskioApp = () => {

  const [tasks, setTasks] = useState([])
  const [_, setNewTask] = useState('')
  const [activeTab, setActiveTab] = useState("home")
  const [__, setFetchError] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const { user } = useUser()

  const TASK_API = 'https://taskioapi.onrender.com/tasks'

  useEffect(() => {
  const fetch_tasks = async () => {
    try {
      const r = await fetch(`https://taskioapi.onrender.com/users/${user.id}`)
      if (!r.ok) throw Error("Failed")
    } catch (err) {
      setFetchError(err.message)

      const newUser = {
          id: user.id,
          name: user.username,
        }
      const createResponse = await fetch("https://taskioapi.onrender.com/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newUser)
      })

      if (!createResponse.ok) throw Error("Failed creating new user.")
    

    } finally {
      const response = await fetch(`${TASK_API}?user_id=${user.id}`)
      if (!response.ok) throw Error("Failed fetching user data.")
      const listtasks = await response.json()
      setTasks(listtasks)
      setFetchError(null)
      setIsLoading(false)
    }
  }

  setTimeout(() => fetch_tasks(), 2000)
}, [user])

  const addTask = async (task) => {
    // console.log(task)
    const id = `${user.id}_${Date.now()}`
    const myNewTask = {id: id, user_id:user.id, checked: false, ...task, tag: "Not Started", type: "not-started" }
    const listTask = [...tasks, myNewTask]
    setTasks(listTask)
    const postOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(myNewTask)
    };

    const result = await apiRequest(TASK_API, postOptions);
    if (result) setFetchError(result);
  }

  const handleStatus = async (task_id, task_tag) => {
    if (task_tag === "Not Started") {
      const listTasks = tasks.map((task) => task.id === task_id && task.user_id === user.id ? {...task, tag: "Ongoing", type: "ongoing" } : task)
      setTasks(listTasks)
      const myTask = listTasks.filter((task) => task.id === task_id && task.user_id === user.id)
      const updateOptions = {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ tag: myTask[0].tag, type: myTask[0].type })
      }
      const reqUrl = `${TASK_API}/${myTask[0].id}`
      const result = await apiRequest(reqUrl, updateOptions)
      if (result) setFetchError(result)
    } else {
      const dateFinished = new Date().toLocaleDateString("en-US", { 
        year: "numeric", 
        month: "long", 
        day: "numeric" 
      })
      const listTasks = tasks.map((task) => task.id === task_id && task.user_id === user.id ? {...task,checked: true, tag: "Done", type: "done", date_finished: dateFinished} : task)
      setTasks(listTasks)
      const myTask = listTasks.filter((task) => task.id === task_id && task.user_id === user.id)
      const updateOptions = {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ checked: myTask[0].checked, tag: myTask[0].tag, type: myTask[0].type, date_finished: myTask[0].date_finished })
      }
      const reqUrl = `${TASK_API}/${myTask[0].id}`
      const result = await apiRequest(reqUrl, updateOptions)
      if (result) setFetchError(result)
    }
  }

  const handleDelete = async (id) => {
    const listTasks = tasks.filter((task) => task.id !== id)
    setTasks(listTasks)
    const deleteOptions = { method: 'DELETE' }
    const reqUrl = `${TASK_API}/${id}`
    const result = await apiRequest(reqUrl, deleteOptions)
    if (result) setFetchError(result)
  }

  console.log(user)

  return (
    <div className="my-3">
      <nav
  activekey={activeTab}
  onSelect={(selectedKey) => setActiveTab(selectedKey)}
  className="navbar navbar-expand-lg taskio-navbar"
>
  <div className="container-fluid">
   
    <a
      className="navbar-brand d-flex align-items-center fw-bold text-dark"
      href=""
    >
      <img
        style={{ backgroundColor: "#ddcef8", borderRadius: "100%" }}
        src={taskiologo}
        alt="Logo"
      />
      Taskio
    </a>
    <button
      className="navbar-toggler d-lg-none"
      type="button"
      data-bs-toggle="collapse"
      data-bs-target="#navbarTaskio"
      aria-controls="navbarTaskio"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span className="navbar-toggler-icon"></span>
    </button>

    <div className="collapse navbar-collapse" id="navbarTaskio">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0 nav-links">
        <li className="nav-item">
          <a
            href=""
            className={`nav-link fw-bold ${
              activeTab === "home" ? "active" : ""
            }`}
            onClick={(e) => {
              e.preventDefault();
              setActiveTab("home");
            }}
          >
            Home
          </a>
        </li>
        <li className="nav-item">
          <a
            href=""
            className={`nav-link fw-bold ${
              activeTab === "my-task" ? "active" : ""
            }`}
            onClick={(e) => {
              e.preventDefault();
              setActiveTab("my-task");
            }}
          >
            My Task
          </a>
        </li>
        <li className="nav-item">
          <a
            href=""
            className={`nav-link fw-bold ${
              activeTab === "completed-task" ? "active" : ""
            }`}
            onClick={(e) => {
              e.preventDefault();
              setActiveTab("completed-task");
            }}
          >
            Completed Task
          </a>
        </li>

        <li className="nav-item d-lg-none">
           <Sidebar user={user} icon={"Show Profile"} />
        </li>
      </ul>

      <div className="d-none d-lg-block">
        <Sidebar user={user} icon={"long"} />
      </div>
    </div>
  </div>
</nav>

      <div className="container mt-5">

        {activeTab === "home" && (<Tasks tasks={tasks} loading={isLoading} handleStatus={handleStatus} handleDelete={handleDelete}/>)}
        {activeTab === "my-task" && (<MyTasks loading={isLoading} tasks={tasks}/>)}
        {activeTab === "completed-task" && (<CompletedTasks loading={isLoading} tasks={tasks}/>)}
      </div>

      <CreateTask addTask={addTask} setNewTask={setNewTask}/>

    </div>
  )
}

export default TaskioApp
