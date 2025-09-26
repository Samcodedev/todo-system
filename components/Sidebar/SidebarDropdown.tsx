"use client";

import { useState } from "react";
import { FiChevronDown, FiChevronRight } from "react-icons/fi";
import { Box, Flex, Text, VStack } from "@chakra-ui/react";
import SidebarItem from "./SidebarItem";

interface SidebarDropdownProps {
  icon: React.ReactNode;
  label: string;
  items: { label: string; href: string }[];
  collapsed?: boolean;
  expandSidebar?: () => void;
}

const SidebarDropdown: React.FC<SidebarDropdownProps> = ({
  icon,
  label,
  items,
  collapsed = false,
  expandSidebar,
}) => {
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    if (collapsed && expandSidebar) {
      expandSidebar();
      setOpen(true);
    } else {
      setOpen(!open);
    }
  };

  return (
    <Box pr={5} w="full">
      <Flex
        onClick={handleClick}
        w="full"
        align="center"
        justify={collapsed ? "center" : "space-between"}
        px={collapsed ? 4 : 8}
        py={4}
        rounded="md"
        cursor="pointer"
        _hover={{ bg: "gray.50" }}
      >
        <Flex align="center" gap={collapsed ? 0 : 4}>
          <Box fontSize="lg">{icon}</Box>
          {!collapsed && (
            <Text fontSize="sm" color="#6C7278">
              {label}
            </Text>
          )}
        </Flex>

        {!collapsed &&
          (open ? (
            <FiChevronDown color="#7988A9" size={18} />
          ) : (
            <FiChevronRight color="#7988A9" size={18} />
          ))}
      </Flex>

      {!collapsed && open && (
        <VStack align="stretch" gap={1} ml={5} mt={2}>
          {items.map((item, idx) => (
            <SidebarItem key={idx} label={item.label} href={item.href} icon />
          ))}
        </VStack>
      )}
    </Box>
  );
};


export default SidebarDropdown;
