import { prisma } from "../database";
import crypto from "crypto";

import { User } from "@prisma/client";
import { IErrorResponse } from "./../types/index.d";

async function createUser(
  email: string,
  password: string,
  role: string
): Promise<User | IErrorResponse> {
  try {
    
    const existingUser = await findUserByEmail(email);
    if (existingUser) {
      const error: IErrorResponse = {
        errorCode: 400,
        errorMessage:
          "Email is already taken, please provide a another email address.",
      };
      return error;
    }

    let salt: string = generateSalt(32);
    let hashedPassword: string = sha512(password, salt);

    const createdUser = await prisma.user.create({
      data: {
        email: email,
        password: hashedPassword,
        passwordSalt: salt,
        role: role,
      },
    });

    return createdUser;

  } catch (error) {
    throw error;
  }
}

async function findUserByEmail(email: string): Promise<User | null> {
  try {

    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    return user;

  } catch (error) {
    throw error;
  }
}

async function isUserAuthorized(email: string, password: string) : Promise<User | IErrorResponse> {
  try {
    
    const user = await findUserByEmail(email);
    if (!user) {
      const error: IErrorResponse = {
        errorCode: 401,
        errorMessage:
          "A user with this email doesn't exist.",
      };
      return error;
    }

    let hashedPasswordFromRequest = sha512(password, user.passwordSalt);
    if (hashedPasswordFromRequest !== user.password) {
      const error: IErrorResponse = {
        errorCode: 401,
        errorMessage:
          "Provided password is incorrect for this user.",
      };
      return error;
    }

    const userWithoutPassord = exclude(user, 'password', 'passwordSalt');
    return userWithoutPassord;

  } catch (error) {
    throw error;
  }
}

async function updateUserPassword(userId: string, currentPassword: string, newPassword: string) : Promise<User | IErrorResponse> {
  try {

    const user = await prisma.user.findUnique({
      where: {
        id: userId
      }
    });
    if (!user) {
      const error: IErrorResponse = {
        errorCode: 401,
        errorMessage:
          "This user does not exist in the system.",
      };
      return error;
    }

    let hashedPasswordFromRequest = sha512(currentPassword, user.passwordSalt);
    if (hashedPasswordFromRequest !== user.password) {
      const error: IErrorResponse = {
        errorCode: 401,
        errorMessage:
          "Current password is incorrect for this user.",
      };
      return error;
    }

    let salt: string = generateSalt(32);
    let hashedPassword: string = sha512(newPassword, salt);

    const updatedUser = await prisma.user.update({
      where: {
        id: user.id
      },
      data: {
        password: hashedPassword,
        passwordSalt: salt
      }
    });

    return updatedUser;

  } catch (error) {
    throw error;
  }
}

async function updateUserEmail(userId: string, email: string) : Promise<User | IErrorResponse> {
  try {

    const user = await prisma.user.findUnique({
      where: {
        id: userId
      }
    });
    if (!user) {
      const error: IErrorResponse = {
        errorCode: 401,
        errorMessage:
          "This user does not exist in the system.",
      };
      return error;
    }

    if (user.email === email) {
      return user;
    }
    const updatedUser = await prisma.user.update({
      where: {
        id: user.id
      },
      data: {
        email: email
      }
    });

    return updatedUser;

  } catch (error) {
    throw error;
  }
}


// --- User Helper Functions ---
function generateSalt(length: number): string {
  return crypto
    .randomBytes(Math.ceil(length / 2))
    .toString("hex")
    .slice(0.16);
}

function sha512(password: string, salt: string) {
  let HMAC = crypto.createHmac("sha256", salt);
  HMAC.update(password);
  let hashedPassword = HMAC.digest("hex");
  return hashedPassword;
}

function exclude<User, Key extends keyof User>(
  user: User,
  ...keys: Key[]
): User {
  for (let key of keys) {
    delete user[key];
  }
  return user;
}

export { 
  createUser,
  isUserAuthorized, 
  updateUserPassword,
  updateUserEmail 
};
