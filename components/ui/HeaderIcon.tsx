"use client";

import { Box, Flex } from "@chakra-ui/react";
import Image from "next/image";


interface SidebarItemProps {
  src: String;
  alt: string;
}

const HeaderIcon: React.FC<SidebarItemProps> = ({
  src,
  alt
}) => {
  return (
    <Flex borderWidth='1px' minH='40px' minW='40px' padding='2' rounded='10px' borderColor='#CDD6E9'>
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
