import { Avatar, AvatarBadge, Box, Button, Circle, CloseButton, Heading, HStack, IconButton, Image , Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text,
  Fade, ScaleFade, Slide, SlideFade 

} from '@chakra-ui/react'
import React, {useRef, useState, useEffect} from 'react'
import { AiOutlineConsoleSql, AiOutlineLeft, AiOutlineRight } from 'react-icons/ai'
import { FaPause, FaPlay } from 'react-icons/fa'
import { IoMdNotificationsOutline} from 'react-icons/io'
import { topSongs } from '../fakeData'
import Slider from 'react-slick'
import store from '../store'
import {useState as usestate } from '@hookstate/core'
import useControls from '../hooks/useControls'
import { useMoralis } from 'react-moralis'
import useSignIn from '../graphql/Authentication/useSignIn'
import { trendingSongs } from '../fakeDataTwo'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import AudioPlayer from './AudioPlayer'
import { topBanner } from '../topBanner'
import { BiBrightness } from 'react-icons/bi'
import { ArtistImg, CardContainer, CardControls } from '../StyledComponent'
import { Link } from 'react-router-dom'

export default function Home({songs, isLoading, isError}) {
    const [slideRef, setSlideRef] = useState(null)
    const [slideRefTwo, setSlideRefTwo] = useState(null)
    const [slideRefThree, setSlideRefThree] = useState(null)
    const [slideRefFour, setSlideRefFour] = useState(null)
    const [slideRefFive, setSlideRefFive] = useState(null)
    const [isAuthModal, setisAuthModal] = useState(false)
     const [isLensSignedIn, setisLensSignedIn] = useState(false)
     const [test, settest] = useState(true)
    const globalState = usestate(store)
    const {isPlaying, audioRef, currentPlayingSong} = usestate(store)
    const [isShowBannerControls, setisShowBannerControls] = useState(false)
     const [isShowPlayBtn, setisShowPlayBtn] = useState(false)
     const [hoveredCard, sethoveredCard] = useState()
    const {authenticate, account, logout, isAuthenticated, isAuthenticating, authError}  = useMoralis()

     const myAudRef  = useRef([])
     const trendingMusicRef  =  useRef([])
      //const  {currentSongState} =  usestate(store)
       const  {progress} =  globalState.currentSongState.get()
    /*useEffect(() => {
      myAudRef.current = myAudRef.current.slice(0, topSongs.length)
    }, [])*/
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

        //console.log("current Audio", myAudRef.current[0])

          const {playIt, pauseIt} = useControls()

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

        const  handlePlay  =  (ref, index, song, trackStats, trackModule, trackId, trackCreatorProfile, theFullsong)  =>  {
          if(globalState.audioRef.get() !== '') {
            globalState.audioRef.get()?.pause()
           // globalState.audioRef.get().currentTime = 0
          }
           console.log("theee  myy song", theFullsong)
          globalState.currentPlayingSongStats.set(trackStats)
          globalState.currentPlayingModule.set(trackModule)
          globalState.currentPlayingSongId.set(trackId)
          globalState.currentPlayingSongCreatorProfile.set(trackCreatorProfile)
          playIt(ref, index, song)
        }
     console.log("the  post  state", globalState.currentSongState.get())
        const onPlaying  = (index) => {
         const  duration = myAudRef.current[index].duration
           const ct = myAudRef.current[index].currentTime
           console.log("duration time", duration, ct)
            // setCurrentPlayingSong({...currentPlayingSong, "progress" : ct / duration * 100, "length" : duration})
              globalState.currentSongState.set({...globalState.currentSongState?.get(), "progress" : ct / duration * 100, "length" : duration})
        
        } 

        // on playing  trending  audios
         
        const onPlayingTrening  = (index) => {
          const  duration = trendingMusicRef.current[index].duration
            const ct = trendingMusicRef.current[index].currentTime
            console.log("duration time", duration, ct)
             // setCurrentPlayingSong({...currentPlayingSong, "progress" : ct / duration * 100, "length" : duration})
               globalState.currentSongState.set({...globalState.currentSongState?.get(), "progress" : ct / duration * 100, "length" : duration})
         
         } 

        

        // on  audio  end 
       const onPlayEnd = (index) =>  {
          console.log("this  song  is  ensed ", index)
          globalState.isPlaying.set(false)
           progress.set(0)
        
       }

       console.log("this is  progress", progress)

       const onAudioLoading =  (index)  =>  {
           console.log("this  audio  is  loading", index)
       }

       const onCanPlayAudio  =  (index) =>  {
          globalState.isAudioReadyToPlay.set(true)
          console.log("this  audio  is  ready  to  play",  index)
       }

         console.log("the  audio  ref",globalState.audioRef.get())
      
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
       
        <Box  py={2}  >
           <Box w="95%" mx="auto" display="flex" justifyContent="space-between"  py={2} alignItems="center">
              <Heading fontSize="3xl" >New & Trending</Heading>
               <Box display="flex" alignItems="center" w={100} justifyContent="space-between">
                <AiOutlineLeft  size={30} cursor="pointer" onClick={slideRefTwo?.slickPrev}/>
                <AiOutlineRight size={30} cursor="pointer" onClick={slideRefTwo?.slickNext}/>
               </Box>
           </Box>
           <Slider ref={setSlideRefTwo} {...settings}>
          {songs?.explorePublications?.items.map((data, i) => {

            return(
              <Box  >
                <CardContainer>
                 <img   src={data.metadata.image} maxW="100%" borderTopRadius={8} borderBottomRadius={4}  className="my-image"/> 
                     {data.metadata.media.map((media, index) => {

                      return(
                        <audio  src={media.original.url}    ref={el =>  trendingMusicRef.current[i] = el}  onTimeUpdate = {() => onPlayingTrening(i)} onEnded = {() => onPlayEnd(i)}  onCanPlay = {() => onCanPlayAudio(i) }   />
                      )
                     })}               
                    <CardControls>
                      {
                   globalState.isPlaying.get()  && globalState.currentIndexSong.get() === i  ?
                    <Circle size={65} bgColor="blackAlpha.800" cursor="pointer">
                   <FaPause    size={35} onClick= {() => pauseIt()} />
                </Circle> :
                   <Circle size={67} bgColor="blackAlpha.400" cursor="pointer" >
                   <FaPlay  size={30} onClick={() => handlePlay(trendingMusicRef, i, data.metadata, data.stats, data.collectModule, data.id, data.profile, data)}/>
                   </Circle>
                       }
                   </CardControls>
                
                  <Box boxShadow="dark-lg">
                  <Link to={`music/${data.id}`}> <Text textAlign="center" textTransform="capitalize" fontSize="lg" color="whiteAlpha.600" cursor="pointer">{data.metadata.name}</Text></Link>
                   <Link to={`artist/${data.profile.id}`}>  <Text textAlign="center" color="whiteAlpha.800" cursor="pointer"> {data.profile.name || data.profile.handle} </Text></Link>  
                    </Box>
                  
                  </CardContainer>  

                 </Box>
            )
          })}
          </Slider>
        </Box>
       
      <Box py={2}>
      <Box w="95%" mx="auto" display="flex" justifyContent="space-between"  py={2} alignItems="center">
              <Heading fontSize="3xl" >PlayLists</Heading>
               <Box display="flex" alignItems="center" w={100} justifyContent="space-between">
                <AiOutlineLeft  size={30} cursor="pointer" onClick={slideRefThree?.slickPrev}/>
                <AiOutlineRight size={30} cursor="pointer" onClick={slideRefThree?.slickNext}/>
               </Box>
   </Box>
      <Box  w="100%" >
        <Slider ref={setSlideRefThree} {...settings}>
         {topSongs.map((data, i) => {

          return(
             <CardContainer>
            <img     src={data.cover}   className="my-image"/>
            <audio  src={data.song}     ref={el =>  myAudRef.current[i] = el}  onTimeUpdate = {() => onPlaying(i)} onEnded = {() => onPlayEnd(i)}  onCanPlay = {() => onCanPlayAudio(i) } />
              <CardControls>
                {globalState.isPlaying.get()  && globalState.currentIndexSong.get() === i  ?
                
                <Circle size={65} bgColor="blackAlpha.800" cursor="pointer">
                <FaPause    size={35} onClick= {() => pauseIt()} />
                </Circle> :
                  <Circle size={65} bgColor="blackAlpha.800" cursor="pointer">
                  <FaPlay    size={35} onClick= {() => handlePlay(myAudRef, i, data) } />
                   </Circle>
              
              }
              </CardControls>
               <Box>
                <Text textAlign="center" color="whiteAlpha.700">The  song  name</Text>
                <Text textAlign="center" color="whiteAlpha.800">The  artist  name </Text>
               </Box>
            </CardContainer>
          )
         })}
        </Slider>
      </Box>
           

        
      </Box>

        <Box >
        <Box w="95%" mx="auto" display="flex" justifyContent="space-between"  py={2} alignItems="center">
              <Heading fontSize="3xl" >Podcasts</Heading>
               <Box display="flex" alignItems="center" w={100} justifyContent="space-between">
                <AiOutlineLeft  size={30} cursor="pointer" onClick={slideRefFour?.slickPrev}/>
                <AiOutlineRight size={30} cursor="pointer" onClick={slideRefFour?.slickNext}/>
               </Box>
           </Box>
          <Box>
            <Slider ref={setSlideRefFour} {...settings}>
              {trendingSongs.map((data, i) => {

                return(
                  <CardContainer>
                    <img   src={data.image} className="my-image"     />
                     <CardControls>
                      <Circle size={55} bgColor="blackAlpha.600" cursor="pointer">
                        <FaPlay    size={35}  />
                      </Circle>
                     </CardControls>
                     <Box>
                      <Text textAlign="center">Podcast name</Text>
                      <Text textAlign="center">Podcast creator  name</Text>
                     </Box>
                  </CardContainer>
                )
              })}
            </Slider>
          </Box>
      </Box>  

      <Box py={2}>
      <Box w="95%" mx="auto" display="flex" justifyContent="space-between"  py={2} alignItems="center">
              <Heading fontSize="3xl" >Weekly Charts</Heading>
               <Box display="flex" alignItems="center" w={100} justifyContent="space-between">
                <AiOutlineLeft  size={30} cursor="pointer" onClick={slideRefFive?.slickPrev}/>
                <AiOutlineRight size={30} cursor="pointer" onClick={slideRefFive?.slickNext}/>
               </Box>
           </Box>
           <Slider ref={setSlideRefFive} {...settings}>
              {trendingSongs.map((data, i) => {

                return(
                  <CardContainer>
                    <img   src={data.image} className="my-image"     />
                     <CardControls>
                      <Circle size={55} bgColor="blackAlpha.600" cursor="pointer">
                        <FaPlay    size={35}  />
                      </Circle>
                     </CardControls>
                     <Box>
                      <Text textAlign="center">Podcast name</Text>
                      <Text textAlign="center">Podcast creator  name</Text>
                     </Box>
                  </CardContainer>
                )
              })}
            </Slider>
      </Box>
    
      <Box py={2}>
       <HStack spacing={4}>
       <Heading fontSize="3xl" >Featured Artists</Heading> <AiOutlineRight size={25} cursor="pointer" />
       </HStack>

        <Box>
          <Circle size={250} bgColor="cyan.700">
            <ArtistImg     src='img/abdul.jpg'    />
          </Circle>
        </Box>
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