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

   const  skipBack  =  () =>  {
    if(globalState.currentIndexSong.get() > 0){
      globalState.currentIndexSong.set(globalState.currentIndexSong.get() -1)
      globalState.audioRef.get([1]).play()
    }
     console.log("I'm  clicked")
   }

  

  return {playIt, pauseIt, skipBack }
}
export default useControls