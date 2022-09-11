import { Box } from '@chakra-ui/react'
import React from 'react'
import MainView from '../components/MainView'
import Navbar from '../components/Navbar'
import SideBar from '../components/SideBar'

export default function Home() {
  return (
    <Box>
        
        <Box display='flex'>
          <Box w="23%" bgColor="blackAlpha.900" h="100vh" borderRight="1px" borderColor="cyan">
            <SideBar />
          </Box>
          <Box p={3} w="75%">
            <MainView />
          </Box>
        </Box>
    </Box>
  )
}
