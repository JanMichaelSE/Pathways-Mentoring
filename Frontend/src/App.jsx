import AuthRouter from "@/routes/root.router.jsx";
import { ChakraProvider } from "@chakra-ui/react";
import io from "socket.io-client";
import { useSocketStore } from "./store/socket.store";
import "./styles/App.css";

const isDevEnvironment = import.meta.env.DEV;
const HOST = isDevEnvironment ? "http://localhost:8000" : import.meta.env.VITE_HOST;
const PATH = isDevEnvironment ? "" : "/api/socket.io";
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
