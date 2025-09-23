"use client";

import { ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Flex, Text, Box } from "@chakra-ui/react";

interface SidebarItemProps {
  icon: ReactNode;
  label: string;
  href?: string;
  active?: boolean;
  onClick?: () => void;
}

const SidebarItem: React.FC<SidebarItemProps> = ({
  icon,
  label,
  href = "#",
  active,
  onClick,
}) => {
  const pathname = usePathname();
  const isActive = pathname === href || active;

  return (
    <Flex
      as={Link}
      href={href}
      onClick={onClick}
      py={4}
      px={8}
      mr={5}
      gap={4}
      rounded="md"
      align="center"
      cursor="pointer"
      fontWeight={isActive ? "medium" : "normal"}
      bg={isActive ? "#E9F5F7" : "transparent"}
      color={isActive ? "#75C5C1" : "#464B50"}
      _hover={{
        bg: isActive ? "blue.50" : "gray.50",
      }}
    >
      <Box fontSize="lg" color={isActive ? "#75C5C1" : "#464B50"}>
        {icon}
      </Box>
      <Text fontSize="sm">{label}</Text>
    </Flex>
  );
};

export default SidebarItem;
