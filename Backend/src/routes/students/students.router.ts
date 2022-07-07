import express from 'express';
import { httpGetAllStudents, httpGetAllStudentsByMentor, httpGetStudentByUserId, httpUpdateStudentProfile } from './students.controller';

const router = express.Router();

router.get('/mentor/:email', httpGetAllStudentsByMentor);

router.get('/', httpGetAllStudents);

router.get('/:id', httpGetStudentByUserId);

router.post('/', httpUpdateStudentProfile);


export default router;