import express from 'express';
import { httpGetAllMentors } from './mentors.controller';

const router = express.Router();

router.get('/', httpGetAllMentors);

export default router;