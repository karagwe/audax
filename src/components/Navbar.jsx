import React from 'react'
import { Box, Button, Text } from '@chakra-ui/react'
export default function Navbar() {
  return (
    <Box  h={59} display="flex" alignItems="center">
        <Box display="flex" justifyContent="space-between" w="95%" mx="auto" >
            <Text>Audax</Text>
             <Button color="blackAlpha.800">connect wallet</Button>
        </Box>
    </Box>
  )
}
