import React from 'react'
import onetech from "../Assets/onetech.png"
import { Image } from '@chakra-ui/react'


const Logo = () => {
  return (
    <Image src={onetech} opacity={"0.07"} w={"50%"} ml={"290px"} mt={10}></Image>
  )
}

export default Logo