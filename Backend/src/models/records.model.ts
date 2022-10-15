import { Record } from "@prisma/client";
import { prisma } from "../database";
import { recordData } from "../services/data.service";

async function findAllRecords(): Promise<Record[]> {
  try {
    const records = await prisma.record.findMany();
    return records;
  } catch (error) {
    throw error;
  }
}

async function findRecordById(id: string): Promise<Record | null> {
  try {
    const record = await prisma.record.findUnique({
      where: {
        id: id,
      },
      include: {
        mentor: {
          select: {
            name: true,
          },
        },
        note: {
          select: {
            id: true,
          },
        },
      },
    });

    return record;
  } catch (error) {
    throw error;
  }
}

async function findRecordsByStudent(studentId: string): Promise<Record[]> {
  try {
    const records = await prisma.record.findMany({
      where: {
        studentId: studentId,
      },
      include: {
        mentor: {
          select: {
            name: true,
          },
        },
        note: {
          select: {
            id: true,
          },
        },
      },
    });

    return records;
  } catch (error) {
    throw error;
  }
}

async function findRecordsByMentor(mentorId: string): Promise<Record[]> {
  try {
    const records = await prisma.record.findMany({
      where: {
        mentorId: mentorId,
      },
      include: {
        student: {
          select: {
            name: true,
          },
        },
        note: {
          select: {
            id: true,
          },
        },
      },
    });

    return records;
  } catch (error) {
    throw error;
  }
}

async function createRecords(mentorId: string, studentId: string): Promise<Record[]> {
  try {
    let records = recordData().map((record) => {
      record.studentId = studentId;
      record.mentorId = mentorId;
      return record;
    });

    let createdRecords: Record[] = [];
    for (const record of records) {
      const _record = await prisma.record.create({
        data: {
          ...record,
          note: {
            create: {},
          },
        },
        include: {
          note: true,
        },
      });
      createdRecords.push(_record);
    }

    return createdRecords;
  } catch (error) {
    throw error;
  }
}

async function updateRecord(recordId: string, stage: string): Promise<Record | null> {
  try {
    const updatedRecord = await prisma.record.update({
      where: {
        id: recordId,
      },
      data: {
        stage: !!stage ? stage : undefined,
      },
    });

    const recordToReturn = await prisma.record.findUnique({
      where: {
        id: recordId,
      },
      include: {
        student: {
          select: {
            name: true,
          },
        },
        note: {
          select: {
            id: true,
          },
        },
      },
    });

    return recordToReturn;
  } catch (error) {
    throw error;
  }
}

export {
  findAllRecords,
  findRecordById,
  findRecordsByStudent,
  findRecordsByMentor,
  createRecords,
  updateRecord,
};
