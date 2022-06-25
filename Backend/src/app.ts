import express from "express";

import authRouter from "./routes/auth/auth.router";
import mentorsRouter from "./routes/mentors/mentors.router";
import studentsRouter from "./routes/students/students.router";
import assessmentRouter from "./routes/assessments/asessments.router";

const app = express();
app.use(express.json());

app.use("/auth", authRouter);
app.use("/mentors", mentorsRouter);
app.use("/students", studentsRouter);
app.use("/assessments", assessmentRouter);

export default app;