import express from 'express';
import { httpGetAllStudents, httpGetAllStudentsByMentor } from './students.controller';

const router = express.Router();

router.get('/mentor/:email', httpGetAllStudentsByMentor);

router.get('/', httpGetAllStudents);


export default router;