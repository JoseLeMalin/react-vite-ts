import {
  Card,
  CardBody,
  Container,
  Text,
  Link as LinkCUI,
  CardHeader,
  CardFooter,
  FormControl,
  FormLabel,
  RadioGroup,
  FormHelperText,
  Button,
  Input,
} from "@chakra-ui/react";
import axios from "axios";
import { useQueries, useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { InputQuery, Post } from "../../../types/tanstack-models";
import { ErrorTanstack, LoaderTanstack } from "../tanstack-query";
import { SubmitHandler, useForm } from "react-hook-form";
import { useState } from "react";

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
    refetchOnWindowFocus: false,
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
      console.log("fecthing Post");
      return await axios
        .get<Post>("https://jsonplaceholder.typicode.com/posts/5")
        .then((res) => res.data);
    },
    refetchOnWindowFocus: false,
    // The query will not execute until the userId exists
    // enabled: !!inputQuery,
    enabled: !!inputQuery?.name,
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
        Ceci est la requête originale
        <Card>
          <CardHeader>
            <h1>{inputQuery?.name.toUpperCase()}</h1>
          </CardHeader>
          <CardBody>
            <Text>{inputQuery?.description}</Text>
          </CardBody>
          <CardFooter>
            <strong>👀 {inputQuery?.subscribers_count}</strong>
            <strong>✨ {inputQuery?.stargazers_count}</strong>
            <strong>🍴 {inputQuery?.forks_count}</strong>
          </CardFooter>
        </Card>
        <br />
        <h2>Ceci est la dependente</h2>
        <Card>
          <CardHeader>
            <h1>{post?.title.toUpperCase()}</h1>
          </CardHeader>
          <CardBody>
            <Text>{post?.body}</Text>
          </CardBody>
          <CardFooter>
            <strong>👀 {post?.userId}</strong>
            <strong>✨ {post?.id}</strong>
          </CardFooter>
        </Card>
      </Container>
    </>
  );
};

export const BackFetching = () => {
  const fetchTanstackStats = async (): Promise<InputQuery> => {
    console.log("fecthing InputQuery");

    return await axios
      .get<InputQuery>("https://api.github.com/repos/tannerlinsley/react-query")
      .then((res) => res.data);
  };
  const {
    status,
    error,
    data: inputQuery,
    isFetching,
  } = useQuery({
    queryKey: ["getTanstackStats"],
    queryFn: fetchTanstackStats, // <-- No () to call the functions
    refetchOnWindowFocus: false,
  });

  return status === "loading" ? (
    <LoaderTanstack />
  ) : status === "error" ? (
    <span>
      <ErrorTanstack />
    </span>
  ) : (
    <>
      <Container>
        <Card>
          <CardHeader>
            <h1>{inputQuery?.name.toUpperCase()}</h1>
          </CardHeader>
          <CardBody>
            <Text>{inputQuery?.description}</Text>
          </CardBody>
          <CardFooter>
            <strong>👀 {inputQuery?.subscribers_count}</strong>
            <strong>✨ {inputQuery?.stargazers_count}</strong>
            <strong>🍴 {inputQuery?.forks_count}</strong>
          </CardFooter>
        </Card>
      </Container>
    </>
  );
};

export const WindowFocus = () => {
  const fetchTanstackStats = async (): Promise<InputQuery> => {
    return await axios
      .get<InputQuery>("https://api.github.com/repos/tannerlinsley/react-query")
      .then((res) => res.data);
  };
  const {
    status,
    error,
    data: inputQuery,
    isFetching,
  } = useQuery({
    queryKey: ["getTanstackStats"],
    queryFn: fetchTanstackStats, // <-- No () to call the functions,
  });

  if (isFetching) {
    return <LoaderTanstack />;
  }
  return (
    <>
      <Container>
        <Text>
          This content of that card is being refreshed everytime you go back to
          this card
        </Text>
        <Card>
          <CardHeader>
            <h1>{inputQuery?.name.toUpperCase()}</h1>
          </CardHeader>
          <CardBody>
            <Text>{inputQuery?.description}</Text>
          </CardBody>
          <CardFooter>
            <strong>👀 {inputQuery?.subscribers_count}</strong>
            <strong>✨ {inputQuery?.stargazers_count}</strong>
            <strong>🍴 {inputQuery?.forks_count}</strong>
          </CardFooter>
        </Card>
      </Container>
    </>
  );
};

export const LazyQueries = () => {
  const [inputTest, setInputTest] = useState("");
  const fetchTanstackStats = async (): Promise<InputQuery> => {
    return await axios
      .get<InputQuery>("https://api.github.com/repos/tannerlinsley/react-query")
      .then((res) => res.data);
  };
  const {
    status,
    error,
    data: inputQuery,
    isFetching,
  } = useQuery({
    queryKey: ["getTanstackStats"],
    queryFn: fetchTanstackStats, // <-- No () to call the functions,
    enabled: !!inputTest,
  });

  if (isFetching) {
    return <LoaderTanstack />;
  }

  return !inputTest ? (
    <FormLazyQuery setInput={setInputTest} />
  ) : (
    <>
      <Container>
        <Card>
          <CardHeader>
            <Text>
              The content of that card is filled using lazy query model. By
              clicking the button of the previous form, you changed the state of
              that component and triggered a query by enabling it.
            </Text>
          </CardHeader>
          <CardBody>
            <Text>{inputQuery?.description}</Text>
          </CardBody>
          <CardFooter>
            <strong>👀 {inputQuery?.subscribers_count}</strong>
            <strong>✨ {inputQuery?.stargazers_count}</strong>
            <strong>🍴 {inputQuery?.forks_count}</strong>
            <br />
            <Button onClick={() => setInputTest("")}>Clear query</Button>
          </CardFooter>
        </Card>
      </Container>
    </>
  );
};

const FormLazyQuery = ({
  setInput,
}: {
  setInput: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<{ example: string }>();
  // const onSubmit: SubmitHandler<{ example: string }> = (data) => {
  //   console.log("il se passe quelque chose", data.example, data, setInput);
  //   setInput(data.example);
  // };
  const onSubmit: SubmitHandler<{ example: string }> = (data) => {
    console.log("data", data);
    setInput(data.example);
  };
  console.log(watch("example")); // watch input value by passing the name of it
  return (
    <>
      <Container>
        <FormControl>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormLabel as="legend">Add an input</FormLabel>
            {/* include validation with required or other standard HTML validation rules */}
            <Input
              {...register("example", { required: true })}
              defaultValue="testSHE"
            />
            {/* errors will return when field validation fails  */}
            {errors.example && <span>This field is required</span>}

            <Button type="submit">azeazeaz</Button>
          </form>
        </FormControl>
      </Container>
    </>
  );
};

export const QueryRetries = () => {
  const [inputTest, setInputTest] = useState("");
  const fetchTanstackStats = async (): Promise<InputQuery> => {
    return await axios
      .get<InputQuery>("https://api.github.com/repos/tannerlinsley/react-query")
      .then((res) => res.data);
  };
  const {
    status,
    error,
    data: inputQuery,
    isFetching,
  } = useQuery({
    queryKey: ["getTanstackStats"],
    queryFn: fetchTanstackStats, // <-- No () to call the functions,
    enabled: !!inputTest,
  });

  if (isFetching) {
    return <LoaderTanstack />;
  }

  return !inputTest ? (
    <FormLazyQuery setInput={setInputTest} />
  ) : (
    <>
      <Container>
        <Card>
          <CardHeader>
            <Text>
              The content of that card is filled using lazy query model. By
              clicking the button you changed the state of that component and
              triggered a query by enabling it.
            </Text>
          </CardHeader>
          <CardBody>
            <Text>{inputQuery?.description}</Text>
          </CardBody>
          <CardFooter>
            <strong>👀 {inputQuery?.subscribers_count}</strong>
            <strong>✨ {inputQuery?.stargazers_count}</strong>
            <strong>🍴 {inputQuery?.forks_count}</strong>
            <br />
            <Button onClick={() => setInputTest("")}>Clear query</Button>
          </CardFooter>
        </Card>
      </Container>
    </>
  );
};
