import express from "express";

import authRouter from "./routes/auth/auth.router";
import mentorsRouter from "./routes/mentors/mentros.router";
import studentsRouter from "./routes/students/students.router";

const app = express();
app.use(express.json());

app.use("/auth", authRouter);
app.use("/mentors", mentorsRouter);
app.use("/students", studentsRouter);

export default app;