import { ref } from 'vue'

const usePreviewSideBar = () => {
  const isOpenPreview = ref<boolean>(false)

  const open = () => {
    isOpenPreview.value = true
  }

  const close = () => {
    isOpenPreview.value = false
  }

  return { isOpenPreview, open, close }
}

export default usePreviewSideBar
