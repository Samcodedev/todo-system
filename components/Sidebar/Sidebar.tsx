"use client";

import {
  Category,
  Stickynote,
  Folder2,
  People,
  Note1,
  Buildings,
  Call,
  TaskSquare,
  NotificationBing,
  MenuBoard,
  MessageEdit,
  Edit,
} from "iconsax-react";
import {
  Box,
  Flex,
  Text,
  VStack,
  Portal,
  Select,
  createListCollection,
  Switch,
} from "@chakra-ui/react";
import { useState } from "react";
import SidebarItem from "./SidebarItem";
import SidebarDropdown from "./SidebarDropdown";
import Image from "next/image";
import { LuArrowLeftToLine, LuArrowRightToLine } from "react-icons/lu";

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const frameworks = createListCollection({
    items: [
      { label: "English", value: "English" },
      { label: "Chines", value: "Chines" },
    ],
  });

  return (
    <Box
      as="aside"
      width={isCollapsed ? "80px" : "300px"}
      minH="100vh"
      borderRightWidth="1px"
      borderRightColor="gray.200"
      bg="white"
      display="flex"
      flexDir="column"
      justifyContent="space-between"
      transition="width 0.3s ease"
    >
      
      <Box>
        <Flex
          padding="20px"
          height='100px'
          justifyContent={isCollapsed ? "center" : "space-between"}
          paddingBottom="40px"
          align="center"
          gap={2}
        >
          {!isCollapsed && (
            <Image
              src={`/avatars/logo.svg`}
              width="150"
              height="150"
              alt="logo"
            />
          )}
          <Box onClick={() => setIsCollapsed(!isCollapsed)} cursor="pointer">
            {isCollapsed ? (
              <LuArrowRightToLine size="20px" color="#464B50" />
            ) : (
              <LuArrowLeftToLine size="20px" color="#464B50" />
            )}
          </Box>
        </Flex>

        {/* Menu Items */}
        <VStack align="stretch" mb="70px" spacing={1}>
          <SidebarItem
            icon={<Category size="18" color="#7988A9" />}
            label="Home"
            href="/"
            collapsed={isCollapsed}
          />
          <SidebarItem
            icon={<Stickynote size="18" color="#7988A9" />}
            label="MKVanBinnen"
            href="/mkv"
            collapsed={isCollapsed}
          />
          <SidebarItem
            icon={<Folder2 size="18" color="#7988A9" />}
            label="Document Management"
            href="/docs"
            collapsed={isCollapsed}
          />
          <SidebarItem
            icon={<People size="18" color="#7988A9" />}
            label="Patient Information"
            href="/patients"
            collapsed={isCollapsed}
          />
          <SidebarItem
            icon={<Note1 size="18" color="#7988A9" />}
            label="Agenda"
            href="/agenda"
            collapsed={isCollapsed}
          />

          <SidebarDropdown
            icon={<Buildings size="18" color="#7988A9" />}
            label="My Department"
            items={[
              { label: "News", href: "/department/News" },
              { label: "Members", href: "/department/protocols" },
              { label: "To-Do", href: "/department/notifications" },
              { label: "Form Task", href: "/department/knowledge" },
              { label: "Agenda", href: "/department/knowledge" },
              { label: "Follow up system", href: "/department/knowledge" },
              { label: "Group Settings", href: "/department/group" },
            ]}
            collapsed={isCollapsed}
            onOpen={() => setIsCollapsed(false)}
          />
          <SidebarItem
            icon={<Call size="18" color="#7988A9" />}
            label="Phone numbers"
            href="/Phone"
            collapsed={isCollapsed}
          />
          <SidebarItem
            icon={<TaskSquare size="18" color="#7988A9" />}
            label="My to do Protocols"
            href="/Protocols"
            collapsed={isCollapsed}
          />
          <SidebarItem
            icon={<NotificationBing size="18" color="#7988A9" />}
            label="My Notifications"
            href="/docs"
            collapsed={isCollapsed}
          />
          <SidebarItem
            icon={<MenuBoard size="18" color="#7988A9" />}
            label="Knowledge Base"
            href="/Knowledge"
            collapsed={isCollapsed}
          />
          <SidebarItem
            icon={<MessageEdit size="18" color="#7988A9" />}
            label="Super Admin"
            href="/Admin"
            collapsed={isCollapsed}
          />

          <SidebarDropdown
            icon={<Edit size="18" color="#7988A9" />}
            label="Admin"
            items={[
              { label: "Agenda", href: "/admin/agenda" },
              { label: "News", href: "/admin/news" },
              { label: "Poll", href: "/admin/poll" },
              { label: "Department Rules", href: "/admin/rules" },
              { label: "Follow up system", href: "/admin/followup" },
            ]}
            collapsed={isCollapsed}
            onOpen={() => setIsCollapsed(false)}
          />
        </VStack>
      </Box>

      {!isCollapsed && (
        <Box
          p={4}
          mx={8}
          my={5}
          rounded="10px"
          bg="#F7F7F7"
          borderWidth="1px"
          borderColor="#CDD6E9"
          display="flex"
          flexDir="column"
          gap={3}
        >
          <Select.Root collection={frameworks} size="sm" width="100%">
            <Select.HiddenSelect />
            <Select.Control
              backgroundColor="#FFFFFF"
              px="3"
              py="1.5"
              rounded="8px"
              display='flex'
            >
              <Image 
                src={`/avatars/country.svg`}
                width='20'
                height='20'
                alt='Profile-image'
              />
              <Select.Trigger borderWidth="0px">
                <Select.ValueText color="#464B50" placeholder="English" />
              </Select.Trigger>
              <Select.IndicatorGroup>
                <Select.Indicator />
              </Select.IndicatorGroup>
            </Select.Control>
            <Portal>
              <Select.Positioner>
                <Select.Content backgroundColor='white' color='#464B50'>
                  {frameworks.items.map((framework) => (
                    <Select.Item item={framework} key={framework.value}>
                      {framework.label}
                      <Select.ItemIndicator />
                    </Select.Item>
                  ))}
                </Select.Content>
              </Select.Positioner>
            </Portal>
          </Select.Root>

          <Flex
            backgroundColor="#FFFFFF"
            px="4"
            py="3"
            rounded="8px"
            align="center"
            justify="space-between"
          >
            <Text fontSize="sm" color="#464B50">
              Dark mode
            </Text>
            <Switch.Root>
              <Switch.HiddenInput />
              <Switch.Control />
            </Switch.Root>
          </Flex>
        </Box>
      )}
    </Box>
  );
};

export default Sidebar;
