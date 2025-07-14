import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient();

const updateAdminService = async (posttitle, postcontent, postid) => {
  try {
    const postExists = await prisma.post.findUnique({
      where: {
        id: postid
      }
    })
    if (!postExists) {
      console.log("Post not found with the given ID.");
      return null;
    }

    const updatePost = await prisma.post.update({
      where: {
        id: postid
      },
      data: {
        postTitle: posttitle,
        postContent: postcontent
      }
    })
    if (updatePost) {
      console.log("Post updated successfully:", updatePost);
      return updatePost;
    }
    else {
      console.log("Post update failed.");
      return null;
    }
  }
  catch (error) {
    console.log("Error in updateAdminService:", error);
    throw error;

  }
}

export default updateAdminService;