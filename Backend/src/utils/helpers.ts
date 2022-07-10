import { Response } from "express";
import { errorLogger } from "./logger";

import { IErrorResponse } from "../types";

function titleCase(str: string): string {
  if (!str) {
    return "";
  }

  return str
    .toLowerCase()
    .split(" ")
    .map(function (word) {
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(" ");
}

function formatPhoneNumber(phoneNumberString: string): string {
  var cleaned = ("" + phoneNumberString).replace(/\D/g, "");
  var match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
  if (match) {
    return "(" + match[1] + ") " + match[2] + "-" + match[3];
  }
  return "";
}

function isValidUUID(str: string): boolean {
  const regexExp =
    /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/gi;
  return regexExp.test(str);
}

function excludeFields<T, Key extends keyof T>(record: T, ...keys: Key[]): T {
  for (let key of keys) {
    delete record[key];
  }
  return record;
}

function handleErrorResponse(
  failedAt: string,
  error: any,
  res: Response
): Response {
  errorLogger(error);
  const errorResponse: IErrorResponse = {
    errorCode: 500,
    errorMessage: `The resquest to ${failedAt} failed. Please report this to Tech Support for further investigation.`,
  };
  return res.status(errorResponse.errorCode).json({
    error: errorResponse,
  });
}

function handleBadRequestResponse(message: string, res: Response): Response {
  const errorResponse: IErrorResponse = {
    errorCode: 400,
    errorMessage: message,
  };
  return res.status(errorResponse.errorCode).json({ error: errorResponse });
}

function handleNotFoundResponse(message: string, res: Response): Response {
  const errorResponse: IErrorResponse = {
    errorCode: 404,
    errorMessage: message,
  };
  return res.status(errorResponse.errorCode).json({ error: errorResponse });
}

function buildErrorObject(code: number, message: string): IErrorResponse {
  const error: IErrorResponse = {
    errorCode: code,
    errorMessage: message,
  };
  return error;
}

export {
  titleCase,
  formatPhoneNumber,
  isValidUUID,
  excludeFields,
  handleErrorResponse,
  handleBadRequestResponse,
  handleNotFoundResponse,
  buildErrorObject,
};
