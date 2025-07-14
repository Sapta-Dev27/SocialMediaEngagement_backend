import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient();

const createCommentService = async (commentcontent, userid, postid) => {
  try {
    const createComment = await prisma.comment.create({
      data: {
        commentText: commentcontent,
        CommentedPost: {
          connect: {
            id: postid
          }
        },
        commentedBy: {
          connect: {
            id: userid
          }
        }
      }
    })
    if (!createComment) {
      console.log("Comment creation failed.");
      return null;
    }
    console.log("Comment created successfully:", createComment);
    return createComment;
  }
  catch (error) {
    console.log("Error in createCommentService:", error);
    throw error;
  }
}

export default createCommentService