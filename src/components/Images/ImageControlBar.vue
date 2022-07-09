<template>
  <div
    :class="{ 'opacity-100': props.isHovered, 'opacity-0': !props.isHovered }"
    class="absolute z-10 flex duration-300 -translate-x-1/2 hover:opacity-100 bottom-20 left-1/2 bg-macos-sidebar/50 dark:bg-macos-sidebarDark/50 transform-gpu bg-blend-overlay backdrop-blur-xl rounded-xl"
  >
    <toggle-open-preview-button
      :disabled="disabledButton"
      @click="emit('handleToggleOpenPreview')"
    />
    <play-pause-button
      :disabled="disabledButton"
      :isPlay="props.isPlay"
      @click="emit('handlePlayPause')"
    />
    <rotate-left-button :disabled="disabledButton" @click="emit('handleRotateLeft')" />
    <rotate-right-button :disabled="disabledButton" @click="emit('handleRotateRight')" />
    <zoom-in-button :disabled="disabledButton" @click="emit('handleZoomIn')" />
    <zoom-out-button :disabled="disabledButton" @click="emit('handleZoomOut')" />
  </div>
</template>

<script setup lang="ts">
import ToggleOpenPreviewButton from "../Buttons/ToggleOpenPreviewButton.vue";
import RotateLeftButton from "../Buttons/RotateLeftButton.vue";
import RotateRightButton from "../Buttons/RotateRightButton.vue";
import ZoomInButton from "../Buttons/ZoomInButton.vue";
import ZoomOutButton from "../Buttons/ZoomOutButton.vue";
import PlayPauseButton from "../Buttons/PlayPauseButton.vue";

const props = defineProps<{
  disabledButton: boolean;
  isPlay: boolean;
  isHovered: boolean;
}>();
const emit = defineEmits<{
  (e: "handleZoomOut"): void;
  (e: "handleZoomIn"): void;
  (e: "handleRotateRight"): void;
  (e: "handleRotateLeft"): void;
  (e: "handlePlayPause"): void;
  (e: "handleToggleOpenPreview"): void;
}>();
</script>
