import { Routes, Route } from "react-router-dom"
import Home from "./Home.jsx"
import { SignIn, SignUp } from "@clerk/clerk-react"
import TaskioApp from "./TaskioApp.jsx"
import ProtectedRoute from "./components/ProtectedRoutes.jsx"

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route
        path="/sign-in/*"
        element={
          <div
            style={{
              alignItems: "center",
              justifyContent: "center",
              display: "flex",
              marginTop: "50px",
            }}
          >
            <SignIn routing="path" path="/sign-in" signUpUrl="/sign-up" />{" "}
          </div>
        }
      />
      <Route
        path="/sign-up/*"
        element={
          <div
            style={{
              alignItems: "center",
              justifyContent: "center",
              display: "flex",
              marginTop: "50px",
            }}
          >
            <SignUp routing="path" path="/sign-up" signInUrl="/sign-in" />
          </div>
        }
      />
      <Route
        path="/App"
        element={
          <ProtectedRoute>
            <TaskioApp />
          </ProtectedRoute>
        }
      />
    </Routes>
  )
}

export default App
