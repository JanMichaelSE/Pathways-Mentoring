import { Request, Response } from "express";
import { findNoteById } from "../../models/notes.model";
import { findUserById } from "../../models/users.model";

import { handleBadRequestResponse, handleErrorResponse } from "../../utils/helpers";

async function httpGetNote(req: Request, res: Response) {
  try {
    const senderId = req.userId;
    const sender = await findUserById(senderId);
    if (!sender) {
      return handleBadRequestResponse("No user exists with this access token.", res);
    }

    const noteId = req.params.noteId;
    if (!noteId) {
      return handleBadRequestResponse(`A valid "noteId" must be provided.`, res);
    }

    const note = await findNoteById(noteId);
    if (!note) {
      return handleBadRequestResponse("No notes found with this noteId.", res);
    }

    let noteWithMessages = {};
    if (sender.role == "Mentor") {
      noteWithMessages = {
        id: note.id,
        recordId: note.recordId,
        messages: note.messages,
        senderId: senderId,
        receiverId: note.record.student.userId,
      };
    } else {
      noteWithMessages = {
        id: note.id,
        recordId: note.recordId,
        messages: note.messages,
        senderId: senderId,
        receiverId: note.record.mentor.userId,
      };
    }

    return res.status(200).json(noteWithMessages);
  } catch (error) {
    return handleErrorResponse("get note", error, res);
  }
}

export { httpGetNote };
