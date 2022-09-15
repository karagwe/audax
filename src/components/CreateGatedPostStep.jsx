import { Box, IconButton, Input, Select, Text } from '@chakra-ui/react'
import React from 'react'
import {BsArrowReturnLeft} from 'react-icons/bs'

export default function CreateGatedPostStep({ swithFromGatedPostModal,
  gateContractAddress, setgateContractAddress,  gateChain,
  setgateChain
}) {

  
  return (
    <Box>
       <IconButton   icon={<BsArrowReturnLeft color='black' size={22} onClick={swithFromGatedPostModal}/>}     />
       <Box mt={5}>
        <Text>Select Chain</Text>
        <Select value={gateChain} onChange = {e => setgateChain(e.target.value)}>
          <option value="mumbai" style={{backgroundColor: "black", color: "white"}}>mumbai testnet</option>
          <option value="BSC" style={{backgroundColor: "black", color: "white"}}>binance smartchain</option>
          <option value="Rinkeby" style={{backgroundColor: "black", color: "white"}}>Rinkeby</option>

        </Select>
        <Text mt={4}>Your Contract Address</Text>
        <Input    placeholder='Your Contract Address'  value={gateContractAddress} onChange = {e => setgateContractAddress(e.target.value)}  />
       </Box>
    </Box>
  )
}
