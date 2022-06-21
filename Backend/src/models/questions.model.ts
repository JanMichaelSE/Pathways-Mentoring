import { prisma } from "../database";
import { Question } from "@prisma/client";


function exclude<Question, Key extends keyof Question>(
  question: Question,
  ...keys: Key[]
): Question {
  for (let key of keys) {
    delete question[key];
  }
  return question;
}