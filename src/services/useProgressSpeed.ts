import { ref } from 'vue'

const useProgressSpeed = () => {
  const speed = ref(150)

  const setSpeed = (value: number) => {
    speed.value = value
  }
  return { speed, setSpeed }
}

export default useProgressSpeed
