import { BrowserRouter as Router } from "react-router-dom";
import Routes from "./routes";
import { ChakraProvider } from "@chakra-ui/react";
import GlobalStyle from "./globalStyles";

function App() {
  return (
    <ChakraProvider>
      <GlobalStyle />
        <Router>
          <Routes />
        </Router>
    </ChakraProvider>
  );
}

export default App;
