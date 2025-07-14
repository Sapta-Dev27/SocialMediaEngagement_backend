import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const createPostService = async (posttitle, postcontent, postUserId) => {
  try {
    const createPost = await prisma.post.create({
      data: {
        postTitle: posttitle,
        postContent: postcontent,
        postedBy: {
          connect: {
            id: postUserId
          }
        }
      },
      include: {
        comments: true
      }
    })
    if (createPost) {
      console.log("Post created successfully:", createPost);
      return createPost;
    }
    else {
      console.log("Post creation failed.");
      return null;
    }
  }
  catch (error) {
    console.log("Error creating post:", error);
    throw error;
  }
}

export default createPostService;