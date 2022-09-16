import { Avatar, AvatarBadge, Box, Button, Circle, CloseButton, Heading, HStack, IconButton, Image , Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text,
  Fade, ScaleFade, Slide, SlideFade 

} from '@chakra-ui/react'
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
import { BiBrightness } from 'react-icons/bi'

export default function Home({songs, isLoading, isError}) {
    const [slideRef, setSlideRef] = useState(null)
    const [slideRefTwo, setSlideRefTwo] = useState(null)
    const [isAuthModal, setisAuthModal] = useState(false)
     const [isLensSignedIn, setisLensSignedIn] = useState(false)
     const [test, settest] = useState(true)
    const globalState = usestate(store)
    const {isPlaying, audioRef, currentPlayingSong} = usestate(store)
    const [isShowBannerControls, setisShowBannerControls] = useState(false)
     const [isShowPlayBtn, setisShowPlayBtn] = useState(false)
     const [hoveredCard, sethoveredCard] = useState()
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
        dots: false,
       // centerMode: true,
      infinite: true,
      speed: 1000,
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows : false,
      autoplay: true,
      cssEase: "linear",
      autoplaySpeed: 4000,
      className: "slider-container"
      }
      
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
     // const {signIn} = useSignIn()
     const playChoosenAud = (aud, index, song) => {
      
     
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

         const  handleMouseEnterCard = (index) => {
          sethoveredCard(index)
            setisShowPlayBtn(true)
         }

         console.log("this is hovered  card", hoveredCard)

         const  handleMouseLeaveCard = () => {
          
           setisShowPlayBtn(false)
         }
         
         return (
    <Box >
       
        <Box bgColor="blackAlpha.800" w="100%" h={300} onMouseEnter = {() => setisShowBannerControls(true)} onMouseLeave = {() => setisShowBannerControls(false)}>
           <Slider ref={setSlideRef} {...bannerSettings} >
              {topBanner.map((data, i) => {

                return(
                  <Box sx={{
                 position: "relative", 
                  }}>
                  
                    <Image  src={data.image}   w="100%" h={300} objectFit="cover"   maxH={300} />
                    {isShowBannerControls && <Box  w="100%" display="flex" justifyContent="space-between" sx={{
                      position: "absolute", top : "45%"
                     }}>
                    
                    <IconButton  icon={ <AiOutlineLeft   size={30} color="white" onClick={slideRef?.slickPrev}/> }  bgColor="blackAlpha.600"/>
                     <IconButton   icon={<AiOutlineRight size={30} color="white"  onClick={slideRef?.slickNext}/>  } bgColor="blackAlpha.600"/>
                      </Box>}
                  </Box>  
                )
              })}
           </Slider>
        </Box>
       
        <Box  py={4}  >
           <Box w="95%" mx="auto" display="flex" justifyContent="space-between"  p={2} alignItems="center">
              <Heading fontSize="3xl" >Ngoma za moto</Heading>
               <Box display="flex" alignItems="center" w={100} justifyContent="space-between">
                <AiOutlineLeft  size={30} cursor="pointer" onClick={slideRefTwo?.slickPrev}/>
                <AiOutlineRight size={30} cursor="pointer" onClick={slideRefTwo?.slickNext}/>
               </Box>
           </Box>
           <Slider ref={setSlideRefTwo} {...settings}>
          {songs?.explorePublications?.items.map((data, i) => {

            return(
              <Box  >
                <Box bgColor="blackAlpha.100" mx={3} w={196} h={196} p={1} position="relative" borderRadius={8} onMouseEnter = {() =>  handleMouseEnterCard(i)} onMouseLeave = {() => setisShowPlayBtn(false)}>
                  <img   src={data.metadata.image} maxW="100%" borderTopRadius={8} borderBottomRadius={4}  className="my-image"/>
                   {isShowPlayBtn && i === hoveredCard &&
                   <ScaleFade initialScale={0.1} in={isShowPlayBtn}>
                  <Box position="absolute" top={0} w={196} h={196} bgColor="blackAlpha.600" display="flex" alignItems="center" justifyContent="center" >
                   <Circle size={67} bgColor="blackAlpha.400" cursor="pointer" >
                   <FaPlay  size={30}/>
                   </Circle>
                </Box>
                </ScaleFade> 
                   }
                    
                    <Box boxShadow="dark-lg">
                      <Text textAlign="center" textTransform="capitalize" fontSize="lg" color="whiteAlpha.600" cursor="pointer">{data.metadata.name}</Text>
                       <Text textAlign="center" color="whiteAlpha.800" cursor="pointer"> {data.profile.name || data.profile.handle} </Text>
                    </Box>
                  </Box>
                   
                 </Box>
            )
          })}
          </Slider>
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


             } <audio src={topSongs[0].song}    ref={audioRef}   onTimeUpdate={onPlaying}/>
          <AudioPlayer song= {currentSong} setSong = {setcurrentSong} isPlaying={isPlaying} setisPlaying= {setisPlaying}
            audioRef ={audioRef}
          />
*/}