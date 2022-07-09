import { tauri } from '@tauri-apps/api'

const loadFile = (filename: string) => {
  return tauri.convertFileSrc(filename)
}

export default loadFile
