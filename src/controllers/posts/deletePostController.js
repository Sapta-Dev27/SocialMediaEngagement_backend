import deletePostService from "../../services/posts/deletePost.js";

const deletePostController = async (req, res) => {
  try {
    const postid = parseInt(req.params.id);
    const userid = req.userInfo.id_from_token;

    const deleted_post = await deletePostService(postid, userid);
    if (deleted_post === null) {
      return res.status(404).json({
        success: false,
        message: "Post not found or you are not authorized to delete this post."
      })
    }

    return res.status(200).json({
      success: true,
      message: "Post deleted successfully.",
      deleted_post_from_db: deleted_post
    })
  }
  catch (error) {
    console.log("Error in deletePostController:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error"
    });
  }
}

export default deletePostController;