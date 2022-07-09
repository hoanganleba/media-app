<template>
  <base-button>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      :class="{ hidden: props.isPlay === false }"
      class="feather feather-pause"
    >
      <rect x="6" y="4" width="4" height="16"></rect>
      <rect x="14" y="4" width="4" height="16"></rect>
    </svg>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      :class="{ hidden: props.isPlay === true }"
      class="feather feather-play"
    >
      <polygon points="5 3 19 12 5 21 5 3"></polygon>
    </svg>
  </base-button>
</template>

<script setup lang="ts">
import BaseButton from "./BaseButton.vue";

const props = defineProps<{ isPlay?: boolean }>();
</script>
