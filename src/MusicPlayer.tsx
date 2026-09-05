import { useEffect, useRef, useState } from 'react'
import bareMinimum from './assets/songs/bare minimum.mp3'
import ecoutCherie from './assets/songs/Ecout Cherie.mp3'
import goldenBrown from './assets/songs/Golden Brown.mp3'
import loveStory from './assets/songs/Love Story .mp3'
import wannaBeYours from './assets/songs/Wanna Be Yours.mp3'
import sugar from './assets/songs/Sugar.mp3'

const songs = [
    { title: ': Love Story~', source: loveStory },
    { title: ': Golden Brown!', source: goldenBrown },
    { title: ': Bare Minimum :P', source: bareMinimum },
    { title: ': Ecout Cherie ><', source: ecoutCherie },
    { title: ': I Wanna Be Yours <3', source: wannaBeYours },
    { title: ': Sugar cuz you da sweetest!', source: sugar },
]

export function MusicPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null)
  const playlistStarted = useRef(false)
  const [songIndex, setSongIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)

  function playMusic() {
    playlistStarted.current = true
    void audioRef.current?.play().then(() => setIsPlaying(true)).catch(() => undefined)
  }

  useEffect(() => {
    function startMusic() {
      playMusic()
    }

    window.addEventListener('pointerdown', startMusic, { once: true })
    window.addEventListener('keydown', startMusic, { once: true })
    return () => {
      window.removeEventListener('pointerdown', startMusic)
      window.removeEventListener('keydown', startMusic)
    }
  }, [])

  useEffect(() => {
    if (playlistStarted.current) playMusic()
  }, [songIndex])

  function playNextSong() {
    playlistStarted.current = true
    setSongIndex((index) => (index + 1) % songs.length)
  }

  function updatePlayingState() {
    setIsPlaying(!audioRef.current?.paused)
  }

  const song = songs[songIndex]
  return (
    <div className="music-player">
      <audio
        ref={audioRef}
        src={song.source}
        onEnded={playNextSong}
        onPlay={updatePlayingState}
        onPause={updatePlayingState}
        preload="auto"
      />
      <button type="button" onClick={() => (isPlaying ? audioRef.current?.pause() : playMusic())}>
        {isPlaying ? 'Pause!' : 'Play music!'}
      </button>
      <span aria-live="polite">{song.title}</span>
    </div>
  )
}
