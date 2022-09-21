import {gql} from '@apollo/client'
import {apolloClient} from '../Authentication/apoloClient'
import useSignIn from '../Authentication/useSignIn'
import {signText, signedTypeData, splitSignature} from '../../ether-service'
import {v4 as uuidv4} from 'uuid'
import { useMoralis,  useMoralisFile} from 'react-moralis'
import { lensHub } from '../../lens-hub'


const CREATE_POST_TYPED_DATA = `
  mutation($request: CreatePublicPostRequest!) { 
    createPostTypedData(request: $request) {
      id
      expiresAt
      typedData {
        types {
          PostWithSig {
            name
            type
          }
        }
      domain {
        name
        chainId
        version
        verifyingContract
      }
      value {
        nonce
        deadline
        profileId
        contentURI
        collectModule
        collectModuleInitData
        referenceModule
        referenceModuleInitData
      }
    }
  }
}
`;

//TODO typings
const createPostTypedData = (createPostTypedDataRequest) => {
  return apolloClient.mutate({
    mutation: gql(CREATE_POST_TYPED_DATA),
    variables: {
      request: createPostTypedDataRequest,
    },
  });
};

const  useCreatePost = () => {
    const {saveFile, isUploading, moralisFile, error: uploadingError} = useMoralisFile()
  const {account, isInitialized, isAuthenticated, Moralis, user} = useMoralis()
  const  thePrfId =  "0x41cd"                      //user?.attributes.lensProfileId
   
  const {signIn} = useSignIn()
  const createPost = async (description,albumName, tags, trackCover, mediaURI, trackName, getPostModules, getPostRefrenceModule) => {
         //Initialize  post  metadata
         if(!thePrfId){
            alert("connect  your  profile first")
         }
        
    const metadata = {
          version: '2.0.0',
          // version : '1.0.0',
          metadata_id: uuidv4(),
          description: description,
          content: albumName,
          locale : "en-US",
         tags : tags,
           mainContentFocus :  'AUDIO',
           external_url: null,
          image: trackCover,
          imageMimeType: "image/jpeg",
          name: albumName,
          attributes: [],
          media: [
             {
            item:mediaURI,    
             type: 'audio/mpeg',
             altTag: trackName,
             cover : trackCover
            },
          ],
         
          //animation_url : "",
          appId: 'audios',
        }

        
          const  ipfsResult = await saveFile(
            "mypost.json",
            {base64: btoa(JSON.stringify(metadata))},
            {
              type : "base64",
              saveIPFS : true
            }
          )
        console.log("post ipfs hash", ipfsResult._ipfs)

      

        const createPostRequest = {
            profileId: thePrfId,
            contentURI: ipfsResult._ipfs,
              collectModule : getPostModules(),
               referenceModule: getPostRefrenceModule()
             }
           try{
        const result = await createPostTypedData(createPostRequest)
        const typedData = result.data.createPostTypedData.typedData;
        const signature = await signedTypeData(typedData.domain, typedData.types, typedData.value);
        const { v, r, s } = splitSignature(signature);

        const tx = await lensHub.postWithSig({
          profileId: typedData.value.profileId,
          contentURI:typedData.value.contentURI,
          collectModule: typedData.value.collectModule,
          collectModuleInitData: typedData.value.collectModuleInitData,
          referenceModule: typedData.value.referenceModule,
          referenceModuleInitData: typedData.value.referenceModuleInitData,
          sig: {
            v,
            r,
            s,
            deadline: typedData.value.deadline,
          },
        });
        console.log(tx.hash);
        // 0x64464dc0de5aac614a82dfd946fc0e17105ff6ed177b7d677ddb88ec772c52d3
        // you can look at how to know when its been indexed here: 
        //   - https://docs.lens.dev/docs/has-transaction-been-indexed
        }catch (error)  {
          console.log(error)
        }
          
        
        
       

    
   
      
}
return {createPost}
}

export default useCreatePost





