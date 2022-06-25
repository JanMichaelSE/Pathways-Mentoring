import express from 'express';
import { httpGetAllMentors, httpGetMentorByUserId, httpUpdateMentorProfile } from './mentors.controller';

const router = express.Router();

router.get('/', httpGetAllMentors);

router.get('/:id', httpGetMentorByUserId);

router.post('/', httpUpdateMentorProfile);

export default router;