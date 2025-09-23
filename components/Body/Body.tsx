// src/pages/index.tsx
import { Box, Flex, Container, VStack } from '@chakra-ui/react';
import Header from './Header';
import TopBody from '../ui/TopBody';
// import DashboardContent from '../components/dashboard/DashboardContent';

const DashboardPage = () => {
  return (
    <Box bg="gray.50" width='100%' minH="100vh">
      <Header />
      <Box width='full' paddingX='60px' paddingY='30px' >
        <Box borderColor='red.50' borderWidth='2' backgroundColor='white' rounded='10px'>
          <TopBody />
        </Box>
      </Box>
    </Box>
  );
};

export default DashboardPage;