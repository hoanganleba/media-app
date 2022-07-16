<template>
  <div
    :class="{ 'opacity-100': props.isHovered, 'opacity-0': !props.isHovered }"
    class="absolute z-10 duration-300 -translate-x-1/2 hover:opacity-100 bottom-20 left-1/2 bg-macos-sidebar/50 dark:bg-macos-sidebarDark/50 transform-gpu bg-blend-overlay backdrop-blur-xl rounded-xl"
  >
    <div class="relative flex w-full">
      <toggle-open-preview-button @click="emit('handleToggleOpenPreview')" />
      <play-pause-button
        :isPlay="props.isPlay"
        @click="emit('handlePlayPause')"
      />
      <rotate-left-button @click="emit('handleRotateLeft')" />
      <rotate-right-button @click="emit('handleRotateRight')" />
      <zoom-in-button @click="emit('handleZoomIn')" />
      <zoom-out-button @click="emit('handleZoomOut')" />
      <on-click-outside @trigger="close">
        <more-button @click="toggleShowSpeedSetting" />
        <div
          v-if="showSpeedSetting"
          class="absolute right-0 grid gap-2 py-2 px-1.5 w-28 text-sm cursor-pointer rounded-lg text-macos-text dark:text-macos-textDark bg-macos-sidebar/50 dark:bg-macos-sidebarDark/50 bg-blend-overlay backdrop-blur-xl -top-[5.5rem]"
        >
          <div
            class="px-2 py-1 rounded-md"
            :class="{ 'bg-macos-primary text-macos-textDark': speed === 150 }"
            @click="_setSpeed(150)"
          >
            Normal
          </div>
          <div
            class="px-2 py-1 rounded-md"
            :class="{ 'bg-macos-primary text-macos-textDark': speed === 50 }"
            @click="_setSpeed(50)"
          >
            Fast
          </div>
        </div>
      </on-click-outside>
    </div>
  </div>
</template>

<script setup lang="ts">
import ToggleOpenPreviewButton from '../Buttons/ToggleOpenPreviewButton.vue'
import RotateLeftButton from '../Buttons/RotateLeftButton.vue'
import RotateRightButton from '../Buttons/RotateRightButton.vue'
import ZoomInButton from '../Buttons/ZoomInButton.vue'
import ZoomOutButton from '../Buttons/ZoomOutButton.vue'
import PlayPauseButton from '../Buttons/PlayPauseButton.vue'
import MoreButton from '../Buttons/MoreButton.vue'
import { useStore } from '../../store/useStore'
import { ref } from 'vue'
import { OnClickOutside } from '@vueuse/components'

const showSpeedSetting = ref<boolean>(false)

const store = useStore()
const { speed, setSpeed } = store.progressSpeedStore as any

const toggleShowSpeedSetting = () => {
  showSpeedSetting.value = !showSpeedSetting.value
}

const close = () => {
  showSpeedSetting.value = false
}

const _setSpeed = (value: any) => {
  setSpeed(value)
  showSpeedSetting.value = false
}

const props = defineProps<{
  isPlay: boolean
  isHovered: boolean
}>()
const emit = defineEmits<{
  (e: 'handleZoomOut'): void
  (e: 'handleZoomIn'): void
  (e: 'handleRotateRight'): void
  (e: 'handleRotateLeft'): void
  (e: 'handlePlayPause'): void
  (e: 'handleToggleOpenPreview'): void
}>()
</script>
