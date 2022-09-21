import { Box } from '@chakra-ui/react'
import React from 'react'
import MainView from '../components/MainView'
import Navbar from '../components/Navbar'
import SideBar from '../components/SideBar'
import {GET_USER_PROFILES} from '../graphql/profile/getUserProfile'
import { useQuery } from '@apollo/client'
import {GET_USER_PUBLICATIONS} from '../graphql/publication/getUserSongs'
import {EXPLORE_SONGS} from '../graphql/publication/getSongs'
import  {GET_PROFILE_ID} from '../graphql/profile/getProfileId'
import AudioPlayer from '../components/AudioPlayer'
import { useMoralis } from 'react-moralis'
import { useState, useEffect } from 'react'


export default function Home() {
  const [userAccIds, setuserAccIds] = useState([])
  const {account} = useMoralis()
  //const userId = "0x41cd"
  const {data: userProfileId, loading : isUserProfileIdLoading, error: isUserProfileIdError} = useQuery(GET_PROFILE_ID, {
    variables : {
      request : {
        ownedBy : account,
         limit: 1
      }
    }
  })

   
  

   const {data: songs, loading : isSongsLoading, error : isSongsError} = useQuery(EXPLORE_SONGS)
    useEffect(() => {
      setuserAccIds(userProfileId?.profiles.items[0])
    }, [userProfileId])
    
   console.log("user account  ids", userAccIds?.id)
  // console.log("the user profile", userProfile)
   
  return (
    <Box  h="100vh" w="100vw">
        <Navbar  />
      
        <Box display='flex'>
          <Box w="20%" bgColor="blackAlpha.900" h="76vh" borderRight="1px" borderColor="cyan"
           overflowY="scroll" sx={{
            '&::-webkit-scrollbar': {
              display: "none",
              '-ms-overflow-style' : "none"
            },
       }}
          >
            <SideBar />
          </Box>
          <Box p={3} w="80%" overflowY="scroll" h="76vh"
          sx={{
            '&::-webkit-scrollbar': {
              display: "none",
              '-ms-overflow-style' : "none"
            },
       }}
          >
            <MainView songs = {songs} isloadig = {isSongsLoading} isError = {isSongsError} />
          </Box>

        </Box>
        <Box w="100%" h={80}  position="fixed" top="85vh" >
          <AudioPlayer  profileId = {userAccIds?.id}/>
          </Box>
          
    </Box>
  )
}
