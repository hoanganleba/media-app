const isVideo = (value: string) =>
  /\.(mp4|mov|wmv|avi|mkv|ogg)$/.test(value);
export default isVideo
