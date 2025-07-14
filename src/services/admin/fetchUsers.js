import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient();

const fetchUsersAdminService = async () => {
  try {
    const fetchUsers = await prisma.user.findMany({
      include: {
        posts: true,
        comments: true
      }
    });
    if (fetchUsers) {
      console.log("Users fetched successfully:", fetchUsers);
      return fetchUsers
    }
    return null;
  }
  catch (error) {
    console.log("Error in fetchUsersAdminService:", error);
    throw error;
  }
}

export default fetchUsersAdminService;