import {gql} from '@apollo/client'
import {apolloClient} from '../Authentication/apoloClient'
import useSignIn from '../Authentication/useSignIn'
import {signText, signedTypeData, splitSignature} from '../../ether-service'
import {v4 as uuidv4} from 'uuid'
import { useMoralis,  useMoralisFile} from 'react-moralis'
import { lensHub } from '../../lens-hub'

const ADD_REACTION = gql`
  mutation($request: ReactionRequest!) { 
   addReaction(request: $request)
 }
`;

const addReactionRequest = (profileId, reaction, publicationId) => {
    return apolloClient.mutate({
      mutation: gql(ADD_REACTION),
      variables: {
        request: {
          profileId,
          reaction,
          publicationId,
        },
      },
    });
  };

  export const likeTrack = async  (profileId, reaction, publicationId) => {
    try{
        await addReactionRequest(profileId, reaction, publicationId)
    }catch (error){
       alert(error.message)
    }
  } 