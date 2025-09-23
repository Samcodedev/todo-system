// src/pages/index.tsx
import { Box, Flex, Container, VStack } from '@chakra-ui/react';
import Header from './Header';
// import DashboardContent from '../components/dashboard/DashboardContent';

const DashboardPage = () => {
  return (
    <Box bg="gray.50" width='100%' minH="100vh">
      <Header />
      <Box as="main" p={8}>
        <Container maxW="container.xl">
          {/* <DashboardContent /> */}
        </Container>
      </Box>
    </Box>
  );
};

export default DashboardPage;