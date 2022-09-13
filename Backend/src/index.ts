import http from "http";
import { Server } from "socket.io";
import app from "./app";
import { handleSocketEvents } from "./services/socket.service";

const PORT = process.env.SERVER_PORT ?? 8000;

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

// Listen for when the client connects via socket.io-client
io.on("connection", (socket) => {
  console.log(`User connected ${socket.id}`);

  handleSocketEvents(socket);
});

server.listen(PORT, () => console.log(`Server is running http://localhost:${PORT}`));
