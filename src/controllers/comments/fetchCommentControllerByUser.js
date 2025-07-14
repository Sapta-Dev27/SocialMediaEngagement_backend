import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import fetchCommentsByUserService from "../../services/comments/fetchCommentsByUser.js";

const fetchCommentsByUserController = async (req, res) => {
  try {
    const userid = req.userInfo.id_from_token;
    const fetchComments = await fetchCommentsByUserService(userid);

    if (fetchComments === null) {
      return res.status(404).json({
        success: false,
        message: "No comments found for this user."
      })
    }
    return res.status(200).json({
      success: true,
      message: "Comments fetched successfully",
      comments_of_use_from_db: fetchComments,
      commentedBy: req.userInfo,

    })

  }
  catch (error) {
    console.log("Error in fetchCommentsByUserController:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
}

export default fetchCommentsByUserController