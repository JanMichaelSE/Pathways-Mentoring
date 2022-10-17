import AuthRouter from "@/routes/root.router.jsx";
import { ChakraProvider } from "@chakra-ui/react";
import io from "socket.io-client";
import { useSocketStore } from "./store/socket.store";
import "./styles/App.css";

const HOST = import.meta.env.VITE_HOST || "http://localhost:8000";
const PATH = import.meta.env.VITE_HOST ? "/api/socket.io" : "";
const socket = io.connect(HOST, { path: PATH });

function App() {
  const setSocket = useSocketStore((state) => state.setSocket);
  setSocket(socket);

  return (
    <>
      <ChakraProvider>
        <AuthRouter />
      </ChakraProvider>
    </>
  );
}

export default App;
