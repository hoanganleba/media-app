<template>
  <div
    :class="{ 'opacity-100': props.isHovered, 'opacity-0': !props.isHovered }"
    class="absolute z-10 flex items-center duration-300 -translate-x-1/2 hover:opacity-100 bottom-20 left-1/2 bg-macos-sidebar/50 dark:bg-macos-sidebarDark/50 transform-gpu bg-blend-overlay backdrop-blur-xl rounded-xl"
  >
    <play-pause-button
      :isPlay="props.isPlay"
      @click="emit('handlePlayPause')"
    />
    <div
      class="mr-5 text-xs font-semibold cursor-default text-macos-text dark:text-macos-textDark"
    >
      {{ convertHMS(props.currentTime) }}
    </div>
    <div
      ref="progressbarContainer"
      @mousedown="() => (isProgressChangeable = true)"
      @mouseup="() => (isProgressChangeable = false)"
      @mouseleave="() => (isProgressChangeable = false)"
      @mousemove="changeValue"
      @click="_changeValue"
      class="h-2.5 rounded-full w-96 bg-macos-sidebar dark:bg-macos-sidebarDark"
    >
      <div
        ref="progressbarValue"
        class="w-0 h-full rounded-full bg-macos-primary"
      ></div>
    </div>
    <div
      class="ml-5 text-xs font-semibold cursor-default text-macos-text dark:text-macos-textDark"
    >
      {{ convertHMS(props.duration) }}
    </div>
    <on-click-outside @trigger="() => (showVolumeSetting = false)">
      <volume-button
        @click="() => (showVolumeSetting = true)"
        :volume="props.volume"
      />
      <div
        :class="{ invisible: !showVolumeSetting, visible: showVolumeSetting }"
        class="absolute flex text-sm origin-top rotate-180 px-2.5 py-3 rounded-lg cursor-pointer right-3 text-macos-text dark:text-macos-textDark bg-macos-sidebar/50 dark:bg-macos-sidebarDark/50 bg-blend-overlay backdrop-blur-xl -bottom-16"
      >
        <div
          ref="volumeContainer"
          @mousedown="() => (isVolumeChangeable = true)"
          @mouseleave="() => (isVolumeChangeable = false)"
          @mouseup="() => (isVolumeChangeable = false)"
          @mousemove="changeVolumeValue"
          @click="_changeVolumeValue"
          class="w-2.5 rounded-full h-28 bg-macos-sidebar dark:bg-macos-sidebarDark"
        >
          <div
            ref="volumeValue"
            class="w-full h-0 rounded-full bg-macos-primary"
          ></div>
        </div>
      </div>
    </on-click-outside>
  </div>
</template>

<script setup lang="ts">
import PlayPauseButton from '../Buttons/PlayPauseButton.vue'
import VolumeButton from '../Buttons/VolumeButton.vue'
import convertHMS from '../../utils/convertHMS'
import { watch, ref, onMounted } from 'vue'
import { OnClickOutside } from '@vueuse/components'

const props = defineProps<{
  isPlay: boolean
  isHovered: boolean
  duration: any
  currentTime: any
  volume: number
}>()
const emit = defineEmits<{
  (e: 'handlePlayPause'): void
  (e: 'handleChangeValue', value: any): void
  (e: 'handleChangeVolumeValue', value: any): void
}>()
const progressbarContainer = ref<any>()
const progressbarValue = ref<any>()
const volumeContainer = ref<any>()
const volumeValue = ref<any>()
const isProgressChangeable = ref<boolean>(false)
const isVolumeChangeable = ref<boolean>(false)

const showVolumeSetting = ref<boolean>(false)

watch(
  () => props.currentTime,
  (newVal) => {
    progressbarValue.value.style.width =
      (newVal * progressbarContainer.value.offsetWidth) / props.duration + 'px'
  }
)

onMounted(() => {
  volumeValue.value.style.height = props.volume * 100 + '%'
})

watch(
  () => props.volume,
  (newVal) => {
    volumeValue.value.style.height = newVal * 100 + '%'
  }
)

const changeValue = (event: any) => {
  if (isProgressChangeable.value) {
    emit(
      'handleChangeValue',
      (event.offsetX * props.duration) / progressbarContainer.value.offsetWidth
    )
  }
}

const _changeValue = (event: any) => {
  emit(
    'handleChangeValue',
    (event.offsetX * props.duration) / progressbarContainer.value.offsetWidth
  )
}

const changeVolumeValue = (event: any) => {
  if (isVolumeChangeable.value) {
    emit(
      'handleChangeVolumeValue',
      parseFloat(
        (event.offsetY / volumeContainer.value.offsetHeight).toFixed(5)
      )
    )
  }
}

const _changeVolumeValue = (event: any) => {
  emit(
    'handleChangeVolumeValue',
    parseFloat((event.offsetY / volumeContainer.value.offsetHeight).toFixed(5))
  )
}
</script>
