import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient();

const fetchCommentsAdminService = async () => {
  try {
    const fetchComments = await prisma.comment.findMany({
      include: {
        commentedBy : true,
        CommentedPost: true
      }
    })
    if (fetchComments) {
      console.log("Posts fetched successfully:", fetchComments);
      return fetchComments
    }
    return null
  }
  catch (error) {
    console.log("Error in fetchPostsService:", error);
    throw error;
  }
}

export default fetchCommentsAdminService;