export interface IErrorResponse {
  errorCode: number;
  errorMessage: string;
}

export interface IUser {
  id?: string;
  email: string;
  password: string;
  newPassword?: string;
  role?: string;
}

export interface IStudent {
  name: string;
  phone: string;
  gender: string;
  graduationDate: Date;
  gpa: number;
  institution: string;
  fieldOfStudy: string;
  hasResearch?: boolean;
  profilePicture: string;
}

export interface IMentor {
  name: string;
  phone: string;
  gender: string;
  department: string;
  academicDegree: string;
  office?: string;
  officeHours?: string;
  facultyStatus: string;
  interests?: string;
  description?: string;
  profilePicture?: string;
}

export interface IAssessment {
  id?: number;
  name: string;
  description?: string;
  questions: IQuestion[];
}

export interface IQuestion {
  id?: number;
  question: string;
  type: string;
  options?: string;
  assessmentId?: number;
}

export interface IAnswer {
  id?: number;
  userId: string;
  questionId: number;
  answer: string;
}

export interface IAnsweredAssessment {
  assessmentId: number;
  assessmentAnswers: IAssessmentAnswers[];
}

export interface IAssessmentAnswers {
  questionId: number;
  question: string;
  answers: IAnswerResposne[];
}

export interface IAnswerResposne {
  id?: number;
  answer: string;
  createdDate: Date;
  lastModified: Date;
}
