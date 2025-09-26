"use client";

import { Flex } from "@chakra-ui/react";
import { RowVertical, RowHorizontal } from "iconsax-react";

interface SortProps {
  active: boolean;
  onClick: () => void;
  type: string;
}

const Sort: React.FC<SortProps> = ({ active, onClick, type }) => {
  return (
    <Flex
      onClick={onClick}
      alignItems="center"
      justifyContent="center"
      width="32px"
      height="32px"
      rounded="3px"
      backgroundColor={active ? "#75C5C1" : "#F7F7F7"}
      cursor="pointer"
    >
      {type === "horizontal" ? (
        <RowHorizontal color={active ? "white" : "#7988A9"} size="20px" />
      ) : (
        <RowVertical color={active ? "white" : "#7988A9"} size="20px" />
      )}
    </Flex>
  );
};

export default Sort;
