import { Box, Heading, HStack, Input, Text, Textarea } from '@chakra-ui/react'
import React, {useState} from 'react'
import { AiOutlineClose, AiOutlineComment, AiOutlineGlobal, AiOutlineQuestionCircle, AiOutlineRetweet, AiOutlineTag } from 'react-icons/ai'
import { HiOutlineUsers } from 'react-icons/hi'
import useCreatePost from '../graphql/publication/uploadNewSongTypedData'
import { useMoralis } from 'react-moralis'

import {} from 'react-icons/ai'
// description,albumName, tags, trackCover, mediaURI, trackName, mycollectModule, postRefrence, thePostModule, getPostRefrenceModule 
export default function CreatePostStepThree({
  postRefrence,  setpostRefrence,  selectedTags,
  setselectedTags,  postDescription, albumName,  postTags,
  albumCover, postURI, trackName ,  selectedPostModule,
  collectLimit ,  selectedCurrency,   postPermission,  postPrice, referalFee
}) {
  const [addTag, setaddTag] = useState("")
const {account} = useMoralis()
const parsedReferral = parseFloat(referalFee)

    // add tags 
  const addNewTag = (event) => {
    if(event.key === "Enter" && addTag !== "" && selectedTags.length < 5){
      setselectedTags([...selectedTags, addTag])
      setaddTag("")
     
   }
   }
     //Remove  tag
   const removeTag = (index) => {
    setselectedTags([...selectedTags.filter(tags => selectedTags.indexOf(tags) !== index)])
   }
   
   

  return (
    <Box>
        <Box display="flex" alignItems="center" mb={3} >
         <AiOutlineRetweet  />
        <Heading size="sm" ml={2}>Select who can  mirror</Heading>
        </Box>
    <Box>
    <Box w="100%" h={45} border="1px" borderColor="gray.300" borderRadius={7} p={1} cursor="pointer" onClick={() => setpostRefrence(false)}> 
            <Box w={220} display="flex" justifyContent="space-between" p={1} alignItems="center" mb={0}>
              <AiOutlineGlobal />
               <Text fontWeight="semibold">Everyone Can Mirror</Text>
                
            <AiOutlineQuestionCircle />
           
           </Box>
   
          </Box>

          <Box w="100%" h={45} border="1px" borderColor="gray.300" borderRadius={7} p={1} mt={4} cursor="pointer" onClick={() => setpostRefrence(true)}> 
            <Box w={250} display="flex" justifyContent="space-between" p={1} alignItems="center" mb={0}>
              <HiOutlineUsers />
               <Text fontWeight="semibold">Only Followers Can Mirror</Text>
                
            <AiOutlineQuestionCircle />
           
           </Box>
   
          </Box>

    </Box>
    <Box mt={7}>
    <Box display="flex" alignItems="center" mb={3} >
         <AiOutlineTag  />
        <Heading size="sm" ml={2}>Add Tags </Heading>
        </Box>

       <Box w="100%" h={92} border="1px" borderColor="gray.400" borderRadius={8} p={3} display="flex" flexWrap="wrap">
         {selectedTags.map((item, i) => {

          return(
            <ul key={i} style={{marginBottom : "5px", }}>
              <li style={{listStyleType: "none", marginLeft: "5px",
               display: "flex", backgroundColor: "blue", alignItems: "center",
              padding: "4px", borderRadius: "4px"
            }}>{item}
                <AiOutlineClose  cursor="pointer"  onClick={() => removeTag(i)}/>
              </li>
             </ul>
          )
         })}
        <input  type="text" value={addTag} onChange={e => setaddTag(e.target.value)} placeholder="Press Enter To Add Tag"  style={{
          borderRadius:"5px", outline: "none", backgroundColor: "black", marginLeft : "10px"
        }}      onKeyUp={event => addNewTag(event)}     />
       </Box>
    </Box>

    </Box>
  )
}
