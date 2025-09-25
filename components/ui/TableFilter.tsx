'use client'

import { Box, Flex, Input, InputGroup } from '@chakra-ui/react'
import { SearchNormal1, Status, TaskSquare, TickCircle } from 'iconsax-react'
import TodoCategories from './TodoCategories'
import { useState } from 'react'
import Sort from './Sort'
import TaskTablePage from './TaskTablePage'

function TableFilter() {

    const [orientation, setOrientation] = useState<"horizontal" | "vertical">("vertical");

    const sortOptions = [
        { type: "horizontal" },
        { type: "vertical" },
    ];

    const categories = [
        {text: 'To Do', color: '#F9F3FF', value: 20, icon: <TaskSquare variant="Bold" color='#CFB7E8' size='24px' /> },
        {text: 'In Progress', color: '#FBF4E4', value: 23, icon: <Status variant="Bold" color='#F6BE38' size='24px' /> },
        {text: 'Complete', color: '#E9F5F7', value: 18, icon: <TickCircle variant="Bold" color='#75C5C1' size='24px' /> }
    ]

  return (
    <Box padding='20px' backgroundColor='white'>
        <Flex justifyContent='space-between' padding='10px' backgroundColor='#E9F5F7' rounded='10px'>
            <InputGroup width='300px' startElement={<SearchNormal1 size='18px' color="#1A1C1E" />}>
                <Input color='#1A1C1E' borderRadius='10px' backgroundColor='white' borderColor='white' borderWidth='0px' placeholder="Search for To-Do" />
            </InputGroup>
            <Flex padding="5px" gap="5px" backgroundColor="white" rounded="5px">
                {sortOptions.map((item) => (
                    <Sort
                        key={item.type}
                        active={orientation === item.type}
                        onClick={() => setOrientation(item.type as "horizontal" | "vertical")}
                        type={item.type}
                    />
                ))}
            </Flex>
        </Flex>
        <Flex padding='10px' backgroundColor='#F7F7F7' gapX='10px' rounded='10px' marginTop='10px'>
            {
                categories.map((item) => {
                    return(
                        <TodoCategories  key={item.text} text={item.text} color={item.color} value={item.value} icon={item.icon} />
                    )
                })
            }
        </Flex>
        <TaskTablePage />
    </Box>
  )
}

export default TableFilter