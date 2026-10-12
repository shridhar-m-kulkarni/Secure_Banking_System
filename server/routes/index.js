
const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const { User } = require("../database/UserAccountDetails");
const { Admin } = require("../database/AdminDatabase");

const Jwt_Token_verifier = require("../Middlewares/Jwt_Token_verifier");
const Jwt_Token_verifier_Admin = require("../Middlewares/Jwt_Token_verifier_Admin");

// Home page
router.get("/", (req, res) => {
  res.render("index", { title: "Express" });
});

// CREATE ACCOUNT
// This route is public.
router.post("/create-account", async (req, res) => {
  try {
    const {
      fullName,
      dateOfBirth,
      gender,
      email,
      phone,
      address,
      city,
      state,
      pincode,
      accountType,
      nomineeName,
      nomineeRelation,
      password
    } = req.body;

    if (
      !fullName ||
      !email ||
      !phone ||
      !password
    ) {
      return res.status(400).json({
        message: "Please provide all required fields"
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // Generate a 10-digit account number
    let accountNumber;
    let exists = true;

    while (exists) {
      accountNumber = Math.floor(
        1000000000 + Math.random() * 9000000000
      );

      exists = await User.exists({
        AccountNumber: accountNumber
      });
    }

    const createAccount = await User.create({
      FullName: fullName,
      DOB: dateOfBirth,
      Gender: gender,
      Email: email,
      Phone: phone,
      Address: address,
      City: city,
      State: state,
      PinCode: pincode,
      AccountType: accountType,
      NomineeName: nomineeName,
      Relation: nomineeRelation,
      Password: hashedPassword,
      AccountNumber: accountNumber
    });

    return res.status(201).json({
      message: "Account created successfully",
      accountNumber: createAccount.AccountNumber
    });

  } catch (error) {
    console.error("Account creation error:", error);

    return res.status(500).json({
      message: "Account creation failed"
    });
  }
});

// LOGIN
// This route is public.
router.post("/login", async (req, res) => {
  try {
    const { customerId, password } = req.body;

    if (!customerId || !password) {
      return res.status(400).json({
        message: "Account number and password are required"
      });
    }

    const getUser = await User.findOne({
      AccountNumber: customerId
    });

    if (!getUser) {
      return res.status(401).json({
        message: "Invalid account number or password"
      });
    }

    const isPasswordValid = await bcrypt.compare(
      password,
      getUser.Password
    );

    if (!isPasswordValid) {
      return res.status(401).json({
        message: "Invalid account number or password"
      });
    }

    if (!process.env.JWT_PASSWORD) {
      throw new Error("JWT_PASSWORD is missing from .env");
    }

    // Generate JWT only after validating credentials
    const token = jwt.sign(
      {
        AccountNumber: getUser.AccountNumber,
        FullName: getUser.FullName,
        Email: getUser.Email,
        Phone: getUser.Phone
      },
      process.env.JWT_PASSWORD,
      {
        expiresIn: "1h"
      }
    );

    // Store JWT in an HTTP-only cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: false, // Local HTTP development only
      sameSite: "lax",
      maxAge: 60 * 60 * 1000
    });

    return res.status(200).json({
      message: true,
    });

  } catch (error) {
    console.error("Login error:", error);

    return res.status(500).json({
      message: "Internal server error"
    });
  }
});

// PROTECTED ROUTE
// Only this route requires a valid JWT cookie.
router.get(
  "/verify-user",
  Jwt_Token_verifier,
  (req, res) => {
    return res.status(200).json({
      message: true,
      user: req.User
    });
  }
);


router.get(
  "/verify-admin",
  Jwt_Token_verifier_Admin,
  (req, res) => {
    return res.status(200).json({
      message: true,
      admin:req.Admin
    });
  }
);



router.get("/get-token", async(req, res) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({
      message: "Token not found"
    });
  }

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_PASSWORD
    );

    // res.send(decoded);

    const fetchUser = await User.findOne({AccountNumber : decoded.AccountNumber});

    res.send(fetchUser)

  } catch (error) {
    res.status(401).json({
      message: "Invalid or expired token"
    });
  }
});









// User logout
router.post("/logout", (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
    path: "/"
  });

  return res.status(200).json({
    message: "User logged out successfully"
  });
});

router.post("/admin-logout", (req, res) => {
  res.clearCookie("admintoken", {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
    path: "/"
  });

  return res.status(200).json({
    message: "Admin logged out successfully"
  });
});





router.post("/admin-login", async (req, res) => {
  try {
    const { adminId, password } = req.body;

    // 1. Validate input
    if (!adminId || !password) {
      return res.status(400).json({
        message: "Admin ID and password are required"
      });
    }

    // 2. Find admin in MongoDB
    const AdminData = await Admin.findOne({
      AdminId: adminId
    });

    if (!AdminData) {
      return res.status(401).json({
        message: "Invalid Admin ID or password"
      });
    }

    // 3. Compare entered password with hashed password
    const isPasswordValid = await bcrypt.compare(
      password,
      AdminData.Password
    );

    if (!isPasswordValid) {
      return res.status(401).json({
        message: "Invalid Admin ID or password"
      });
    }

    // 4. Generate admin JWT
    const admintoken = jwt.sign(
      {
        AdminId: AdminData.AdminId,
        FullName: AdminData.FullName,
        Email: AdminData.Email
      },
      process.env.JWT_PASSWORD,
      {
        expiresIn: "1h"
      }
    );

    // 5. Store JWT in HTTP-only cookie
    res.cookie("admintoken", admintoken, {
      httpOnly: true,
      secure: false, // Local development only
      sameSite: "lax",
      maxAge: 60 * 60 * 1000,
      path: "/"
    });

    // 6. Send success response
    return res.status(200).json({
      message: true,
      redirectTo: "/admin-page"
    });

  } catch (error) {
    console.error("Admin login error:", error);

    return res.status(500).json({
      message: "Admin login failed"
    });
  }
});




router.post("/user-data", Jwt_Token_verifier_Admin, async (req, res) => {
  try {
    const { accountNumber } = req.body;

    // Validate account number
    if (!accountNumber) {
      return res.status(400).json({
        message: "Account number is required",
      });
    }

    // Find customer in MongoDB
    const userdetails = await User.findOne({
      AccountNumber: accountNumber,
    });

    // Customer not found
    if (!userdetails) {
      return res.status(404).json({
        message: "Customer not found",
      });
    }

    // Send customer details
    return res.status(200).json({
      message: "Customer found successfully",
      user: userdetails,
    });

  } catch (error) {
    console.error("Error fetching customer:", error.message);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
});



/* CREDIT CUSTOMER ACCOUNT */
router.post(
  "/credit",
  Jwt_Token_verifier_Admin,
  async (req, res) => {
    try {
      const { accountNumber, amount } = req.body;
      const transactionAmount = Number(amount);

      if (
        accountNumber === undefined ||
        accountNumber === null ||
        String(accountNumber).trim() === "" ||
        !Number.isFinite(transactionAmount) ||
        transactionAmount <= 0 ||
        !/^\d+(\.\d{1,2})?$/.test(String(amount))
      ) {
        return res.status(400).json({
          message: "Please provide a valid account number and amount",
        });
      }

      // Atomically increase the balance and save it in MongoDB
      const updatedUser = await User.findOneAndUpdate(
        { AccountNumber: accountNumber },
        { $inc: { TotalAmount: transactionAmount } },
        { new: true, runValidators: true }
      );

      if (!updatedUser) {
        return res.status(404).json({
          message: "Customer not found",
        });
      }

      return res.status(200).json({
        message: "Amount credited successfully",
        user: updatedUser,
      });
    } catch (error) {
      console.error("Credit error:", error);

      return res.status(500).json({
        message: "Unable to credit amount",
      });
    }
  }
);


/* DEBIT CUSTOMER ACCOUNT */
router.post(
  "/debit",
  Jwt_Token_verifier_Admin,
  async (req, res) => {
    try {
      const { accountNumber, amount } = req.body;
      const transactionAmount = Number(amount);

      if (
        accountNumber === undefined ||
        accountNumber === null ||
        String(accountNumber).trim() === "" ||
        !Number.isFinite(transactionAmount) ||
        transactionAmount <= 0 ||
        !/^\d+(\.\d{1,2})?$/.test(String(amount))
      ) {
        return res.status(400).json({
          message: "Please provide a valid account number and amount",
        });
      }

      // Debit only when the customer has sufficient balance
      const updatedUser = await User.findOneAndUpdate(
        {
          AccountNumber: accountNumber,
          TotalAmount: { $gte: transactionAmount },
        },
        {
          $inc: { TotalAmount: -transactionAmount },
        },
        {
          new: true,
          runValidators: true,
        }
      );

      if (!updatedUser) {
        const customerExists = await User.exists({
          AccountNumber: accountNumber,
        });

        if (!customerExists) {
          return res.status(404).json({
            message: "Customer not found",
          });
        }

        return res.status(400).json({
          message: "Insufficient balance",
        });
      }

      return res.status(200).json({
        message: "Amount debited successfully",
        user: updatedUser,
      });
    } catch (error) {
      console.error("Debit error:", error);

      return res.status(500).json({
        message: "Unable to debit amount",
      });
    }
  }
);



module.exports = router;
