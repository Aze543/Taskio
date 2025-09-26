import { useUser } from "@clerk/clerk-react";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const { isSignedIn, isLoaded } = useUser()
  if (!isLoaded) return <div></div>
  return isSignedIn ? children : <Navigate to="/sign-in" replace />
}