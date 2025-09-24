"use client";

import { useMemo, useState } from "react";
import {
  Box,
  Flex,
  Text,
  Button,
  HStack,
  Table,
  Menu, 
  Portal, 
  Select, 
  createListCollection
} from "@chakra-ui/react";
import { FiMoreHorizontal } from "react-icons/fi";
import { BsFlagFill } from "react-icons/bs";
import Image from "next/image";



const frameworks = createListCollection({
  items: [
    { label: "20", value: 20 },
    { label: "30", value: 30 },
    { label: "40", value: 40 },
    { label: "50", value: 50 },
  ],
})


type Priority = "Medium" | "Important" | "Urgent";
type Task = {
  id: string;
  name: string;
  start: string;
  end: string;
  assignees: { name: string; src?: string }[];
  priority: Priority;
};


const sampleTasks: Task[] = [
  {
    id: "1",
    name: "MKV Intranet V2",
    start: "2024-06-04",
    end: "2024-06-16",
    assignees: [{ name: "Paul" }, { name: "Anna" }, { name: "John" }],
    priority: "Medium",
  },
  {
    id: "2",
    name: "Design System",
    start: "2024-06-23",
    end: "2024-06-24",
    assignees: [{ name: "Sara" }, { name: "Dani" }],
    priority: "Important",
  },
  {
    id: "3",
    name: "Medical Appointment",
    start: "2024-06-16",
    end: "2024-06-18",
    assignees: [{ name: "Paul" }],
    priority: "Urgent",
  },
  ...Array.from({ length: 14 }).map(
    (_, i) =>
      ({
        id: String(4 + i),
        name: i % 2 === 0 ? "Design System" : "Medical Appointment",
        start: "2024-06-16",
        end: "2024-06-18",
        assignees:
          i % 3 === 0
            ? [{ name: "Paul" }, { name: "Anna" }]
            : [{ name: "Yemi" }],
        priority:
          i % 3 === 0 ? "Medium" : i % 3 === 1 ? "Important" : "Urgent",
      }) as Task
  ),
];


const formatRange = (startISO: string, endISO: string): string => {
  const s = new Date(startISO);
  const e = new Date(endISO);
  const opts: Intl.DateTimeFormatOptions = {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  };
  return `${s.toLocaleDateString(undefined, opts)} - ${e.toLocaleDateString(
    undefined,
    opts
  )}`;
};

const priorityStyle = (p: Priority) => {
  if (p === "Medium") return { color: "#75C5C1", bg: "#DBEAFE" }; // Blue
  if (p === "Important") return { color: "#F6BE38", bg: "#FEF3C7" }; // Amber
  return { color: "#FF515D", bg: "#FEE2E2" }; // Red
};

function getPageButtons(current: number, total: number): number[] {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
  if (current <= 4) return [1, 2, 3, 4, 5, -1, total];
  if (current >= total - 3)
    return [1, -1, total - 4, total - 3, total - 2, total - 1, total];
  return [1, -1, current - 1, current, current + 1, -1, total];
}


const TaskTablePage = () => {
  const [page, setPage] = useState<number>(1);
  const [rowsPerPage] = useState<number>(10);
  const [query] = useState<string>("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return sampleTasks.filter(
      (t) => q === "" || t.name.toLowerCase().includes(q)
    );
  }, [query]);

  const total = filtered.length;
  const totalPages = Math.max(1, Math.ceil(total / rowsPerPage));
  const pageItems = filtered.slice((page - 1) * rowsPerPage, page * rowsPerPage);

  if (page > totalPages && totalPages > 0) setPage(totalPages);

  return (
    <Box backgroundColor='white' minH="100vh">
      <Box bg="white" borderRadius="md" border="1px">
        
        <Box mt={2}  borderWidth='1px' borderColor='#CDD6E9' borderBottom='none' overflow="hidden" roundedTop='10px'  bg="white">
          <Table.Root size="sm">
            <Table.Header bg="white">
              <Table.Row>
                <Table.ColumnHeader bg='#F7F7F7' paddingY='25px' paddingX='38px' fontWeight='700' color='#464B50' borderBottomWidth='1px' borderBottomColor='#CDD6E9' >Name</Table.ColumnHeader>
                <Table.ColumnHeader bg='#F7F7F7' paddingY='25px' paddingX='15px' fontWeight='700' color='#464B50' borderBottomWidth='1px' borderLeftWidth='1px' borderLeftColor='#CDD6E9' borderBottomColor='#CDD6E9'>Date</Table.ColumnHeader>
                <Table.ColumnHeader bg='#F7F7F7' paddingY='25px' paddingX='15px' fontWeight='700' color='#464B50' borderBottomWidth='1px' borderLeftWidth='1px' borderLeftColor='#CDD6E9' borderBottomColor='#CDD6E9'>Assignee</Table.ColumnHeader>
                <Table.ColumnHeader bg='#F7F7F7' paddingY='25px' paddingX='15px' fontWeight='700' color='#464B50' borderBottomWidth='1px' borderLeftWidth='1px' borderLeftColor='#CDD6E9' borderBottomColor='#CDD6E9'>Priority</Table.ColumnHeader>
                <Table.ColumnHeader
                  bg='#F7F7F7'
                  textAlign="right"
                  width="96px"
                  aria-hidden
                  borderBottomWidth='1px' borderBottomColor='#CDD6E9'
                />
              </Table.Row>
            </Table.Header>

            <Table.Body>
              {pageItems.length > 0 ? (
                pageItems.map((task) => {
                  const pr = priorityStyle(task.priority);
                  return (
                    <Table.Row  key={task.id} bg="white" _hover={{ bg: "#F7F7F7" }}>
                      <Table.Cell borderBottomWidth='1px' borderBottomColor='#CDD6E9' paddingY='25px' paddingX='38px'>
                        <Text fontSize="sm" color="gray.800">
                          {task.name}
                        </Text>
                      </Table.Cell>
                      <Table.Cell borderBottomWidth='1px' borderBottomColor='#CDD6E9' paddingY='25px' paddingX='15px'>
                        <Text fontSize="sm" color="gray.600">
                          {formatRange(task.start, task.end)}
                        </Text>
                      </Table.Cell>
                      <Table.Cell borderBottomWidth='1px' borderBottomColor='#CDD6E9' paddingY='25px' paddingX='15px' textAlign="center">
                        <Image 
                          src={`/avatars/profileImage.png`}
                          width='15'
                          height='15'
                          alt='Profile-image'
                        />
                      </Table.Cell>
                      <Table.Cell borderBottomWidth='1px' borderBottomColor='#CDD6E9' paddingY='25px' paddingX='15px' borderBottomWidth='1px' borderBottomColor='#CDD6E9'>
                        <Flex alignItems='center' gap='10px'>
                          <BsFlagFill color={pr.color} size="18px" />
                          <Text color='#464B50' fontSize="xs" fontWeight="400">
                            {task.priority}
                          </Text>
                        </Flex>
                      </Table.Cell>
                      <Table.Cell borderBottomWidth='1px' borderBottomColor='#CDD6E9' textAlign="right" paddingRight='20px'>
                        <Menu.Root>
                          <Menu.Trigger asChild>
                            <Button backgroundColor='#F7F7F7' size="sm">
                              <FiMoreHorizontal color="#464B50" size='20px' />
                            </Button>
                          </Menu.Trigger>
                          <Portal>
                            <Menu.Positioner>
                              <Menu.Content backgroundColor='white' color='#464B50'>
                                <Menu.Item color='#464B50' cursor='pointer' _hover={{ bg: "#F7F7F7" }} value="open-file">Open</Menu.Item>
                                <Menu.Item color='#464B50' cursor='pointer' _hover={{ bg: "#F7F7F7" }} value="new-txt">Edit To Do</Menu.Item>
                                <Menu.Item color='#464B50' cursor='pointer' _hover={{ bg: "#F7F7F7" }} value="new-file">Delete To Do</Menu.Item>
                                <Menu.Item color='#464B50' cursor='pointer' _hover={{ bg: "#F7F7F7" }} value="new-win">New Window</Menu.Item>
                              </Menu.Content>
                            </Menu.Positioner>
                          </Portal>
                        </Menu.Root>
                      </Table.Cell>
                    </Table.Row>
                  );
                })
              ) : (
                <Table.Row>
                  <Table.Cell colSpan={5}>
                    <Text textAlign="center" py={6} color="gray.600">
                      No rows
                    </Text>
                  </Table.Cell>
                </Table.Row>
              )}
            </Table.Body>
          </Table.Root>
        </Box>


        <Flex align="center" justify="space-between" borderWidth='1px' borderColor='#CDD6E9' paddingX='20px' paddingY='10px' roundedBottom='10px' borderTop='none'>
          <HStack spacing={2} backgroundColor='#F7F7F7' rounded='20px' paddingY='3px' align="center">
            <Button
              size="sm"
              variant="ghost"
              color='#464B50'
              fontSize='20px'
              onClick={() => setPage(1)}
              isDisabled={page === 1}
            >
              «
            </Button>
            <Button
              size="sm"
              variant="ghost"
              color='#464B50'
              fontSize='15px'
              borderWidth='1px'
              rounded='full'
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              isDisabled={page === 1}
            >
              ‹
            </Button>
            {getPageButtons(page, totalPages).map((pOrEllipsis, idx) =>
              pOrEllipsis === -1 ? (
                <Text key={`ell-${idx}`} px={2} color="gray.500">
                  …
                </Text>
              ) : (
                <Button
                  key={pOrEllipsis}
                  size="sm"
                  minW="8"
                  fontSize='15px'
                  variant={pOrEllipsis === page ? "solid" : "outline"}
                  borderColor={pOrEllipsis === page ? undefined : '#75C5C1'}
                  color={pOrEllipsis === page ? "white" : '#75C5C1'}
                  bg={pOrEllipsis === page ? "#2bc4bb" : "transparent"}
                  rounded="full"
                  onClick={() => setPage(pOrEllipsis)}
                >
                  {pOrEllipsis}
                </Button>
              )
            )}
            <Button
              size="sm"
              variant="ghost"
              color='#464B50'
              fontSize='20px'
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              isDisabled={page === totalPages}
            >
              ›
            </Button>
            <Button
              size="sm"
              variant="ghost"
              color='#464B50'
              fontSize='20px'
              onClick={() => setPage(totalPages)}
              isDisabled={page === totalPages}
            >
              »
            </Button>
          </HStack>

          <Flex gap='10px' alignItems='center'>
            <Text fontSize="sm" color="gray.700">
              Rows Per page:
            </Text>
            <Select.Root collection={frameworks} size="sm" rounded='20px' borderWidth='1px' borderColor='#75C5C1' width="86px">
              <Select.HiddenSelect />
              <Select.Control>
                <Select.Trigger rounded='20px' borderWidth='1px' color='#464B50' cursor='pointer' borderColor='#75C5C1'>
                  <Select.ValueText placeholder="10" />
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
          </Flex>
        </Flex>
      </Box>
    </Box>
  );
};

export default TaskTablePage;
