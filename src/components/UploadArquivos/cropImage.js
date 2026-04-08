const createImage = url =>
  new Promise((resolve, reject) => {
    const image = new Image()
    image.addEventListener('load', () => resolve(image))
    image.addEventListener('error', error => reject(error))
    image.setAttribute('crossOrigin', 'anonymous') // needed to avoid cross-origin issues on CodeSandbox
    image.src = url
  })

export default async function getCroppedImg(imageSrc, pixelCrop) {
  const image = await createImage(imageSrc)
  const canvas = document.createElement('canvas')
  const cw = canvas.width = pixelCrop.width
  const ch = canvas.height = pixelCrop.height
  const ctx = canvas.getContext('2d')

  ctx.beginPath();
  ctx.drawImage(
    image,
    pixelCrop.x,
    pixelCrop.y,
    pixelCrop.width,
    pixelCrop.height,
    0,
    0,
    pixelCrop.width,
    pixelCrop.height
  )
  ctx.globalCompositeOperation='destination-in';
  ctx.arc(cw/2,ch/2,ch/2,0,Math.PI*2);
  ctx.fill();
  ctx.closePath();

  return new Promise((resolve, reject) => {
    canvas.toBlob(file => {
      resolve(file)
    }, 'image/jpeg')
  })
}