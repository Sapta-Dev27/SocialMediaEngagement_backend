import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient();

const deleteCommentservice = async (userid, commentid) => {
  try {
    const deleteComment = await prisma.comment.findUnique({
      where: {
        id: commentid
      }
    })
    if (!deleteComment) {
      console.log("Comment not found or you are not authorized to delete this comment.");
      return null;
    }
    if (deleteComment.userId !== userid) {
      console.log("You are not authorized to delete this comment.");
      return null;
    }
    const deletedComment = await prisma.comment.delete({
      where: {
        id: commentid
      }
    })
    if (deleteComment) {
      console.log("Comment deleted successfully:", deletedComment);
      return deletedComment;
    }
    return null;
  }
  catch (error) {
    console.log("Error in deleteCommentService:", error);
    throw error;
  }
}

export default deleteCommentservice;