
import { Routes, Route } from "react-router-dom";

import AccountNumber from "./Pages/AccountNumber";
import AdminLogin from "./Pages/AdminLogin";
import CreateAccount from "./Pages/CreateAccount";
import Home from "./Pages/Home";
import Profile from "./Pages/Profile";
import ProtectedRoute from "./Pages/ProtectedRoute";
import UserLogin from "./Pages/UserLogin";
import PublicRoute from "./Pages/PublicRoute";
import NotFound from "./Pages/NotFound";
import AdminDashboard from "./Pages/AdminDashboard";
import PublicRoute2 from "./Pages/PublicRoute2";
import ProtectedRoute2 from "./Pages/ProtectedRoute2";



function App() {
  return (
    // {Public routes}
    
    <Routes>
      <Route element={<PublicRoute/>}>
      
      <Route path="/" element={<Home />} />

      <Route path="/user-login" element={<UserLogin />} />
      <Route path="/create-account" element={<CreateAccount />} />
      <Route path="/account-number" element={<AccountNumber />} />
</Route>

  <Route element={<PublicRoute2/>}>
      
      

      <Route path="/admin-login-page" element={<AdminLogin />} />
</Route>


<Route path="*" element={<NotFound />} />

      {/* Protected routes */}
      <Route element={<ProtectedRoute />}>
        <Route path="/profile-page" element={<Profile />} />

      </Route>

{/* Protected routes2 */}
      <Route element={<ProtectedRoute2/>}>
        <Route path="/admin-page" element={<AdminDashboard/>} />

      </Route>

    </Routes>
  );
}

export default App;
