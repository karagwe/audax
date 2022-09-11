import { useState as usestate } from "@hookstate/core";
import store from "../store";

const useControls = () => {
 const globalState = usestate(store)

  const playIt = ( theAudRef,index, song,) => {
    globalState.audioRef.set(theAudRef.current[index])
    globalState.currentIndexSong.set(index)
    globalState.audioRef.get([0]).pause()
    
    globalState.currentPlayingSong.set(song)
    globalState.audioRef.get().play()
    globalState.isPlaying.set(true)
    console.log("pumped")

  }
  
   const pauseIt = () => {
     globalState.audioRef.get().pause()
     globalState.isPlaying.set(false)
   }

   const handlConsole = () => {
    console.log("hellow  there")
   }

  

  return {playIt, pauseIt, handlConsole}
}
export default useControls