import { ref, Ref } from 'vue'

const useControlImage = (image: Ref<HTMLImageElement | undefined>) => {
  const deg = ref<number>(0)
  const scale = ref<number>(1)

  const zoomIn = () => {
    scale.value += 0.5
    scale.value = Math.min(Math.max(0.5, scale.value), 6)
    image.value!.style.transform = `scale(${scale.value}) rotate(${deg.value}deg)`
  }

  const zoomOut = () => {
    scale.value -= 0.5
    scale.value = Math.min(Math.max(0.5, scale.value), 6)
    image.value!.style.transform = `scale(${scale.value}) rotate(${deg.value}deg)`
  }

  const rotateRight = () => {
    deg.value += 90
    image.value!.style.transform = `rotate(${deg.value}deg) scale(${scale.value})`
  }

  const rotateLeft = () => {
    deg.value -= 90
    image.value!.style.transform = `rotate(${deg.value}deg) scale(${scale.value})`
  }

  const reset = () => {
    scale.value = 1
    deg.value = 0
    image.value!.style.transform = `rotate(${deg.value}deg) scale(${scale.value})`
  }

  return { zoomIn, zoomOut, rotateLeft, rotateRight, reset }
}

export default useControlImage
