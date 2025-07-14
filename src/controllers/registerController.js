import registerUserService from "../services/register.js";
import jwt from "jsonwebtoken";
import 'dotenv/config';

const registerUserController = async (req, res) => {
  try {
    const { username, useremail, userpassword, userrole } = req.body;
    const newUser = await registerUserService(username, useremail, userpassword, userrole);

    if (newUser === null) {
      console.log("Registration failed: User already exists with this username or email.");
      return res.status(400).json({
        success: false,
        message: "Registration failed: User already exists with this username or email."
      });
    }

    const token = jwt.sign({

      id: newUser.id,
      username: newUser.userName,
      useremail: newUser.userEmail,
      userrole: newUser.userRole

    }, process.env.JWT_SECRET_TOKEN, {
      expiresIn: "1h"
    })

    if (newUser) {
      res.status(201).json({
        success: true,
        message: "User registered successfully",
        data: newUser,
        token: token
      })
    }
  }
  catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message
    })
  }
}

export default registerUserController;
