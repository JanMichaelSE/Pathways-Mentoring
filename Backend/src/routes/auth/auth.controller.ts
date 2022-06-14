import { Request, Response } from 'express';

async function httpLogin( req: Request, res: Response) {
  res.status(200).send("Login Endpoint");
}

async function httpSignup( req: Request, res: Response) {
  res.status(200).send("Singup Endpoint");
}

export {
  httpLogin,
  httpSignup
}