import { provide } from 'vue'
import useImage from '../services/useImage'
import useVideo from '../services/useVideo'
import useAlert from '../services/useAlert'

const createStore = () => {
  provide('image-store', useImage())
  provide('video-store', useVideo())
  provide('alert-store', useAlert())
}

export default createStore
