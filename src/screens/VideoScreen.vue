<template>
  <on-click-outside @trigger="close">
    <app-preview-side-bar
      :scrollTo="scrollTo"
      :isOpenPreview="isOpenPreview"
      @scrollEnd="getMoreVideos"
    >
      <app-preview-side-bar-item
        @click="selectVideo(index, item.path)"
        v-for="(item, index) in videos"
        :key="index"
        :id="index"
        :active="currentIndex === index"
        :src="loadFile(item.path)"
        :label="item.name"
      />
    </app-preview-side-bar>
  </on-click-outside>

  <div class="relative flex items-center w-full h-full">
    <video-control-bar
      :disabledButton="videos.length === 0"
      :isPlay="isPlay"
      :isHovered="isHovered"
      :duration="duration"
      :currentTime="currentTime"
      :volume="volume"
      @handleToggleOpenPreview="open"
      @handlePlayPause="handlePlayPause"
      @handleChangeValue="handleChangeValue"
      @handleChangeVolumeValue="handleChangeVolumeValue"
    />

    <div class="h-full mx-auto w-fit" ref="videoContainer">
      <video
        class="w-auto h-full pointer-events-none"
        ref="video"
        @click="playing = !playing"
        :src="loadFile(selectedVideo)"
        v-if="selectedVideo"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import AppPreviewSideBar from '../components/AppPreviewSideBar.vue'
import AppPreviewSideBarItem from '../components/AppPreviewSideBarItem.vue'
import VideoControlBar from '../components/Videos/VideoControlBar.vue'
import loadFile from '../utils/tauri/loadFile'
import { useStore } from '../store/useStore'
import { OnClickOutside } from '@vueuse/components'
import usePreviewSideBar from '../services/usePreviewSideBar'
import usePlayPause from '../services/usePlayPause'
import {
  useMediaControls,
  useElementHover,
  useIdle,
  onKeyStroke,
  useMagicKeys,
} from '@vueuse/core'
import { ref, watch } from 'vue'
import { useRouter } from 'vue-router'

const store = useStore()
const router = useRouter()

const { setAlertActive } = store.alertStore as any
const { isOpenPreview, open, close, toggleOpenPreview } = usePreviewSideBar()
const { isPlay, play, pause } = usePlayPause()
const {
  selectedVideo,
  currentIndex,
  videos,
  scrollTo,
  getMoreVideos,
  selectVideo,
  openVideoFolder,
  handleNextVideo,
} = store.videoStore as any

const { openImageFolder } = store.imageStore as any

const video = ref<HTMLVideoElement>()
const videoContainer = ref<any>()
let isHovered = useElementHover(videoContainer)

const { idle } = useIdle(1000)

watch(idle, (newVal) => {
  if (newVal) {
    isHovered.value = false
  } else {
    isHovered.value = true
  }
})

let src

watch(selectedVideo, (newValue) => {
  src = newValue
})

const { playing, currentTime, duration, ended, volume } = useMediaControls(
  video,
  {
    src,
  }
)

watch(playing, (newVal) => {
  newVal ? play() : pause()
})

watch(ended, (newVal) => {
  if (newVal) {
    pause()
    handleNextVideo()
  }
})

const handleChangeValue = (value: any) => {
  currentTime.value = value
}

const handleChangeVolumeValue = (value: any) => {
  volume.value = value
}

const _openVideoFolder = () => {
  openVideoFolder(
    () => {},
    () => {
      setAlertActive(true, 'No video was found!')
    }
  )
}

const _openImageFolder = () => {
  openImageFolder(
    () => {
      router.push('/images')
    },
    () => {
      setAlertActive(true, 'No image was found!')
    }
  )
}

const handlePlayPause = () => {
  playing.value = !playing.value
  playing.value ? play() : pause()
}

onKeyStroke(' ', () => {
  handlePlayPause()
  isHovered.value = false
})

const { Meta_O, Meta_I } = useMagicKeys()

watch(Meta_O, () => {
  _openImageFolder()
})

watch(Meta_I, () => {
  _openVideoFolder()
})

onKeyStroke('Tab', () => {
  toggleOpenPreview()
  isHovered.value = false
})
</script>
