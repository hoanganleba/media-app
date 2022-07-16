<template>
  <div
    ref="previewSidebar"
    :class="{
      'left-0': props.isOpenPreview,
      '-left-56': !props.isOpenPreview,
    }"
    class="absolute top-0 bottom-0 z-50 w-56 overflow-y-auto duration-300 bg-macos-sidebar/50 dark:bg-macos-sidebarDark/50 bg-blend-overlay backdrop-blur-xl transform-gpu"
  >
    <div class="m-6">
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import { useInfiniteScroll } from "@vueuse/core";
const previewSidebar = ref<HTMLDivElement>();

const emit = defineEmits<{
  (e: "scrollEnd"): void;
  (e: "onClickOutside"): void;
}>();

const props = defineProps<{ isOpenPreview: boolean; scrollTo: number }>();

watch(
  () => props.scrollTo,
  (value) => {
    previewSidebar.value!.scrollTo(0, value);
  }
);

useInfiniteScroll(previewSidebar, () => emit("scrollEnd"), { distance: 10 });
</script>
