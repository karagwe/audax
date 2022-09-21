import { Avatar, Box, Button, Heading, HStack, Tab, TabList, TabPanel, TabPanels, Tabs, Text } from '@chakra-ui/react'
import React from 'react'
import { BioCover } from '../StyledComponent'
import { AiOutlineUserAdd } from 'react-icons/ai'
import {GET_PROFILE_ID} from '../graphql/profile/getProfileId'
import { useQuery } from '@apollo/client'
import { useMoralis } from 'react-moralis'
import { useParams } from 'react-router-dom'
import {GET_USER_PROFILES} from '../graphql/profile/getUserProfile'
export default function UserPage() {
   const {id} = useParams()
   const {account} = useMoralis()
   /*const {data: userProfileId, loading : isUserProfileIdLoading, error: isUserProfileIdError} = useQuery(GET_PROFILE_ID, {
      variables : {
        request : {
          ownedBy : [account]
        }
      }
    })*/
   // console.log("user  profile  from profile page ", userProfileId)

    const {data: userProfile, loading : isUserProfileLoading, error: isUserProfileError} = useQuery(GET_USER_PROFILES, {
      variables : {
        request : {
          profileId : id
        }
      }
    })

    console.log("the  user  profile ", userProfile)
  return (
     <Box>
      

        
         
          <Box display="flex">
        <Box w={250}>
         
        <Avatar size={100} src={userProfile?.profile.picture.original.url} />
         
         </Box>
          <Box ml={10}>
         

            
            <Heading>{userProfile?.profile.handle}</Heading>
             <Box mt={10}>
                <Text w="60%" fontSize={18} mb={6}>{userProfile?.profile.bio || "user  bio  will be  displayed  here   "}</Text>

                <Box mt={6}>
                 <HStack spacing={6}>
                 <Box w={150} h={55} minW="150px"  bgColor="whiteAlpha.900"  color="blackAlpha.900"  border="1px" borderColor="whiteAlpha.600" borderRadius={8} display="flex" flexDirection="column" alignItems="center">
                    <Text textAlign="center" color="black" fontWeight="bold" fontSize={20}>Fans</Text>
                     <Text textAlign="center" fontWeight="black">{userProfile?.profile.stats.totalFollowers}</Text>
                </Box>

                <Box w={150} h={55} minW="150px"  bgColor="whiteAlpha.900"  color="blackAlpha.900"  border="1px" borderColor="whiteAlpha.600" borderRadius={8} display="flex" flexDirection="column" alignItems="center">
                    <Text textAlign="center" color="black" fontWeight="bold" fontSize={20}>Total Revenue</Text>
                     <Text textAlign="center" fontWeight="black">--</Text>
                </Box>
                <Box w={150} h={55} minW="150px"  bgColor="whiteAlpha.900"  color="blackAlpha.900"  border="1px" borderColor="whiteAlpha.600" borderRadius={8} display="flex" flexDirection="column" alignItems="center">
                    <Text textAlign="center" color="black" fontWeight="bold" fontSize={20}>Total Mirrors</Text>
                     <Text textAlign="center" fontWeight="black">{userProfile?.profile.stats.totalMirrors}</Text>
                </Box>

                <Button w={170} size="lg" color="blackAlpha.900" mt={7} leftIcon={<AiOutlineUserAdd />} >Follow</Button>
                 </HStack>
                 
                </Box>
             </Box>
          </Box>
            
       
        </Box>
         
         
         
        
       
         
         
       
         
       
        <Box mt={7} >
           <Tabs isFitted  colorScheme="cyan">
             <TabList>
                <Tab>Tracks</Tab>
                <Tab>Albums</Tab>
                <Tab>PlayLists</Tab>
                <Tab>Followers</Tab>
                <Tab>Following</Tab>
                <Tab>NFTs</Tab>
             </TabList>

             <TabPanels>
                <TabPanel>Here  we will add user  musics</TabPanel>
                <TabPanel>Here  we will add  user  albums</TabPanel>
                <TabPanel>here  we  will add  user  playlist</TabPanel>
                <TabPanel>here  we will add  user  followers</TabPanel>
                <TabPanel>here  we  will add  user  Following</TabPanel>
                <TabPanel>here  we will add  user  Nfts</TabPanel>
             </TabPanels>
           </Tabs>
        </Box>
     </Box>
  )
}
