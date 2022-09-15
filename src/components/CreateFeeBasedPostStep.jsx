import React from 'react'
import {Box, Button, HStack, IconButton, Input, Select, Text} from '@chakra-ui/react'
import { BsArrowReturnLeft, BsQuestionCircle } from 'react-icons/bs'
export default function CreateFeeBasedPostStep({
  goBackToPage,  selectedCurrency, setselectedCurrency,  postPrice,  setpostPrice,
  referalFee, setreferalFee , postPermission, setpostPermission, 
}) {
  
  return (
    <Box>
      <IconButton   icon={<BsArrowReturnLeft color='black' size={22} onClick={goBackToPage}/>}     />
       <Box mt={3}>
        <Select value={selectedCurrency} onChange={e => setselectedCurrency(e.target.value)}>
            <option value="0x9c3C9283D3e44854697Cd22D3Faa240Cfb032889" style={{color: "white", backgroundColor: "black"}}>WMATIC</option>
            <option value="0x3C68CE8504087f89c640D02d133646d98e64ddd9" style={{color: "white", backgroundColor: "black"}}>WETH</option>
            <option value="0x2058A9D7613eEE744279e3856Ef0eAda5FCbaA7e" style={{color: "white", backgroundColor: "black"}}>USDC</option>
            <option value="0x001B3B4d0F3714Ca98ba10F6042DaEbF0B1B7b6F" style={{color: "white", backgroundColor: "black"}}>DAI</option>
            <option value="0x7beCBA11618Ca63Ead5605DE235f6dD3b25c530E" style={{color: "white", backgroundColor: "black"}}>TOUCAN</option>

        </Select>
       
        <Text mt={4}>Amount</Text>
        <Input   type="number" placeholder='100' value={postPrice} onChange={e => setpostPrice(e.target.value)}/>
        <HStack spacing={3} mt={4}>
            <Text>Referral Fee</Text>
            <BsQuestionCircle  />
            </HStack>
            <Input  type="number"  placeholder='10%' value={referalFee} onChange = {e => setreferalFee(e.target.value)} />
       </Box>
          <Text mt={3}>Permision</Text>  
          <Select value={postPermission} onChange={e => setpostPermission(e.target.value)} >
            <option value={false} style={{backgroundColor: "black", color: "white"}}>Everyone Can Collect</option>
            <option value={true} style={{backgroundColor: "black", color: "white"}} disabled>Only Followers Can Collect</option>
          </Select>
        <Button w="100%" mt={6} color="black" onClick={goBackToPage}>save</Button>

    </Box>
  )
}
