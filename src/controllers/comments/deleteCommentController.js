import deleteCommentservice from "../../services/comments/deleteComment.js";

const deleteCommentController = async (req, res) => {
  try {
    const commentid = parseInt(req.params.id);
    const userid = req.userInfo.id_from_token;

    const deleted_Comment = await deleteCommentservice(userid, commentid);
    if (deleted_Comment === null) {
      return res.status(404).json({
        success: false,
        message: "Comment not found or you are not authorized to delete this comment."
      })
    }
    return res.status(200).json({
      success: true,
      message: "Comment deleted successfully.",
      deleted_comment_from_db: deleted_Comment,
      userInfo: req.userInfo
    })
  }
  catch (error) {
    console.log("Error in deleteCommentController:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error"
    });
  }
}

export default deleteCommentController