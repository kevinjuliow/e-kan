import { PixelCrop } from 'react-image-crop'

const setCanvasImage = (image: HTMLImageElement, canvas: HTMLCanvasElement, crop: PixelCrop) => {
  const ctx = canvas.getContext("2d")
  if (!ctx) {
    throw new Error("No 2d context")
  }

  // devicePixelRatio slightly increases sharoness on retina devices
  // at the expense of slightly slower render times and needing to
  // size the image back down if you want to download/upload and be
  // true to the images natural size
  const pixelRatio = window.devicePixelRatio // it will take the pixel based on the screen device
  const scaleX = image.naturalWidth / image.width
  const scaleY = image.naturalHeight / image.height

  // set the canvas width and height based on the cropped image area size
  canvas.width = Math.floor(crop.width * scaleX * pixelRatio)
  canvas.height = Math.floor(crop.height * scaleY * pixelRatio)

  ctx.scale(pixelRatio, pixelRatio)
  ctx.imageSmoothingQuality = "high"
  ctx.save() // saving the canvas configuration 

  // getting the new calculated width and height at the original image size
  const cropX = crop.x * scaleX
  const cropY = crop.y * scaleY

  // translate the canvas, move the crop origin to the canvas origin (0, 0)
  ctx.translate(-cropX, -cropY)
  ctx.drawImage(
    image,
    0,
    0,
    image.naturalWidth,
    image.naturalHeight,
    0,
    0,
    image.naturalWidth,
    image.naturalHeight
  )

  ctx.restore()
}

export default setCanvasImage