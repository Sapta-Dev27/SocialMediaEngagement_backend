
const adminMiddleware = (req, res, next) => {
  try {
    const checkAdmin = req.userInfo.userrole_from_token;
    if (checkAdmin === "admin") {
      next();
    }
    else {
      return res.status(403).json({
        success: false,
        message: "Forbidden: You do not have permission to access this resource."
      })
    }
  }
  catch (error) {
    console.log("Error in adminMiddleware:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error"
    })
  }
}

export default adminMiddleware;