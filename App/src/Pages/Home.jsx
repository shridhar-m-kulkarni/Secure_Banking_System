import React, { useState } from "react";
import "../Css/Home.css";
import UserLogin from "./UserLogin";
import { useNavigate } from "react-router-dom";
import CreateAccount from "./CreateAccount";
import Admin from "./AdminLogin";


function Home() {
    const navigate = useNavigate();


const loginClick = () =>{
        navigate("/user-login")
} 


const CreateAccountClick = () =>{
        navigate("/create-account")
} 

const adminLoginClick = () =>{
        navigate("/admin-login-page")
} 
  return (
    <div className="bank-home">

      {/* ================= NAVBAR ================= */}
      <nav className="navbar">

        <div className="logo">
          <div className="logo-icon">🏦</div>

          <div>
            <h2>SecureBank</h2>
            <span>Banking Made Simple</span>
          </div>
        </div>

        <div className="nav-links">
          <a href="#home">Home</a>
          <a href="#services">Services</a>
          <a href="#about">About Us</a>
          <a href="#contact">Contact</a>
        </div>

        <div className="login-buttons">
          <button className="user-login" onClick={loginClick}>
            User Login
          </button>

          

          <button className="admin-login" onClick={adminLoginClick}>
            Admin Login
          </button>
        </div>

      </nav>


      {/* ================= HERO SECTION ================= */}
      <section className="hero" id="home">

        <div className="hero-content">

          <p className="welcome-text">
            WELCOME TO SECUREBANK
          </p>

          <h1>
            Banking That Works
            <span> For You</span>
          </h1>

          <p className="hero-description">
            Manage your money securely, transfer funds, check your
            account balance and access banking services anytime,
            anywhere.
          </p>

          <div className="hero-buttons">

            <button className="primary-btn" onClick={loginClick}>
              Login to Account
            </button>

            <button className="secondary-btn" onClick={CreateAccountClick}>
              Open an Account
            </button>

          </div>

        </div>


        {/* Banking Card */}
        <div className="bank-card">

          <div className="card-top">
            <span>SecureBank</span>
            <span>VISA</span>
          </div>

          <div className="chip">
            ▰
          </div>

          <p className="card-number">
            **** **** **** 4821
          </p>

          <div className="card-bottom">
            <div>
              <small>CARD HOLDER</small>
              <p>YOUR NAME</p>
            </div>

            <div>
              <small>VALID THRU</small>
              <p>12/29</p>
            </div>
          </div>

        </div>

      </section>


      {/* ================= NOTICE ================= */}
      <section className="notice">

        <div className="notice-icon">
          🔔
        </div>

        <div>
          <strong>Important Notice</strong>

          <p>
            Never share your OTP, PIN, password or CVV with anyone.
            The bank will never ask for these details over phone,
            email or SMS.
          </p>
        </div>

      </section>


      {/* ================= SERVICES ================= */}
      <section className="services" id="services">

        <div className="section-heading">
          <p>OUR SERVICES</p>

          <h2>
            Banking Services
          </h2>

          <span>
            Everything you need for your everyday banking.
          </span>
        </div>


        <div className="service-container">

          <div className="service-card">
            <div className="service-icon">
              💳
            </div>

            <h3>Accounts</h3>

            <p>
              Manage your savings and current accounts easily.
            </p>
          </div>


          <div className="service-card" onClick={loginClick}>
            <div className="service-icon">
              💸
            </div>

            <h3>Money Transfer</h3>

            <p>
              Transfer money securely to your beneficiaries.
            </p>
          </div>


          <div className="service-card" onClick={loginClick}>
            <div className="service-icon">
              📊
            </div>

            <h3>Account Statement</h3>

            <p>
              View and download your account statements.
            </p>
          </div>


          <div className="service-card" onClick={loginClick}>
            <div className="service-icon">
              🏧
            </div>

            <h3>ATM & Debit Card</h3>

            <p>
              Manage your debit card and ATM services.
            </p>
          </div>


          <div className="service-card" onClick={loginClick}>
            <div className="service-icon">
              🏠
            </div>

            <h3>Loans</h3>

            <p>
              Explore personal, home and education loan options.
            </p>
          </div>


          <div className="service-card" onClick={loginClick}>
            <div className="service-icon">
              📱
            </div>

            <h3>Mobile Banking</h3>

            <p>
              Access your banking services from anywhere.
            </p>
          </div>

        </div>

      </section>


      {/* ================= WHY BANK WITH US ================= */}
      <section className="why-us" id="about">

        <div className="why-content">

          <p className="section-small-title">
            WHY SECUREBANK
          </p>

          <h2>
            Banking With Confidence
          </h2>

          <p>
            We provide secure and convenient banking services
            designed to make managing your finances easier.
          </p>

        </div>


        <div className="features">

          <div>
            <span>🔐</span>
            <h3>Secure Banking</h3>
            <p>
              Your account and personal information are protected.
            </p>
          </div>


          <div>
            <span>⚡</span>
            <h3>Fast Transactions</h3>
            <p>
              Perform your banking transactions quickly and easily.
            </p>
          </div>


          <div>
            <span>🕐</span>
            <h3>24/7 Access</h3>
            <p>
              Access your account whenever you need it.
            </p>
          </div>

        </div>

      </section>


      {/* ================= CONTACT ================= */}
      <section className="contact" id="contact">

        <div>
          <p>NEED HELP?</p>

          <h2>
            We're Here to Help
          </h2>

          <span>
            Our customer support team is available to assist you.
          </span>
        </div>


        <div className="contact-info">

          <div>
            <strong>📞 Customer Care</strong>
            <p>1800-123-4567</p>
          </div>

          <div>
            <strong>✉ Email Support</strong>
            <p>support@securebank.com</p>
          </div>

          <div>
            <strong>📍 Branch Locator</strong>
            <p>Find a branch near you</p>
          </div>

        </div>

      </section>


      {/* ================= FOOTER ================= */}
      <footer>

        <div className="footer-main">

          <div>
            <h2>🏦 SecureBank</h2>

            <p>
              Secure, simple and reliable banking
              for everyone.
            </p>
          </div>


          <div>
            <h3>Quick Links</h3>

            <a href="#home">Home</a>
            <a href="#services">Services</a>
            <a href="#about">About Us</a>
            <a href="#contact">Contact</a>
          </div>


          <div>
            <h3>Important</h3>

            <a href="#security">Security</a>
            <a href="#privacy">Privacy Policy</a>
            <a href="#terms">Terms & Conditions</a>
          </div>

        </div>


        <div className="copyright">
          © 2026 SecureBank. All Rights Reserved.
        </div>

      </footer>

    </div>
  );
}

export default Home;