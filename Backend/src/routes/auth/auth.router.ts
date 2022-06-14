import express from 'express';
import { httpLogin, httpSignup } from './auth.controller';


const router = express.Router();

router.post("/login", httpLogin);

router.post("/signup", httpSignup);


export default router;