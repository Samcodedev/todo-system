import { Box, Flex, Heading, Button, HStack, Input, InputGroup, InputLeftElement } from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';
import TaskTabs from './TaskTabs';
import TaskTable from './TaskTable';

const DashboardContent = () => {
  return (
    <VStack spacing={6} align="stretch">
      <Flex justify="space-between" align="center">
        <Heading size="md" fontWeight="normal">Afdeling Kwaliteit</Heading>
        <HStack spacing={4}>
          <Button variant="outline" leftIcon={<Icon as={/* Filter Icon */} />}>Filter</Button>
          <Button variant="outline" leftIcon={<Icon as={/* Grid Icon */} />}>View</Button>
          <Button variant="outline">Export .xlsx</Button>
          <Button colorScheme="teal" leftIcon={<Icon as={/* Plus Icon */} />}>Add Task</Button>
        </HStack>
      </Flex>

      <HStack justify="space-between" align="center" p={4} bg="white" borderRadius="md" boxShadow="sm">
        <InputGroup maxW="400px">
          <InputLeftElement pointerEvents="none">
            <SearchIcon color="gray.300" />
          </InputLeftElement>
          <Input type="text" placeholder="Search for To-Do" />
        </InputGroup>
        <HStack>
          {/* Filter/Sort icons */}
        </HStack>
      </HStack>

      <TaskTabs />
      <TaskTable />
    </VStack>
  );
};

export default DashboardContent;