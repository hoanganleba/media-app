import { ref } from 'vue'

const usePlayPause = () => {
  const isPlay = ref<boolean>(false)

  const handlePlayPauseEvent = (
    onPlayCallback?: () => void,
    onPauseCallback?: () => void
  ) => {
    isPlay.value = !isPlay.value
    if (isPlay.value) {
      onPlayCallback?.()
    } else {
      onPauseCallback?.()
    }
  }

  const play = () => {
    isPlay.value = true
  }

  const pause = () => {
    isPlay.value = false
  }

  return { isPlay, play, pause, handlePlayPauseEvent }
}

export default usePlayPause
