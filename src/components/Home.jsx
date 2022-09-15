import { Avatar, AvatarBadge, Box, Button, Circle, CloseButton, Heading, HStack, IconButton, Image , Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text} from '@chakra-ui/react'
import React, {useRef, useState, useEffect} from 'react'
import { AiOutlineLeft, AiOutlineRight } from 'react-icons/ai'
import { FaPause, FaPlay } from 'react-icons/fa'
import { IoMdNotificationsOutline} from 'react-icons/io'
import { topSongs } from '../fakeData'
import Slider from 'react-slick'
import store from '../store'
import {useState as usestate } from '@hookstate/core'
import useControls from '../hooks/useControls'
import { useMoralis } from 'react-moralis'
import useSignIn from '../graphql/Authentication/useSignIn'

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import AudioPlayer from './AudioPlayer'
import { topBanner } from '../topBanner'

export default function Home() {
    const [slideRef, setSlideRef] = useState(null)
    const [isAuthModal, setisAuthModal] = useState(false)
     const [isLensSignedIn, setisLensSignedIn] = useState(false)
     const [test, settest] = useState(true)
    const globalState = usestate(store)
    const {isPlaying, audioRef, currentPlayingSong} = usestate(store)
    const [isShowBannerControls, setisShowBannerControls] = useState(false)
     const [isShowPlayBtn, setisShowPlayBtn] = useState(false)
    const {authenticate, account, logout, isAuthenticated, isAuthenticating, authError}  = useMoralis()

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
       // autoplay : true
        
      };

      const bannerSettings  = {
        dots: true,
      infinite: true,
      speed: 1000,
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows : false,
      autoplay: true,
      cssEase: "linear",
      autoplaySpeed: 4000,
      }
      
      const myAudRef = useRef([])

       const onPlaying  = (index) => {
        const  duration = myAudRef.current[index].duration
         const ct = myAudRef.current[index].currentTime
         console.log(duration, ct)
          // setCurrentPlayingSong({...currentPlayingSong, "progress" : ct / duration * 100, "length" : duration})
            globalState.currentSongState.set({...globalState.currentSongState?.get(), "progress" : ct / duration * 100, "length" : duration})
      } 

      //const LENS_ACCESS_TOKEN = sessionStorage.getItem('accessToken')
      //const slicedAccount = `${account?.slice(0,4)}... ${account?.slice(39)}`
      const myAudioRef = useRef()
      const clickRef = useRef()
     // const {signIn} = useSignIn()
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
     
      const {playIt, pauseIt} = useControls()
     
      const checkWidth  = (e) => {
        let width = clickRef.current.clientWidth
          const offset = e.nativeEvent.offsetX
    
          const divProgress = offset / width * 100;
          globalState.audioRef.get().currentTime = divProgress / 100 *  globalState.currentSongState.get().length
          console.log("you clicked me")
         }

         const openAuthModal = () => {
            setisAuthModal(true)
         }

         const closeAuthModal = () => {
              setisAuthModal(false)
         }

   
         
  return (
    <Box >
       
        <Box bgColor="cyan.500" w="100%" h={300} onMouseEnter = {() => setisShowBannerControls(true)} onMouseLeave = {() => setisShowBannerControls(false)}>
           <Slider ref={setSlideRef} {...bannerSettings}>
              {topBanner.map((data, i) => {

                return(
                  <Box sx={{
                 position: "relative", 
                  }}>
                  
                    <Image  src={data.image}   w="100%" h="100%" objectFit="cover"   maxH={300} />
                    {isShowBannerControls && <Box  w="100%" display="flex" justifyContent="space-between" sx={{
                      position: "absolute", top : "50%"
                     }}>
                    
                    <IconButton  icon={ <AiOutlineLeft   size={30} color="white" onClick={slideRef?.slickPrev}/> }  bgColor="blackAlpha.600"/>
                     <IconButton   icon={<AiOutlineRight size={30} color="white"  onClick={slideRef?.slickNext}/>  } bgColor="blackAlpha.600"/>
                      </Box>}
                  </Box>  
                )
              })}
           </Slider>
        </Box>
       
        <Box h="200" w="99%"  mx="auto" mt={3}>
            <Slider  {...settings}>
            {topSongs.map((song, i) => {

                return(
                    <HStack key={i} position="relative">
                       <Box w={170} h={170} bgColor="blackAlpha.400"  onMouseEnter={() => setisShowPlayBtn(true) } onMouseLeave = {() => setisShowPlayBtn(false)}>
                    <Image   src={song.cover}  style={{width: "180px", height: "170px", objectFit: "cover", borderRadius: "4px", cursor: "pointer"}} />
                  </Box>
                  <Box textAlign="center" >
                    <Text>{song?.creator}</Text>
                    <Text>{song?.name}</Text>
                     <audio    src={song.song} ref={el =>  myAudRef.current[i] = el}  onTimeUpdate={() => onPlaying(i)}    />
                     

                    </Box>
                    {isShowPlayBtn &&  <Box width={170} h={170} position="absolute" top={0} bgColor="blackAlpha.600" zIndex={0}  display="flex" alignItems="center" justifyContent="center">{isPlaying.get()  && globalState.currentIndexSong.get() === i? <IconButton   icon={<FaPause  size={30} onClick = {() => pauseIt()}/>}  colorScheme="blackAlpha" />  : <IconButton    icon={<FaPlay  size={30} onClick= {() => playChoosenAud(myAudRef, i, song)}/>}   colorScheme="blackAlpha"/>} </Box>}
                    </HStack> 
                )
            })}
     </Slider>
    {/*} <audio src={topSongs[0].song}    ref={audioRef}   onTimeUpdate={onPlaying}/>
          <AudioPlayer song= {currentSong} setSong = {setcurrentSong} isPlaying={isPlaying} setisPlaying= {setisPlaying}
            audioRef ={audioRef}
          />*/}
          
        </Box>
    </Box>
  )
}


{/* 
   
   
    <Button onClick={openAuthModal} bgColor="black" colorScheme="whiteAlpha" variant="outline">Sign In</Button>
    isAuthenticated ?
    <Text>{account}</Text> :
 <Button  color="black" onClick={() => authenticate({signingMessage: "authenticate to audax", chainId: "0x13881"})}>connect wallet</Button>
   }

// moved  from   navbar

 <Box display="flex"  h="56px" alignItems="center" justifyContent="space-between" w="95%"  >
            <Box display="flex" w={81}  justifyContent="space-between">
         <AiOutlineLeft  size={35}  cursor="pointer"  onClick={slideRef?.slickPrev}/>
         <AiOutlineRight    size={35}      cursor="pointer"  onClick={slideRef?.slickNext}/>
            </Box>
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
         {/*LENS SIGN IN  MODAL     
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


       <Box ref={clickRef} onClick={checkWidth} bgColor="red">
          <div style={{width: `${globalState.currentSongState.get()?.progress+"%"}`, height : "20px", backgroundColor: "peru" }}onClick={ checkWidth } ref={clickRef}></div>
          </Box>

           <Box mt={10}>
            <AudioPlayer  />
           </Box>
*/}