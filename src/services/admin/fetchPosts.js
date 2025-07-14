import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient();

const fetchPostsAdminService = async () => {
  try {
    const fetchPosts = await prisma.post.findMany({
      include: {
        comments: true
      }
    })
    if (fetchPosts) {
      console.log("Posts fetched successfully:", fetchPosts);
      return fetchPosts
    }
    return null
  }
  catch (error) {
    console.log("Error in fetchPostsService:", error);
    throw error;
  }
}

export default fetchPostsAdminService;