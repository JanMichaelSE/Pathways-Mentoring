import { IMessage } from "./../types/index.d";
import { Socket } from "socket.io";
import { createMessage } from "../models/notes.model";

function handleSocketEvents(socket: Socket) {
  socket.on("join_chat", (data) => {
    socket.join(data.chat_id);
  });

  socket.on("send_message", (data) => {
    const messageInfo: IMessage = {
      noteId: data.chat_id,
      message: data.message,
      senderId: data.senderId,
      receiverId: data.receiverId,
    };

    (async () => {
      let createdMessage = await createMessage(messageInfo);
      socket.to(data.chat_id).emit("receive_message", createdMessage);
    })();
  });
}

export { handleSocketEvents };
