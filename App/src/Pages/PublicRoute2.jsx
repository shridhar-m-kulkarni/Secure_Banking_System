
import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import axios from "axios";

function PublicRoute2() {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:3001/verify-admin", {
        withCredentials: true
      })
      .then(() => {
        setIsAuthenticated(true);
      })
      .catch(() => {
        setIsAuthenticated(false);
      });
  }, []);

  // Wait until authentication is checked
  if (isAuthenticated === null) {
    return <p>Checking authentication...</p>;
  }

  // Redirect unauthenticated users
  if (isAuthenticated) {
    return <Navigate to="/admin-page" replace />;
  }

  // Allow authenticated users
  return <Outlet />;
}

export default PublicRoute2;
