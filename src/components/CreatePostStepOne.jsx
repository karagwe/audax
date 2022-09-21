import { Box, Button, Input, Textarea, Text, Tooltip, Spinner, Circle } from '@chakra-ui/react'
import React, {useState, useRef, useEffect} from 'react'
import { AiOutlineCloudUpload, AiOutlinePlus } from 'react-icons/ai'
import { BsCheck2Circle } from 'react-icons/bs'
import { truncateString } from '../hooks/useSubstring'
export default function CreatePostStepOne({postDescription, 
     setDescription,
     albumName, setAlbumName,
     trackName, setTrackName, 
     handleUploadAudCover,
     handleUploadAudToIpfs,
     isAudioUploading, isAudioUploadingError,
     coverUploading, coverUploadingError, handleConsole,  albumCover, selectedSongs,
     setselectedSongs,  setcoverUploadingError,  setisAudioUploadingError,
     albumArray, setalbumArray
  
  }) {
  const [selectedAudion, setselectedAudio] = useState([])
  const [selctedPhoto, setselctedPhoto] = useState([])
  const [test, settest] = useState(true)
  const [addNew, setaddNew] = useState(false)

   const selectAudRef = useRef()
   const slectPhotoRef = useRef()

     const addAnothorAud = () => {
       //setselectedSongs(!selectedSongs)
        setalbumArray()

     }
     const selectePhoto = () => {
      slectPhotoRef.current.click()
     }

     const selectAudio = () => {
       selectAudRef.current.click()
     }
    // console.log(selctedPhoto)
    useEffect(() => {
      getUploadAudio()
      getUploadTheCover()
    }, [albumCover, selectedSongs])
    
     const uploadNewAudio = async (audio) => {
      
        await handleUploadAudToIpfs(audio)
        // setalbumArray([{...albumArray, "item" : selectedSongs, "type" : "audio/mpeg", " altTag" : trackName, "cover": albumCover}])
         setaddNew(true)
     }
     const getUploadAudio = () => {
      
        if(isAudioUploading) {
          return(
            <Box w="100%" h={150} border="1px" borderColor="gray.400" borderRadius={8}  display="flex" flexDirection="column" alignItems="center" justifyContent="center">
            <Spinner
            thickness='7px'
            speed='0.85s'
            emptyColor='gray.200'
            color='blackAlpha.500'
            size='xl'
  
            />
            </Box>
          )
        }   else if(isAudioUploadingError) {
          return(
          <Box w="100%" h={150} border="1px" borderColor="gray.400" borderRadius={8}  display="flex" flexDirection="column" alignItems="center" justifyContent="center">
              <Text>Something went wrong</Text>
               <Text>Refresh  and  try  again</Text>
               <Button onClick={() => setisAudioUploadingError(false)} color="blackAlpha.800" mt={4}>Try again </Button>
            </Box>
          )
        } else if(selectedSongs.length > 0 && addNew){
          return(
            <Box w="100%" h={150} border="1px" borderColor="gray.400" borderRadius={8}  display="flex" flexDirection="column" alignItems="center" justifyContent="center">
            <Circle size={63} bgColor="skyblue">
               <BsCheck2Circle  size={45} color="black"/>
            </Circle>
            <Button leftIcon={<AiOutlinePlus />} color="blackAlpha.900" w={180} mt={4} onClick= {() => setaddNew(false)}>Add more</Button>
          </Box>

          )
        }  else {
          return(
            <Box w="100%" h={150} border="1px" borderColor="gray.400" borderRadius={8}  display="flex" flexDirection="column" alignItems="center" justifyContent="center">
           <input type="file" ref={selectAudRef}  onChange={e => setselectedAudio(e.target.files[0])} multiple ={false} hidden accept=".mp3"/>
         <Text>{selectedAudion?.name}</Text>  
        <Button onClick={ selectAudio }  variant="outline">Select File</Button>
        <Button leftIcon={<AiOutlineCloudUpload />} onClick={() => uploadNewAudio(selectedAudion)}   mt={6} w={170} color="blackAlpha.900">Upload file</Button>
          </Box>
          )
        }
     }

     const getUploadTheCover = () => {
       if(coverUploading){
        return(
          <Box w="100%" h={150} border="1px" borderColor="gray.400" borderRadius={8}  display="flex" flexDirection="column" alignItems="center" justifyContent="center">
          <Spinner
          thickness='7px'
          speed='0.85s'
          emptyColor='gray.200'
          color='blackAlpha.500'
          size='xl'

          />
          </Box>
        )
       } else if(coverUploadingError){
        return(
        <Box w="100%" h={150} border="1px" borderColor="gray.400" borderRadius={8}  display="flex" flexDirection="column" alignItems="center" justifyContent="center">
        <Text>Something  Wrong  occured</Text>
         <Button onClick={() => setcoverUploadingError(false)} color="blackAlpha.800" mt={5}>Try again </Button>
      </Box>
        )
       } else if(albumCover){
        return(
          <Box w="100%" h={150} border="1px" borderColor="gray.400" borderRadius={8}  display="flex" flexDirection="column" alignItems="center" justifyContent="center">
          <Circle size={63} bgColor="skyblue">
               <BsCheck2Circle  size={45} color="black"/>
            </Circle>
        </Box>
        )
       } else {
        return(
          <Box w="100%" h={150} border="1px" borderColor="gray.400" borderRadius={8}  display="flex" flexDirection="column" alignItems="center" justifyContent="center">
           <input type="file" ref={slectPhotoRef}  onChange={e => setselctedPhoto(e.target.files[0])} multiple ={false} hidden accept="image/jpeg"/>
          <Text>{selctedPhoto?.name}</Text>
         <Button onClick={ selectePhoto}  variant="outline">Select File</Button>
         <Button onClick={() =>  handleUploadAudCover(selctedPhoto)} color="blackAlpha.900" mt={6} w={170} leftIcon={<AiOutlineCloudUpload />} >Upload file</Button>
        </Box>
        )
       }
     }
  return (
    <Box bgColor="blackAlpha.900" color="whiteAlpha.900">
      <Text>{postDescription}</Text>
      <Input  placeholder='Album Name ' mb={3} value={albumName} onChange={e => setAlbumName(e.target.value)}/>
      <Input  placeholder='Track Name ' mb={3} value={trackName}onChange={e => setTrackName(e.target.value)} />
       <Textarea   placeholder='Description' mb={3} draggable = "false" value={postDescription} onChange={e => setDescription(e.target.value)} />
       <Text fontSize="sm" ml={3}>Album Cover</Text>
        {albumCover}
            {getUploadTheCover()}
        <Text ml={3} mt={3}>Audio  File </Text>
        
        {getUploadAudio()}
    </Box>
  )
}

{/*  

<Box w="100%" h={150} border="1px" borderColor="gray.400" borderRadius={8}  display="flex" flexDirection="column" alignItems="center" justifyContent="center">
          {isAudioUploading ?(
           <Text>is uploading </Text>
       
          ) : (
          <>
           <input type="file" ref={selectAudRef}  onChange={e => setselectedAudio(e.target.files[0])} multiple ={false} hidden accept=".mp3"/>
         <Text>{selectedAudion.name}</Text>  
        <Button onClick={ selectAudio }  variant="outline">Select File</Button>
        <Button leftIcon={<AiOutlineCloudUpload />} onClick={() => handleUploadAudToIpfs(selectedAudion)}   mt={6} w={170} color="blackAlpha.900">Upload file</Button>
          </>
          )}
        </Box>

         <Box w="100%" h={150} border="1px dashed" borderColor="gray.400" borderRadius={8} display="flex" flexDirection="column" alignItems="center" justifyContent="center">
          {coverUploading ?(
          <Text>photo is uploading</Text>
          ) : (
            <>
        <input type="file" ref={slectPhotoRef}  onChange={e => setselctedPhoto(e.target.files[0])} multiple ={false} hidden accept="image/png"/>
          <Text>{selctedPhoto.name}</Text>
         <Button onClick={ selectePhoto}  variant="outline">Select File</Button>
         <Button onClick={() =>  handleUploadAudCover(selctedPhoto)} color="blackAlpha.900" mt={6} w={170} leftIcon={<AiOutlineCloudUpload />} >Upload file</Button>
         </>
          )}
        </Box>

*/}