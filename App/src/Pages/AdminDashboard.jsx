
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AdminDashboard() {
  const navigate = useNavigate();

  const [accountNumber, setAccountNumber] = useState("");
  const [amount, setAmount] = useState("");
  const [transactionType, setTransactionType] = useState("credit");
  const [customer, setCustomer] = useState(null);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);

  const SEARCH_URL = "http://localhost:3001";
  const TRANSACTION_URL = "http://localhost:3001";

  const styles = {
    page: {
      minHeight: "100vh",
      background: "#f1f5f9",
      fontFamily: "Arial, sans-serif",
      color: "#1e293b",
    },
    header: {
      background: "#0f172a",
      color: "white",
      padding: "22px 6%",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      flexWrap: "wrap",
      gap: "15px",
    },
    brand: {
      margin: 0,
      fontSize: "25px",
    },
    headerText: {
      margin: "6px 0 0",
      color: "#cbd5e1",
      fontSize: "14px",
    },
    headerRight: {
      display: "flex",
      alignItems: "center",
      gap: "15px",
      flexWrap: "wrap",
    },
    logoutButton: {
      padding: "10px 18px",
      background: "#dc2626",
      color: "white",
      border: "none",
      borderRadius: "8px",
      fontSize: "14px",
      fontWeight: "bold",
      cursor: "pointer",
    },
    main: {
      maxWidth: "1050px",
      margin: "35px auto",
      padding: "0 20px 35px",
    },
    heading: {
      fontSize: "28px",
      marginBottom: "8px",
    },
    subtitle: {
      color: "#64748b",
      marginBottom: "28px",
      lineHeight: 1.6,
    },
    grid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
      gap: "24px",
      alignItems: "start",
    },
    card: {
      background: "white",
      borderRadius: "14px",
      padding: "25px",
      boxShadow: "0 5px 20px rgba(15, 23, 42, 0.06)",
      border: "1px solid #e2e8f0",
    },
    cardTitle: {
      margin: "0 0 22px",
      fontSize: "19px",
    },
    label: {
      display: "block",
      marginBottom: "8px",
      fontSize: "14px",
      fontWeight: "600",
    },
    input: {
      width: "100%",
      boxSizing: "border-box",
      padding: "12px",
      border: "1px solid #cbd5e1",
      borderRadius: "8px",
      marginBottom: "18px",
      fontSize: "15px",
    },
    select: {
      width: "100%",
      boxSizing: "border-box",
      padding: "12px",
      border: "1px solid #cbd5e1",
      borderRadius: "8px",
      marginBottom: "18px",
      background: "white",
      fontSize: "15px",
    },
    button: {
      width: "100%",
      padding: "13px",
      background: "#2563eb",
      color: "white",
      border: "none",
      borderRadius: "8px",
      fontSize: "15px",
      fontWeight: "bold",
      cursor: "pointer",
    },
    customerBox: {
      background: "#f8fafc",
      border: "1px solid #e2e8f0",
      borderRadius: "10px",
      padding: "18px",
      marginTop: "22px",
    },
    customerRow: {
      display: "flex",
      justifyContent: "space-between",
      gap: "12px",
      padding: "11px 0",
      borderBottom: "1px solid #e2e8f0",
      fontSize: "14px",
      overflowWrap: "anywhere",
    },
    balance: {
      fontSize: "28px",
      fontWeight: "bold",
      color: "#047857",
      margin: "8px 0",
      overflowWrap: "anywhere",
    },
    notice: {
      padding: "13px",
      borderRadius: "8px",
      marginBottom: "18px",
      overflowWrap: "anywhere",
    },
    footer: {
      textAlign: "center",
      color: "#64748b",
      fontSize: "13px",
      padding: "20px",
    },
  };

  // Admin logout
  const handleLogout = async () => {
    if (loggingOut) return;

    setLoggingOut(true);
    setError("");
    setMessage("");

    try {
      await axios.post(
        `${SEARCH_URL}/admin-logout`,
        {},
        { withCredentials: true }
      );

      setCustomer(null);
      setAccountNumber("");
      setAmount("");

      navigate("/", { replace: true });
    } catch (err) {
      console.error("Admin logout error:", err);

      setError(
        err.response?.data?.message ||
          "Logout failed. Please try again."
      );
    } finally {
      setLoggingOut(false);
    }
  };

  // Search customer
  const searchUser = async (e) => {
    e.preventDefault();

    setError("");
    setMessage("");
    setCustomer(null);

    if (!accountNumber.trim()) {
      setError("Please enter an account number.");
      return;
    }

    try {
      setLoading(true);

      const response = await axios.post(
        `${SEARCH_URL}/user-data`,
        { accountNumber: accountNumber.trim() },
        { withCredentials: true }
      );

      const user = response.data.user;

      if (!user) {
        setError("Customer details were not returned.");
        return;
      }

      setCustomer(user);
      setAccountNumber(String(user.AccountNumber));
      setMessage("Customer found successfully.");
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Unable to find customer. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  // Credit or debit customer account
  const handleTransaction = async (e) => {
    e.preventDefault();

    setError("");
    setMessage("");

    const transactionAmount = Number(amount);

    if (!customer) {
      setError("Please search for a customer first.");
      return;
    }

    if (
      !Number.isFinite(transactionAmount) ||
      transactionAmount <= 0 ||
      !/^\d+(\.\d{1,2})?$/.test(amount)
    ) {
      setError("Enter a valid amount greater than zero.");
      return;
    }

    const confirmed = window.confirm(
      `Confirm ${transactionType} of ₹${transactionAmount.toFixed(
        2
      )} for account ${customer.AccountNumber}?`
    );

    if (!confirmed) return;

    try {
      setLoading(true);

      const endpoint =
        transactionType === "credit" ? "/credit" : "/debit";

      const response = await axios.post(
        `${TRANSACTION_URL}${endpoint}`,
        {
          accountNumber: customer.AccountNumber,
          amount: transactionAmount,
        },
        { withCredentials: true }
      );

      setMessage(
        response.data.message ||
          `Amount ${
            transactionType === "credit" ? "credited" : "debited"
          } successfully.`
      );

      setAmount("");

      // Refresh customer balance after transaction
      const refreshed = await axios.post(
        `${SEARCH_URL}/user-data`,
        { accountNumber: customer.AccountNumber },
        { withCredentials: true }
      );

      if (refreshed.data.user) {
        setCustomer(refreshed.data.user);
      }
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Transaction failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.page}>
      {/* Header */}
      <header style={styles.header}>
        <div>
          <h1 style={styles.brand}>🏦 SecureBank</h1>
          <p style={styles.headerText}>Administration Portal</p>
        </div>

        <div style={styles.headerRight}>
          <span>Admin Dashboard</span>

          <button
            type="button"
            onClick={handleLogout}
            disabled={loggingOut}
            style={{
              ...styles.logoutButton,
              opacity: loggingOut ? 0.6 : 1,
              cursor: loggingOut ? "not-allowed" : "pointer",
            }}
          >
            {loggingOut ? "Logging out..." : "Logout"}
          </button>
        </div>
      </header>

      <main style={styles.main}>
        <h2 style={styles.heading}>Welcome, Admin</h2>

        <p style={styles.subtitle}>
          Manage customer accounts and process credit or debit
          transactions.
        </p>

        {message && (
          <div
            role="status"
            style={{
              ...styles.notice,
              background: "#dcfce7",
              color: "#166534",
            }}
          >
            {message}
          </div>
        )}

        {error && (
          <div
            role="alert"
            style={{
              ...styles.notice,
              background: "#fee2e2",
              color: "#991b1b",
            }}
          >
            {error}
          </div>
        )}

        <div style={styles.grid}>
          {/* Customer search */}
          <section style={styles.card}>
            <h3 style={styles.cardTitle}>Find Customer</h3>

            <form onSubmit={searchUser}>
              <label style={styles.label}>
                Customer Account Number
              </label>

              <input
                style={styles.input}
                type="text"
                inputMode="numeric"
                value={accountNumber}
                onChange={(e) => setAccountNumber(e.target.value)}
                placeholder="Enter account number"
                required
              />

              <button
                style={{
                  ...styles.button,
                  opacity: loading ? 0.6 : 1,
                }}
                type="submit"
                disabled={loading}
              >
                {loading ? "Please wait..." : "Search Customer"}
              </button>
            </form>

            {customer && (
              <div style={styles.customerBox}>
                <h4 style={{ marginTop: 0 }}>Customer Details</h4>

                <div style={styles.customerRow}>
                  <span>Full Name</span>
                  <strong>{customer.FullName}</strong>
                </div>

                <div style={styles.customerRow}>
                  <span>Account Number</span>
                  <strong>{customer.AccountNumber}</strong>
                </div>

                <div style={styles.customerRow}>
                  <span>Email</span>
                  <strong>{customer.Email}</strong>
                </div>

                <p style={{ marginTop: "22px", color: "#64748b" }}>
                  Available Balance
                </p>

                <p style={styles.balance}>
                  ₹
                  {Number(customer.TotalAmount ?? 0).toLocaleString(
                    "en-IN",
                    {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    }
                  )}
                </p>
              </div>
            )}
          </section>

          {/* Credit and debit */}
          <section style={styles.card}>
            <h3 style={styles.cardTitle}>Manage Transactions</h3>

            <form onSubmit={handleTransaction}>
              <label style={styles.label}>Transaction Type</label>

              <select
                style={styles.select}
                value={transactionType}
                onChange={(e) => setTransactionType(e.target.value)}
              >
                <option value="credit">Credit Amount (+)</option>
                <option value="debit">Debit Amount (-)</option>
              </select>

              <label style={styles.label}>Amount (₹)</label>

              <input
                style={styles.input}
                type="number"
                min="0.01"
                step="0.01"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Enter amount"
                required
              />

              {transactionType === "credit" ? (
                <p style={{ color: "#047857", fontSize: "14px" }}>
                  This will add money to the customer's account.
                </p>
              ) : (
                <p style={{ color: "#dc2626", fontSize: "14px" }}>
                  This will deduct money from the customer's account.
                </p>
              )}

              <button
                type="submit"
                disabled={loading || !customer}
                style={{
                  ...styles.button,
                  background:
                    transactionType === "credit"
                      ? "#059669"
                      : "#dc2626",
                  opacity: loading || !customer ? 0.5 : 1,
                  cursor:
                    loading || !customer ? "not-allowed" : "pointer",
                  marginTop: "10px",
                }}
              >
                {loading
                  ? "Processing..."
                  : transactionType === "credit"
                  ? "Credit Amount"
                  : "Debit Amount"}
              </button>

              {!customer && (
                <p
                  style={{
                    fontSize: "13px",
                    color: "#64748b",
                    marginTop: "12px",
                  }}
                >
                  Search for a customer before processing a transaction.
                </p>
              )}
            </form>
          </section>
        </div>
      </main>

      <footer style={styles.footer}>
        SecureBank © {new Date().getFullYear()} | Admin Portal
      </footer>
    </div>
  );
}

export default AdminDashboard;
