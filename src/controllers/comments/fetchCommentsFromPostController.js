import fetchCommentsByPostService from "../../services/comments/fetchCommentsByPost.js";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const fetchCommentsByPostController = async (req, res) => {
  try {
    const postid = parseInt(req.params.id);
    const postExists = await prisma.post.findUnique({
      where: {
        id: postid
      }
    })
    if (!postExists) {
      return res.status(404).json({
        success: false,
        message: "Post not found."
      });
    }
    const fetchComments = await fetchCommentsByPostService(postid);
    if (fetchComments === null) {
      return res.status(400).json({
        success: false,
        message: "No comments found for this post."
      })
    }
    return res.status(200).json({
      success: true,
      message: "Comments fetched successfully",
      comments_of_post_from_db: fetchComments,
      userInfo: req.userInfo
    })

  }
  catch (error) {
    console.log("Error in fetchCommentsByPostController:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
}
export default fetchCommentsByPostController;