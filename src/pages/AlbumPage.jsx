import { Avatar, Box, Heading, HStack, Square, Text, Stack } from '@chakra-ui/react'
import React from 'react'
import { DivContainer, ListBody, ListBodyContainer, ListCenter, ListControls, ListHeader, ListLeft, ListRight, MusicCoverImg } from '../StyledComponent'
import { AiOutlineHeart, AiOutlineShareAlt } from 'react-icons/ai'
import  { BsCollection } from 'react-icons/bs'
import { FaPlay } from 'react-icons/fa'
import {useParams} from 'react-router-dom'
import {GET_MUSIC} from '../graphql/publication/getSong'
import { useQuery } from '@apollo/client'
import useControls from '../hooks/useControls'
import { useRef } from 'react'
import store from '../store'
import { useState  as usestate} from '@hookstate/core'

export default function AlbumPage() {
    const {id} = useParams()
    const {data :album, error : isAlbumError, loading : isAlbamLoading} = useQuery(GET_MUSIC, {
        variables : {
          request : {
            publicationId: id
          }
        }
       })
       console.log("the post  info", album)
       const globalState = usestate(store)
       const {playIt, pauseIt} = useControls()
       const trendingMusicRef  =  useRef([])
       const  {progress} =  globalState.currentSongState.get()

       const  handlePlay  =  (ref, index, song, trackStats, trackModule, trackId, trackCreatorProfile)  =>  {
        if(globalState.audioRef.get() !== '') {
          globalState.audioRef.get()?.pause()
         // globalState.audioRef.get().currentTime = 0
        }
        globalState.currentPlayingSongStats.set(trackStats)
        globalState.currentPlayingModule.set(trackModule)
        globalState.currentPlayingSongId.set(trackId)
        globalState.currentPlayingSongCreatorProfile.set(trackCreatorProfile)
        playIt(ref, index, song)
      }

          // on  audio  end 
          const onPlayEnd = (index) =>  {
            console.log("this  song  is  ensed ", index)
            globalState.isPlaying.set(false)
             progress.set(0)
          
         }

      const onPlayingTrening  = (index) => {
        const  duration = trendingMusicRef.current[index].duration
          const ct = trendingMusicRef.current[index].currentTime
          console.log("duration time", duration, ct)
           // setCurrentPlayingSong({...currentPlayingSong, "progress" : ct / duration * 100, "length" : duration})
             globalState.currentSongState.set({...globalState.currentSongState?.get(), "progress" : ct / duration * 100, "length" : duration})
       
       } 
  return (
    <Box>
    <Box  bgGradient="linear(to-l, rgb(145, 119, 76, .2), rgb(104, 104, 99, .1), rgb(111, 110, 96, .3), #25221E)" w="100%" h={350} p={3}>
         <Box display="flex" >
        <Box w={250} h={280} minW={250} border="1px" borderColor="whiteAlpha.700" borderRadius={6}>
             <MusicCoverImg      src={album?.publication.metadata.image} alt="album cover"  />
        </Box>

         <Box marginLeft={20}>
            <Heading>{album?.publication.metadata.name}</Heading>
              
            <Box mt={3}>
                
                <Text fontSize={18} mb={6} w="60%">{album?.publication.metadata.description} </Text>
                
                 <Box>
                    <HStack spacing={6} mb={6}>
                        <Box w={150} h={55} minW="150px"  bgColor="whiteAlpha.900"  color="blackAlpha.900"  border="1px" borderColor="whiteAlpha.600" borderRadius={8} display="flex" flexDirection="column" alignItems="center">
                            <Text textAlign="center" color="black" fontWeight="bold" fontSize={20}>Total Revenue</Text>
                             <Text textAlign="center" fontWeight="black">0</Text>
                        </Box>

                        <Box w={150} h={55}   bgColor="whiteAlpha.900"  color="blackAlpha.900"  border="1px" borderColor="whiteAlpha.600" borderRadius={8} display="flex" flexDirection="column" alignItems="center" >
                            <Text textAlign="center" color="black" fontWeight="bold" fontSize={20}>Total Colllects</Text>
                             <Text textAlign="center" fontWeight="black">{album?.publication.stats.totalAmountOfCollects}</Text>
                        </Box>

                        <Box w={150} h={55}   bgColor="whiteAlpha.900"  color="blackAlpha.900"  border="1px" borderColor="whiteAlpha.600" borderRadius={8} display="flex" flexDirection="column" alignItems="center" >
                            <Text textAlign="center" color="black" fontWeight="bold" fontSize={20}>Total Mirrors</Text>
                             <Text textAlign="center" fontWeight="black">{album?.publication.stats.totalAmountOfMirrors}</Text>
                        </Box>
                        </HStack>
                        <HStack spacing={6}>
                        <Box w={150} h={55}   bgColor="whiteAlpha.900"  color="blackAlpha.900"  border="1px" borderColor="whiteAlpha.600" borderRadius={8} display="flex" flexDirection="column" alignItems="center" >
                            <Text textAlign="center" color="black" fontWeight="bold" fontSize={20}>Total Likes</Text>
                             <Text textAlign="center" fontWeight="black">{album?.publication.stats.totalUpvotes}</Text>
                        </Box>

                        <Box w={150} h={55}   bgColor="whiteAlpha.900"  color="blackAlpha.900"  border="1px" borderColor="whiteAlpha.600" borderRadius={8} display="flex" flexDirection="column" alignItems="center" mb={6}>
                            <Text textAlign="center" color="black" fontWeight="bold" fontSize={20}>Current Price</Text>
                             <Text textAlign="center" fontWeight="black">  - </Text>
                        </Box>

                        <Box w={150} h={55}   bgColor="whiteAlpha.900"  color="blackAlpha.900"  border="1px" borderColor="whiteAlpha.600" borderRadius={8} display="flex" flexDirection="column" alignItems="center" mb={6}>
                            <Text textAlign="center" color="black" fontWeight="bold" fontSize={20}>Total Supply</Text>
                             <Text textAlign="center" fontWeight="black">--</Text>
                        </Box>

                        </HStack>
                 </Box>
            </Box>

           
         </Box>
        
        </Box>
      
    </Box>
   
     {album?.publication.metadata.media.map((song, i) => {

      return(

        <DivContainer key={i}>
        <ListHeader>
          <ListLeft>
              <Text color="whiteAlpha.700" fontSize="lg" >Title</Text>
          </ListLeft>
          <ListCenter>
              <Text color="whiteAlpha.700" fontSize="lg">Artist</Text>
          </ListCenter>
          <ListRight>
              <Text color="whiteAlpha.700" fontSize="lg">Time</Text>
          </ListRight>
          
        </ListHeader>
        
        <ListBody>
          <ListLeft>
              <Box mr={3}>
                  <FaPlay size={20}     />
              </Box>
             <Square size={42} bgColor="red.400">
               <img   src={album?.publication.metadata.image}/>
             </Square>

              <Box ml={3}>
                  <Text fontSize="lg" color="whiteAlpha.700">{album?.publication.metadata.name}</Text>
                   
                   <HStack spacing={6}>
                      <Box display="flex" alignItems="center" >
                          <AiOutlineShareAlt  size={14} color="gray" />
                           <Text fontSize="xs" color="whiteAlpha.400">{album?.publication.stats.totalAmountOfMirrors}</Text>
                      </Box>
  
                      <Box display="flex" alignItems="center">
                           <BsCollection  size={12} color="gray" />
                           <Text fontSize="xs" color="whiteAlpha.400">{album?.publication.stats.totalAmountOfCollects}</Text>
                      </Box>
                      <Box display="flex" alignItems="center">
                          <AiOutlineHeart  size={12} color="gray" />
                           <Text fontSize="xs" color="whiteAlpha.400">{album?.publication.stats.totalUpvotes}</Text>
                      </Box>
                   </HStack>
                     
              </Box>
          </ListLeft>
           <ListCenter>
              <Text color="whiteAlpha.800">{album?.publication.profile.handle}</Text>
              <audio  src={song?.original.url}    ref={el =>  trendingMusicRef.current[i] = el}  onTimeUpdate = {() => onPlayingTrening(i)} onEnded = {() => onPlayEnd(i)}     />
           </ListCenter>
            <ListRight>---</ListRight>
            
        </ListBody>
      
      </DivContainer>
      )
     })}
    </Box>
  )
}
