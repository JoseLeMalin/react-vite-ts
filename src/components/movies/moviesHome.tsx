import { useState } from "react";
import {
  Table,
  Thead,
  Text,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from "@chakra-ui/react";
import { MoviesSearchTitle } from "./moviesSearch";
export const MoviesHome = () => {
  const [searchLabel, setsearchLabel] = useState("");
  const [movies, setMovies] = useState([
    {
      Title: "Waterworld",
      Year: 1995,
      imdbID: "tt0114898",
    },
    {
      Title: "Tropic Thunder",
      Year: 2008,
      imdbID: "tt0942385",
    },
    {
      Title: "Transformers",
      Year: 2007,
      imdbID: "tt0418279",
    },
    {
      Title: "Split",
      Year: 2016,
      imdbID: "tt4972582",
    },
    {
      Title: "La Grande Vadrouille",
      Year: 1966,
      imdbID: "tt0060474",
    },
    {
      Title: "Pulp Fiction",
      Year: 1994,
      imdbID: "tt0110912",
    },
  ]);

  const tableItems = movies
    .map((movieItem) => {
      if (!movieItem.Title.includes(searchLabel)) return;

      return (
        <Tr>
          <Td>{movieItem.Title}</Td>
          <Td>{movieItem.Year}</Td>
          <Td>{movieItem.imdbID}</Td>
        </Tr>
      );
    })
    .filter((movieItem) => movieItem);

  return (
    <>
      <MoviesSearchTitle setsearchLabel={setsearchLabel} />
      {tableItems.length && (
        <TableContainer>
          <Table variant="simple">
            <TableCaption>Movies Caption</TableCaption>
            <Thead>
              <Tr>
                <Th>Movies title</Th>
                <Th>Year</Th>
                <Th>Movie Id</Th>
              </Tr>
            </Thead>
            <Tbody>{tableItems}</Tbody>
          </Table>
        </TableContainer>
      )}
    </>
  );
};
