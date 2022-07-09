import chunk from '../utils/chunk'
import isImage from '../utils/isImage'
import { dialog, fs } from '@tauri-apps/api'
import { ref } from 'vue'

const useImage = () => {
  const selectedImage = ref<string>('')
  const currentIndex = ref<number>(0)
  const images = ref<any[]>([])
  const imagesQueue = ref<any[][]>([])
  const numOfImages = ref<number>(0)
  const scrollTo = ref<number>(0)

  const reset = () => {
    images.value = []
    imagesQueue.value = []
    selectedImage.value = ''
    currentIndex.value = 0
    numOfImages.value = 0
  }

  const openImageFolder = async (
    onSuccess?: () => void,
    onError?: () => void
  ) => {
    const data = (await dialog.open({
      directory: true,
    })) as string

    if (data !== null) {
      const folderData = await fs.readDir(data)
      const imagesResult = folderData
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
            isImage(fileName.path) && fileName.name.split('')[0] !== '.'
        )
      if (imagesResult.length === 0) {
        onError?.()
      } else {
        reset()
        numOfImages.value = imagesResult.length
        imagesQueue.value = chunk(imagesResult, 4)
        images.value.push(...imagesQueue.value[0])
        imagesQueue.value.shift()
        selectedImage.value = images.value[0].path
        onSuccess?.()
      }
    }
  }

  const getMoreImages = () => {
    if (imagesQueue.value.length !== 0) {
      images.value.push(...imagesQueue.value[0])
      imagesQueue.value.shift()
    }
  }

  const handleNextImage = () => {
    if (currentIndex.value < numOfImages.value - 1) {
      currentIndex.value += 1
      scrollTo.value =
        document.getElementById(currentIndex.value.toString())!.offsetTop - 100
      if (
        currentIndex.value === images.value.length - 1 &&
        imagesQueue.value.length !== 0
      ) {
        images.value.push(...imagesQueue.value[0])
        imagesQueue.value.shift()
      }
    }
    selectedImage.value = images.value[currentIndex.value].path
  }

  const handlePrevImage = () => {
    if (currentIndex.value > 0 && images.value.length > 0) {
      currentIndex.value -= 1
      scrollTo.value =
        document.getElementById(currentIndex.value.toString())!.offsetTop - 100
      selectedImage.value = images.value[currentIndex.value].path
    }
  }

  const selectImage = (index: number, image: string) => {
    selectedImage.value = image
    currentIndex.value = index
  }

  return {
    selectedImage,
    currentIndex,
    images,
    imagesQueue,
    numOfImages,
    scrollTo,
    openImageFolder,
    getMoreImages,
    handleNextImage,
    handlePrevImage,
    selectImage,
  }
}

export default useImage
