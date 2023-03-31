import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  CircularProgress,
  Container,
  Link as LinkCUI,
  Spinner,
} from "@chakra-ui/react";
import axios from "axios";
import { useQueries, useQuery } from "@tanstack/react-query";
import { isRouteErrorResponse, Outlet, useRouteError } from "react-router-dom";
import { Code } from "@chakra-ui/react";
import { Link } from "react-router-dom";

type InputQuery = {
  name: string;
  description: string;
  subscribers_count: string;
  stargazers_count: string;
  forks_count: string;
};

type User = {
  id: number;
  name: string;
  username: string;
  email: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  };
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
};

type Post = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

export const TanStackQuery = () => {
  // Simple Query
  // const fetchGroups = async (): Promise<InputQuery> => {
  //   return await axios
  //     .get<InputQuery>("https://api.github.com/repos/tannerlinsley/react-query")
  //     .then((res) => res.data);
  // };
  // const {
  //   isLoading,
  //   error,
  //   data: prout,
  // } = useQuery({
  //   queryKey: ["getTanstackStats"],
  //   queryFn: fetchGroups, // <-- No () to call the functions
  // });
  //
  // if (isLoading) return <LoaderTanstack />;
  //
  // if (error instanceof Error) {
  //   console.log("error", error);
  //   return <ErrorTanstack />;
  // }

  // Multiple Queries ==> NOTE: If multiple queries have to be sent:
  // If the number of queries you need to execute is changing from render to render, you cannot use manual querying since that would violate the rules of hooks
  const userQueries = useQueries({
    queries: [1, 2].map((user) => {
      return {
        queryKey: ["parallelQuery", user],
        queryFn: async (): Promise<User> => {
          return await axios
            .get<User>(`https://jsonplaceholder.typicode.com/users/${user}`)
            .then((res) => res.data);
        },
      };
    }),
  });

  const userQueriesBis = useQueries({
    queries: [
      {
        queryKey: ["parallelQueryBis"],
        queryFn: async (): Promise<InputQuery> => {
          return await axios
            .get<InputQuery>(
              "https://api.github.com/repos/tannerlinsley/react-query"
            )
            .then((res) => res.data);
        },
      },
    ],
  });

  return (
    <>
      <Container alignContent={"flex-start"}>
        <LinkCUI
          href="https://tanstack.com/query/latest/docs/react/overview"
          isExternal
        >
          Tanstack doc
        </LinkCUI>
        <Accordion defaultIndex={[0]} allowMultiple>
          <AccordionItem key={"accordion"}>
            <AccordionButton>
              <Box as="span" flex="1" textAlign="left">
                Tanstack Query using Typescript
              </Box>
              <AccordionIcon />
            </AccordionButton>
            <AccordionPanel pb={4}>
              <Container alignContent={"flex-start"}>
                <div>
                  <h3>Query with Tanstack Query using Typescript</h3>
                  <Code
                    colorScheme={"whatsapp"}
                    children="const fetchGroups = async (): Promise<InputQuery> => {"
                  ></Code>
                  <Code
                    colorScheme={"whatsapp"}
                    children="return await axios"
                  ></Code>
                  <Code
                    colorScheme={"whatsapp"}
                    children=".get<InputQuery>('https://api.github.com/repos/tannerlinsley/react-query')"
                  ></Code>
                  <Code
                    colorScheme={"whatsapp"}
                    children=".then((res) => res.data);"
                  ></Code>
                  <Code
                    colorScheme={"whatsapp"}
                    children=".then((res) => res.data)"
                  ></Code>
                  <Code colorScheme={"whatsapp"} children="}"></Code>
                </div>
                {userQueriesBis.map((queryItem) => {
                  return (
                    <div key={`queryItem ${Math.random()}`}>
                      <h1>{queryItem?.data?.name}</h1>
                      <p>{queryItem?.data?.description}</p>
                      <strong>👀 {queryItem?.data?.subscribers_count}</strong>
                      <strong>✨ {queryItem?.data?.stargazers_count}</strong>
                      <strong>🍴 {queryItem?.data?.forks_count}</strong>
                    </div>
                  );
                })}
              </Container>
            </AccordionPanel>
          </AccordionItem>

          <AccordionItem key={"accordion-item2"}>
            <AccordionButton>
              <Box as="span" flex="1" textAlign="left">
                Tanstack Query using Dynamic Parallel Queries
              </Box>
              <AccordionIcon />
            </AccordionButton>
            <AccordionPanel pb={4}>
              <Container alignContent={"flex-start"}>
                <div key={"accordion-item2-div"}>Nouveau Container</div>
                {userQueries.map((userItem) => {
                  return (
                    <div key={Math.random()}>
                      <h1>{userItem?.data?.id}</h1>
                      <p>{userItem?.data?.name}</p>
                      <strong>👀 {userItem?.data?.phone}</strong>
                      <strong>✨ {userItem?.data?.username}</strong>
                      <strong>🍴 {userItem?.data?.company.name}</strong>
                    </div>
                  );
                })}
              </Container>
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
      </Container>
      <Container>
        <Button colorScheme="cyan" key={"tanstack/dependent"}>
          <Link to="/tanstack/dependent">Test</Link>
        </Button>
      </Container>
      <Outlet />
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
      <Spinner size="lg" />
    </div>
  );
  //return <div>Loul</div>;
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

export const DependentQueries = () => {
  // Simple Query
  const fetchTanstackStats = async (): Promise<InputQuery> => {
    return await axios
      .get<InputQuery>("https://api.github.com/repos/tannerlinsley/react-query")
      .then((res) => res.data);
  };
  const {
    isLoading: ttIsLoading,
    error: ttError,
    data: inputQuery,
  } = useQuery({
    queryKey: ["getTanstackStats"],
    queryFn: fetchTanstackStats, // <-- No () to call the functions
  });

  if (ttIsLoading) return <LoaderTanstack />;

  if (ttError instanceof Error) {
    console.log("ici error", ttError);
    return <ErrorTanstack />;
  }

  const {
    isLoading: postIsLoading,
    error: postError,
    data: post,
  } = useQuery({
    queryKey: ["getPost5"],
    queryFn: async () => {
      return await axios
        .get<Post>("https://jsonplaceholder.typicode.com/posts/5")
        .then((res) => res.data);
    },
    // The query will not execute until the userId exists
    enabled: !!inputQuery,
  });
  if (postIsLoading) return <LoaderTanstack />;

  if (postError instanceof Error) {
    console.log("la bas error", ttError);
    return <ErrorTanstack />;
  }
  if (!post) {
    console.log("error pas de post", ttError);
    return <ErrorTanstack />;
  }
  return (
    <>
      <Container>
        <div>
          <h2>Ceci est le dependent</h2>
        </div>
        {
          <div key={`getTanstackStats ${Math.random()}`}>
            <h1>{post?.title}</h1>
            <p>{post?.body}</p>
            <strong>👀 {post?.userId}</strong>
            <strong>✨ {post?.id}</strong>
          </div>
        }
        {
          <div key={`queryItem ${Math.random()}`}>
            <h1>{inputQuery?.name}</h1>
            <p>{inputQuery?.description}</p>
            <strong>👀 {inputQuery?.subscribers_count}</strong>
            <strong>✨ {inputQuery?.stargazers_count}</strong>
            <strong>🍴 {inputQuery?.forks_count}</strong>
          </div>
        }
      </Container>
    </>
  );
};
