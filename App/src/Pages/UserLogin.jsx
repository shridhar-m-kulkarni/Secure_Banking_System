
import React, { useState } from "react";
import "../Css/UserLogin.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function UserLogin() {
  const [customerId, setCustomerId] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const sendUserData = async () => {
    setLoading(true);
    setErrorMessage("");

    try {
      const response = await axios.post(
        "http://localhost:3001/login",
        {
          customerId,
          password
        },
        {
          withCredentials: true
        }
      );

      if (response.data.message === true) {
        navigate("/profile-page");
      } else {
        setErrorMessage("Login failed. Please try again.");
      }
    } catch (error) {
      if (error.response) {
        setErrorMessage(
          error.response.data.message ||
          "Invalid account number or password."
        );
      } else {
        setErrorMessage(
          "Unable to connect to the server. Please try again."
        );
      }

      console.error("Login error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    sendUserData();
  };

  return (
    <div className="login-page">

      <header className="login-header">
        <div className="bank-logo">
          <div className="bank-logo-icon">🏦</div>

          <div>
            <h2>SecureBank</h2>
            <span>Banking Made Simple</span>
          </div>
        </div>

        <a href="/" className="back-home">
          ← Back to Home
        </a>
      </header>

      <main className="login-container">

        <div className="login-box">

          <div className="login-title">
            <div className="login-icon">🔐</div>

            <h1>User Login</h1>

            <p>
              Login to access your SecureBank account
            </p>
          </div>

          <form onSubmit={handleLogin}>

            <div className="input-group">
              <label htmlFor="customerId">
                Account Number
              </label>

              <input
                type="text"
                id="customerId"
                placeholder="Enter your account number"
                value={customerId}
                onChange={(e) => setCustomerId(e.target.value)}
                required
              />
            </div>

            <div className="input-group">
              <div className="password-label">
                <label htmlFor="password">
                  Password
                </label>

                <a href="/forgot-password">
                  Forgot Password?
                </a>
              </div>

              <input
                type="password"
                id="password"
                placeholder="Enter your password"
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
            {errorMessage && (
              <p
                role="alert"
                style={{
                  color: "red",
                  marginBottom: "12px"
                }}
              >
                {errorMessage}
              </p>
            )}

            <button
              type="submit"
              className="login-btn"
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </button>

          </form>

          <div className="create-account">
            <p>Don't have an account?</p>

            <a href="/register">
              Open a New Account
            </a>
          </div>

          <div className="security-notice">
            <span>🔒</span>

            <p>
              Your connection is secure. Never share your
              password, OTP or PIN with anyone.
            </p>
          </div>

        </div>

        <div className="login-info">
          <p className="info-small">
            SECURE DIGITAL BANKING
          </p>

          <h2>
            Your Money.
            <br />
            Your Control.
          </h2>

          <p>
            Access your account securely and manage your
            banking services anytime, anywhere.
          </p>

          <div className="info-features">

            <div>
              <span>🔐</span>
              <div>
                <h3>Secure Login</h3>
                <p>
                  Advanced security protects your account.
                </p>
              </div>
            </div>

            <div>
              <span>💳</span>
              <div>
                <h3>Manage Your Account</h3>
                <p>
                  Check balances and manage transactions.
                </p>
              </div>
            </div>

            <div>
              <span>⚡</span>
              <div>
                <h3>Fast & Convenient</h3>
                <p>
                  Banking services available 24/7.
                </p>
              </div>
            </div>

          </div>
        </div>

      </main>

      <footer className="login-footer">
        <p>
          © 2026 SecureBank. All Rights Reserved.
        </p>

        <div>
          <a href="/privacy">Privacy Policy</a>
          <a href="/terms">Terms & Conditions</a>
          <a href="/security">Security</a>
        </div>
      </footer>

    </div>
  );
}

export default UserLogin;
