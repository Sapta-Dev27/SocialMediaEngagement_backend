import updateCommentService from "../../services/comments/updateComment.js";

const commentUpdateController = async (req, res) => {
  try {
    const userid = req.userInfo.id_from_token;
    const commentid = parseInt(req.params.id);
    const { commentcontent } = req.body;

    const updated_comment = await updateCommentService(commentcontent, userid, commentid);
    if (updated_comment === null) {
      return res.status(403).json({
        success: false,
        message: "Comment not found or user does not have permission to update this comment.",
      })
    }

     return res.status(200).json({
      success : true ,
      message : "Comment updated successfully",
      updated_comment_from_db : updated_comment,
      user_info : req.userInfo  
     })
  }
  catch (error) {
    console.log("Error in commentUpdateController:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
}

export default commentUpdateController