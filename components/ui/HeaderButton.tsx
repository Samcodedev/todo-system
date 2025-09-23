import { Button, Text } from '@chakra-ui/react'

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
  return (
    <Button paddingY={`${padding}`} paddingX={`${paddingV}`} rounded='10px' backgroundColor={`${color}`}>
        {icon}
        <Text color='white'>{text}</Text>
    </Button>
  )
}

export default HeaderButton
