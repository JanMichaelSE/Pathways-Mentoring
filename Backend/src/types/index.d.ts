export interface IErrorResponse {
  errorCode:     number
  errorMessage:  string
}

export interface IStudent {
  name: string
  password: string
  email: string
  role: string
  phone: string
  gender: string
  graduationDate: Date
  gpa: number
  institution: string
  fieldOfStudy: string
  hasResearch: boolean
  profilePicture: string
}