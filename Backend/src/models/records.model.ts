import { Record } from "@prisma/client";
import { prisma } from "../database";
import { recordData } from "../services/data.service";

async function getAllRecords(): Promise<Record[]> {
  try {
    const records = await prisma.record.findMany();
    return records;
  } catch (error) {
    throw error;
  }
}

async function getRecordsByStudent(studentId: string): Promise<Record[]> {
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
      },
    });

    return records;
  } catch (error) {
    throw error;
  }
}

async function getRecordsByMentor(mentorId: string): Promise<Record[]> {
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
          notes: {
            create: {},
          },
        },
        include: {
          notes: true,
        },
      });
      createdRecords.push(_record);
    }

    return createdRecords;
  } catch (error) {
    throw error;
  }
}

async function updateRecord(recordId: string, stage: string): Promise<Record> {
  try {
    const updatedRecord = await prisma.record.update({
      where: {
        id: recordId,
      },
      data: {
        stage: !!stage ? stage : undefined,
      },
    });

    return updatedRecord;
  } catch (error) {
    throw error;
  }
}

export { getAllRecords, getRecordsByStudent, getRecordsByMentor, createRecords, updateRecord };
