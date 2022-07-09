import { provide } from 'vue'
import useImage from '../services/useImage'
import useVideo from '../services/useVideo'
import useAlert from '../services/useAlert'
import useProgressSpeed from '../services/useProgressSpeed'

const createStore = () => {
  provide('image-store', useImage())
  provide('video-store', useVideo())
  provide('alert-store', useAlert())
  provide('progress-speed-store', useProgressSpeed())
}

export default createStore
