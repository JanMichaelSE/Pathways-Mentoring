import { Message, Note } from "@prisma/client";
import { prisma } from "../database";

async function saveMessage(
  message: string,
  senderId: string,
  receiverId: string,
  noteId: string
): Promise<Message> {
  try {
    const createdMessage = await prisma.message.create({
      data: {
        message: message,
        senderId: senderId,
        receiverId: receiverId,
        noteId: noteId,
      },
    });

    return createdMessage;
  } catch (error) {
    throw error;
  }
}

async function getNoteByRecordId(recordId: string): Promise<Note | null> {
  try {
    const note = await prisma.note.findFirst({
      where: {
        recordId: recordId,
      },
    });

    return note;
  } catch (error) {
    throw error;
  }
}

export { saveMessage, getNoteByRecordId };
