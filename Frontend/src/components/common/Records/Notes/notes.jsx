import { useState, useEffect } from "react";

import { Spinner, useToast } from "@chakra-ui/react";
import { useSocketStore } from "@/store/socket.store";
import { httpGetNote } from "@/api/notes.api";
import ReceiverMessage from "../ReceiverMessage/receiver-message";
import SenderMessage from "../SenderMessage/sender-message";

import styles from "./notes.module.css";

function Notes({ noteId }) {
  const toast = useToast();
  const socket = useSocketStore((state) => state.socket);
  const [note, setNote] = useState({});
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [message, setMessage] = useState("");

  console.log("Note Socket: ", socket);

  useEffect(() => {
    async function loadNoteData() {
      const response = await httpGetNote(noteId);

      if (response.hasError) {
        return toast({
          description: "Could not load the messages for this record.",
          status: "error",
          position: "top",
          duration: 5000,
        });
      }

      let noteData = response.data;
      noteData.messages = noteData.messages.sort((m) => m.createdDate);
      setNote(response.data);
      setMessages(noteData.messages);
      socket.emit("join_chat", { chat_id: noteId });
      setIsLoading(false);
    }
    loadNoteData();
  }, []);

  useEffect(() => {
    if (!isLoading) {
      scrollChatToBottom();
      socket.on("receive_message", (data) => {
        console.log("Receive Message: ", data);
        messages.push(data);
        setMessages([...messages]);
      });
    }
  }, [isLoading, messages]);

  function onMessageInputChange(event) {
    const inputMessage = event.target.value;
    setMessage(inputMessage);
  }

  function sendMessage() {
    socket.emit("send_message", {
      chat_id: noteId,
      message: message,
      senderId: note.senderId,
      receiverId: note.receiverId,
    });

    const messageInfo = {
      message: message,
      senderId: note.senderId,
      receiverId: note.receiverId,
      createdDate: new Date(),
    };
    messages.push(messageInfo);
    setMessages([...messages]);
    setMessage("");
  }

  function scrollChatToBottom() {
    document.getElementById("message-container").scrollTo({
      left: 0,
      top: document.getElementById("message-container").scrollHeight,
      behavior: "smooth",
    });

    document.getElementById("message-container").addEventListener("DOMNodeInserted", (event) => {
      const { currentTarget: target } = event;
      target.scroll({ top: target.scrollHeight, behavior: "smooth" });
    });
  }

  if (isLoading) {
    return (
      <Spinner
        thickness="5px"
        speed="0.65s"
        emptyColor="gray.200"
        color="blue.500"
        size="xl"
        position="absolute"
        top="30%"
        left="50%"
      />
    );
  }
  return (
    <>
      <div className={styles.notesContainer}>
        <div id="message-container" className={styles.messageContainer}>
          {messages.map((message, index) => {
            if (message.senderId === note.senderId) {
              return (
                <SenderMessage key={index} message={message.message} date={message.createdDate} />
              );
            } else {
              return (
                <ReceiverMessage key={index} message={message.message} date={message.createdDate} />
              );
            }
          })}
        </div>
        <div className={styles.buttonsContainer}>
          <input
            type="text"
            placeholder="Message"
            className={styles.input}
            value={message}
            onChange={onMessageInputChange}
          />
          <button type={"button"} className={styles.btn} onClick={sendMessage}>
            Send
          </button>
        </div>
      </div>
    </>
  );
}

export default Notes;
