import { Ref, ref } from 'vue'

interface Options {
  onDoneProgress: () => void
}

const useProgress = (
  progressbar: Ref<HTMLDivElement | undefined>,
  options?: Options
) => {
  const progressbarIntervalId = ref<ReturnType<typeof setTimeout>>()
  const progressbarWidth = ref<number>(0)
  const interval = ref(150)

  const progressbarFrame = () => {
    if (progressbarWidth.value >= 100) {
      progressbarWidth.value = 0
      options?.onDoneProgress()
    } else {
      progressbarWidth.value += 1
      progressbar.value!.style.width = progressbarWidth.value + '%'
    }
  }

  const start = () => {
    progressbarIntervalId.value = setInterval(progressbarFrame, interval.value)
  }

  const remove = () => {
    clearInterval(progressbarIntervalId.value)
    progressbarWidth.value = 0
    progressbar.value!.style.width = progressbarWidth.value + '%'
  }

  return { interval, start, remove }
}

export default useProgress
