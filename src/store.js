import {createState} from '@hookstate/core'


const store = createState({
    audioRef : '',
    isPlaying: false,
    currentPlayingSong : {},
    currentIndexSong : 0,
    currentSongState : {},
})

export default store