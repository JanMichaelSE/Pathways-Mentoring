export interface IErrorResponse {
  errorCode:     number
  errorMessage:  string
}

export interface IUser {
  id?: string
  email: string
  password: string
  newPassword?: string
  role?: string
}

export interface IStudent {
  name: string
  phone: string
  gender: string
  graduationDate: Date
  gpa: number
  institution: string
  fieldOfStudy: string
  hasResearch?: boolean
  profilePicture: string
}

export interface IMentor {
  name:            string   
  phone:           string
  gender:          string  
  department:      string  
  academicDegree:  string  
  office?:         string  
  officeHours?:    string 
  facultyStatus:   string  
  interests?:      string
  description?:    string
  profilePicture?: string
}

export interface IAssessment {
  id?:          number
  name:         string
  description?: string
  questions:    IQuestion[]
}

export interface IQuestion {
  id?:           number
  question:      string
  type:          string
  options?:      string
  assessmentId?: number
}

