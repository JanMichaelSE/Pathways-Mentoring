import AuthRouter from "@/routes/root.router.jsx";
import { ChakraProvider } from "@chakra-ui/react";
import "./styles/App.css";

function App() {
  return (
    <>
      <ChakraProvider>
        <AuthRouter />
      </ChakraProvider>
    </>
  );
}

export default App;
