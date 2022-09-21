import { Box, Center, HStack, IconButton, Image, ModalOverlay, Slider, SliderFilledTrack, SliderThumb, SliderTrack, Text, Modal, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Button } from '@chakra-ui/react'
import React, {useState, useRef} from 'react'
import { FaPause, FaPlay, GrPause, GrPlay } from 'react-icons/fa'
import { AiOutlineFileAdd, AiOutlineHeart, AiOutlinePlusSquare, AiOutlineRetweet, AiOutlineUser } from 'react-icons/ai'
import { BsCollection, BsShare } from 'react-icons/bs'
import { GrNext, MdOutlineReport, MdOutlineSkipNext, MdSkipNext, MdSkipPrevious } from 'react-icons/md'
import { RiPlayList2Line, RiPlayListAddLine } from 'react-icons/ri'
import {useState as usestate} from '@hookstate/core'
import useControls  from '../hooks/useControls'
import {truncateString} from '../hooks/useSubstring'
import store from '../store'
import useCollect from '../graphql/publication/collectSongTypedData'
import useCreateMirror from '../graphql/publication/createMirrorTypedData'
import { likeTrack } from '../graphql/publication/likePost'
import { getSongData } from '../graphql/publication/getSong'
import TrackInfo from './TrackInfo'
export default function AudioPlayer({ profileId}) {
    const [test, settest] = useState(true)
    const [isCollectModal, setisCollectModal] = useState(false)
    const globalState = usestate(store)
      const {totalAmountOfMirrors, totalAmountOfCollects} = globalState.currentPlayingSongStats.get()
       const {__typename : trackCollectModule} = globalState.currentPlayingModule.get()
      
   const {isPlaying, audioRef, currentPlayingSong, currentIndexSong} = usestate(store)
    const {handle} = globalState.currentPlayingSongCreatorProfile.get()
   console.log("the  createor  profile", globalState.currentPlayingSong.get())
    
    const {playIt, pauseIt, skipBack} = useControls()
   const  {name, description} = currentPlayingSong.get()
  const {progress} = globalState.currentSongState.get()
  const {createCollect} =  useCollect()
  const {createMirror} = useCreateMirror ()
   const progressBar  =  useRef()

      const  toggleCollectModal = () =>  {
        isCollectModal ?   setisCollectModal(false)  : setisCollectModal(true)
      }

       const  handleOpenCollectModal = async (trackId) => {
           setisCollectModal(true)
           
       }
   const checkWidth  = (e) => {
    let width = progressBar.current.clientWidth
      const offset = e.nativeEvent.offsetX

      const divProgress = offset / width * 100;
      globalState.audioRef.get().currentTime = divProgress / 100 *  globalState.currentSongState.get().length
      console.log("you clicked me")
     }

      const handlePlay = () =>  {
         if(globalState.audioRef.get() !== ""){
          audioRef.get().play()
         globalState.isPlaying.set(true)
         }

      }

    
  return (
    <Box >
          {/* COLLECT  MODAL   */}
            <Modal isOpen={isCollectModal} onClose={toggleCollectModal} isCentered>
              <ModalOverlay bgColor="whiteAlpha.600" />
               <ModalContent>
                <ModalHeader display="flex" alignItems="center" bgColor="blackAlpha.900" color="whiteAlpha.900" borderTopRadius={8}>
                  <AiOutlineFileAdd  />
                  {trackCollectModule}
                  </ModalHeader>
                <ModalCloseButton color="whiteAlpha.900" />
                <ModalBody  bgColor="blackAlpha.900" color="whiteAlpha.900">
                  <Text mb={3}>Song by @{handle} </Text>
                   <Text  fontSize="lg" color="whiteAlpha.700">{description ? truncateString(description, 20) : ""}</Text>
                    <HStack spacing={4} mt={3}>
                      <AiOutlineUser  size={28}/>
                        <Text>{totalAmountOfCollects}</Text>
                    </HStack>
                      <TrackInfo  trackId  = {globalState.currentPlayingSongId.get()} />
                </ModalBody>
                 <ModalFooter bgColor="blackAlpha.900" color="whiteAlpha.900" borderBottomRadius={8}>
                  <Button color="blackAlpha.900" onClick={() => createCollect(globalState.currentPlayingSongId.get(), profileId )}>Collect Now</Button>
                 </ModalFooter>
               </ModalContent>
            </Modal>

     <Box w="100%" h={1} bgColor="whiteAlpha.700" mt={3} cursor="pointer" ref={progressBar} onClick={checkWidth}>
     <div style={{width: `${progress+"%"}`, height : "4px", backgroundColor: "red" }}  ></div>
     </Box>

    <Box display="flex" w="100%" justifyContent="space-between" alignItems="center">
     <Box display="flex" w={200}  alignItems="center" justifyContent="space-between"  mt={3} px={3}>
      <Center w={45} h={45}>
        <Image    src='img/abdul.jpg'   />
      </Center>
      <Box>
        <Text textTransform="capitalize" color="whiteAlpha.700">abdul kabugu</Text>
        <Text fontSize="sm" color="whiteAlpha.500">{name}</Text>
        </Box>
     </Box>

     <HStack spacing={3} mt={5}>
      <MdSkipPrevious  size={40}  cursor="pointer" onClick={skipBack}/>
      {  globalState.isPlaying.get()?  <FaPause   size={40}  cursor="pointer" onClick={() => pauseIt()}/> : <FaPlay   size={40}  cursor="pointer" onClick={() => handlePlay()} /> }
      <MdSkipNext  size={40} cursor="pointer" />
      </HStack>

      <HStack mr={7} mt={5} spacing={10}>
         <IconButton   icon={    <AiOutlineHeart  size={30} />}   colorScheme="blackAlpha" 
          
         disabled ={!globalState.currentPlayingSongId.get()}
         
         />
        <IconButton   icon={ <BsShare size={26} />}   colorScheme = "blackAlpha" 
         onClick={() => createMirror(globalState.currentPlayingSongId.get(), profileId)} 
        disabled ={!globalState.currentPlayingSongId.get()} />
         <IconButton icon={   <BsCollection  size={27}  />} colorScheme="blackAlpha"
          onClick={() => handleOpenCollectModal(globalState.currentPlayingSongId.get()) }  
            disabled ={!globalState.currentPlayingSongId.get()}
         />
         <IconButton    icon={<RiPlayListAddLine  size={27}  />} 
            disabled
            colorScheme="blackAlpha"

         />
         <IconButton   icon={<AiOutlinePlusSquare  size={27} />} 
           colorScheme="blackAlpha"
           disabled
         />
         <IconButton     icon={ <MdOutlineReport  size={27} />}  
           disabled
           colorScheme="blackAlpha"
         />
      </HStack>
    </Box>
    </Box>
  )
}
