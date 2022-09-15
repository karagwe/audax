import { Box } from '@chakra-ui/react'
import React from 'react'
import MainView from '../components/MainView'
import Navbar from '../components/Navbar'
import SideBar from '../components/SideBar'
import {GET_USER_PROFILES} from '../graphql/profile/getUserProfile'
import { useQuery } from '@apollo/client'
import {GET_USER_PUBLICATIONS} from '../graphql/publication/getUserPublication'
import {EXPLORE_SONGS} from '../graphql/publication/getSongs'
import AudioPlayer from '../components/AudioPlayer'

export default function Home() {
  const userId = "0x41cd"
  const {data: userProfile, loading : isUserProfileLoading, error: isUserProfileError} = useQuery(GET_USER_PROFILES, {
    variables : {
      request : {
        profileId : userId
      }
    }
  })

   const {data: songs, loading : isSongsLoading, error : isSongsError} = useQuery(EXPLORE_SONGS)
  
   console.log("user publication", songs)
  // console.log("the user profile", userProfile)
  return (
    <Box>
        <Navbar  />
        <Box display='flex'>
          <Box w="20%" bgColor="blackAlpha.900" h="86vh" borderRight="1px" borderColor="cyan"
           overflowY="scroll" sx={{
            '&::-webkit-scrollbar': {
              display: "none",
              '-ms-overflow-style' : "none"
            },
       }}
          >
            <SideBar />
          </Box>
          <Box p={3} w="77%">
            <MainView songs = {songs} isloadig = {isSongsLoading} isError = {isSongsError} />
          </Box>

        </Box>
        <Box w="100%" h={100} bgColor="red.700" position="fixed" top="85vh">
          <AudioPlayer  />
          </Box>
    </Box>
  )
}
