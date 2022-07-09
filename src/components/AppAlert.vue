<template>
  <div class="absolute left-0 right-0 z-50 top-16" v-if="alertActive">
    <div class="flex justify-center">
      <div class="flex p-4 text-sm bg-red-600 rounded text-red-50" role="alert">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="inline w-5 h-5 mr-3 feather feather-alert-circle"
        >
          <circle cx="12" cy="12" r="10"></circle>
          <line x1="12" y1="8" x2="12" y2="12"></line>
          <line x1="12" y1="16" x2="12.01" y2="16"></line>
        </svg>
        <div class="mr-2">
          <span class="font-medium">{{ alertMessage }}</span> Please try again.
        </div>
        <button
          @click="setAlertActive(false, '')"
          type="button"
          class="ml-auto -mx-1.5 -my-1.5 bg-red-600 text-red-50 rounded focus:ring-2 focus:ring-red-400 p-1.5 hover:bg-red-500 inline-flex h-8 w-8"
          aria-label="Close"
        >
          <span class="sr-only">Dismiss</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="feather feather-x"
          >
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useStore } from "../store/useStore";

const store = useStore();

const { alertActive, alertMessage, setAlertActive } = store.alertStore as any;
</script>
