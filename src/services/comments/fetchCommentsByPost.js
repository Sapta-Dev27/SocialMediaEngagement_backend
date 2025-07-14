import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const fetchCommentsByPostService = async (postid) => {
  try {
    const fetchCommentsfromPost = await prisma.comment.findMany({
      where: {
        postId: postid
      },
      include:{
        commentedBy : true ,
        CommentedPost: true
      }
    })
    if( fetchCommentsfromPost) {
      console.log("Comments fetched successfully:", fetchCommentsfromPost);
      return fetchCommentsfromPost
    }
    return null;
  }
  catch (error) {
    console.log("Error in fetchCommentsByPostService:", error);
    throw error;
  }
}

export default fetchCommentsByPostService