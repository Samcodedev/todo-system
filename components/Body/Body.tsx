import { Box } from '@chakra-ui/react';
import Header from './Header';
import TopBody from '../ui/TopBody';
import TableFilter from '../ui/TableFilter';

const DashboardPage = () => {
  return (
    <Box bg="gray.50" width='100%' minH="100vh">
      <Header />
      <Box width='full' paddingX='60px' paddingY='30px' >
        <Box backgroundColor='white' rounded='10px'>
          <TopBody />
          <TableFilter />
        </Box>
      </Box>
    </Box>
  );
};

export default DashboardPage;