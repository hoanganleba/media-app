import { ref } from 'vue'

const useAlert = () => {
  const alertActive = ref<boolean>(false)
  const alertMessage = ref<string>('')

  const setAlertActive = (value: boolean, message: string) => {
    alertActive.value = value
    alertMessage.value = message
  }

  return { alertActive, alertMessage, setAlertActive }
}

export default useAlert
