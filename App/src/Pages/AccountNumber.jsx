import { useLocation,useNavigate } from "react-router-dom";
import UserLogin from "./UserLogin";

function AccountNumber() {
const location = useLocation();
console.log(location);
const navigate = useNavigate();

const loginNav = ()=>{
  navigate("/user-login")
}


  const accountNumber = location.state.accountNumber;

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f5f7fa",
        fontFamily: "Arial, sans-serif"
      }}
    >

      <div
        style={{
          width: "400px",
          backgroundColor: "white",
          padding: "40px",
          borderRadius: "12px",
          textAlign: "center",
          boxShadow: "0 4px 15px rgba(0,0,0,0.1)"
        }}
      >

        <h1
          style={{
            color: "#198754",
            marginBottom: "15px"
          }}
        >
          Account Created Successfully!
        </h1>

        <p
          style={{
            color: "#555",
            fontSize: "16px"
          }}
        >
          Your account has been created successfully.
        </p>

        <p
          style={{
            marginTop: "30px",
            marginBottom: "8px",
            fontWeight: "bold",
            color: "#333"
          }}
        >
          Your Account Number
        </p>

        <div
          style={{
            backgroundColor: "#f1f3f5",
            padding: "15px",
            borderRadius: "8px",
            fontSize: "26px",
            fontWeight: "bold",
            letterSpacing: "3px",
            color: "#111"
          }}
        >
          {accountNumber}
        </div>

        <p
          style={{
            marginTop: "20px",
            fontSize: "14px",
            color: "#777"
          }}
        >
          Please keep your account number safe.
        </p>

        <button
        onClick={loginNav}
          style={{
            marginTop: "20px",
            padding: "12px 25px",
            border: "none",
            borderRadius: "6px",
            backgroundColor: "#0d6efd",
            color: "white",
            fontSize: "15px",
            cursor: "pointer"
          }}
        >
          Continue
        </button>

      </div>

    </div>
  );
}

export default AccountNumber;