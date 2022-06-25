import express from 'express';
import { httpGetAllStudents, httpGetAllStudentsByMentor, httpUpdateStudentProfile } from './students.controller';

const router = express.Router();

router.get('/mentor/:email', httpGetAllStudentsByMentor);

router.get('/', httpGetAllStudents);

router.post('/', httpUpdateStudentProfile);


export default router;