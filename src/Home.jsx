import taskioLogo from './assets/taskio_logo.png'
import { Link, Navigate } from 'react-router-dom'
import { Button } from 'react-bootstrap'
import { SignedIn, SignedOut } from '@clerk/clerk-react'

const Home = () => {
  
  return (
    <>
    <SignedIn>
      <Navigate to="/App" replace/>
    </SignedIn>
    <SignedOut>
      <section className="py-3">
 <nav className="navbar d-flex justify-content-between align-items-center">
  <a className="navbar-brand d-flex align-items-center fw-bold text-dark" href="#">
    <img 
      style={{ backgroundColor: "#ddcef8", borderRadius: "100%" }} 
      src={taskioLogo} 
      alt="Logo"
    />
    Taskio
  </a>

  <div className="d-none d-sm-flex">
    <Link to={"/sign-in"}>
      <Button variant="link" className="me-3 my-1 text-dark fw-medium">Sign In</Button>
    </Link>
    <Link to={"/sign-up"}>
      <Button variant="" className="btn-gradient">Sign up →</Button>
    </Link>
  </div>
</nav>
  </section>
  <section className="hero py-5 mx-2">
    <h1 className="display-2">Work Smarter, Together<br/>or Solo Work with Taskio</h1>
    <p>Taskio helps you easily organize your to-dos, focus on what matters, and achieve more every day.</p>
   <Link to={"/sign-up"}>
     <Button variant='' className="btn-gradient">Get Started</Button>
   </Link>
  </section>
    </SignedOut>
    </>
    )
}


export default Home
