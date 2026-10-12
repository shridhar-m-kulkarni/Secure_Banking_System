import React, { useState } from "react";
import "../Css/CreateAccount.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AccountNumber from "./AccountNumber";

function CreateAccount() {

  const navigate = useNavigate();
  
  const emptyForm = {
  fullName: "",
  dateOfBirth: "",
  gender: "",
  email: "",
  phone: "",
  address: "",
  city: "",
  state: "",
  pincode: "",
  accountType: "",
  nomineeName: "",
  nomineeRelation: "",
  password: "",
  confirmPassword: ""
};



  const [formData, setFormData] = useState({
    fullName: "",
    dateOfBirth: "",
    gender: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    accountType: "",
    nomineeName: "",
    nomineeRelation: "",
    password: "",
    confirmPassword: ""
  });


  // =========================
  // HANDLE INPUT CHANGE
  // =========================

  const handleChange = (e) => {

    const { name, value } = e.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: value
    }));

  };


  // =========================
  // FORM SUBMIT
  // =========================

  const handleSubmit = async (e) => {

    e.preventDefault();


    // Check password

    if (formData.password !== formData.confirmPassword) {

      alert("Passwords do not match");

      return;

    }


    try {

      // Remove confirmPassword
      // before sending data to backend

      const {
        confirmPassword,
        ...userData
      } = formData;


      console.log("Data sending to backend:", userData);


      // Send data to Express

      const response = await axios.post(
        "http://localhost:3001/create-account",
        userData
      );


      console.log("Server Response:", response.data);
      
      const accountNumber = response.data.accountNumber
      alert("Account created successfully!");
      
       // Empty ALL fields
    setFormData(emptyForm);

    navigate("/account-number", {
    state: {
        accountNumber: accountNumber
    }
});




    } catch (error) {

      console.log("Account Creation Error:", error);

      if (error.response) {

        console.log(
          "Server Error:",
          error.response.data
        );

        alert(
          error.response.data.message ||
          "Account creation failed"
        );

         // Empty ALL fields
    setFormData(emptyForm);

      } else {

        alert("Unable to connect to server");
         // Empty ALL fields
    setFormData(emptyForm);

      }

    }

  };


  return (

    <div className="create-account-page">

      {/* ================= HEADER ================= */}

      <header className="account-header">

        <div className="bank-logo">

          <div className="bank-logo-icon">
            🏦
          </div>

          <div>

            <h2>SecureBank</h2>

            <span>
              Banking Made Simple
            </span>

          </div>

        </div>

        <a
          href="/"
          className="back-home"
        >
          ← Back to Home
        </a>

      </header>


      {/* ================= PAGE TITLE ================= */}

      <div className="account-title">

        <p>SECUREBANK</p>

        <h1>Open a Bank Account</h1>

        <span>
          Fill in your details to start your banking journey.
        </span>

      </div>


      {/* ================= FORM ================= */}

      <main className="account-container">

        <form onSubmit={handleSubmit}>


          {/* ================= PERSONAL DETAILS ================= */}

          <section className="form-section">

            <div className="section-title">

              <span>01</span>

              <div>

                <h2>Personal Information</h2>

                <p>
                  Enter your basic personal details.
                </p>

              </div>

            </div>


            <div className="form-grid">

              <div className="form-group full-width">

                <label>
                  Full Name
                </label>

                <input
                  type="text"
                  name="fullName"
                  placeholder="Enter your full name"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                />

              </div>


              <div className="form-group">

                <label>
                  Date of Birth
                </label>

                <input
                  type="date"
                  name="dateOfBirth"
                  value={formData.dateOfBirth}
                  onChange={handleChange}
                  max={new Date().toISOString().split("T")[0]}
                  required
                />

              </div>


              <div className="form-group">

                <label>
                  Gender
                </label>

                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  required
                >

                  <option value="">
                    Select Gender
                  </option>

                  <option value="Male">
                    Male
                  </option>

                  <option value="Female">
                    Female
                  </option>

                  <option value="Other">
                    Other
                  </option>

                </select>

              </div>

            </div>

          </section>


          {/* ================= CONTACT DETAILS ================= */}

          <section className="form-section">

            <div className="section-title">

              <span>02</span>

              <div>

                <h2>Contact Information</h2>

                <p>
                  Provide your contact and address details.
                </p>

              </div>

            </div>


            <div className="form-grid">

              <div className="form-group">

                <label>
                  Email Address
                </label>

                <input
                  type="email"
                  name="email"
                  placeholder="example@email.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />

              </div>


              <div className="form-group">

                <label>
                  Mobile Number
                </label>

                <input
                  type="tel"
                  name="phone"
                  placeholder="Enter mobile number"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />

              </div>


              <div className="form-group full-width">

                <label>
                  Address
                </label>

                <textarea
                  name="address"
                  placeholder="Enter your full address"
                  value={formData.address}
                  onChange={handleChange}
                  rows="3"
                  required
                />

              </div>


              <div className="form-group">

                <label>
                  City
                </label>

                <input
                  type="text"
                  name="city"
                  placeholder="Enter city"
                  value={formData.city}
                  onChange={handleChange}
                  required
                />

              </div>


              <div className="form-group">

                <label>
                  State
                </label>

                <input
                  type="text"
                  name="state"
                  placeholder="Enter state"
                  value={formData.state}
                  onChange={handleChange}
                  required
                />

              </div>


              <div className="form-group">

                <label>
                  PIN Code
                </label>

                <input
                  type="text"
                  name="pincode"
                  placeholder="Enter PIN code"
                  value={formData.pincode}
                  onChange={handleChange}
                  required
                />

              </div>

            </div>

          </section>


          {/* ================= ACCOUNT DETAILS ================= */}

          <section className="form-section">

            <div className="section-title">

              <span>03</span>

              <div>

                <h2>Account Details</h2>

                <p>
                  Select the type of bank account you want.
                </p>

              </div>

            </div>


            <div className="form-grid">

              <div className="form-group full-width">

                <label>
                  Account Type
                </label>

                <select
                  name="accountType"
                  value={formData.accountType}
                  onChange={handleChange}
                  required
                >

                  <option value="">
                    Select Account Type
                  </option>

                  <option value="Savings Account">
                    Savings Account
                  </option>

                  <option value="Current Account">
                    Current Account
                  </option>

                </select>

              </div>

            </div>

          </section>


          {/* ================= NOMINEE ================= */}

          <section className="form-section">

            <div className="section-title">

              <span>04</span>

              <div>

                <h2>Nominee Information</h2>

                <p>
                  Add a nominee for your bank account.
                </p>

              </div>

            </div>


            <div className="form-grid">

              <div className="form-group">

                <label>
                  Nominee Name
                </label>

                <input
                  type="text"
                  name="nomineeName"
                  placeholder="Enter nominee name"
                  value={formData.nomineeName}
                  onChange={handleChange}
                  required
                />

              </div>


              <div className="form-group">

                <label>
                  Relationship
                </label>

                <select
                  name="nomineeRelation"
                  value={formData.nomineeRelation}
                  onChange={handleChange}
                  required
                >

                  <option value="">
                    Select Relationship
                  </option>

                  <option value="Father">
                    Father
                  </option>

                  <option value="Mother">
                    Mother
                  </option>

                  <option value="Spouse">
                    Spouse
                  </option>

                  <option value="Brother">
                    Brother
                  </option>

                  <option value="Sister">
                    Sister
                  </option>

                  <option value="Other">
                    Other
                  </option>

                </select>

              </div>

            </div>

          </section>


          {/* ================= SECURITY ================= */}

          <section className="form-section">

            <div className="section-title">

              <span>05</span>

              <div>

                <h2>Login Security</h2>

                <p>
                  Create your password for online banking.
                </p>

              </div>

            </div>


            <div className="form-grid">

              <div className="form-group">

                <label>
                  Password
                </label>

                <input
                  type="password"
                  name="password"
                  placeholder="Create password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />

              </div>


              <div className="form-group">

                <label>
                  Confirm Password
                </label>

                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                />

              </div>

            </div>

          </section>


          {/* ================= TERMS ================= */}

          {/* <div className="terms">

            <label>

              <input
                type="checkbox"
                required
              />

              <span>
                I agree to the SecureBank Terms & Conditions
                and Privacy Policy.
              </span>

            </label>

          </div> */}


          {/* ================= SUBMIT ================= */}

          <div className="submit-area">

            <button
              type="submit"
              className="create-btn"
            >
              Create Bank Account
            </button>

            <p>
              🔒 Your information is protected and securely handled.
            </p>

          </div>

        </form>

      </main>


      {/* ================= FOOTER ================= */}

      <footer className="account-footer">

        <p>
          © 2026 SecureBank. All Rights Reserved.
        </p>

        <div>

          <a href="/privacy">
            Privacy Policy
          </a>

          <a href="/terms">
            Terms & Conditions
          </a>

          <a href="/security">
            Security
          </a>

        </div>

      </footer>

    </div>

  );

}

export default CreateAccount;