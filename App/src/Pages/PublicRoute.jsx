
import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import axios from "axios";

function PublicRoute() {
  const [authStatus, setAuthStatus] = useState("checking");

  useEffect(() => {
    let isMounted = true;

    async function checkAuthentication() {
      try {
        // Check admin authentication first
        await axios.get("http://localhost:3001/verify-admin", {
          withCredentials: true
        });

        if (isMounted) {
          setAuthStatus("admin");
        }

        return;
      } catch (error) {
        // Admin is not authenticated; check user authentication
      }

      try {
        await axios.get("http://localhost:3001/verify-user", {
          withCredentials: true
        });

        if (isMounted) {
          setAuthStatus("user");
        }
      } catch (error) {
        if (isMounted) {
          setAuthStatus("guest");
        }
      }
    }

    checkAuthentication();

    return () => {
      isMounted = false;
    };
  }, []);

  if (authStatus === "checking") {
    return <p>Checking authentication...</p>;
  }

  // Admin cannot access user-side public routes
  if (authStatus === "admin") {
    return <Navigate to="/admin-page" replace />;
  }

  // Logged-in user cannot access login/account creation pages
  if (authStatus === "user") {
    return <Navigate to="/profile-page" replace />;
  }

  // Guests can access public routes
  return <Outlet />;
}

export default PublicRoute;
