import { Box, Center, HStack, Image, Slider, SliderFilledTrack, SliderThumb, SliderTrack, Text } from '@chakra-ui/react'
import React, {useState, useRef} from 'react'
import { FaPause, FaPlay, GrPause, GrPlay } from 'react-icons/fa'
import { AiOutlineHeart, AiOutlinePlusSquare, AiOutlineRetweet } from 'react-icons/ai'
import { BsCollection } from 'react-icons/bs'
import { GrNext, MdOutlineReport, MdOutlineSkipNext, MdSkipNext, MdSkipPrevious } from 'react-icons/md'
import { RiPlayList2Line, RiPlayListAddLine } from 'react-icons/ri'
import {useState as usestate} from '@hookstate/core'
import store from '../store'
export default function AudioPlayer() {
    const [test, settest] = useState(true)
    const globalState = usestate(store)
    //{ audioRef, isPlaying,  setisPlaying,  song}
   const {isPlaying, audioRef, currentPlayingSong} = usestate(store)

     console.log("the audio ref", globalState.audioRef.get())
      console.log("is this playing", isPlaying.get())
   const {name} = currentPlayingSong.get()
   
    const playAud = () => {
      isPlaying.set(true)
      globalState.audioRef.get().play()
       
    }

    const pauseAud = () => {
       isPlaying.set(false) 
       globalState.audioRef.get().pause()
       //globalState.audioRef.get().play()
    }
    const clickRef = useRef()

     const checkWidth  = (e) => {
    let width = clickRef.current.clientWidth
      const offset = e.nativeEvent.offsetX

      const divProgress = offset / width * 100;
      //audioRef.current.currentTime = divProgress / 100 * song?.length
      console.log("you clicked me")
     }
   
  return (
    <Box >
     <Box w="100%" h={1} bgColor="whiteAlpha.700" mt={3}>

     </Box>

    <Box display="flex" w="100%" justifyContent="space-between" alignItems="center">
     <Box display="flex" w={290}  alignItems="center" justifyContent="space-between"  mt={3} px={3}>
      <Center w={45} h={45}>
        <Image    src='img/abdul.jpg'   />
      </Center>
      <Box>
        <Text textTransform="capitalize" color="whiteAlpha.700">current playing  songer name</Text>
        <Text fontSize="sm" color="whiteAlpha.500">current playing  song  name</Text>
        </Box>
     </Box>

     <HStack spacing={3} mt={5}>
      <MdSkipPrevious  size={40}  cursor="pointer" />
      <FaPlay   size={40}  cursor="pointer" />
      <MdSkipNext  size={40} cursor="pointer" />
      </HStack>

      <HStack mr={7} mt={5} spacing={10}>
       <AiOutlineHeart  size={30} cursor="pointer"/>
       <AiOutlineRetweet  size={30} cursor="pointer" />
        <BsCollection  size={27} cursor="pointer" />
         <RiPlayListAddLine  size={27} cursor="pointer" />
         <AiOutlinePlusSquare  size={27} cursor="pointer" />
         <MdOutlineReport  size={27} cursor= "pointer"/>
      </HStack>
    </Box>
    </Box>
  )
}
