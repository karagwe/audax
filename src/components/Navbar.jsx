import React, {useState} from 'react'
import { Box, Button, Text, HStack, Avatar, Modal, ModalOverlay, ModalContent, ModalCloseButton, ModalHeader, ModalBody, ModalFooter, Heading } from '@chakra-ui/react'
import { useMoralis } from 'react-moralis'
import {IoMdNotificationsOutline} from 'react-icons/io'
import useSignIn from '../graphql/Authentication/useSignIn'
export default function Navbar() {
  const [isLensSignedIn, setisLensSignedIn] = useState(false)
  const [isAuthModal, setisAuthModal] = useState(false)
  const {account, isAuthenticated, authenticate} = useMoralis()
  const slicedAccount = `${account?.slice(0,4)}... ${account?.slice(39)}`
  const LENS_ACCESS_TOKEN = sessionStorage.getItem('accessToken')

   const {signIn} = useSignIn()
  const openAuthModal = () => {
    setisAuthModal(true)
 }

 const lensSignIn = async () => {
  await signIn()
  setisLensSignedIn(true)
  setisAuthModal(false)
 }
 const closeAuthModal = () => {
      setisAuthModal(false)
 }

  return (
    <Box  h={59} display="flex" alignItems="center" borderBottom="1px" borderColor="gray.700" justifyContent="space-between">
        <Box display="flex" justifyContent="space-between" w="95%" mx="auto" alignItems="center" >
           <Box>
            <Text>Audax</Text>
            </Box>
            <Box display="flex"  h="56px" alignItems="center" justifyContent="space-between"  >
            
            <Box display="flex" alignItems="center" >
              {
                !isAuthenticated || !account ?
                <Button  color="black" onClick={() => authenticate({signingMessage: "authenticate to audax", chainId: "0x13881"})}>connect wallet</Button> :
                 isAuthenticated && LENS_ACCESS_TOKEN == null && !isLensSignedIn ?
                 <Button size="lg" leftIcon={<img src='/img/lens-2.png'   style={{width: "20px"}}/>} onClick={openAuthModal}  colorScheme="whiteAlpha" variant="outline">Sign In</Button> :
                  <HStack spacing={3}>
                   <IoMdNotificationsOutline size={40} cursor="pointer"/>
                   <Box border="1px" borderColor="gray.300" display="flex" alignItems="center" px={3} py={1} borderRadius={5} cursor="pointer">
                    <Avatar    name='abdul' src='img/abdul.jpg' size="sm" mr={2}/>
                     <Text>{slicedAccount}</Text>
                    </Box>
                  </HStack>

              }
            </Box>
        </Box>
        </Box>

         {/*LENS SIGN IN  MODAL     */}
         <Modal isOpen={isAuthModal} onClose={closeAuthModal} isCentered>
            <ModalOverlay  bgColor="whiteAlpha.600" />
            <ModalContent>
              <ModalHeader bgColor="blackAlpha.900" color="whiteAlpha.900" borderTopRadius={8}>Sign-in</ModalHeader>
               <ModalCloseButton  color="whiteAlpha.900"/>
               <ModalBody bgColor="blackAlpha.900" color="whiteAlpha.900" >
               <Heading fontSize="lg">Please sign the message.</Heading>
               <Text fontSize="md">Audax uses this signature to verify that you’re the owner of this address. </Text>
               </ModalBody>
               <ModalFooter bgColor="blackAlpha.900" color="whiteAlpha.900" borderBottomRadius={8}>
                 <Button color="blackAlpha.900" onClick={() => lensSignIn()}>Sign-In with Lens</Button>
               </ModalFooter>
            </ModalContent>
          </Modal>
       
    </Box>
  )
}

{/* 
  <AiOutlineLeft  size={35}  cursor="pointer"  onClick={slideRef?.slickPrev}/>
         <AiOutlineRight    size={35}      cursor="pointer"  onClick={slideRef?.slickNext}/>

*/}