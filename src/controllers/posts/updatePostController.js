import updatePost from "../../services/posts/updatePost.js";

const updatePostController = async (req, res) => {
  try {
    const { posttitle, postcontent } = req.body;
    const postid = parseInt(req.params.id);
    const userid = req.userInfo.id_from_token;

    const updated_Post = await updatePost(userid, posttitle, postcontent, postid);
    if (updated_Post === null) {
      return res.status(403).json({
        success: false,
        message: "Post not found or user does not have permission to update this post.",
      })
    }
    return res.status(200).json({
      success: true,
      message: "Post updated successfully",
      updated_post_from_db: updated_Post
    })
  }
  catch (error) {
    console.log("Error in updatePostController:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    })
  }
}

export default updatePostController;