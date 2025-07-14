
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import bcrypt from 'bcrypt';

const loginUserService = async (username, userpassword) => {
  try {
    const checkUserName = await prisma.user.findUnique({
      where: {
        userName: username
      }
    })
    if (!checkUserName) {
      console.log("User does not exist with this username.");
      return null;
    }
    const passwordCheck = await bcrypt.compare(userpassword, checkUserName.userPassword)
    if (!passwordCheck) {
      console.log("Incorrect password.");
      return null;
    }
    return checkUserName;
  }
  catch (error) {
    console.log(error);
    throw error;
  }
}

export default loginUserService;