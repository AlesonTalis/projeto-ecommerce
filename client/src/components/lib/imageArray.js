import { serverAddress } from "./address"

const splitImages = (images) => {
  images += ' '
  // console.log(images)

  let imagesArray = images.split(' ')
  
  imagesArray = imagesArray.filter(image => image !== '')

  imagesArray = imagesArray.map(image => serverAddress(image))

  // console.log(imagesArray)

  return imagesArray
}

export { splitImages }