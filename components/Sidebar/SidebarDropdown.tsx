"use client";

import { useState } from "react";
import { FiChevronDown, FiChevronRight } from "react-icons/fi";
import { Box, Button, Flex, Text, VStack } from "@chakra-ui/react";
import SidebarItem from "./SidebarItem";

interface SidebarDropdownProps {
  icon: React.ReactNode;
  label: string;
  items: { label: string; href: string }[];
}

const SidebarDropdown: React.FC<SidebarDropdownProps> = ({ icon, label, items }) => {
  const [open, setOpen] = useState(false);

  return (
    <Box pr={5} w="full">
      {/* Toggle Button */}
      <Button
        onClick={() => setOpen(!open)}
        variant="ghost"
        w="full"
        justifyContent="space-between"
        alignItems="center"
        rounded="md"
        _hover={{ bg: "gray.50" }}
        px={8}
        py={6}
      >
        <Flex align="center" gap={4}>
          <Box fontSize="lg">{icon}</Box>
          <Text fontSize="sm" color="#6C7278">
            {label}
          </Text>
        </Flex>

        {open ? (
          <FiChevronRight color="#7988A9" size={18} />
        ) : (
          <FiChevronDown color="#7988A9" size={18} style={{ marginRight: "10px" }} />
        )}
      </Button>

      {/* Dropdown Items */}
      {open && (
        <VStack align="stretch" spacing={1} ml={5} mt={2}>
          {items.map((item, idx) => (
            <SidebarItem
              key={idx}
              // icon={<Box w={2} h={2} rounded="full" bg="gray.400" />}
              label={item.label}
              href={item.href}
            />
          ))}
        </VStack>
      )}
    </Box>
  );
};

export default SidebarDropdown;
