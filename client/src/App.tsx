import { BrowserRouter as Router } from "react-router-dom";
import Routes from "./routes";
import { ChakraProvider } from "@chakra-ui/react";
import { QueryClient, QueryClientProvider } from "react-query";

import GlobalStyle from "./globalStyles";

const queryClient = new QueryClient();

function App() {
  return (
    <ChakraProvider>
      <GlobalStyle />
      <QueryClientProvider client={queryClient}>
        <Router>
          <Routes />
        </Router>
      </QueryClientProvider>
    </ChakraProvider>
  );
}

export default App;
