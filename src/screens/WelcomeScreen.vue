<template>
  <div class="py-20 px-12">
    <h1
      class="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600"
    >
      Welcome to Media Viewer
    </h1>
    <div class="inline-block mt-8 w-fit">
      <open-folder-button
        class="bg-macos-sidebar/50 rounded-xl w-fit"
        @click="_openImageFolder"
      />
      <p class="text-macos-text text-sm mt-2.5">Open Image</p>
    </div>
    <div class="inline-block mt-8 ml-12 w-fit">
      <open-folder-button
        class="bg-macos-sidebar/50 rounded-xl w-fit"
        @click="_openVideoFolder"
      />
      <p class="text-macos-text text-sm mt-2.5">Open Video</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useMagicKeys } from "@vueuse/core";
import { watch } from "vue";
import { useRouter } from "vue-router";
import OpenFolderButton from "../components/Buttons/OpenFolderButton.vue";
import { useStore } from "../store/useStore";
const router = useRouter();
const store = useStore();
const { openImageFolder } = store.imageStore as any;
const { openVideoFolder } = store.videoStore as any;
const { setAlertActive } = store.alertStore as any;

const _openImageFolder = () => {
  openImageFolder(
    () => {
      router.push("/images");
    },
    () => {
      setAlertActive(true, "No images were found");
    }
  );
};

const _openVideoFolder = () => {
  openVideoFolder(
    () => {
      router.push("/videos");
    },
    () => {
      setAlertActive(true, "No videos were found!");
    }
  );
};

const { Meta_O, Meta_I } = useMagicKeys();

watch(Meta_O, () => {
  _openImageFolder();
});

watch(Meta_I, () => {
  _openVideoFolder();
});
</script>
