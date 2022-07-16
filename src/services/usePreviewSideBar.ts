import { ref } from 'vue'

const usePreviewSideBar = () => {
  const isOpenPreview = ref<boolean>(false)

  const open = () => {
    isOpenPreview.value = true
  }

  const close = () => {
    isOpenPreview.value = false
  }

  const toggleOpenPreview = () => {
    isOpenPreview.value = !isOpenPreview.value
  }

  return { isOpenPreview, toggleOpenPreview, open, close }
}

export default usePreviewSideBar
