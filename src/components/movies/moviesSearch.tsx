import { Input, Select } from "@chakra-ui/react";
import {
  useState,
  Dispatch,
  SetStateAction,
  ChangeEventHandler,
  ChangeEvent,
} from "react";

type Props = {
  setsearchLabel?: Dispatch<SetStateAction<string>>;
};

/**
 * The component is an input in which a user types the name of a movie
 * setsearchLabel is used to give back to parent the letters included in movies titles
 * @param props
 * @returns
 */
export const MoviesSearchTitle = (props: Props) => {
  const [value, setValue] = useState("");
  const { setsearchLabel } = props;
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (setsearchLabel) {
      setsearchLabel(event.target.value);
    }
    setValue(event.target.value);
  };
  return (
    <>
      <Input
        value={value}
        onChange={handleChange}
        placeholder="Here is a sample placeholder"
        size="lg"
        htmlSize={30}
        width="auto"
      />
    </>
  );
};
