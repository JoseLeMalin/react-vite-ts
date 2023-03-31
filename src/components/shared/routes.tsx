import { Spinner } from "@chakra-ui/react";
import {
  createBrowserRouter,
  isRouteErrorResponse,
  json,
  Link,
  Outlet,
  RouteObject,
  RouterProvider,
  useRouteError,
} from "react-router-dom";
import App from "../../App";
import { Home } from "../home/home";
import { NavBar } from "../navbar/navbar";
import {
  ErrorRRComp,
  ReactRouterComp,
  ReactRouterGetters,
} from "../reactrouter/reactrouter";
import { DependentQueries } from "../tanstack-query/children/tanstack-concepts";
import { TanStackQuery } from "../tanstack-query/tanstack-query";
import { Todos, TodosBis } from "../Todos/Todos";

export const Layout = () => {
  return (
    <>
      <NavBar />
      <div>
        <Outlet />
      </div>
    </>
  );
};

const NoMatch = () => {
  return (
    <div>
      <h2>It looks like you're lost...</h2>
      <p>
        <Link to="/">Go to the home page</Link>
      </p>
    </div>
  );
};

const ErrorBoundary = () => {
  let error = useRouteError();
  console.error(error);
  // Uncaught ReferenceError: path is not defined
  return <div>Dang!</div>;
};
const ErrorTodos = () => {
  const error = useRouteError();

  // If an error occurs and we manually managed it, we can use its content to render something on the frontend
  if (isRouteErrorResponse(error)) {
    // the response json is automatically parsed to
    // `error.data`, you also have access to the status
    return (
      <div>
        <h1>{error.status}</h1>
        <h2>{error.data.fail}</h2>
      </div>
    );
  }
  return (
    <div>
      <h1>{"An error occured"}</h1>
    </div>
  );
};

const loader = async (url: string) => {
  const result = await fetch(url);

  if (!result.status) {
    throw json(
      {
        fail: "Error fetching to do list",
      },
      { status: 500 }
    );
  }
  if (result.status === 404) {
    // If no specific behaviour to use, you can use the throw new Response to send a generic error message to component
    throw new Response("Not Found", { status: 404 });
  }
  if (result.status === 422) {
    // If specific behaviour to use, you can use the throw json to send a specific object to component and render specific content
    throw json(
      {
        fail: "Error fetching to do list",
      },
      { status: 500 }
    );
  }
  return result;
};
export const router = createBrowserRouter([
  {
    path: "/", // when the URL matches this segment
    element: <App />, // it renders this element
    loader: async () => {
      // Fonctionne
      // return await loader("https://api.agify.io?name=Billy");
      return "";
    }, // with this data loaded before rendering

    errorElement: <ErrorBoundary />, // and renders this element in case something went wrong
    children: [
      { index: true, element: <Home /> },
      {
        path: "todos",
        element: <Todos />,
        // loader: async () => {
        //   // Fonctionne
        //   return await loader("https://api.agify.io?name=Sebastien");
        // },
        errorElement: <ErrorTodos />,
        children: [],
      },
      {
        path: "reactrouter",
        element: <ReactRouterComp />,
        // loader: async () => {
        //   // Fonctionne
        //   // return await loader("https://api.agify.io?name=Sebastien");
        // },
        errorElement: <ErrorRRComp />,
        // https://jsonplaceholder.typicode.com/
        children: [
          {
            path: "/reactrouter/getters",
            element: <ReactRouterGetters />,
            action: async ({ request, params }) => {
              console.log("LOLOLdoldqofslfsldgllm", request);

              switch (request.method) {
                case "POST": {
                  fetch("https://jsonplaceholder.typicode.com/posts")
                    .then((response) => response.json())
                    .then((json) => console.log(json));
                }
                case "PUT": {
                  fetch("https://jsonplaceholder.typicode.com/posts/1")
                    .then((response) => response.json())
                    .then((json) => console.log(json));
                }
                case "DELETE": {
                  return "test";
                }
                default: {
                  throw new Response("", { status: 405 });
                }
              }
            },
          },
        ],
      },

      {
        path: "tanstack",
        element: <TanStackQuery />,
        errorElement: <ErrorRRComp />,
        children: [
          {
            path: "/tanstack/dependent",
            element: <DependentQueries />,
            errorElement: <ErrorRRComp />,
          },
        ],
      },
      { path: "*", element: <NoMatch /> },
    ],
  },
]);
