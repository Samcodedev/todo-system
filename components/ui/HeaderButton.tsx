import { 
  Button, 
  Text,
  Avatar,
  Badge,
  CloseButton,
  DataList,
  Dialog,
  HStack,
  Portal,
  Textarea,
  VStack,
  Flex,
} from '@chakra-ui/react'
import { Calendar, Flag, ProfileCircle, Status, Stickynote, TaskSquare } from 'iconsax-react';

interface HeaderButtonProps {
  color: String;
  text: string;
  icon: React.ReactNode,
  padding: String,
  paddingV: String
}

const HeaderButton: React.FC<HeaderButtonProps> = ({
  color,
  text,
  icon,
  padding,
  paddingV
}) => {

  if(text === 'Add Task') {
    return(
      <VStack alignItems="start" rounded='10px'>
        <Dialog.Root size='lg' placement="center" motionPreset="slide-in-bottom">
          <Dialog.Trigger asChild>
            <Button paddingY={`${padding}`} paddingX={`${paddingV}`} rounded='10px' backgroundColor={`${color}`}>
                {icon}
                <Text color='white'>{text}</Text>
            </Button>
          </Dialog.Trigger>
          <Portal>
            <Dialog.Backdrop />
            <Dialog.Positioner>
              <Dialog.Content>
                <Dialog.Header paddingBottom='10px' paddingTop='50px' backgroundColor='white'>
                  <Dialog.Title color='#BAC1CC' fontSize='30px' >Task Name</Dialog.Title>
                </Dialog.Header>
                <Dialog.Body pb="8" backgroundColor='white' color='#464B50'>
                  <DataList.Root orientation="horizontal">
                    <DataList.Item marginTop='15px'>
                      <DataList.ItemLabel fontWeight='600' gap='10px' color='#464B50'> <Status size='24px' color='#BAC1CC' /> Status</DataList.ItemLabel>
                      <DataList.ItemValue>
                        <Flex gap='5px' alignItems='center' backgroundColor='#CFB7E8' color='white' rounded='6px' paddingY='4px' paddingX='7px'>
                          <TaskSquare size='18px' variant="Bold" color='white' />
                          <Text fontSize='12px'>To Do</Text>
                        </Flex>
                      </DataList.ItemValue>
                    </DataList.Item>
                    <DataList.Item marginTop='15px'>
                      <DataList.ItemLabel fontWeight='600' gap='10px' color='#464B50'> <Calendar size='24px' color='#BAC1CC' /> Dates</DataList.ItemLabel>
                      
                      <DataList.ItemValue color='#BAC1CC'>12th August 2024</DataList.ItemValue>
                    </DataList.Item>
                    <DataList.Item marginTop='15px'>
                      <DataList.ItemLabel fontWeight='600' gap='10px' color='#464B50'> <ProfileCircle size='24px' color='#BAC1CC' /> Assignees</DataList.ItemLabel>
                      <DataList.ItemValue color='#BAC1CC'>
                        <HStack>
                          Segun Adebayo
                        </HStack>
                      </DataList.ItemValue>
                    </DataList.Item>
                    <DataList.Item marginTop='15px'>
                      <DataList.ItemLabel fontWeight='600' gap='10px' color='#464B50'> <Flag size='24px' color='#BAC1CC' />Priority</DataList.ItemLabel>
                      <DataList.ItemValue color='#BAC1CC'> Select Priority</DataList.ItemValue>
                    </DataList.Item>
                    <DataList.Item marginTop='15px'>
                      <DataList.ItemLabel fontWeight='600' gap='10px' color='#464B50'> <Stickynote size='24px' color='#BAC1CC' /> Description</DataList.ItemLabel>
                      {/* <DataList.ItemValue></DataList.ItemValue> */}
                    </DataList.Item>
                  </DataList.Root>
                  <Textarea placeholder="Write something or type" marginTop='15px' height='150px' rounded='10px' color='#464B50' backgroundColor='#F7F7F7' border='none' />
                  <Button float='right' backgroundColor='#75C5C1' color='white' paddingX='60px' marginTop='40px' rounded='10px'>Create Task</Button>
                </Dialog.Body>
                <Dialog.CloseTrigger>
                  <CloseButton color='#464B50' size="sm" />
                </Dialog.CloseTrigger>
              </Dialog.Content>
            </Dialog.Positioner>
          </Portal>
        </Dialog.Root>
      </VStack>
    )
  }
  return (
    <Button paddingY={`${padding}`} paddingX={`${paddingV}`} rounded='10px' backgroundColor={`${color}`}>
        {icon}
        <Text color='white'>{text}</Text>
    </Button>
  )
}

export default HeaderButton
