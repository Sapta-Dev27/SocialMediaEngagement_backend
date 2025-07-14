import updateAdminService from "../../services/admin/updatePost.js";

const updateAdminServiceController = async (req, res) => {
  try {
    const { postitle, postcontent } = req.body;
    const postid = parseInt(req.params.id);

    const updatePost = await updateAdminService(postitle, postcontent, postid);
    if (updatePost === null) {
      return res.status(404).json({
        success: false,
        message: "Post not found or update failed."
      });
    }
    return res.status(200).json({
      success: true,
      message: "Post updated successfully",
      updated_post_from_db: updatePost
    });
  }
  catch (error) {
    console.log("Error in updateAdminServiceController:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error"
    });
  }
}

export default updateAdminServiceController;