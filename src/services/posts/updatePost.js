import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient();

const updatePost = async (userid, posttitle, postcontent, postid) => {
  try {
    const postCheck = await prisma.post.findUnique({
      where: {
        id: postid
      }
    })
    if (!postCheck || postCheck.userId !== userid) {
      console.log("Post not found or user does not have permission to update this post.");
      return null;
    }
    const updatedPost = await prisma.post.update({
      where: {
        id: postid
      },
      data: {
        postTitle: posttitle,
        postContent: postcontent
      },
      include: {
        comments: true
      }
    })
    if (updatePost) {
      console.log("Post updated successfully:", updatedPost);
      return updatedPost;
    }
    return null;
  }
  catch (error) {
    console.log("Error updating post:", error);
    throw error;
  }
}
export default updatePost;