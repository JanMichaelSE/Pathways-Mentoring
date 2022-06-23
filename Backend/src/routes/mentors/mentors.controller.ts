import { Request, Response } from "express";
import { getAllMentors } from "../../models/mentors.model";
import { IErrorResponse } from "../../types";
import { handleErrorResponse } from "../../utils/helpers";


async function httpGetAllMentors(req: Request, res: Response) {
  try {
    const mentors = await getAllMentors();
    return res.status(200).json(mentors);
  } catch (error) {
    return handleErrorResponse('get all mentors', error, res);
  }
}


export {
  httpGetAllMentors
}