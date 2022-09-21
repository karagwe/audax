import React from 'react'
import {Box} from '@chakra-ui/react'
import Home from './Home'
import  {Route, Routes, Link}  from 'react-router-dom'
import AlbumPage from '../pages/AlbumPage'
import UserPage from '../pages/UserPage'
export default function MainView({songs, isLoading, isError}) {
  return (
    <Box >
      <Routes>
       <Route   path='/' element = { <Home songs = {songs} isLoading = {isLoading} isError = {isError} />}  />
       <Route    path='/music/:id' element = {<AlbumPage  /> }   />
        <Route    path='/artist/:id'    element={<UserPage  />}         />
      </Routes>
    </Box>
  )
}
