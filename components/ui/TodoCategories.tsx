import { Flex, Text } from '@chakra-ui/react'

interface TodoCategoriesProps {
    text: String, 
    color: String, 
    value: Number, 
    icon: React.ReactNode
}

const TodoCategories: React.FC<TodoCategoriesProps> = ({
  text,
  color,
  value,
  icon
}) => {
  return (
    <Flex justifyContent='space-between' cursor='pointer' alignItems='center' paddingY='4px' paddingX='5px' paddingLeft='8px' gapX='35px' backgroundColor='white' rounded='8px' >
        <Flex gap='6px' alignItems='center'>
            {icon}
            <Text fontSize='14px' color='#464B50'>{text}</Text>
        </Flex>
        <Flex paddingY='6px' paddingX='10px' backgroundColor={`${color}`} rounded='8px'>
            <Text fontSize='14px' color='#464B50'>({value})</Text>
        </Flex>
    </Flex>
  )
}

export default TodoCategories
