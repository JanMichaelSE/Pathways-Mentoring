import { prisma } from "../database";
import crypto from "crypto";

import { User } from "@prisma/client";

import { IErrorResponse, IUser } from "./../types/index.d";
import { buildErrorObject, excludeFields } from "../utils/helpers";

async function createUser(
  email: string,
  password: string,
  role: string
): Promise<User | IErrorResponse> {
  try {
    const existingUser = await findUserByEmail(email);
    if (existingUser) {
      return buildErrorObject(
        400,
        "Email is already taken, please provide a another email address."
      );
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

async function updateUserPassword(
  user: User,
  newPassword: string
): Promise<User | IErrorResponse> {
  try {
    let salt: string = generateSalt(32);
    let hashedPassword: string = sha512(newPassword, salt);

    const updatedUser = await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        password: hashedPassword,
        passwordSalt: salt,
      },
    });

    return updatedUser;
  } catch (error) {
    throw error;
  }
}

async function updateUserEmail(
  user: User,
  email: string
): Promise<User | IErrorResponse> {
  try {
    const updatedUser = await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        email: email,
      },
    });

    return updatedUser;
  } catch (error) {
    throw error;
  }
}

async function isUserAuthorized(
  email: string,
  password: string
): Promise<User | IErrorResponse> {
  try {
    const user = await findUserByEmail(email);
    if (!user) {
      return buildErrorObject(401, "A user with this email doesn't exist.");
    }

    let hashedPasswordFromRequest = sha512(password, user.passwordSalt);
    if (hashedPasswordFromRequest !== user.password) {
      return buildErrorObject(
        401,
        "Provided password is incorrect for this user."
      );
    }

    const userWithoutPassord = excludeFields(user, "password", "passwordSalt");
    return userWithoutPassord;
  } catch (error) {
    throw error;
  }
}

async function validateProfileUpdate(
  userInfo: IUser
): Promise<User | IErrorResponse> {
  try {
    // Validate that User Exists
    const user = await prisma.user.findUnique({
      where: {
        id: userInfo.id,
      },
    });
    if (!user) {
      return buildErrorObject(401, "This user does not exist in the system.");
    }

    // Validate if Email Already Exists
    if (userInfo.email !== user.email) {
      const userWithEmailExists = await findUserByEmail(userInfo.email);
      if (userWithEmailExists) {
        return buildErrorObject(400, "A user with this email already exists.");
      }
    }

    // Validate Passwords Match
    if (
      userInfo.password &&
      userInfo.newPassword &&
      userInfo.password !== userInfo.newPassword
    ) {
      let hashedPasswordFromRequest = sha512(
        userInfo.password,
        user.passwordSalt
      );
      if (hashedPasswordFromRequest !== user.password) {
        return buildErrorObject(
          401,
          "Current password is incorrect for this user."
        );
      }
    }

    return user;
  } catch (error) {
    throw error;
  }
}

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

export {
  createUser,
  findUserByEmail,
  updateUserPassword,
  updateUserEmail,
  isUserAuthorized,
  validateProfileUpdate,
};