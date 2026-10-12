
import React, { useEffect, useState } from "react";
import "../Css/Profile.css"
import axios from "axios";

export default function Profile() {
  const [showBalance, setShowBalance] = useState(true);
  const [accountHolderName,setAccountHolderName] = useState("");
  const [totalAmount,setTotalAmount] = useState(0);
  const [totalCredit,setTotalCredit] = useState(0);
  const [totalDebit,setTotalDebit] = useState(0);
  const [accountNumber,setAccountNumber] = useState(0);




  const Logout = async () => {
  try {
    const logout = await axios.post(
      "http://localhost:3001/logout",
      {},
      {
        withCredentials: true
      }
    );

    console.log(logout.data.message);

    // Redirect to login page
    window.location.href = "/";

  } catch (error) {
    console.log(
      "Failed to Logout",
      error.response?.data || error.message
    );
  }
};

useEffect(()=>{
  const userData = async() =>{
    try{
    const getData = await axios.get("http://localhost:3001/get-token",
       {
            withCredentials: true
          }
    )
    console.log(getData);
    setAccountHolderName(getData.data.FullName)
    setTotalAmount(getData.data.TotalAmount)
    setTotalCredit(getData.data.TotalCredited)
    setTotalDebit(getData.data.TotalDebited)
    setAccountNumber(getData.data.AccountNumber)
    
    }catch(error){
      console.log("Failed");
      
    }

  }
userData(); // Call the function
},[])



  const transactions = [
    {
      id: 1,
      name: "Amazon",
      category: "Shopping",
      date: "10 Oct 2026",
      amount: -2499,
      icon: "🛍️",
    },
    {
      id: 2,
      name: "Salary Credit",
      category: "Income",
      date: "08 Oct 2026",
      amount: 45000,
      icon: "💰",
    },
    {
      id: 3,
      name: "Electricity Bill",
      category: "Utilities",
      date: "06 Oct 2026",
      amount: -1850,
      icon: "⚡",
    },
    {
      id: 4,
      name: "Swiggy",
      category: "Food",
      date: "05 Oct 2026",
      amount: -450,
      icon: "🍔",
    },
  ];

  const formatAmount = (amount) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 2,
    }).format(Math.abs(amount));

  const handleLogout = () => {
    alert("Connect your logout API here.");
  };

  return (
    <div className="bank-dashboard">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="brand">
          <div className="brand-icon">🏦</div>
          <span>
            Secure<span className="brand-light">Bank</span>
          </span>
        </div>

        <p className="menu-label">MENU</p>

        <nav className="sidebar-nav">
          <a href="#dashboard" className="nav-item active">
            <span>▦</span> Dashboard
          </a>
          <a href="#accounts" className="nav-item">
            <span>▤</span> My Accounts
          </a>
          <a href="#transactions" className="nav-item">
            <span>↔</span> Transactions
          </a>
          <a href="#transfer" className="nav-item">
            <span>⇄</span> Transfer Money
          </a>
          <a href="#payments" className="nav-item">
            <span>▣</span> Payments
          </a>
          <a href="#cards" className="nav-item">
            <span>▰</span> My Cards
          </a>
        </nav>

        <p className="menu-label settings-label">PREFERENCES</p>

        <nav className="sidebar-nav">
          <a href="#profile" className="nav-item">
            <span>♙</span> My Profile
          </a>
          <a href="#security" className="nav-item">
            <span>♢</span> Security
          </a>
          <a href="#help" className="nav-item">
            <span>?</span> Help & Support
          </a>
        </nav>

        <div className="sidebar-bottom">
          <div className="security-note">
            <span className="shield">✓</span>
            <div>
              <strong>Your money is safe</strong>
              <p>Protected banking experience</p>
            </div>
          </div>

          <button className="logout-btn" onClick={Logout}>
            ↪ &nbsp; Log Out
          </button>
        </div>
      </aside>

      {/* Main Dashboard */}
      <main className="dashboard-main" id="dashboard">
        <header className="topbar">
          <div>
            <p className="welcome-label">WELCOME BACK</p>
            <h1>Hello, {accountHolderName || "User"} 👋</h1>
            <p className="subtitle">
              Here's what's happening with your account today.
            </p>
          </div>

          <div className="topbar-right">
            <button
              className="notification-btn"
              aria-label="Notifications"
              onClick={() => alert("No new notifications.")}
            >
              ♧
              <span className="notification-dot"></span>
            </button>

            <div className="user-profile">
              <div className="avatar">{accountHolderName.charAt(0).toUpperCase()}</div>
              <div>
                <strong>{accountHolderName || "User"}</strong>
                <p>Personal Account</p>
              </div>
            </div>
          </div>
        </header>

        {/* Account Summary */}
        <section className="summary-grid">
          <div className="balance-card">
            <div className="balance-top">
              <span>Total Available Balance</span>
              
              <span className="balance-symbol">₹</span>
            </div>

            <div className="balance-amount">
             {showBalance ? `₹ ${totalAmount}` : "₹ ••••••••"}

              <button
                className="eye-btn"
                onClick={() => setShowBalance(!showBalance)}
                aria-label="Toggle balance visibility"
              >
                {showBalance ? "◉" : "◎"}
              </button>
            </div>

            <p className="account-number">
              Account No. {accountNumber}
            </p>

            <div className="balance-bottom">
              <span>Primary Savings Account</span>
              <span className="account-status">● Active</span>
            </div>
          </div>
{/* 
          <div className="stat-card">
            <div className="stat-header">
              <span className="stat-icon income-icon">↙</span>
              <span className="stat-period">This month</span>
            </div>

            <p className="stat-label">Total Income</p>
            <h2>₹ {totalCredit}</h2>
            
          </div>

          <div className="stat-card">
            <div className="stat-header">
              <span className="stat-icon expense-icon">↗</span>
              <span className="stat-period">This month</span>
            </div>

            <p className="stat-label">Total Expenses</p>
            <h2>₹ {totalDebit}</h2>
           
          </div> */}
        </section>

        {/* Quick Actions */}
        <section className="quick-section">
          <div className="section-heading">
            <div>
              <h2>Quick Actions</h2>
              <p>Manage your money with ease</p>
            </div>
          </div>

          <div className="quick-actions">
            <a href="#transfer" className="quick-action">
              <span className="action-icon blue">⇄</span>
              <strong>Transfer Money</strong>
              <span>Send funds securely</span>
            </a>

            <a href="#payments" className="quick-action">
              <span className="action-icon purple">▣</span>
              <strong>Pay Bills</strong>
              <span>Pay bills and utilities</span>
            </a>

            <a href="#accounts" className="quick-action">
              <span className="action-icon green">＋</span>
              <strong>My Accounts</strong>
              <span>View account details</span>
            </a>

            <a href="#security" className="quick-action">
              <span className="action-icon orange">♢</span>
              <strong>Security Center</strong>
              <span>Protect your account</span>
            </a>
          </div>
        </section>

        {/* Recent Transactions */}
        <section className="transactions-section" id="transactions">
          <div className="section-heading transaction-heading">
            <div>
              <h2>Recent Transactions</h2>
              <p>Keep track of your latest activity</p>
            </div>

            <a href="#all-transactions" className="view-all">
              View all →
            </a>
          </div>

          <div className="table-wrapper">
            <table className="transactions-table">
              <thead>
                <tr>
                  <th>TRANSACTION</th>
                  <th>CATEGORY</th>
                  <th>DATE</th>
                  <th>AMOUNT</th>
                  <th>STATUS</th>
                </tr>
              </thead>

              <tbody>
                {transactions.map((transaction) => (
                  <tr key={transaction.id}>
                    <td>
                      <div className="transaction-name">
                        <span className="transaction-icon">
                          {transaction.icon}
                        </span>
                        <strong>{transaction.name}</strong>
                      </div>
                    </td>

                    <td>{transaction.category}</td>
                    <td>{transaction.date}</td>

                    <td
                      className={
                        transaction.amount > 0
                          ? "amount-credit"
                          : "amount-debit"
                      }
                    >
                      {transaction.amount > 0 ? "+" : "-"}
                      {formatAmount(transaction.amount)}
                    </td>

                    <td>
                      <span className="status-badge">
                        Completed
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <footer className="dashboard-footer">
          <span>© 2026 SecureBank. All rights reserved.</span>
          <span>🔒 Your banking security matters.</span>
        </footer>
      </main>
    </div>
  );
}
