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
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { InputQuery, Post } from "../../../types/tanstack-models";
import { ErrorTanstack, LoaderTanstack } from "../tanstack-query";
import { SubmitHandler, useForm } from "react-hook-form";
import { Fragment, useEffect, useRef, useState } from "react";
import {
  ArrowBackIcon,
  ArrowDownIcon,
  ArrowForwardIcon,
  ArrowLeftIcon,
  ArrowUpIcon,
} from "@chakra-ui/icons";

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
            👀<strong> {inputQuery?.subscribers_count}</strong>✨
            <strong> {inputQuery?.stargazers_count}</strong>
            🍴 <strong>🍴 {inputQuery?.forks_count}</strong>
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
            👀 <strong> {post?.userId}</strong>✨ <strong> {post?.id}</strong>
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
            👀<strong> {inputQuery?.subscribers_count}</strong>✨
            <strong> {inputQuery?.stargazers_count}</strong>
            🍴<strong> {inputQuery?.forks_count}</strong>
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
  const fetchErrorPost = async (): Promise<Post> => {
    return await axios
      .get<Post>("https://jsonplaceholder.typicode.com/posts/-1")
      .then((res) => res.data);
  };

  const fetchRetryPost = async (): Promise<Post> => {
    return await axios
      .get<Post>("https://jsonplaceholder.typicode.com/posts/1")
      .then((res) => res.data);
  };

  const {
    status: errorStatus,
    error: errorError,
    data: errorData,
    isFetching: errorIsFetching,
  } = useQuery({
    queryKey: ["getRetryFalse"],
    queryFn: fetchErrorPost, // <-- No () to call the functions,
    retry: false,
  });

  const {
    status: retryStatus,
    error: retryError,
    data: retryData,
    isFetching: retryisFecthing,
  } = useQuery({
    queryKey: ["getRetry1"],
    queryFn: fetchRetryPost, // <-- No () to call the functions,
    retry: 1,
  });

  if (retryisFecthing || errorIsFetching) {
    return <LoaderTanstack />;
  }

  return (
    <>
      <Container>
        {errorError ? (
          <Card>
            <CardHeader>
              <Text>
                The query fails automatically and is never retried thanks to the
                "retry: false" flag.
              </Text>
            </CardHeader>
          </Card>
        ) : (
          <Card>
            <CardHeader>
              <Text>
                If you're seeing this, it means that there's a problem. You
                shouldn't see that. shooosh.
              </Text>
            </CardHeader>
            <CardBody>
              <Text>{errorData?.id}</Text>
            </CardBody>
            <CardFooter>
              <strong>✨ {errorData?.title}</strong>
              <strong>👀 {errorData?.body}</strong>
              <strong>🍴 {errorData?.userId}</strong>
              <br />
            </CardFooter>
          </Card>
        )}
        <Card>
          <CardHeader>
            <Text>
              The content of that card is filled using a query that has 2
              retries. If it were to fail, it will retry twice to get data from
              the API endpoint.
            </Text>
          </CardHeader>
          <CardBody>
            <Text>{retryData?.id}</Text>
          </CardBody>
          <CardFooter>
            <strong>✨ {retryData?.title}</strong>
            <strong>👀 {retryData?.body}</strong>
            <strong>🍴 {retryData?.userId}</strong>
            <br />
          </CardFooter>
        </Card>
      </Container>
    </>
  );
};

export const QueryPaginated = () => {
  const [post, setPost] = useState(0);

  const fetchRetryPost = async (post: number): Promise<Post> => {
    return await axios
      .get<Post>(`https://jsonplaceholder.typicode.com/posts/${post}`)
      .then((res) => res.data);
  };

  const {
    status: postStatus,
    error: postError,
    data: postData,
    isFetching: postisFecthing,
  } = useQuery({
    queryKey: ["getPostNb", post],
    queryFn: () => fetchRetryPost(post), // <-- No () to call the functions,
    keepPreviousData: true,
    retry: false,
    enabled: post > 0,
  });

  if (postisFecthing) {
    return <LoaderTanstack />;
  }

  return (
    <>
      <Container>
        <Card>
          <CardHeader>
            <Text>
              The content of that card changes if you click on the Previous or
              Next button. Everytime you click, it fecthes the content of a post
              from an API endpoint.
              <br />
              {post <= 0 ? null : (
                <Text>
                  The number <strong>{post}</strong>
                  is the post Id you are viewing. it is used by the useState
                  hook in this component to retrieve the post with the id (
                  <strong>{post}</strong>)
                  <br />✨<strong> Post Title: </strong> {postData?.title}
                </Text>
              )}
            </Text>
          </CardHeader>
          {post <= 0 ? (
            <CardBody>
              <Text>
                If you want to display the content of a post then click the
                right arrow
              </Text>
            </CardBody>
          ) : (
            <CardBody>
              <Text>
                Post id: {postData?.id}
                <br />
                👀 Post Body: {postData?.body}
              </Text>
            </CardBody>
          )}

          <CardFooter>
            <strong>UserId: 🍴 {postData?.userId}</strong>
            <br />
            <Button
              onClick={() => setPost(post - 1)}
              // disabled={post <= 0 ? true : false
              isDisabled={post < 1 ? true : false}
            >
              <ArrowBackIcon />
            </Button>
            <Button
              onClick={() => setPost(post + 1)}
              isDisabled={post >= 10 ? true : false}
            >
              <ArrowForwardIcon />
            </Button>
          </CardFooter>
        </Card>
      </Container>
    </>
  );
};

export const QueryInfinite = () => {
  const postsArray = useRef<Post[]>([]);
  const totalNbPosts = useRef(postsArray.current.length);

  const fetchPost = async ({ pageParam = totalNbPosts.current }) => {
    return await axios
      .get<Post>(`https://jsonplaceholder.typicode.com/posts/${pageParam + 1}`)
      .then((res) => res.data);
  };

  useEffect(() => {
    totalNbPosts.current = postsArray.current.length;
  }, [postsArray]);

  const {
    status: postStatus,
    isError,
    error: postError,
    data: postData,
    isFetching: postisFecthing,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["getPostNb"],
    queryFn: fetchPost, // <-- No () to call the functions,
    enabled: totalNbPosts.current > 0,
    keepPreviousData: true,
    retry: false,
    refetchOnWindowFocus: false,
    getNextPageParam: (lastPost, pages) => {
      postsArray.current = pages;
      return lastPost.id;
    },
  });

  return (
    <>
      {postStatus === "loading" ? (
        <>
          <LoaderTanstack />
          <Button
            onClick={() => {
              //setPost(post + 1);
              fetchNextPage();
            }}
          >
            {isFetchingNextPage ? (
              "Loading more..."
            ) : hasNextPage ? (
              <ArrowDownIcon />
            ) : (
              "Nothing more to load"
            )}
          </Button>
        </>
      ) : isError ? (
        <ErrorTanstack />
      ) : (
        <Container>
          {postData.pages.map((postItem, i) => (
            <Card key={i}>
              <CardHeader>
                <Text>
                  The content of that card changes if you click on the Previous
                  or Next button. Everytime you click, it fecthes the content of
                  a post from an API endpoint.
                </Text>
              </CardHeader>
              <CardBody>Post Body: {postItem?.body}</CardBody>
            </Card>
          ))}
          <br />

          <Button
            onClick={() => {
              postsArray.current.pop();
            }}
            // disabled={post <= 0 ? true : false
            isDisabled={!hasNextPage || isFetchingNextPage}
          >
            {isFetchingNextPage ? (
              "Loading more..."
            ) : hasNextPage ? (
              <ArrowLeftIcon />
            ) : (
              "Nothing more to load"
            )}
          </Button>

          <Button
            onClick={() => {
              //setPost(post + 1);
              fetchNextPage();
            }}
            // disabled={post <= 0 ? true : false
            isDisabled={!hasNextPage || isFetchingNextPage}
          >
            {isFetchingNextPage ? (
              "Loading more..."
            ) : hasNextPage ? (
              <ArrowDownIcon />
            ) : (
              "Nothing more to load"
            )}
          </Button>
        </Container>
      )}
    </>
  );
};
