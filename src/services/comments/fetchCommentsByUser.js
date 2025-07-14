import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient();

const fetchCommentsByUserService = async (userid) => {
  try {
    const comments = await prisma.comment.findMany({
      where: {
        userId: userid
      },
      include :{
        CommentedPost: true,
        commentedBy: true
      }
    })
    if (!comments) {
      console.log("No comments found for this user.");
      return null;
    }
    return comments;
  }
  catch (error) {
    console.log("Error in fetchCommentsByUserService:", error);
    throw error;
  }
}

export default fetchCommentsByUserService;