import { Socket } from "socket.io";

function handleSocketEvents(socket: Socket) {
  socket.on("test", (data) => {
    console.log("Test Fired: ", data);
  });
}

export { handleSocketEvents };
