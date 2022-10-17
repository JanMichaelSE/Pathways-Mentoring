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

const SERVER_HOST = process.env.SERVER_HOST;
const SERVER_PORT = process.env.SERVER_PORT;
const CLIENT_HOST = process.env.CLIENT_HOST;
const CLIENT_PORT = process.env.CLIENT_PORT;

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: `${CLIENT_HOST}`,
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
  handleSocketEvents(socket);
});

server.listen(SERVER_PORT, () => console.log(`Server is running ${SERVER_HOST}:${SERVER_PORT}`));
