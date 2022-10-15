import AuthRouter from "@/routes/root.router.jsx";
import { ChakraProvider } from "@chakra-ui/react";
import io from "socket.io-client";
import { useSocketStore } from "./store/socket.store";
import "./styles/App.css";

const HOST = import.meta.env.VITE_HOST;

console.log("HOST: ", HOST);

const socket = io.connect(HOST);

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
