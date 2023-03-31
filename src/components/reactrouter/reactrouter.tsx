import { Button } from "@chakra-ui/react";
import {
  Form,
  isRouteErrorResponse,
  Link,
  Outlet,
  useNavigate,
  useRouteError,
} from "react-router-dom";

export const ReactRouterComp = () => {
  const navigate = useNavigate();
  return (
    <>
      <h1>Component ReactRouterComp</h1>
      <Button
        loadingText={""}
        size={"md"}
        variant={"solid"}
        onClick={() => {
          navigate("/reactrouter/getters");
        }}
      >
        Go to Getters
      </Button>
      <Outlet />
    </>
  );
};

export const ErrorRRComp = () => {
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

export const ReactRouterGetters = () => {
  return (
    <>
      <h1>Component ReactRouterGetters</h1>
      <Form method="post">
        <Button
          name="btn1"
          loadingText={""}
          size={"md"}
          variant={"solid"}
          type="submit"
        >
          Get API Entries
        </Button>
      </Form>
      <Form method="put">
        <Button
          name="btn2"
          loadingText={""}
          size={"md"}
          variant={"solid"}
          type="submit"
        >
          Get A Random user
        </Button>
      </Form>

      <Button colorScheme="cyan" key={"/tanstack/dependent"}>
        <Link to="/tanstack/dependent">Test</Link>
      </Button>
    </>
  );
};
