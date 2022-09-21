import React from 'react'
import {Box} from "@chakra-ui/react"
import { GET_MUSIC } from '../graphql/publication/getSong'
import { GET_TRACK_MODULE } from '../graphql/publication/getSongMudule'
import { useQuery } from '@apollo/client'

export default function TrackInfo({trackId}) {
    const {data: track, loading : isTrackLoading, error: isTrackLoadingError} = useQuery(GET_TRACK_MODULE, {
        variables : {
          request : {
            publicationId: trackId
             
          }
        }
      })

        console.log("the  track id is  here ", track)
  return (
    <Box>
        I'm  track  ifo {trackId}
    </Box>
  )
}
