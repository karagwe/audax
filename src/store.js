import {createState} from '@hookstate/core'


const store = createState({
    audioRef : '',
    isPlaying: false,
    currentPlayingSong : {},
    currentIndexSong : 0,
    currentSongState : {},
    isAudioLoading :  false,
    isAudioReadyToPlay: false,
    currentPlayingModule : {},
    currentPlayingSongId : "",
    currentPlayingSongCreatorProfile : {},
    currentPlayingSongStats : {}
    
})

export default store