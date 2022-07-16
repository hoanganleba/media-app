<template>
  <div
    ref="progressbar"
    class="absolute top-0 left-0 right-0 z-50 w-0 h-1.5 duration-300 bg-macos-primary transition-gpu"
  ></div>

  <on-click-outside @trigger="close">
    <app-preview-side-bar
      :scrollTo="scrollTo"
      :isOpenPreview="isOpenPreview"
      @scrollEnd="getMoreImages"
    >
      <app-preview-side-bar-item
        @click="_selectImage(index, item.path)"
        v-for="(item, index) in images"
        :key="index"
        :id="index"
        :active="currentIndex === index"
        :src="loadFile(item.path)"
        :label="item.name"
      />
    </app-preview-side-bar>
  </on-click-outside>

  <div
    class="flex items-center w-full h-full overflow-hidden duration-300 ease-in-out transform-gpu"
  >
    <prev-slide-button
      :class="{ 'left-8': !isOpenPreview, 'left-[16rem]': isOpenPreview }"
      class="absolute z-10 duration-300 -translate-y-1/2 opacity-0 bg-macos-sidebar/50 dark:bg-macos-sidebarDark/50 bg-blend-overlay backdrop-blur-xl rounded-xl top-1/2 hover:opacity-100 transform-gpu"
      @click="
        () => {
          handlePrevImage()
          reset()
        }
      "
    />

    <next-slide-button
      class="absolute z-10 duration-300 -translate-y-1/2 opacity-0 bg-macos-sidebar/50 dark:bg-macos-sidebarDark/50 bg-blend-overlay backdrop-blur-xl rounded-xl top-1/2 right-8 hover:opacity-100 transform-gpu"
      @click="
        () => {
          handleNextImage()
          reset()
        }
      "
    />

    <image-control-bar
      :isPlay="isPlay"
      :isHovered="isHovered"
      @handleToggleOpenPreview="open"
      @handleZoomIn="zoomIn"
      @handleZoomOut="zoomOut"
      @handlePlayPause="handlePlayPause"
      @handleRotateLeft="rotateLeft"
      @handleRotateRight="rotateRight"
    />

    <div class="h-full mx-auto w-fit" ref="imageContainer">
      <img
        ref="image"
        draggable="false"
        @dblclick="reset"
        class="object-scale-down w-auto h-full duration-300 ease-in-out select-none transform-gpu"
        v-if="selectedImage"
        :src="loadFile(selectedImage)"
        :alt="selectedImage"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { OnClickOutside } from '@vueuse/components'
import ImageControlBar from '../components/Images/ImageControlBar.vue'
import AppPreviewSideBar from '../components/AppPreviewSideBar.vue'
import AppPreviewSideBarItem from '../components/AppPreviewSideBarItem.vue'
import PrevSlideButton from '../components/Buttons/PrevSlideButton.vue'
import NextSlideButton from '../components/Buttons/NextSlideButton.vue'
import loadFile from '../utils/tauri/loadFile'

import usePreviewSideBar from '../services/usePreviewSideBar'
import usePlayPause from '../services/usePlayPause'
import useProgress from '../services/useProgress'
import useControlImage from '../services/useControlImage'
import {
  onKeyStroke,
  useElementHover,
  useIdle,
  useMagicKeys,
} from '@vueuse/core'
import { useStore } from '../store/useStore'
import { useRouter } from 'vue-router'

const store = useStore()
const router = useRouter()
const { setAlertActive } = store.alertStore as any

const image = ref<HTMLImageElement>()
const imageContainer = ref()
const progressbar = ref<HTMLDivElement>()

const { isOpenPreview, open, close, toggleOpenPreview } = usePreviewSideBar()
const { isPlay, pause, handlePlayPauseEvent } = usePlayPause()
const { zoomIn, zoomOut, rotateLeft, rotateRight, reset } =
  useControlImage(image)
const {
  selectedImage,
  currentIndex,
  images,
  numOfImages,
  scrollTo,
  openImageFolder,
  getMoreImages,
  handleNextImage,
  handlePrevImage,
  selectImage,
} = store.imageStore as any

const { openVideoFolder } = store.videoStore as any

const _selectImage = (index: any, path: any) => {
  selectImage(index, path)
  reset()
  pause()
  remove()
}

let isHovered = useElementHover(imageContainer)

const { idle } = useIdle(1000)

watch(idle, (newVal) => {
  if (newVal) {
    isHovered.value = false
  } else {
    isHovered.value = true
  }
})

const { interval, start, remove } = useProgress(progressbar, {
  onDoneProgress: () => {
    reset()
    handleNextImage()
  },
})

watch(currentIndex, () => {
  if (currentIndex.value === numOfImages.value - 1) {
    pause()
    remove()
  }
})

const { speed } = store.progressSpeedStore as any

watch(speed, (newVal) => {
  ;(interval.value as any) = newVal
})

onKeyStroke('ArrowRight', () => {
  handleNextImage()
  reset()
  isHovered.value = false
})

onKeyStroke('ArrowLeft', () => {
  handlePrevImage()
  reset()
  isHovered.value = false
})

onKeyStroke('ArrowUp', () => {
  zoomIn()
  isHovered.value = false
})

onKeyStroke('ArrowDown', () => {
  zoomOut()
  isHovered.value = false
})

const _openImageFolder = () => {
  openImageFolder(
    () => {},
    () => {
      setAlertActive(true, 'No image was found!')
    }
  )
}

const _openVideoFolder = () => {
  openVideoFolder(
    () => {
      router.push('/videos')
    },
    () => {
      setAlertActive(true, 'No video was found!')
    }
  )
}

const handlePlayPause = () => {
  if (currentIndex.value === numOfImages.value - 1) {
    pause()
    remove()
  } else {
    handlePlayPauseEvent(start, remove)
  }
}

onKeyStroke(' ', () => {
  handlePlayPause()
  isHovered.value = false
})

onKeyStroke('Tab', () => {
  toggleOpenPreview()
  isHovered.value = false
})

const { Meta_O, Meta_I } = useMagicKeys()

watch(Meta_O, () => {
  _openImageFolder()
})

watch(Meta_I, () => {
  _openVideoFolder()
})
</script>
