import { 
  Box, 
  Button, 
  Flex, 
  Switch, 
  Text

} from "@chakra-ui/react"
import { AddCircle, ArrowCircleLeft2, Calendar, ExportCurve, Sort } from "iconsax-react"
import HeaderButton from "./HeaderButton"

function TopBody() {
  const topBodyButton = [
    {text: 'Export xlsx', color: '#41245F', icon: <ExportCurve color="white" size='20' />},
    {text: 'Add Task', color: '#75C5C1', icon: <AddCircle color="white" size='20' />}
  ]

  return (
    <Flex justifyContent='space-between' padding='20px' width='full' borderBottomWidth='1px' borderBottomColor='#CDD6E9'>
        <Flex alignItems='center' gap='30px'>
            <Box padding='10px' borderWidth='1px' rounded='full' cursor='pointer' borderColor='#CDD6E9'>
                <ArrowCircleLeft2 color='#464B50' size='26px' />
            </Box>
            <Text color='#464B50' fontSize='30px' fontWeight='700' >Afdeling Kwaliteit</Text>
        </Flex>
        <Flex alignItems='center' gap='14px'>
          <Button rounded='10px' paddingY='18px' height='48px' borderWidth='1px' borderColor='#EEF1F9' marginLeft='10PX' bgColor='#F7F7F7'>
            <Switch.Root size='sm'>
              <Switch.HiddenInput />
              <Switch.Control />
            </Switch.Root>
          </Button>
          <Button rounded='10px' paddingY='18px' height='48px' borderWidth='1px' borderColor='#EEF1F9' marginLeft='10PX' bgColor='#F7F7F7'>
            <Sort color="#464B50"/>
          </Button>
          <Button rounded='10px' paddingY='18px' height='48px' borderWidth='1px' borderColor='#EEF1F9' marginLeft='10PX' bgColor='#F7F7F7'>
            <Calendar color="#464B50"/>
          </Button>
          
          {
            topBodyButton.map((item) => {
              return(
                <HeaderButton key={item.text} color={item.color} text={item.text} icon={item.icon} padding='22px' paddingV='20px' />
              )
            })
          }
        </Flex>
    </Flex>
  )
}

export default TopBody
