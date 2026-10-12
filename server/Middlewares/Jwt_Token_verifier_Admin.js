
const jwt = require("jsonwebtoken");

function Jwt_Token_verifier_Admin(req, res, next) {
  const admintoken = req.cookies?.admintoken;

  if (!admintoken) {
    return res.status(401).json({
      message: "Admin token not found"
    });
  }

  if (!process.env.JWT_PASSWORD) {
    return res.status(500).json({
      message: "JWT secret is not configured"
    });
  }

  try {
    const decodedadmin = jwt.verify(
      admintoken,
      process.env.JWT_PASSWORD
    );

    req.Admin = decodedadmin;

    next();
  } catch (error) {
    return res.status(401).json({
      message: "Invalid or expired admin token"
    });
  }
}

module.exports = Jwt_Token_verifier_Admin;
