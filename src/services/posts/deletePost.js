import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const deletePostService = async (postid, userid) => {
  try {
    const checkPost = await prisma.post.findUnique({
      where: {
        id: postid
      }
    })
    if (!checkPost) {
      console.log("Post not found. ");
      return null;
    }
    if (checkPost.userId !== userid) {
      console.log("You are not authorized to delete this post.");
      return null;
    }

    const deletedPost = await prisma.post.delete({
      where: {
        id: postid
      },
      include: {
        comments: true,
      }
    })

    if (deletedPost) {
      console.log("Post deleted successfully:", deletedPost);
      return deletedPost
    }
  }
  catch (error) {
    console.log("Error deleting post:", error);
    throw error;
  }
}

export default deletePostService;