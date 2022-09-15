import { Box, Heading, HStack, Text, Tooltip, VStack } from '@chakra-ui/react'
import React, {useRef} from 'react'
import { AiOutlineLock, AiOutlineQuestionCircle } from 'react-icons/ai'
import { GiMoneyStack } from "react-icons/gi"
import { MdCollectionsBookmark, MdOutlineCollectionsBookmark } from 'react-icons/md'
import  ReactTooltip from 'react-tooltip' 
import { TbTarget } from 'react-icons/tb'
import { BiTime } from 'react-icons/bi'
export default function CreatePostStepTwo({
  toggleIsCollectFeePage, toggleIsLimitedFeeCollect,  toggleIsGatedPostModal,
  selectedPostModule, setselectedPostModule
}) {
  const tootipRef = useRef()
 
    const chooseThePostModule = (toggler, module) => {
       setselectedPostModule(module)
       toggler()
    }
  return (
    <Box>
      <Box display="flex" alignItems="center" mb={3} >
        <MdOutlineCollectionsBookmark />
        <Heading size="sm" ml={2}>Select collect module</Heading>
        </Box>
         <Box>
          <Box w="100%" h={65} border="1px" borderColor="gray.300" borderRadius={7} p={1} cursor="pointer" onClick={() => chooseThePostModule( toggleIsCollectFeePage, "feeCollectModule")}> 
            <Box w={150} display="flex" justifyContent="space-between" p={1} alignItems="center" mb={0}>
              <MdOutlineCollectionsBookmark  />
               <Text fontWeight="semibold">Fee Collect</Text>
                
            <AiOutlineQuestionCircle />
           
           </Box>
           <Text color="whiteAlpha.600" fontSize="sm">0xeb4f3EC9d01856Cec2413bA5338bF35CeF932D82</Text>
          </Box>

          <Box w="100%" h={65} border="1px" borderColor="gray.300" borderRadius={7}  p={1} mt={4} cursor="pointer" onClick={() => chooseThePostModule(toggleIsLimitedFeeCollect, "limitedFeeCollectModule")}> 
            <Box w={220} display="flex" justifyContent="space-between" p={1} alignItems="center" mb={0}>
               <HStack spacing={1} mr={1}>
                <TbTarget  />
              <MdOutlineCollectionsBookmark  />
              </HStack>
               <Text fontWeight="semibold">Limited Fee Collect</Text>
                
            <AiOutlineQuestionCircle />
           
           </Box>
           <Text color="whiteAlpha.600" fontSize="sm">0x36447b496ebc97DDA6d8c8113Fe30A30dC0126Db</Text>
          </Box>

          <Box w="100%" h={65} border="1px" borderColor="gray.300" borderRadius={7}  p={1} mt={4} cursor="pointer" onClick={ () => chooseThePostModule(toggleIsLimitedFeeCollect, "limitedTimedFeeCollectModule")}> 
            <Box w={280} display="flex" justifyContent="space-between" p={1} alignItems="center" mb={0}>
              <HStack spacing={1} mr={1}>
              <TbTarget  />
              <BiTime  />
              <MdOutlineCollectionsBookmark  />
              </HStack>
               <Text fontWeight="semibold">Limited Time Fee Collect</Text>
                
            <AiOutlineQuestionCircle />
           
           </Box>
           <Text color="whiteAlpha.600" fontSize="sm">0xDa76E44775C441eF53B9c769d175fB2948F15e1C</Text>
          </Box>
          <Box w="100%" h={65} border="1px" borderColor="gray.300" borderRadius={7}  p={1} mt={4} cursor="pointer" onClick={ () => chooseThePostModule(toggleIsLimitedFeeCollect, "timedFeeCollectModule")}> 
            <Box w={220} display="flex" justifyContent="space-between" p={1} alignItems="center" mb={0}>
              <HStack spacing={1} mr={1}>
                <BiTime  />
              <MdOutlineCollectionsBookmark  />
              </HStack>
               <Text fontWeight="semibold">Timed Fee Collect</Text>
                
            <AiOutlineQuestionCircle />
           
           </Box>
           <Text color="whiteAlpha.600" fontSize="sm">0x36447b496ebc97DDA6d8c8113Fe30A30dC0126Db</Text>
          </Box>
          <Box w="100%" h={65} border="1px" borderColor="gray.300" borderRadius={7}  p={1} mt={4} cursor="pointer" onClick={() => setselectedPostModule("freeCollectModule")}> 
            <Box w={150} display="flex" justifyContent="space-between" p={1} alignItems="center" mb={0}>
              <MdOutlineCollectionsBookmark  />
               <Text fontWeight="semibold">Free Collect</Text>
                
            <AiOutlineQuestionCircle />
           
           </Box>
           <Text color="whiteAlpha.600" fontSize="sm">0x0BE6bD7092ee83D44a6eC1D949626FeE48caB30c</Text>
          </Box>
          <Box w="100%" h={65} border="1px" borderColor="gray.300" borderRadius={7}  p={1} mt={4} cursor="pointer" onClick={() => chooseThePostModule(toggleIsGatedPostModal, "freeCollectModule")}> 
            <Box w={210} display="flex" justifyContent="space-between" p={1} alignItems="center" mb={0}>
              <HStack spacing={1} mr={1}>
                <AiOutlineLock />
              <MdOutlineCollectionsBookmark  />
              </HStack>
               <Text fontWeight="semibold">Free Gated Collect</Text>
                
            <AiOutlineQuestionCircle />
           
           </Box>
           <Text color="whiteAlpha.600" fontSize="sm">Your Own Nft Contract Address</Text>
          </Box>
          

       
         </Box>
    </Box>
  )
}
