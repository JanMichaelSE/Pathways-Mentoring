import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import authRouter from "./routes/auth/auth.router";
import mentorsRouter from "./routes/mentors/mentors.router";
import studentsRouter from "./routes/students/students.router";
import assessmentRouter from "./routes/assessments/asessments.router";
import recordsRouter from "./routes/records/records.router";
import contactUsRouter from "./routes/contact-us/contact-us.router";
import developmentPlanRouter from "./routes/development-plan/development-plan.router";

dotenv.config();
const app = express();
const allowedOrigins = ["http://localhost:3000"];
const options: cors.CorsOptions = {
  origin: allowedOrigins,
};

app.use(cors(options));
app.use(express.json());

app.use("/auth", authRouter);
app.use("/mentors", mentorsRouter);
app.use("/students", studentsRouter);
app.use("/assessments", assessmentRouter);
app.use("/records", recordsRouter);
app.use("/contact-us", contactUsRouter);
app.use("/development-plan", developmentPlanRouter);

export default app;
