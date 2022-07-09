import { inject } from 'vue'

export const useStore = () => ({
  imageStore: inject('image-store'),
  videoStore: inject('video-store'),
  alertStore: inject('alert-store'),
})
