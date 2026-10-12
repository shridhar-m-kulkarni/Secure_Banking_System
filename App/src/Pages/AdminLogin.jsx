import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../Css/Admin.css";
import axios from "axios";

function AdminLogin() {
  const navigate = useNavigate();

  const [adminId, setAdminId] = useState("");
  const [password, setPassword] = useState("");


  const AdminLogin = async() =>{
    const AdimnSend = await axios.post("http://localhost:3001/admin-login",{
      adminId,
      password

    },
  {
    withCredentials: true
  }
  )

  console.log(AdimnSend);
  if(AdimnSend.data.message === true){
    navigate("/admin-page")
  }
  
  }


  const handleSubmit = (e) => {
    e.preventDefault();
    AdminLogin();

  
  };

  return (
    <div className="login-page">

      {/* ================= HEADER ================= */}

      <header className="login-header">

        <div className="bank-logo">

          <div className="bank-logo-icon">
            🏦
          </div>

          <div>
            <h2>SecureBank</h2>
            <span>Banking Made Simple</span>
          </div>

        </div>

        <a href="/" className="back-home">
          ← Back to Home
        </a>

      </header>

      {/* Main Content */}
      <main className="admin-login-container">

        {/* Login Card */}
        <div className="admin-login-card">

          <div className="admin-icon">
            🔐
          </div>

          <h1>Admin Login</h1>

          <p className="admin-login-subtitle">
            Sign in to access the SecureBank Administration Panel
          </p>

          <form onSubmit={handleSubmit}>

            {/* Admin ID */}
            <div className="form-group">
              <label htmlFor="adminId">
                Admin ID
              </label>

              <input
                type="text"
                id="adminId"
                placeholder="Enter Admin ID"
                value={adminId}
                onChange={(e) => setAdminId(e.target.value)}
                required
              />
            </div>

            {/* Password */}
            <div className="form-group">
              <label htmlFor="adminPassword">
                Password
              </label>

              <input
                type="password"
                id="adminPassword"
                placeholder="Enter Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

          
            <div className="admin-login-options">

             

              <a href="#forgot-password">
                Forgot Password?
              </a>

            </div>

            {/* Login Button */}
            <button
              type="submit"
              className="admin-login-button"
            >
              Login to Admin Panel
            </button>

          </form>

          {/* Security Notice */}
          <div className="admin-security-notice">
            <strong>🛡️ Security Notice</strong>

            <p>
              This portal is restricted to authorized SecureBank
              administrators only. Unauthorized access is prohibited.
            </p>
          </div>

        </div>

        {/* Right Side Information */}
        <div className="admin-login-info">

          <h2>SecureBank Administration</h2>

          <p>
            Manage and monitor banking operations from one secure
            administration portal.
          </p>

          <div className="admin-feature">
            <span>👥</span>

            <div>
              <h3>Customer Management</h3>
              <p>
                Manage customer information and accounts.
              </p>
            </div>
          </div>

          <div className="admin-feature">
            <span>💳</span>

            <div>
              <h3>Transaction Monitoring</h3>
              <p>
                Monitor and manage banking transactions.
              </p>
            </div>
          </div>

          <div className="admin-feature">
            <span>📊</span>

            <div>
              <h3>Reports & Analytics</h3>
              <p>
                View important banking reports and statistics.
              </p>
            </div>
          </div>

          <div className="admin-feature">
            <span>🔒</span>

            <div>
              <h3>Secure Access</h3>
              <p>
                Protected access for authorized administrators.
              </p>
            </div>
          </div>

        </div>

      </main>

      {/* Footer */}
      <footer className="admin-login-footer">
        <p>
          © 2026 SecureBank. All Rights Reserved.
        </p>

        <p>
          For technical assistance, contact IT Support.
        </p>
      </footer>

    </div>
  );
}

export default AdminLogin;