
const jwt = require("jsonwebtoken");

function Jwt_Token_verifier(req, res, next) {
  const token = req.cookies?.token;


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

      


    req.User = decoded;
  

    next();
  } catch (error) {
    return res.status(401).json({
      message: "Invalid or expired token"
    });
  }
}

module.exports = Jwt_Token_verifier;
