import createCommentService from "../../services/comments/createComment.js";
import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient();

const createCommentController = async (req, res) => {
  try {
    const { commentcontent } = req.body;
    const userid = req.userInfo.id_from_token;
    const postid = parseInt(req.params.id);

    const checkPostExists = await prisma.post.findUnique({
      where: {
        id: postid
      }
    })

    if (!checkPostExists) {
      return res.status(404).json({
        success: false,
        message: "Post not found. First create a post to comment on it."
      })
    }

    const createComment = await createCommentService(commentcontent, userid, postid)
    if (createComment === null) {
      return res.status(400).json({
        success: false,
        message: "Comment creation failed. Please try again."
      })
    }

    return res.status(201).json({
      success: true,
      message: "Comment created successfully",
      comment_from_db: createComment,
      post: checkPostExists,
      postedBy: req.userInfo
    })
  }
  catch (error) {
    console.log("Error in createCommentController:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
}
export default createCommentController;