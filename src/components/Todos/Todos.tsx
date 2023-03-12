import { Button, Container } from "@chakra-ui/react";
import {
  List,
  ListItem,
  ListIcon,
  OrderedList,
  UnorderedList,
} from "@chakra-ui/react";
import { Link } from "@chakra-ui/react";
import "./Todos.scss";
import {
  Form,
  isRouteErrorResponse,
  useLoaderData,
  useNavigate,
  useRouteError,
} from "react-router-dom";

/**
 * Contains the list of actions done while starting this project
 * https://chakra-ui.com/docs/components/link
 */
export const Todos = () => {
  const navigate = useNavigate();
  const data = useLoaderData();

  //console.log("data", data);
  return (
    <>
      <Container className="todosContainer">
        <OrderedList>
          <List stylePosition={"initial"} styleType={"initial"}>
            <ListItem>
              Install pnpm:{" "}
              <Link href="https://pnpm.io/fr/installation">
                https://pnpm.io/fr/installation
              </Link>
            </ListItem>
            <ListItem>
              Install Vite:{" "}
              <Link href="https://vitejs.dev/guide/">
                https://vitejs.dev/guide/
              </Link>
            </ListItem>
            <ListItem>
              Install react-dom:
              <Link href="https://www.npmjs.com/package/react-dom">
                https://www.npmjs.com/package/react-dom
              </Link>
            </ListItem>
            <ListItem>
              Install tanstack-query:
              <Link href="https://tanstack.com/query/latest">
                https://tanstack.com/query/latest
              </Link>
            </ListItem>
            <ListItem>
              Install React Router:
              <Link href="https://reactrouter.com/en/6.8.2/start/tutorial">
                https://reactrouter.com/en/6.8.2/start/tutorial
              </Link>
            </ListItem>
            <ListItem>
              Install ESLint:
              <Link href="https://eslint.org/docs/latest/use/getting-started">
                https://eslint.org/docs/latest/use/getting-started
              </Link>
            </ListItem>
            <ListItem>
              Install Prettier:
              <Link href="https://prettier.io/docs/en/install.html">
                https://prettier.io/docs/en/install.html
              </Link>
            </ListItem>
          </List>
        </OrderedList>
        <div>
          <Button colorScheme="teal" size="lg" onClick={() => navigate("/")}>
            HomePage
          </Button>
          <Form method="post" action="/todos/:query">
            <input name="songTitle" />
            <textarea name="lyrics" />
            <button type="submit">Save</button>
          </Form>
          <Button
            colorScheme="teal"
            size="lg"
            onClick={() => navigate("/todos/:query")}
          >
            TodosQuery
          </Button>
        </div>
      </Container>
    </>
  );
};

export const TodosBis = () => {
  const navigate = useNavigate();
  const data = useLoaderData();

  console.log("dataBis", data);
  return (
    <>
      <Container className="todosContainerBis">
        <h1>Test Chlidren de children</h1>
      </Container>
    </>
  );
};
