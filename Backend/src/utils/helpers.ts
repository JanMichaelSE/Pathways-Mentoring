import { Response } from 'express';
import { IErrorResponse } from '../types';
import { errorLogger } from './logger';

function titleCase(str: string) : string {
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

function formatPhoneNumber(phoneNumberString: string) : string {
  var cleaned = ("" + phoneNumberString).replace(/\D/g, "");
  var match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
  if (match) {
    return "(" + match[1] + ") " + match[2] + "-" + match[3];
  }
  return "";
}

function isValidUUID(str: string) : boolean {
  const regexExp = /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/gi;
  return regexExp.test(str);
}

function handleErrorResponse(failedAt:string, error: any, res: Response) : Response {
  errorLogger(error);
  const errorResponse: IErrorResponse = {
    errorCode: 500,
    errorMessage: `The resquest to ${failedAt} failed. Please report this to Tech Support for further investigation.`
  };
  return res.status(errorResponse.errorCode).json({
    error: errorResponse
  });
}

export {
  titleCase,
  formatPhoneNumber,
  isValidUUID,
  handleErrorResponse
}
