"use client";

import {
  Button,
  Flex, Input, InputGroup,
  Text
} from "@chakra-ui/react";
import { SearchNormal1, CloseCircle, Link1, Notification } from "iconsax-react";
import { TiArrowSortedDown } from "react-icons/ti";
import HeaderIcon from "../ui/HeaderIcon";
import HeaderButton from "../ui/HeaderButton";
import Image from "next/image";

const Header = () => {

  const headerIcons = [
    {src: '/avatars/cursor.svg', alt: 'cursor'},
    {src: '/avatars/setting.svg', alt: 'setting'},
    {src: '/avatars/3cx.svg', alt: '3cx'},
    {src: '/avatars/eee.svg', alt: 'eee'}
  ]

  const headerButton = [
    {text: 'Melding maken', color: '#41245F'},
    {text: 'VIM', color: '#75C5C1'},
    {text: 'LMS', color: '#75C5C1'},
    {text: 'BHV', color: '#75C5C1'},
    {text: 'DataLek', color: '#75C5C1'}
  ]
  return (
    <Flex width='full' justifyContent='space-between' paddingX='60px' alignItems='center' borderBottomWidth='1px' borderColor='#CDD6E9' height='90px' bgColor='white' >
        <InputGroup width='300px' startElement={<SearchNormal1 size='18px' color="#1A1C1E" />} endElement={<CloseCircle size='18px' cursor='pointer' color="#1A1C1E" />}>
            <Input borderWidth='1px' color='#1A1C1E' borderRadius='10px' backgroundColor='#F7F7F7' borderColor='#CDD6E9' placeholder="M91" />
        </InputGroup>

        <Flex alignItems='center' gapX='10px' marginLeft='8'>
          {
            headerIcons.map((item) => {
              return(
                <HeaderIcon key={item.src} src={item.src} alt={item.alt}/>
              )
            })
          }
          
        </Flex>

        <Flex>
          <Flex bgColor='#F7F7F7' rounded='10px' padding='1' borderWidth='1px' borderColor='#EEF1F9' gapX='10px' marginLeft='8'>
            {
              headerButton.map((item) => {
                return(
                  <HeaderButton key={item.text} text={item.text} color={item.color} icon padding='3px' paddingV='12px' />
                )
              })
            }
            
          </Flex>
          <Button rounded='10px' paddingY='18px' height='48px' borderWidth='1px' borderColor='#EEF1F9' marginLeft='10PX' bgColor='#F7F7F7'>
            <Link1 size='20px' color="#464B50"/>
          </Button>
        </Flex>
        


        <Flex>
          <Button rounded='full' paddingY='18px' height='48px' marginLeft='25px' bgColor='#F7F7F7'>
            <Notification color="#464B50"/>
          </Button>

          <Flex alignItems='center' width='fit-content' gapX='18px' cursor='pointer' marginLeft='10px' backgroundColor='#F7F7F7' paddingY='3px' paddingX='3px' paddingRight='10px' rounded='40px'>
            <Image
              src={`/avatars/profileImage.png`}
              width='45'
              height='45'
              alt='Profile-image'
            />
              <Text color='#464B50' fontWeight='600'>Hi Paul</Text>
              <TiArrowSortedDown size='20' color="#464B50" />
          </Flex>
        </Flex>
    </Flex>
        
  );
};

export default Header;
