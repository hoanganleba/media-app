<template>
  <app-layout>
    <app-alert />
    <router-view />
  </app-layout>
</template>

<script setup lang="ts">
import AppLayout from "./components/AppLayout.vue";
import AppAlert from "./components/AppAlert.vue";
import createStore from "./store/createStore";
import { useIdle } from "@vueuse/core";
import { watch } from "vue";

const { idle } = useIdle(1000);

watch(idle, (newVal) => {
  if (newVal) {
    document.documentElement.classList.add("cursor-none");
  } else {
    document.documentElement.classList.remove("cursor-none");
  }
});

createStore();
</script>
