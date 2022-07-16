<template>
  <div class="mb-14">
    <div
      class="rounded-md p-1.5"
      :class="{
        'bg-macos-primary': props.active,
      }"
    >
      <img
        v-if="isImage(props.src)"
        draggable="false"
        class="w-full h-auto rounded select-none"
        :src="props.src"
      />
      <video class="pointer-events-none" v-if="isVideo(props.src)" :src="props.src"></video>
    </div>
    <p
      class="mt-3 text-xs text-center break-all text-macos-text dark:text-macos-textDark"
    >
      {{ props.label }}
    </p>
  </div>
</template>

<script setup lang="ts">
import isImage from "../utils/isImage";
import isVideo from "../utils/isVideo";
const props = defineProps<{
  active?: boolean;
  src: string;
  label: string;
}>();
</script>
