import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { App } from "../../App";
import { Todos } from "../Todos";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/todos",
    element: <Todos />,
  },
  {
    path: "/",
    element: <App />,
  },
]);
