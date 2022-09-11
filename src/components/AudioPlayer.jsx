import { Box, Slider, SliderFilledTrack, SliderThumb, SliderTrack, Text } from '@chakra-ui/react'
import React, {useState, useRef} from 'react'
import { FaPause, FaPlay, GrPause, GrPlay } from 'react-icons/fa'
import { GrNext, MdSkipNext, MdSkipPrevious } from 'react-icons/md'
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
    <Box mt={5}>
       <Box>
        <Text>{name}</Text>
       </Box>
       <Box>
        <Box bgColor="red.700" onClick={ checkWidth } ref={clickRef}>
   
   {/*} <div style={{width: `${song?.progress+"%"}`, height : "20px", backgroundColor: "peru" }}onClick={ checkWidth } ref={clickRef}></div>*/}
     
        </Box>

        
        <Box w={200}  display="flex" justifyContent="space-between" mt={4}>
      <MdSkipPrevious size={30}/>
         { isPlaying.get() ?  <FaPause  color='white' size={30} onClick={pauseAud}/> :  <FaPlay  color='white' size={30} onClick={playAud}/> }
         <MdSkipNext size={30}/>
        </Box>
       </Box>
    </Box>
  )
}
