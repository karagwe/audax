import React from 'react'
import {Box} from '@chakra-ui/react'
import Home from './Home'
export default function MainView({songs, isLoading, isError}) {
  return (
    <Box >
      <Home songs = {songs} isLoading = {isLoading} isError = {isError} />
    </Box>
  )
}
