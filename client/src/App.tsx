import { BrowserRouter as Router } from "react-router-dom";
import Routes from "./routes";
import { ChakraProvider } from "@chakra-ui/react";
import { QueryClient, QueryClientProvider } from "react-query";

import GlobalStyle from "./globalStyles";
import Header from "./components/Header";
import { AuthProvider } from "./context/auth";

const queryClient = new QueryClient();

function App() {
  return (
    <ChakraProvider>
      <GlobalStyle />
      <QueryClientProvider client={queryClient}>
        <Router>
          <AuthProvider>
            <Header />
            <Routes />
          </AuthProvider>
        </Router>
      </QueryClientProvider>
    </ChakraProvider>
  );
}

export default App;
