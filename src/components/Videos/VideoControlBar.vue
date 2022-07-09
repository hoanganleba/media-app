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
  </div>
</template>

<script setup lang="ts">
import ToggleOpenPreviewButton from "../Buttons/ToggleOpenPreviewButton.vue";
import PlayPauseButton from "../Buttons/PlayPauseButton.vue";

const props = defineProps<{
  disabledButton: boolean;
  isPlay: boolean;
  isHovered: boolean;
}>();
const emit = defineEmits<{
  (e: "handlePlayPause"): void;
  (e: "handleToggleOpenPreview"): void;
}>();
</script>
