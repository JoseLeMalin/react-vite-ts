import { Container } from "@chakra-ui/react";
import {
  List,
  ListItem,
  ListIcon,
  OrderedList,
  UnorderedList,
} from "@chakra-ui/react";
import { Link } from "@chakra-ui/react";

/**
 * Contains the list of actions done while starting this project
 * https://chakra-ui.com/docs/components/link
 */
export const Todos = () => {
  return (
    <>
      <Container>
        <OrderedList>
          <List stylePosition={"initial"} styleType={"initial"}>
            <ListItem>
              Install pnpm: <Link>https://pnpm.io/fr/installation</Link>
            </ListItem>
            <ListItem>
              Install Vite: <Link>https://vitejs.dev/guide/</Link>
            </ListItem>
            <ListItem>
              Install react-dom:
              <Link>https://www.npmjs.com/package/react-dom</Link>
            </ListItem>
            <ListItem>
              Install tanstack-query:
              <Link>https://tanstack.com/query/latest</Link>
            </ListItem>
            <ListItem>
              Install React Router:
              <Link>https://reactrouter.com/en/6.8.2/start/tutorial</Link>
            </ListItem>
            <ListItem>
              Install ESLint:
              <Link>https://eslint.org/docs/latest/use/getting-started</Link>
            </ListItem>
            <ListItem>
              Install Prettier:
              <Link>https://prettier.io/docs/en/install.html</Link>
            </ListItem>
          </List>
        </OrderedList>
      </Container>
    </>
  );
};
