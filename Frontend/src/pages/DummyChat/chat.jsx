// client/src/pages/chat/index.js

import styles from "./styles.module.css";
import MessagesReceived from "./components/messages";
import { useSocketStore } from "../../store/socket.store";

function Chat() {
  const socket = useSocketStore((state) => state.socket);
  return (
    <div className={styles.chatContainer}>
      <div>
        <MessagesReceived socket={socket} />
      </div>
    </div>
  );
}

export default Chat;
