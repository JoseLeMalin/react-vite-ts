import { Link } from "@chakra-ui/react";

import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
import { isRouteErrorResponse, useRouteError } from "react-router-dom";

export const TanStackQuery = () => {
  const { isLoading, error, data } = useQuery({
    queryKey: ["repoData"],
    queryFn: () =>
      fetch("https://api.github.com/repos/tannerlinsley/react-query").then(
        (res) => res.json()
      ),
  });

  if (isLoading) return <LoaderTanstack />;

  if (error instanceof Error) return <ErrorTanstack />;

  return (
    <>
      <Link
        href="https://tanstack.com/query/latest/docs/react/overview"
        isExternal
      >
        tanstack doc
      </Link>

      <div>
        <h1>{data.name}</h1>
        <p>{data.description}</p>
        <strong>👀 {data.subscribers_count}</strong>{" "}
        <strong>✨ {data.stargazers_count}</strong>{" "}
        <strong>🍴 {data.forks_count}</strong>
      </div>
    </>
  );
};

const LoaderTanstack = () => {
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
      <h1>{"Loading"}</h1>
    </div>
  );
};

const ErrorTanstack = () => {
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
