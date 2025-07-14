import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import bcrypt from "bcrypt";

const registerUserService = async (username, useremail, userpassword, userrole) => {
  try {

    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [
          { userName: username },
          { userEmail: useremail }
        ]
      }
    })

    if (existingUser) {
      console.log("User already exists with this username or email.");
      return null;
    }

    const salt = await bcrypt.genSalt(10);
    const hashedpassword = await bcrypt.hash(userpassword, salt);

    const user = await prisma.user.create({
      data: {
        userName: username,
        userEmail: useremail,
        userPassword: hashedpassword,
        userRole: userrole
      },
      include: {
        posts: true,
        comments: true
      }
    })
    if (user) {
      console.log("User registered successfully:", user);
      return user;
    }
    else {
      console.log("User registration failed.");
      return null;
    }
  }
  catch (error) {
    console.log("Error registering user:", error);
    throw error;
  }
}

export default registerUserService;