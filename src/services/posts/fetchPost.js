import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient();

const fetchPostServices = async (userid) => {
  try {
    const posts = await prisma.post.findMany({
      where: {
        userId: userid
      },
      include: {
        comments: true,
      }
    })
    if (!posts) {
      return null;
    }
    return posts;
  }
  catch (error) {
    console.log("Error fetching posts:", error);
    throw error;
  }
}

export default fetchPostServices;
