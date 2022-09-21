import React, {useState} from 'react'
import { Box, Circle, HStack, Text, shouldForwardProp, chakra, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Button } from '@chakra-ui/react'
import { GiPillDrop } from 'react-icons/gi'
import { AiOutlineHome, AiOutlinePlus } from 'react-icons/ai'
import { BsSearch, BsTags } from 'react-icons/bs'
import { CgMediaPodcast } from 'react-icons/cg'
import { motion, isValidMotionProp } from 'framer-motion'
import { MdNewReleases } from 'react-icons/md'
import { VscLibrary } from 'react-icons/vsc'
import {} from 'react-icons/ai'
import CreatePostStepTwo from './CreatePostStepTwo'
import CreatePostThree from './CreatePostStepThree'
import useCreatePost from '../graphql/publication/uploadNewSongTypedData'
import { HiOutlineDocument } from 'react-icons/hi'
import CreatePostStepOne from './CreatePostStepOne'
import CreateFeeBasedPostStep from './CreateFeeBasedPostStep'
import CreateGatedPostStep from './CreateGatedPostStep'
import LimitedFeeCollectPos from './LimitedFeeCollectPos'
import {useMoralis, useMoralisFile} from 'react-moralis'
import useGetPostModules from '../hooks/useGetModules'
const OptionBox = chakra(motion.div, {
    shouldForwardProp: (prop) => isValidMotionProp(prop) || shouldForwardProp(prop),
  });
export default function SideBar() {
  const [isCreatePostModal, setisCreatePostModal] = useState(false)
  const [postDescription, setpostDescription] = useState("")
  const [postName, setpostName] = useState("")
  const [selectedFilesURI, setselectedFilesURI] = useState("")
  const [audioName, setaudioName] = useState("")
  const [postCoverURI, setpostCoverURI] = useState("")
  const [selectedPostModule, setselectedPostModule] = useState("freeCollectModule")
  const [selectedCurrency, setselectedCurrency] = useState("0x9c3C9283D3e44854697Cd22D3Faa240Cfb032889")
  const [postRefrence, setpostRefrence] = useState(false)
  const [postPrice, setpostPrice] = useState("")
  const [referalFee, setreferalFee] = useState("")
  const [selectedTags, setselectedTags] = useState([])
  const [isCollectFeePage, setisCollectFeePage] = useState(false)
  const [isLimitedFeeCellectPage, setisLimitedFeeCellectPage] = useState(false)
  const [isGatedPostModal, setisGatedPostModal] = useState(false)
  const [coverUploading, setcoverUploading] = useState(false)
  const [coverUploadingError, setcoverUploadingError] = useState(false)
  const [isAudioUploading, setisAudioUploading] = useState(false)
  const [isAudioUploadingError, setisAudioUploadingError] = useState(false)
  const [gateContractAddress, setgateContractAddress] = useState("")
  const [gateChain, setgateChain] = useState("")
  const [postPermission, setpostPermission] = useState(false)
  const [collectLimit, setcollectLimit] = useState("")
  const [postMedia, setpostMedia] = useState([])
   const [albumArray, setalbumArray] = useState([])
  const [page, setpage] = useState(0)

   const {account} = useMoralis()
   //const {saveFile, isUploading :coverUploading, error : coverUploadingError} = useMoralisFile()
   const { saveFile, isUploading, error } = useMoralisFile()
   const parsedReferral = parseFloat(referalFee)
  const handleUploadAudToIpfs = async (postFile) => {
    try{
      setisAudioUploading(true)
    const result = await saveFile("postMedia", postFile, { saveIPFS: true });
      setselectedFilesURI( result.ipfs())
      setisAudioUploading(false)
      console.log(result.ipfs())
      //return result
    } catch (error) {
      setisAudioUploading(false)
      setisAudioUploadingError(true)
      
    }
  }

    console.log("arry  of  musics ", albumArray)

  const handleUploadAudCover = async (postFile) => {
    try{
      setcoverUploading(true)
    const result = await saveFile("postMedia", postFile, { saveIPFS: true });
    setpostCoverURI(result.ipfs())
    console.log(result.ipfs)
    setcoverUploading(false)
      } catch (error) {
        setcoverUploading(false)
      setcoverUploadingError(true)
    }
  }

  

   console.log("selected post module", postMedia)
   console.log("the post audio uri", selectedFilesURI)
  
const toggleIsCollectFeePage = () => {
  isCollectFeePage ? setisCollectFeePage(false) : setisCollectFeePage(true)
    setisCreatePostModal(false)
}

const goBackToPage = () => {
  setisCollectFeePage(false)
  setisCreatePostModal(true)
}

const swithFromLimitedFeeToPage = () => {
  setisLimitedFeeCellectPage(false)
  setisCreatePostModal(true)
}

const swithFromGatedPostModal = () => {
  setisGatedPostModal(false)
  setisCreatePostModal(true)
}

const toggleIsGatedPostModal = () => {
  isGatedPostModal ? setisGatedPostModal(false) : setisGatedPostModal(true)
  setisCreatePostModal(false)
}

const toggleIsLimitedFeeCollect = () => {
  isLimitedFeeCellectPage? setisLimitedFeeCellectPage(false) : setisLimitedFeeCellectPage(true)
  setisCreatePostModal(false)
}
    const  nextPage = () => {
      if(page < 3 -1){
        setpage(page +1)
      }
    }

    const goPrev = () => {
      if(page > 0){
        setpage(page -1)
      }
    }

        // function  to  choose  a collect  module 
const getPostModules = () => {
  if(selectedPostModule === "freeCollectModule"){
      const collectModule  = {
        freeCollectModule : {
          followerOnly : postPermission
       }
      }
      return collectModule
  }else if(selectedPostModule === "feeCollectModule"){
   const  collectModule  = {
      feeCollectModule : {
        amount: {
          currency : selectedCurrency,
           value : postPrice,
        },
        recipient : account,
        referralFee : parsedReferral,
        followerOnly : postPermission,

      }
    }

    return collectModule  
  }else if(selectedPostModule  === "limitedFeeCollectModule"){
    const collectModule = {
      limitedFeeCollectModule : {
        collectLimit : collectLimit,
        amount: {
          currency : selectedCurrency,
           value : postPrice,
        },
        recipient : account,
        referralFee : parsedReferral,
        followerOnly : postPermission,
      }
    }
    return collectModule
  }else if(selectedPostModule === "limitedTimedFeeCollectModule"){
    const collectModule = {
      limitedTimedFeeCollectModule : {
        collectLimit : collectLimit,
        amount: {
          currency : selectedCurrency,
           value : postPrice,
        },
        recipient : account,
        referralFee : parsedReferral,
        followerOnly : postPermission,
      }
    }
    return collectModule
  }else if(selectedPostModule  === "timedFeeCollectModule"){
    const collectModule = {
      timedFeeCollectModule : {
        amount: {
          currency : selectedCurrency,
           value : postPrice,
        },
        recipient : account,
        referralFee : parsedReferral,
        followerOnly : postPermission,

      }
    }
    return collectModule
  }
}

  // GET_REFRENCE MODULE

    const getPostRefrenceModule = () => {
      if(postRefrence  === "true"){
        const referenceModule = {
          followerOnlyReferenceModule : true,
        }
         return referenceModule
      }else if(postRefrence === "false"){
        const referenceModule = {
         followerOnlyReferenceModule : false,
            }
        return referenceModule
      }
      }
        const {createPost} = useCreatePost()
        const createNewAlbum = async (description,albumName, tags, trackCover, mediaURI, trackName, getPostModule, getRefrenceModule) => {
           await  createPost(description,albumName, tags, trackCover, mediaURI, trackName, getPostModule, getRefrenceModule)
          }
        
      const pageSteps = () => {
        if(page  === 0) {
          return(
            <CreatePostStepOne  postDescription = {postDescription} setDescription ={setpostDescription} 
              albumName = {postName} setAlbumName = {setpostName } selectedSongs ={selectedFilesURI}
               setselectedSongs = {setselectedFilesURI} trackName = {audioName} setTrackName = {setaudioName}
              albumCover = {postCoverURI} setAlbumCover ={setpostCoverURI} toggleIsLimitedFeeCollect = {toggleIsLimitedFeeCollect}
              handleUploadAudCover = {handleUploadAudCover} handleUploadAudToIpfs = {handleUploadAudToIpfs}
              isAudioUploading = {isAudioUploading} isAudioUploadingError = {isAudioUploadingError}
              coverUploading ={coverUploading} coverUploadingError = {coverUploadingError}
               setcoverUploadingError = {setcoverUploadingError} setisAudioUploadingError = {setisAudioUploadingError}
                albumArray = {albumArray}  setalbumArray =  {setalbumArray}

            />
          )
        }else if (page === 1) {
          return(
            <CreatePostStepTwo  toggleIsCollectFeePage = {toggleIsCollectFeePage}
              toggleIsLimitedFeeCollect = {toggleIsLimitedFeeCollect}
              toggleIsGatedPostModal = {toggleIsGatedPostModal} selectedPostModule = {selectedPostModule}
              setselectedPostModule = {setselectedPostModule} collectLimit = {collectLimit}
               setcollectLimit = {setcollectLimit} 
            />
          )
        }else if(page === 2) {
          return(
            <CreatePostThree postRefrence = {postRefrence} 
              setpostRefrence = {setpostRefrence} 
              selectedTags = {selectedTags}
              setselectedTags = {setselectedTags}  
              postDescription = {postDescription} albumName = {postName}
               albumCover = {postCoverURI}
              postURI = {selectedFilesURI} trackName = {audioName}
              selectedPostModule = {selectedPostModule} selectedCurrency = {selectedCurrency}
              collectLimit = {collectLimit} postPermission = {postPermission}
              postPrice = {postPrice} referalFee = {referalFee}
            />
          )
        } 
      }
    

    const openCreatePostModal = () => {
        setisCreatePostModal(true)
    }

    const closeCreatePostModal = () => {
      setisCreatePostModal(false)
    }
  return (
   <Box padding={2} >
     <HStack spacing={4} mb={1}>
    <Circle size={70} bgColor="blackAlpha.700" cursor="pointer" >
        <GiPillDrop size={55}/>
    </Circle>
    <Text>Audax</Text>
    </HStack>
    {/*MODAL  FOR  LIMITED  FREE GATED POSTS */}
    <Modal isOpen={isGatedPostModal} onClose={toggleIsGatedPostModal} size="xl" scrollBehavior='outside'>
      <ModalOverlay  bgColor="whiteAlpha.800"/>
      <ModalContent>
        <ModalHeader bgColor="blackAlpha.900" color="whiteAlpha.900" borderTopRadius={8}>Select collect module</ModalHeader>
        <ModalCloseButton />
        <ModalBody bgColor="blackAlpha.900" color="whiteAlpha.900" >

          <CreateGatedPostStep    swithFromGatedPostModal = {swithFromGatedPostModal} 
            gateContractAddress = {gateContractAddress} setgateContractAddress = {setgateContractAddress}
             gateChain = {gateChain} setgateChain = {setgateChain}
          />
        </ModalBody>
        <ModalFooter bgColor="blackAlpha.900" color="whiteAlpha.900" borderBottomRadius={8}></ModalFooter>
      </ModalContent>
     </Modal>
     {/*MODAL  FOR  LIMITED  FEE MODULE */}
     <Modal isOpen={isLimitedFeeCellectPage} onClose={toggleIsLimitedFeeCollect} size="xl" scrollBehavior='outside'>
      <ModalOverlay  bgColor="whiteAlpha.800"/>
      <ModalContent>
        <ModalHeader bgColor="blackAlpha.900" color="whiteAlpha.900" borderTopRadius={8}>Select collect module</ModalHeader>
        <ModalCloseButton />
        <ModalBody bgColor="blackAlpha.900" color="whiteAlpha.900" >

          <LimitedFeeCollectPos   swithFromLimitedFeeToPage = {swithFromLimitedFeeToPage}  
           selectedCurrency = {selectedCurrency} setselectedCurrency ={setselectedCurrency}
           postPrice = {postPrice} setpostPrice = {setpostPrice} 
           referalFee = {referalFee} setreferalFee = {setreferalFee}
            postPermission = {postPermission} setpostPermission = {setpostPermission}
            collectLimit = {collectLimit} setcollectLimit = {setcollectLimit}
          />
        </ModalBody>
        <ModalFooter bgColor="blackAlpha.900" color="whiteAlpha.900" borderBottomRadius={8}></ModalFooter>
      </ModalContent>
     </Modal>
    {/*MODAL  TO  ADD  POST  FEES  INFORMATION  */}
     <Modal isOpen={isCollectFeePage} onClose={toggleIsCollectFeePage} size="xl" scrollBehavior='outside'>
      <ModalOverlay  bgColor="whiteAlpha.800"/>
      <ModalContent>
        <ModalHeader bgColor="blackAlpha.900" color="whiteAlpha.900" borderTopRadius={8}>Select collect module</ModalHeader>
        <ModalCloseButton />
        <ModalBody bgColor="blackAlpha.900" color="whiteAlpha.900" >

          <CreateFeeBasedPostStep  goBackToPage ={goBackToPage}
            selectedCurrency = {selectedCurrency} setselectedCurrency ={setselectedCurrency}
             postPrice = {postPrice} setpostPrice = {setpostPrice} 
             referalFee = {referalFee} setreferalFee = {setreferalFee}
              postPermission = {postPermission} setpostPermission = {setpostPermission}
          
          />
        </ModalBody>
        <ModalFooter bgColor="blackAlpha.900" color="whiteAlpha.900" borderBottomRadius={8}></ModalFooter>
      </ModalContent>
     </Modal>
     {/*CREATE POST  MODAL */}
     <Modal isOpen={isCreatePostModal} onClose={closeCreatePostModal} isCentered size="xl" scrollBehavior='outside' >
     <ModalOverlay   bgColor="whiteAlpha.800" />
      <ModalContent>
        <ModalHeader bgColor="blackAlpha.900" color="whiteAlpha.900" borderTopRadius={8}> Upload  you  music   </ModalHeader>
        <ModalCloseButton  bgColor="blackAlpha.800" color="whiteAlpha.900"/>
        <ModalBody bgColor="blackAlpha.900" color="whiteAlpha.900"  >
         {pageSteps()}
        </ModalBody>
         <ModalFooter bgColor="blackAlpha.900" color="whiteAlpha.900"  borderBottomRadius={8}>
          <Button onClick={goPrev} color="black" mr={4} w={100}>Prev </Button>
          {page === 2? (
            <Button leftIcon={<AiOutlinePlus />} onClick={() => createNewAlbum(
               postDescription, postName, selectedTags, postCoverURI, selectedFilesURI,
                audioName, getPostModules, getPostRefrenceModule
            )} color="black"  w={170} >Create Post </Button>
          ): (
            <Button onClick={nextPage} color="black"  w={100}> Next </Button>
          )}
         </ModalFooter>
      </ModalContent>
     </Modal>
    <Box display="flex" w={130}  alignItems="center" justifyContent="space-between" cursor='pointer' mb={5}>
        <OptionBox 
         w="100%"
         display="flex"
         px={4} py={1}
         justifyContent="space-between"
           whileHover={{
            scale: 1.1
           }}
             >
     <AiOutlineHome  size={29}/>
      <Text fontSize="lg" fontWeight="semibold">Home</Text>
      </OptionBox>
    </Box>

    <Box display="flex" w={130}  alignItems="center" justifyContent="space-between" cursor='pointer' mb={5}>
        <OptionBox 
         w="100%"
         display="flex"
         px={4} py={1}
         justifyContent="space-between"
           whileHover={{
            scale: 1.1
           }}
             >
      <BsSearch size={25}/>
      <Text fontSize="lg" fontWeight="semibold">Search</Text>
      </OptionBox>
    </Box>

    <Box display="flex" w={145}  alignItems="center" justifyContent="space-between" cursor='pointer' mb={5}>
        <OptionBox 
         w="100%"
         display="flex"
         px={4} py={1}
         justifyContent="space-between"
           whileHover={{
            scale: 1.1
           }}
             >
      <CgMediaPodcast size={29}/>
      <Text fontSize="lg" fontWeight="semibold">Podcasts</Text>
      </OptionBox>
    </Box>

    <Box display="flex" w={130}  alignItems="center" justifyContent="space-between" cursor='pointer' mb={5}>
        <OptionBox 
         w="100%"
         display="flex"
         px={4} py={1}
         justifyContent="space-between"
           whileHover={{
            scale: 1.1
           }}
             >
      <BsTags  size={25} />
      <Text fontSize="lg" fontWeight="semibold">Genres</Text>
      </OptionBox>
    </Box>

    <Box display="flex" w={180}  alignItems="center" justifyContent="space-between" cursor='pointer' mb={5}>
        <OptionBox 
         w="100%"
         display="flex"
         px={4} py={1}
         justifyContent="space-between"
           whileHover={{
            scale: 1.1
           }}
             >
      <MdNewReleases size={25}/>
      <Text fontSize="lg" fontWeight="semibold">New Releases</Text>
      </OptionBox>
    </Box>

    <Box display="flex" w={165}  alignItems="center" justifyContent="space-between" cursor='pointer' mb={5}>
        <OptionBox 
         w="100%"
         display="flex"
         px={4} py={1}
         justifyContent="space-between"
           whileHover={{
            scale: 1.1
           }}
             >
      <VscLibrary size={25}/>
      <Text fontSize="lg" fontWeight="semibold">Your Library</Text>
      </OptionBox>
    </Box>
     
    <Box display="flex" w={130}  alignItems="center" justifyContent="space-between" cursor='pointer' mb={5} onClick={openCreatePostModal}>
        <OptionBox 
         w="100%"
         display="flex"
         px={4} py={1}
         justifyContent="space-between"
           whileHover={{
            scale: 1.1
           }}
             >
      <AiOutlinePlus  size={25}/>
      <Text fontSize="lg" fontWeight="semibold">Upload </Text>
      </OptionBox>
    </Box>

    <Box display="flex" w={120}  alignItems="center" justifyContent="space-between" cursor='pointer' mb={5} mt={15} >
        <OptionBox 
         w="100%"
         display="flex"
         px={4} py={1}
         justifyContent="space-between"
           whileHover={{
            scale: 1.1
           }}
             >
       <HiOutlineDocument size={29}/>
      <Text fontSize="lg" fontWeight="semibold">Docs</Text>
      </OptionBox>
    </Box>

  

   

    
   </Box>
  )
}
