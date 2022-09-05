import { Socket } from "socket.io";

function handleSocketEvents(socket: Socket) {
  // --- Pending Chat from Frontend to start connection ----
  // let __createdtime__ = Date.now(); // Current timestamp
  // // Send message to all users currently in the room, apart from the user that just joined
  // socket.emit("receive_message", {
  //   message: `Jan has joined the chat room`,
  //   username: "CHAT_BOT ",
  //   __createdtime__,
  // });
}

export { handleSocketEvents };
