'use client'

import {
  Text,
  CloseButton,
  DataList,
  Dialog,
  HStack,
  Portal,
  Textarea,
  VStack,
  Flex,
  Editable,

  Button,
  Listbox,
  Popover,
  useFilter,
  useListCollection,
  useListbox,
  Menu,
  Input
} from '@chakra-ui/react'
import { Calendar, Flag, ProfileCircle, Status, Stickynote, TaskSquare } from 'iconsax-react';
import { useState, useRef } from 'react';
import { LuChevronDown } from "react-icons/lu"
                        
import { SingleDatepicker } from "chakra-dayzed-datepicker";

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
    const [name, setName] = useState("")
    const [date, setDate] = useState(new Date());

    
    const [inputValue, setInputValue] = useState("")
    const [open, setOpen] = useState(false)

    const { contains } = useFilter({ sensitivity: "base" })
    const triggerRef = useRef<HTMLButtonElement | null>(null)

    const { collection, filter } = useListCollection({
      initialItems: [
        { label: "React.js", value: "react" },
        { label: "Vue.js", value: "vue" },
        { label: "Angular", value: "angular" },
        { label: "Svelte", value: "svelte" },
        { label: "Next.js", value: "nextjs" },
        { label: "Nuxt.js", value: "nuxtjs" },
      ],
      filter: contains,
    })

    const listbox = useListbox({
      collection,
      onValueChange() {
        setOpen(false)
        setInputValueFn("")
        triggerRef.current?.focus()
      },
    })

    const setInputValueFn = (value: string) => {
      setInputValue(value)
      filter(value)
    }

    const selectedItem = listbox.selectedItems[0]


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
                  <Dialog.Title >
                    <Editable.Root 
                      color='#BAC1CC' fontSize='30px'
                      onValueChange={(e) => setName(e.value)}
                      placeholder="Task Name"
                      activationMode="dblclick"
                    >
                      <Editable.Preview backgroundColor='white' />
                      <Editable.Input />
                    </Editable.Root>
                  </Dialog.Title>
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
                      
                      <DataList.ItemValue color='#BAC1CC'>
                      
                        <SingleDatepicker
                          name="date-input"
                          date={date}
                          onDateChange={setDate}
                        />

                      </DataList.ItemValue>
                    </DataList.Item>

                    <DataList.Item marginTop='15px'>
                      <DataList.ItemLabel fontWeight='600' gap='10px' color='#464B50'> <ProfileCircle size='24px' color='#BAC1CC' /> Assignees</DataList.ItemLabel>
                      <DataList.ItemValue color='#BAC1CC'>
                        
                        
                      <Popover.Root open={open} onOpenChange={(e) => setOpen(e.open)}>
                        <Popover.Trigger asChild>
                          <Button size="sm" ref={triggerRef} color='#BAC1CC'>
                            {selectedItem ? selectedItem.label : "Select"} <LuChevronDown />
                          </Button>
                        </Popover.Trigger>

                        <Portal>
                          <Popover.Positioner>
                            <Popover.Content _closed={{ animation: "none" }}>
                              <Popover.Body p="0">
                                <Listbox.RootProvider roundedBottom='5px' backgroundColor='white' roundedTop='5px' value={listbox} gap="0" overflow="hidden">
                                  <Listbox.Input
                                    minH="10"
                                    px="3"
                                    roundedTop="l2"
                                    bg="transparent"
                                    outline="0"
                                    backgroundColor='#EEF1F9'
                                    margin='10px'
                                    value={inputValue}
                                    onChange={(e) => setInputValueFn(e.currentTarget.value)}
                                  />
                                  <Listbox.Content
                                    backgroundColor='white'
                                    color='#464B50'
                                    borderWidth="0"
                                    roundedTop="0"
                                    gap="0"
                                    
                                  >
                                    {collection.items.map((framework) => (
                                      <Listbox.Item item={framework} key={framework.value}>
                                        <Listbox.ItemText>{framework.label}</Listbox.ItemText>
                                        <Listbox.ItemIndicator />
                                      </Listbox.Item>
                                    ))}
                                  </Listbox.Content>
                                </Listbox.RootProvider>
                              </Popover.Body>
                            </Popover.Content>
                          </Popover.Positioner>
                        </Portal>
                      </Popover.Root>


                      </DataList.ItemValue>
                    </DataList.Item>
                    <DataList.Item marginTop='15px'>
                      <DataList.ItemLabel fontWeight='600' gap='10px' color='#464B50'> <Flag size='24px' color='#BAC1CC' />Priority</DataList.ItemLabel>
                      
                      
                    </DataList.Item>
                    <DataList.Item marginTop='15px'>
                      <DataList.ItemLabel fontWeight='600' gap='10px' color='#464B50'> <Stickynote size='24px' color='#BAC1CC' /> Description</DataList.ItemLabel>
                      {/* <DataList.ItemValue></DataList.ItemValue> */}
                    </DataList.Item>
                  </DataList.Root>
                  <Textarea placeholder="Write something or type" marginTop='15px' height='150px' rounded='10px' color='#464B50' backgroundColor='#F7F7F7' border='none' />
                  <Button float='right' backgroundColor='#75C5C1' color='white' paddingX='60px' marginTop='40px' rounded='10px'>Create Task</Button>
                </Dialog.Body>
                <Dialog.CloseTrigger backgroundColor='white'>
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
