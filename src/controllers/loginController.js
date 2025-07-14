import loginUserService from "../services/login.js";
import jwt from 'jsonwebtoken';
import 'dotenv/config';

const loginUserController = async (req, res) => {
  try {
    const { username, userpassword } = req.body;

    const loginuser = await loginUserService(username, userpassword);

    if (loginuser === null) {
      console.log("Login failed: User not found or password incorrect.");
      return res.status(400).json({
        success: false,
        message: "Login failed: User not found or password incorrect."
      });
    }

    const token = jwt.sign({
      id_from_token: loginuser.id,
      username_from_token: loginuser.userName,
      useremail_from_token: loginuser.userEmail,
      userrole_from_token: loginuser.userRole

    }, process.env.JWT_SECRET_TOKEN, {
      expiresIn: '1h'
    })

    return res.status(200).json({
      success: true,
      message: "User logged in successfully",
      token: token,
      logged_user: loginuser
    })
    
  }
  catch (error) {
    console.log("Error in loginUserController:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error"
    })
  }
}

export default loginUserController