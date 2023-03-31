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
import { InputQuery, Post } from "../../../types/tanstack-models";
import { ErrorTanstack, LoaderTanstack } from "../tanstack-query";

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
