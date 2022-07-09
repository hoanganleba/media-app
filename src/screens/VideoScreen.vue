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

  <div
    class="relative flex items-center w-full h-full duration-300 ease-in-out transform-gpu"
  >
    <video-control-bar
      :disabledButton="videos.length === 0"
      :isPlay="isPlay"
      :isHovered="isHovered"
      @handleToggleOpenPreview="open"
      @handlePlayPause="handlePlayPause"
    />

    <div class="w-auto h-full mx-auto" ref="videoContainer">
      <video
        class="w-auto h-full"
        ref="video"
        controls
        @click="playing = !playing"
        :src="loadFile(selectedVideo)"
        v-if="selectedVideo"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import AppPreviewSideBar from "../components/AppPreviewSideBar.vue";
import AppPreviewSideBarItem from "../components/AppPreviewSideBarItem.vue";
import VideoControlBar from "../components/Videos/VideoControlBar.vue";
import loadFile from "../utils/tauri/loadFile";
import { useStore } from "../store/useStore";
import { OnClickOutside } from "@vueuse/components";
import usePreviewSideBar from "../services/usePreviewSideBar";
import usePlayPause from "../services/usePlayPause";
import {
  useMediaControls,
  useElementHover,
  useIdle,
  onKeyStroke,
  useMagicKeys,
} from "@vueuse/core";
import { ref, watch } from "vue";
import { useRouter } from "vue-router";

const store = useStore();
const router = useRouter();

const { setAlertActive } = store.alertStore as any;
const { isOpenPreview, open, close } = usePreviewSideBar();
const { isPlay, play, pause } = usePlayPause();
const {
  selectedVideo,
  currentIndex,
  videos,
  scrollTo,
  getMoreVideos,
  selectVideo,
  openVideoFolder,
} = store.videoStore as any;

const { openImageFolder } = store.imageStore as any;

const video = ref<HTMLVideoElement>();
const videoContainer = ref();
let isHovered = useElementHover(videoContainer);

const { idle } = useIdle(1000);

watch(idle, (newVal) => {
  if (newVal) {
    isHovered.value = false;
  } else {
    isHovered.value = true;
  }
});

let src;
watch(selectedVideo, (newValue) => {
  src = newValue;
});
const { playing } = useMediaControls(video, {
  src,
});
const _openVideoFolder = () => {
  openVideoFolder(
    () => {},
    () => {
      setAlertActive(true, "No video was found!");
    }
  );
};

const _openImageFolder = () => {
  openImageFolder(
    () => {
      router.push("/images");
    },
    () => {
      setAlertActive(true, "No image was found!");
    }
  );
};

const handlePlayPause = () => {
  playing.value = !playing.value;
  playing.value ? play() : pause();
};

onKeyStroke(" ", () => {
  handlePlayPause();
});

const { Meta_O, Meta_I } = useMagicKeys();

watch(Meta_O, () => {
  _openImageFolder();
});

watch(Meta_I, () => {
  _openVideoFolder();
});
</script>
