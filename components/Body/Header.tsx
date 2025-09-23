"use client";

import {
  Flex, Input, InputGroup
} from "@chakra-ui/react";
import { SearchNormal1, CloseCircle } from "iconsax-react";
import HeaderIcon from "../ui/HeaderIcon";

const Header = () => {

  const headerIcons = [
    {src: '/avatars/cursor.svg', alt: 'cursor'},
    {src: '/avatars/setting.svg', alt: 'setting'},
    {src: '/avatars/3cx.svg', alt: '3cx'},
    {src: '/avatars/eee.svg', alt: 'eee'}
  ]
  return (
    <Flex width='full' paddingX='50px' borderBottomWidth='1px' borderColor='#CDD6E9' height='90px' bgColor='white' >
        <InputGroup width='220px' startElement={<SearchNormal1 size='18px' color="#1A1C1E" />} endElement={<CloseCircle size='18px' color="#1A1C1E" />}>
            <Input borderWidth='1px' color='#1A1C1E' borderRadius='10px' borderColor='#CDD6E9' placeholder="M91" />
        </InputGroup>

        <Flex alignItems='center' gapX='10px' marginLeft='8'>
          {
            headerIcons.map((item) => {
              return(
                <HeaderIcon src={item.src} alt={item.alt}/>
              )
            })
          }
          
        </Flex>

        <Flex>
          
        </Flex>
    </Flex>
  );
};

export default Header;
