import { Box, Button, HStack, IconButton, Image , Input, Text} from '@chakra-ui/react'
import React, {useRef, useState, useEffect} from 'react'
import { AiOutlineLeft, AiOutlineRight } from 'react-icons/ai'
import { FaPause, FaPlay } from 'react-icons/fa'
import { topSongs } from '../fakeData'
import Slider from 'react-slick'
import store from '../store'
import {useState as usestate } from '@hookstate/core'
import useControls from '../hooks/useControls'

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import AudioPlayer from './AudioPlayer'

export default function Home() {
    const [slideRef, setSlideRef] = useState(null)
    //const [isPlaying, setisPlaying] = useState(false)
   // const [currentSong, setcurrentSong] = useState(0)
   //const [currentPlayingSong, setCurrentPlayingSong] = useState()

    const globalState = usestate(store)
    const {isPlaying, audioRef, currentPlayingSong} = usestate(store)
    const {playIt, pauseIt, handlConsole} = useControls()

    useEffect(() => {
      myAudRef.current = myAudRef.current.slice(0, topSongs.length)
    }, [])
    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 1,
        lazyLoad: 'progressive',
        arrows: false,
        
      };
      
      const myAudRef = useRef([])

       const onPlaying  = (index) => {
        const  duration = myAudRef.current[index].duration
         const ct = myAudRef.current[index].currentTime
         console.log(duration, ct)
          // setCurrentPlayingSong({...currentPlayingSong, "progress" : ct / duration * 100, "length" : duration})
            globalState.currentSongState.set({...globalState.currentSongState?.get(), "progress" : ct / duration * 100, "length" : duration})
      } 

     
      const myAudioRef = useRef()
     
      const clickRef = useRef()

     const playChoosenAud = (aud, index, song) => {
      
     // myAudRef.current[globalState.currentIndexSong.get()].pause()
      //globalState.audioRef.get()?.pause()
      // globalState.audioRef.get().currentTime = 0
      if(globalState.audioRef.get() !== '') {
        globalState.audioRef.get()?.pause()
        globalState.audioRef.get().currentTime = 0
      }
      playIt(aud, index,song)
     }
      
     
      const checkWidth  = (e) => {
        let width = clickRef.current.clientWidth
          const offset = e.nativeEvent.offsetX
    
          const divProgress = offset / width * 100;
          globalState.audioRef.get().currentTime = divProgress / 100 *  globalState.currentSongState.get().length
          console.log("you clicked me")
         }
  return (
    <Box >
        <Box display="flex"  h="56px" alignItems="center" justifyContent="space-between" w="100%">
            <Box display="flex" w={81}  justifyContent="space-between">
         <AiOutlineLeft  size={35}  cursor="pointer"  onClick={slideRef?.slickPrev}/>
         <AiOutlineRight    size={35}      cursor="pointer"  onClick={slideRef?.slickNext}/>
            </Box>
            <Button  color="black">connect wallet</Button>
        </Box>

        <Box h="200" w="99%"  mx="auto" mt={3}>
            <Slider ref={setSlideRef} {...settings}>
            {topSongs.map((song, i) => {

                return(
                    <HStack key={i} >
                       <Box w={170} h={170} bgColor="blackAlpha.400" >
                    <Image   src={song.cover}  style={{width: "180px", height: "170px", objectFit: "cover", borderRadius: "4px", cursor: "pointer"}} />
                  </Box>
                  <Box textAlign="center" >
                    <Text>{song?.creator}</Text>
                    <Text>{song?.name}</Text>
                     <audio    src={song.song} ref={el =>  myAudRef.current[i] = el}  onTimeUpdate={() => onPlaying(i)}    />
                     

                    </Box>
                    <Box>{isPlaying.get()  && globalState.currentIndexSong.get() === i? <FaPause  size={30} onClick = {() => pauseIt()}/>  : <FaPlay  size={30} onClick= {() => playChoosenAud(myAudRef, i, song)}/>} </Box>
                    </HStack> 
                )
            })}
     </Slider>
    {/*} <audio src={topSongs[0].song}    ref={audioRef}   onTimeUpdate={onPlaying}/>
          <AudioPlayer song= {currentSong} setSong = {setcurrentSong} isPlaying={isPlaying} setisPlaying= {setisPlaying}
            audioRef ={audioRef}
          />*/}
          <Box ref={clickRef} onClick={checkWidth} bgColor="red">
          <div style={{width: `${globalState.currentSongState.get()?.progress+"%"}`, height : "20px", backgroundColor: "peru" }}onClick={ checkWidth } ref={clickRef}></div>
          </Box>

           <Box mt={10}>
            <AudioPlayer  />
           </Box>
        </Box>
    </Box>
  )
}
