const isVideo = (value: string) =>
  /\.(mp4|wmv|avi|mkv|ogg)$/.test(value);
export default isVideo
