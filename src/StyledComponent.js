import styled from 'styled-components'


export const CardControls = styled.div`
 opacity: 0;
position: absolute;
 width: 194px;
 height: 194px;
 display: flex;
 align-items: center;
 justify-content: center;
 background-color: rgba(0,0,0,.5);
 top: 0;
 transition: all .9s ease;

 box-shadow: rgb(0, 0, 0) 0px 20px 30px -10px;

`
  export const  CardContainer = styled.div`
      width: 194;
      height: 194;
      position: relative;
      margin: 0 3px;
 
      &:hover ${CardControls}{
       opacity: 1;
      }  

`
export const ArtistImg =  styled.img`
  width: 200px;
  height: 200px;
  border-radius: 50%;
  object-fit: cover;

`
export const DivContainer  =  styled.div`

  
`
export const ListHeader =  styled.div`
  width: 95%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  
`
export const ListLeft =  styled.div`
  flex: 3;
  display: flex;
  align-items: center;
`
export const ListCenter = styled.div`
  flex: 2;
`
export const ListRight = styled.div`
  flex: 1;
`
export const  ListControls  =  styled.div`
position: absolute;
top: 20px;
background-color: black;

`

export const ListBody = styled.div`
width: 95%;
   cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 3px;

  &:hover{
    background-color: rgb(33,19,13, .9);
  }
  
`

export const MusicCoverImg =  styled.img`
  width: 250px;
  height: 280px;
  object-fit: cover;
  border-radius: 6px;

`






