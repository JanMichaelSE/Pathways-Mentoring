import express from 'express';
import { httpLogin, httpSignupMentor, httpSignupStudent } from './auth.controller';


const router = express.Router();

router.post("/login", httpLogin);

router.post("/signup/student", httpSignupStudent);

router.post("/signup/mentor", httpSignupMentor);


export default router;