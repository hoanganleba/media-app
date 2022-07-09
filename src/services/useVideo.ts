import chunk from '../utils/chunk'
import isVideo from '../utils/isVideo'
import { dialog, fs } from '@tauri-apps/api'
import { ref } from 'vue'

const useVideo = () => {
  const selectedVideo = ref<string>('')
  const currentIndex = ref<number>(0)
  const videos = ref<any[]>([])
  const videosQueue = ref<any[][]>([])
  const numOfVideos = ref<number>(0)
  const scrollTo = ref<number>(0)

  const reset = () => {
    videos.value = []
    videosQueue.value = []
    selectedVideo.value = ''
    currentIndex.value = 0
    numOfVideos.value = 0
  }

  const openVideoFolder = async (
    onSuccess?: () => void,
    onError?: () => void
  ) => {
    const data = (await dialog.open({
      directory: true,
    })) as string

    if (data !== null) {
      const folderData = await fs.readDir(data)
      const videosResult = folderData
        .sort((a: any, b: any) => {
          const nameA = a.name.toUpperCase()
          const nameB = b.name.toUpperCase()
          if (nameA < nameB) {
            return -1
          }
          if (nameA > nameB) {
            return 1
          }
          return 0
        })
        .filter(
          (fileName: any) =>
            isVideo(fileName.path) && fileName.name.split('')[0] !== '.'
        )
      if (videosResult.length === 0) {
        onError?.()
      } else {
        reset()
        numOfVideos.value = videosResult.length
        videosQueue.value = chunk(videosResult, 4)
        videos.value.push(...videosQueue.value[0])
        videosQueue.value.shift()
        selectedVideo.value = videos.value[0].path
        onSuccess?.()
      }
    }
  }

  const getMoreVideos = () => {
    if (videosQueue.value.length !== 0) {
      videos.value.push(...videosQueue.value[0])
      videosQueue.value.shift()
    }
  }

  const handleNextVideo = () => {
    if (currentIndex.value < numOfVideos.value - 1) {
      currentIndex.value += 1
      scrollTo.value =
        document.getElementById(currentIndex.value.toString())!.offsetTop - 100
      if (
        currentIndex.value === videos.value.length - 1 &&
        videosQueue.value.length !== 0
      ) {
        videos.value.push(...videosQueue.value[0])
        videosQueue.value.shift()
      }
    }
    selectedVideo.value = videos.value[currentIndex.value].path
  }

  const handlePrevVideo = () => {
    if (currentIndex.value > 0 && videos.value.length > 0) {
      currentIndex.value -= 1
      scrollTo.value =
        document.getElementById(currentIndex.value.toString())!.offsetTop - 100
      selectedVideo.value = videos.value[currentIndex.value].path
    }
  }

  const selectVideo = (index: number, video: string) => {
    selectedVideo.value = video
    currentIndex.value = index
  }

  return {
    selectedVideo,
    currentIndex,
    videos,
    videosQueue,
    numOfVideos,
    scrollTo,
    openVideoFolder,
    getMoreVideos,
    handleNextVideo,
    handlePrevVideo,
    selectVideo,
  }
}

export default useVideo
