const isImage = (value: string) =>
  /\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(value)
export default isImage
