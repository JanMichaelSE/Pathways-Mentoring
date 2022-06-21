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

export interface IMentor {
  name:            string   
  password:        string
  email:           string   
  phone:           string
  role:            string  
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
  name:         string
  description?: string
  questions:    IQuestion[]
}

export interface IQuestion {
  question:      string
  type:          string
  options?:      string
  assessmentId?: number
}

