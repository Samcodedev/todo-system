"use client";

import { Box, Flex } from "@chakra-ui/react";
import Image from "next/image";


interface HeaderIconProps {
  src: String;
  alt: string;
}

const HeaderIcon: React.FC<HeaderIconProps> = ({
  src,
  alt
}) => {
  return (
    <Flex borderWidth='1px' minH='40px' minW='40px' padding='2' rounded='10px' borderColor='#CDD6E9' cursor='pointer'>
        <Image
            src={`${src}`}
            width='25'
            height='25'
            alt={alt}
        />
    </Flex>
  )
}

export default HeaderIcon
