import { IErrorResponse } from "./../types/index.d";
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

import { buildErrorObject } from "../utils/helpers";
import { getUserTokens } from "../models/users.model";

async function authenticateJsonWebToken(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    const error = buildErrorObject(401, "Your are not authenticated.");
    return res.status(error.errorCode).json({ error: error });
  }

  const userTokens = await getUserTokens(token);
  if (token !== userTokens?.accessToken) {
    const error = buildErrorObject(
      403,
      "Your are not authorized to access these resources."
    );
    return res.status(error.errorCode).json({ error: error });
  }

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET || "", (err, user) => {
    if (err) {
      const error = buildErrorObject(
        403,
        "Your are not authorized to access these resources."
      );
      return res.status(error.errorCode).json({ error: error });
    }

    const userId = user as { id: string; iat: number; exp: number };
    req.userId = userId.id;
    next();
  });
}

function generateAccessToken(userId: string): string {
  const user = { id: userId };
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET || "", {
    expiresIn: "1200s",
  });
}

function generateRefreshToken(userId: string): string {
  const user = { id: userId };
  return jwt.sign(user, process.env.REFRESH_TOKEN_SECRET || "", {
    expiresIn: "2h",
  });
}

function verifyRefreshToken(
  refreshToken: string
): [string, string] | IErrorResponse {
  let accessToken = "";
  let refreshedToken = "";

  jwt.verify(
    refreshToken,
    process.env.REFRESH_TOKEN_SECRET || "",
    (err, user) => {
      if (err) {
        return buildErrorObject(403, "Token has expired.");
      }

      const userId = user as { id: string; iat: number; exp: number };
      accessToken = generateAccessToken(userId.id);
      refreshedToken = generateRefreshToken(userId.id);
    }
  );

  return [accessToken, refreshedToken];
}

function getUserIdFromToken(token: string): string {
  const decodedToken = jwt.decode(token, { complete: true });

  if (!decodedToken) {
    return "";
  }

  const user = decodedToken.payload as { id: string; iat: number; exp: number };
  return user.id;
}

export {
  authenticateJsonWebToken,
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
  getUserIdFromToken,
};
