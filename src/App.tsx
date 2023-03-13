import { useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.scss";
import { Button, Box } from "@chakra-ui/react";
import { RouterProvider, useLoaderData, useNavigate } from "react-router-dom";
import { Appbar } from "./components/shared/appbar/Appbar";
import { Layout, router } from "./components/shared/routes";
import { NavBar } from "./components/navbar/navbar";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();
function App() {
  const [count, setCount] = useState(0);

  const navigate = useNavigate();
  const data = useLoaderData();
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <div className="App">
          {/* <Appbar /> */}
          <Layout />
        </div>
      </QueryClientProvider>
    </>
  );
}

export default App;
