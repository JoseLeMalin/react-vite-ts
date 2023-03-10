import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router";
import { router } from "./components/shared/routes";
import "./index.scss";
import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter, createBrowserRouter } from "react-router-dom";
import App from "./App";
import { Todos } from "./components/Todos/Todos";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ChakraProvider>
      {/* <RouterProvider router={router} /> */}
      <RouterProvider router={router} />
      {/* <App /> */}
    </ChakraProvider>
  </React.StrictMode>
);
