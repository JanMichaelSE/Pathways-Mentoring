import { prisma } from "../database";
import crypto from "crypto";

import { User } from "@prisma/client";

import { IErrorResponse } from "./../types/index.d";
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
  userId: string,
  currentPassword: string,
  newPassword: string
): Promise<User | IErrorResponse> {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
    if (!user) {
      return buildErrorObject(401, "This user does not exist in the system.");
    }

    let hashedPasswordFromRequest = sha512(currentPassword, user.passwordSalt);
    if (hashedPasswordFromRequest !== user.password) {
      return buildErrorObject(
        401,
        "Current password is incorrect for this user."
      );
    }

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
  userId: string,
  email: string
): Promise<User | IErrorResponse> {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
    if (!user) {
      return buildErrorObject(401, "This user does not exist in the system.");
    }

    if (user.email === email) {
      return user;
    }
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
};
