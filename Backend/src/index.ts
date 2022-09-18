import http from "http";
import { Server } from "socket.io";
import app from "./app";
import { createAssessment, doesPathwayAssessmentExist } from "./models/assessments.model";
import { findDevelopmentPlanQuestionsWithAnswers, upsertQuestions } from "./models/questions.model";
import {
  initialAssessmentQuestionsData,
  initialDevelopmentPlanData,
} from "./services/data.service";
import { handleSocketEvents } from "./services/socket.service";

const PORT = process.env.SERVER_PORT ?? 8000;

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

async function loadServerInitialData() {
  const assessmentExists = await doesPathwayAssessmentExist();
  if (!assessmentExists) {
    const pathwaysQuestions = initialAssessmentQuestionsData();
    await createAssessment(
      "Pathways Assessment",
      `This assessment is intended to help you define the scientific tasks that you enjoy doing and would like to include as integral elements of your career. It might also highlight tasks that you would like to avoid. This is a subjective assessment of your professional interests.`,
      pathwaysQuestions
    );
  }

  const developmentPlan = await findDevelopmentPlanQuestionsWithAnswers();
  if (developmentPlan.length === 0) {
    const developPlanInitialQuestions = initialDevelopmentPlanData();
    await upsertQuestions(developPlanInitialQuestions);
  }
}

loadServerInitialData();

// Listen for when the client connects via socket.io-client
io.on("connection", (socket) => {
  console.log(`User connected ${socket.id}`);

  handleSocketEvents(socket);
});

server.listen(PORT, () => console.log(`Server is running http://localhost:${PORT}`));
