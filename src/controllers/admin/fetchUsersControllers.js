import fetchUsersAdminService from "../../services/admin/fetchUsers.js"

const fetchUsersControllers = async (req, res) => {
  try {
    const users = await fetchUsersAdminService();
    if (users === null) {
      return res.status(404).json({
        success: false,
        message: "No users found."
      })
    }
    return res.status(200).json({
      success: true,
      message: "Users fetched successfully",
      users_from_db: users
    })
  }
  catch (error) {
    console.log("Error in fetchUsersControllers:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
}
export default fetchUsersControllers