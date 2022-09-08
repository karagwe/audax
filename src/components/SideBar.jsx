import React from 'react'
import { Box, Circle, HStack, Text, shouldForwardProp, chakra } from '@chakra-ui/react'
import { GiPillDrop } from 'react-icons/gi'
import { AiOutlineHome } from 'react-icons/ai'
import { BsSearch, BsTags } from 'react-icons/bs'
import { CgMediaPodcast } from 'react-icons/cg'
import { motion, isValidMotionProp } from 'framer-motion'
import { MdNewReleases } from 'react-icons/md'
import { VscLibrary } from 'react-icons/vsc'

import { HiOutlineDocument } from 'react-icons/hi'

const OptionBox = chakra(motion.div, {
    shouldForwardProp: (prop) => isValidMotionProp(prop) || shouldForwardProp(prop),
  });
export default function SideBar() {
  return (
   <Box padding={2}>
     <HStack spacing={4} mb={50}>
    <Circle size={70} bgColor="blackAlpha.700" cursor="pointer">
        <GiPillDrop size={55}/>
    </Circle>
    <Text>Audax</Text>
    </HStack>
    <Box display="flex" w={130}  alignItems="center" justifyContent="space-between" cursor='pointer' mb={5}>
        <OptionBox 
         w="100%"
         display="flex"
         px={4} py={1}
         justifyContent="space-between"
           whileHover={{
            scale: 1.1
           }}
             >
     <AiOutlineHome  size={29}/>
      <Text fontSize="lg" fontWeight="semibold">Home</Text>
      </OptionBox>
    </Box>

    <Box display="flex" w={130}  alignItems="center" justifyContent="space-between" cursor='pointer' mb={5}>
        <OptionBox 
         w="100%"
         display="flex"
         px={4} py={1}
         justifyContent="space-between"
           whileHover={{
            scale: 1.1
           }}
             >
      <BsSearch size={25}/>
      <Text fontSize="lg" fontWeight="semibold">Search</Text>
      </OptionBox>
    </Box>

    <Box display="flex" w={145}  alignItems="center" justifyContent="space-between" cursor='pointer' mb={5}>
        <OptionBox 
         w="100%"
         display="flex"
         px={4} py={1}
         justifyContent="space-between"
           whileHover={{
            scale: 1.1
           }}
             >
      <CgMediaPodcast size={29}/>
      <Text fontSize="lg" fontWeight="semibold">Podcasts</Text>
      </OptionBox>
    </Box>

    <Box display="flex" w={130}  alignItems="center" justifyContent="space-between" cursor='pointer' mb={5}>
        <OptionBox 
         w="100%"
         display="flex"
         px={4} py={1}
         justifyContent="space-between"
           whileHover={{
            scale: 1.1
           }}
             >
      <BsTags  size={25} />
      <Text fontSize="lg" fontWeight="semibold">Genres</Text>
      </OptionBox>
    </Box>

    <Box display="flex" w={180}  alignItems="center" justifyContent="space-between" cursor='pointer' mb={5}>
        <OptionBox 
         w="100%"
         display="flex"
         px={4} py={1}
         justifyContent="space-between"
           whileHover={{
            scale: 1.1
           }}
             >
      <MdNewReleases size={25}/>
      <Text fontSize="lg" fontWeight="semibold">New Releases</Text>
      </OptionBox>
    </Box>

    <Box display="flex" w={165}  alignItems="center" justifyContent="space-between" cursor='pointer' mb={5}>
        <OptionBox 
         w="100%"
         display="flex"
         px={4} py={1}
         justifyContent="space-between"
           whileHover={{
            scale: 1.1
           }}
             >
      <VscLibrary size={25}/>
      <Text fontSize="lg" fontWeight="semibold">Your Library</Text>
      </OptionBox>
    </Box>

    <Box display="flex" w={120}  alignItems="center" justifyContent="space-between" cursor='pointer' mb={5} mt={45} >
        <OptionBox 
         w="100%"
         display="flex"
         px={4} py={1}
         justifyContent="space-between"
           whileHover={{
            scale: 1.1
           }}
             >
       <HiOutlineDocument size={29}/>
      <Text fontSize="lg" fontWeight="semibold">Docs</Text>
      </OptionBox>
    </Box>
   </Box>
  )
}
