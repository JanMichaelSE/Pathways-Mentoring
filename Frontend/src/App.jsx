import AuthRouter from "@/routes/root.router.jsx";
import { ChakraProvider } from "@chakra-ui/react";
import io from "socket.io-client";
import { useSocketStore } from "./store/socket.store";
import "./styles/App.css";

const socket = io.connect("http://localhost:8000");

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
