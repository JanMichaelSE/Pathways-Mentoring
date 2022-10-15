import { IMessage } from './../types/index.d';
import { Message, Note } from "@prisma/client";
import { prisma } from "../database";

async function createMessage(
 messageInfo: IMessage
): Promise<Message> {
  try {
    const createdMessage = await prisma.message.create({
      data: {
        message: messageInfo.message,
        senderId: messageInfo.senderId,
        receiverId: messageInfo.receiverId,
        noteId: messageInfo.noteId,
      },
    });

    return createdMessage;
  } catch (error) {
    throw error;
  }
}

async function findNoteById(noteId: string): Promise<
  | (Note & {
      messages: Message[];
      record: {
        mentor: {
          userId: string;
        };
        student: {
          userId: string;
        };
      };
    })
  | null
> {
  try {
    const note = await prisma.note.findUnique({
      where: {
        id: noteId,
      },
      include: {
        messages: true,
        record: {
          select: {
            mentor: {
              select: {
                userId: true,
              },
            },
            student: {
              select: {
                userId: true,
              },
            },
          },
        },
      },
    });

    return note;
  } catch (error) {
    throw error;
  }
}

async function findNoteByRecordId(recordId: string): Promise<Note | null> {
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

export { createMessage, findNoteByRecordId, findNoteById };
