import { prisma } from "../database";
import crypto from "crypto";

import { User } from "@prisma/client";
import { IErrorResponse } from "./../types/index.d";

async function createUser(
  name: string,
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
        name: name,
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

export { createUser };
