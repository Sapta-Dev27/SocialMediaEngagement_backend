import fetchCommentsAdminService from "../../services/admin/fetchComment.js";

const fetchCommentAdminController = async (req, res) => {
  try {
    const comments = await fetchCommentsAdminService();
    if (comments === null) {
      return res.status(404).json({
        sucess: false,
        message: "No posts found."
      })
    }
    return res.status(200).json({
      success: true,
      message: "Posts fetched successfully",
      comments_from_db: comments
    })
  }
  catch (error) {
    console.log("Error in fetchPostsAdminController:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
}

export default fetchCommentAdminController;