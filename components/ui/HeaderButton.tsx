'use client'

import {
  Text,
  CloseButton,
  DataList,
  Dialog,
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
} from '@chakra-ui/react'
import { Calendar, Flag, ProfileCircle, Slash, Status, Stickynote, TaskSquare } from 'iconsax-react'
import { useState, useRef } from 'react'
import { LuChevronDown } from "react-icons/lu"
import { SingleDatepicker } from "chakra-dayzed-datepicker"

interface HeaderButtonProps {
  color: string
  text: string
  icon: React.ReactNode
  padding: string
  paddingV: string
}

const HeaderButton: React.FC<HeaderButtonProps> = ({
  color,
  text,
  icon,
  padding,
  paddingV
}) => {
  // Move all Hooks to the top level, outside of any conditionals
  const [name, setName] = useState("")
  const [status, setStatus] = useState("Urgent")
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [assignee, setAssignee] = useState<string>("");
  const [priority, setPriority] = useState("")
  const [description, setDescription] = useState("")
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  // Assignee Popover state
  const [assigneeInputValue, setAssigneeInputValue] = useState("")
  const [assigneePopoverOpen, setAssigneePopoverOpen] = useState(false)
  const assigneeTriggerRef = useRef<HTMLButtonElement | null>(null)

  const { contains: containsAssignee } = useFilter({ sensitivity: "base" })
  const { collection: assigneeCollection, filter: filterAssignee } = useListCollection({
    initialItems: [
      { label: "Maria Vetrovs", value: "Maria Vetrovs" },
      { label: "Adison Mango", value: "Adison Mango" },
      { label: "Gustavo Culhane", value: "Gustavo Culhane" },
      { label: "Adison Bator", value: "Adison Bator" },
      { label: "Zaire George", value: "Zaire George" },
    ],
    filter: containsAssignee,
  })

  const assigneeListbox = useListbox({
    collection: assigneeCollection,
    onValueChange() {
      setAssignee("")
      setAssigneePopoverOpen(false)
      setAssigneeInputValue("")
      assigneeTriggerRef.current?.focus()
    },
  })
  const selectedAssigneeItem = assigneeListbox.selectedItems[0]

  // Priority Popover state
  const [priorityInputValue, setPriorityInputValue] = useState("")
  const [priorityPopoverOpen, setPriorityPopoverOpen] = useState(false)
  const priorityTriggerRef = useRef<HTMLButtonElement | null>(null)

  console.log(priorityInputValue);
  

  const { contains: containsPriority } = useFilter({ sensitivity: "base" })
  const { collection: priorityCollection } = useListCollection({
    initialItems: [
      { label: "Urgent", value: "Urgent", color: "#FF515D" },
      { label: "Important", value: "Important", color: "#F6BE38" },
      { label: "Normal", value: "Normal", color: "#75C5C1" },
      { label: "Low", value: "Low", color: "#BAC1CC" },
    ],
    filter: containsPriority,
  })

  const priorityListbox = useListbox({
    collection: priorityCollection,
    onValueChange(key) {
      setPriority(key as string)
      setPriorityPopoverOpen(false)
      setPriorityInputValue("")
      priorityTriggerRef.current?.focus()
    }
  })
  const selectedPriorityItem = priorityListbox.selectedItems[0]


  const handleSaveTask = () => {
    if (!name) {
      alert("Please enter a task name")
      return
    }

    const newTask = {
      id: Date.now(),
      name,
      status,
      date: date?.toDateString(),
      assignee: assignee || (selectedAssigneeItem ? selectedAssigneeItem.label : "Unassigned"),
      priority: priority || (selectedPriorityItem ? selectedPriorityItem.label : "Normal"),
      description,
    }

    try {
      const storedTasks = JSON.parse(localStorage.getItem("tasks") || "[]")
      storedTasks.push(newTask)
      localStorage.setItem("tasks", JSON.stringify(storedTasks))
      alert("Task saved!")
      setIsDialogOpen(false)
      // Reset form
      setName("")
      setStatus("Urgent")
      setDate(new Date())
      setAssignee("")
      setPriority("")
      setDescription("")
    } catch (error) {
      console.error("Failed to save task to localStorage:", error)
      alert("Failed to save task.")
    }
  }


  if (text === 'Add Task') {
    return (
      <VStack alignItems="start" rounded='10px'>
        <Dialog.Root size='lg' placement="center" motionPreset="slide-in-bottom" open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <Dialog.Trigger asChild>
            <Button paddingY={`${padding}`} paddingX={`${paddingV}`} rounded='10px' backgroundColor={`${color}`} onClick={() => setIsDialogOpen(true)}>
              {icon}
              <Text color='white'>{text}</Text>
            </Button>
          </Dialog.Trigger>
          <Portal>
            <Dialog.Backdrop />
            <Dialog.Positioner>
              <Dialog.Content>
                <Dialog.Header paddingBottom='10px' paddingTop='50px' backgroundColor='white'>
                  <Dialog.Title>
                    <Editable.Root
                      color='#BAC1CC' fontSize='30px'
                      value={name}
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
                    {/* Status */}
                    <DataList.Item marginTop='15px'>
                      <DataList.ItemLabel fontWeight='600' gap='10px' color='#464B50'> <Status size='24px' color='#BAC1CC' /> Status</DataList.ItemLabel>
                      <DataList.ItemValue>
                        <Menu.Root>
                          <Menu.Trigger asChild>
                            <Flex gap='5px' alignItems='center' backgroundColor='#CFB7E8' color='white' rounded='6px' paddingY='4px' paddingX='7px'>
                              <TaskSquare size='18px' variant="Bold" color='white' />
                              <Text fontSize='12px'>{status}</Text>
                            </Flex>
                          </Menu.Trigger>
                          <Portal>
                            <Menu.Positioner>
                              <Menu.Content backgroundColor='white' borderWidth='1px' shadowColor='none' borderColor='#CDD6E9' zIndex="tooltip">
                                <Menu.ItemGroup>
                                  <Menu.Item color='#464B50' onClick={() => setStatus('Urgent')} display='flex' gap='3px' alignItems='center' backgroundColor='white'><Flag size='20px' variant="Bold" color='#FF515D' /> Urgent</Menu.Item>
                                  <Menu.Item color='#464B50' onClick={() => setStatus('Important')} display='flex' gap='3px' alignItems='center' backgroundColor='white'><Flag size='20px' variant="Bold" color='#F6BE38' />Important</Menu.Item>
                                  <Menu.Item color='#464B50' onClick={() => setStatus('Normal')} display='flex' gap='3px' alignItems='center' backgroundColor='white'><Flag size='20px' variant="Bold" color='#75C5C1' />Normal</Menu.Item>
                                  <Menu.Item color='#464B50' onClick={() => setStatus('Low')} display='flex' gap='3px' alignItems='center' backgroundColor='white' cursor='pointer'><Flag size='20px' variant="Bold" color='#BAC1CC' />Low</Menu.Item>
                                </Menu.ItemGroup>
                                <Menu.Separator borderColor='#CDD6E9' />
                                <Menu.ItemGroup>
                                  <Menu.Item color='#464B50' onClick={() => setStatus('Clear')} display='flex' gap='3px' alignItems='center' backgroundColor='white' cursor='pointer'><Slash size='20px' color='#7988A9' /> Clear</Menu.Item>
                                </Menu.ItemGroup>
                              </Menu.Content>
                            </Menu.Positioner>
                          </Portal>
                        </Menu.Root>
                      </DataList.ItemValue>
                    </DataList.Item>

                    {/* Dates */}
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

                    {/* Assignees */}
                    <DataList.Item marginTop='15px'>
                      <DataList.ItemLabel fontWeight='600' gap='10px' color='#464B50'> <ProfileCircle size='24px' color='#BAC1CC' /> Assignees</DataList.ItemLabel>
                      <DataList.ItemValue color='#BAC1CC'>
                        <Popover.Root open={assigneePopoverOpen} onOpenChange={(e) => setAssigneePopoverOpen(e.open)}>
                          <Popover.Trigger asChild>
                            <Button size="sm" ref={assigneeTriggerRef} color='#BAC1CC'>
                              {selectedAssigneeItem ? selectedAssigneeItem.label : "Select"} <LuChevronDown />
                            </Button>
                          </Popover.Trigger>
                          <Portal>
                            <Popover.Positioner>
                              <Popover.Content _closed={{ animation: "none" }}>
                                <Popover.Body p="0">
                                  <Listbox.RootProvider
                                    roundedBottom='5px'
                                    backgroundColor='white'
                                    roundedTop='5px'
                                    value={assigneeListbox}
                                    gap="0"
                                    overflow="hidden"
                                  >
                                    <Listbox.Input
                                      minH="10"
                                      px="3"
                                      roundedTop="l2"
                                      bg="transparent"
                                      outline="0"
                                      backgroundColor='#EEF1F9'
                                      margin='10px'
                                      value={assigneeInputValue}
                                      onChange={(e) => {
                                        setAssigneeInputValue(e.currentTarget.value)
                                        filterAssignee(e.currentTarget.value)
                                      }}
                                    />
                                    <Listbox.Content
                                      backgroundColor='white'
                                      color='#464B50'
                                      borderWidth="0"
                                      roundedTop="0"
                                      gap="0"
                                    >
                                      {assigneeCollection.items.map((item) => (
                                        <Listbox.Item backgroundColor='white' item={item} key={item.value}>
                                          <Listbox.ItemText onClick={() => setAssignee(item.label)} >{item.label}</Listbox.ItemText>
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

                    {/* Priority */}
                    <DataList.Item marginTop='15px'>
                      <DataList.ItemLabel fontWeight='600' gap='10px' color='#464B50'> <Flag size='24px' color='#BAC1CC' /> Priority</DataList.ItemLabel>
                      <DataList.ItemValue>
                        <Popover.Root open={priorityPopoverOpen} onOpenChange={(e) => setPriorityPopoverOpen(e.open)}>
                          <Popover.Trigger asChild>
                            <Button size="sm" ref={priorityTriggerRef} color='#BAC1CC'>
                              {selectedPriorityItem ? selectedPriorityItem.label : "Select"} <LuChevronDown />
                            </Button>
                          </Popover.Trigger>
                          <Portal>
                            <Popover.Positioner>
                              <Popover.Content _closed={{ animation: "none" }}>
                                <Popover.Body p="0">
                                  <Listbox.RootProvider value={priorityListbox} gap="0" overflow="hidden">
                                    <Listbox.Content
                                      backgroundColor='white'
                                      color='#464B50'
                                      borderWidth="0"
                                      roundedTop="5px"
                                      gap="0"
                                    >
                                      {priorityCollection.items.map((item) => (
                                        <Listbox.Item onClick={() => setPriority(item.label)} padding='10px' backgroundColor='white' item={item} key={item.value}>
                                          <Flag size='20px' variant="Bold" color={item.color} />
                                          <Listbox.ItemText>{item.label}</Listbox.ItemText>
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

                    {/* Description */}
                    <DataList.Item marginTop='15px'>
                      <DataList.ItemLabel fontWeight='600' gap='10px' color='#464B50'> <Stickynote size='24px' color='#BAC1CC' /> Description</DataList.ItemLabel>
                    </DataList.Item>
                  </DataList.Root>

                  <Textarea
                    placeholder="Write something or type"
                    marginTop='15px'
                    height='150px'
                    rounded='10px'
                    color='#464B50'
                    backgroundColor='#F7F7F7'
                    border='none'
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />

                  <Button
                    float='right'
                    backgroundColor='#75C5C1'
                    color='white'
                    paddingX='60px'
                    marginTop='40px'
                    rounded='10px'
                    onClick={handleSaveTask}
                  >
                    Create Task
                  </Button>
                </Dialog.Body>
                <Dialog.CloseTrigger backgroundColor='white' onClick={() => setIsDialogOpen(false)}>
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