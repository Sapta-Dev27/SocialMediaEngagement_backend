import jwt from "jsonwebtoken"
import 'dotenv/config'

const authMiddleware = (req, res, next) => {
  try {
    const headers = req.headers["authorization"];
    console.log("Headers : ", headers);
    const token = headers && headers.split(" ")[1];
    console.log("Token : ", token);

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "User is not logged in."
      })
    }

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET_TOKEN);
    console.log("Decoded Token : ", decodedToken);
    if (!decodedToken) {
      return res.status(403).json({
        success: false,
        message: "Forbidden: Invalid token.",
      })
    }
    req.userInfo = decodedToken;
    next();
  }
  catch (error) {
    console.log("Error in authMiddleware:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error"
    })
  }
}

export default authMiddleware