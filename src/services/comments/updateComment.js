import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient();

const updateCommentService = async (commentcontent, userid, commentid) => {
  try {
    const commentExist = await prisma.comment.findUnique({
      where: {
        id: commentid
      }
    })
    if (!commentExist) {
      console.log("Comment doesnt exit")
      return null;
    }
    if (commentExist.userId !== userid) {
      console.log("User is not authorized to update this comment")
      return null;
    }
    const updatedComment = await prisma.comment.update({
      where: {
        id: commentid
      },
      data: {
        commentText: commentcontent
      },
      include: {
        commentedBy: true,
        CommentedPost: true
      }
    })
    if (updatedComment) {
      console.log("Comment updated successfully:", updatedComment);
      return updatedComment;
    }

    return null;
  }
  catch (error) {
    console.log("Error in updateCommentService:", error);
    throw error;
  }
}

export default updateCommentService;