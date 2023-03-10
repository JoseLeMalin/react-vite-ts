import { useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.scss";
import { Button, Box } from "@chakra-ui/react";
import { RouterProvider, useNavigate } from "react-router-dom";
import { Appbar } from "./components/shared/appbar/Appbar";
import { Layout, router } from "./components/shared/routes";

function App() {
  const [count, setCount] = useState(0);

  const navigate = useNavigate();
  return (
    <>
      <div className="App">
        <Appbar />
        <Layout />
      </div>
    </>
  );
}

export default App;
