import axios from 'axios'
import storageService from './asyncStorageService'


export const imgService = {
  getNewImage,
  query,
  add,
}

async function query() {
  try {
    var imgs = await storageService.query('imgs');
    return imgs
  } catch (err) {
    console.log(err);
  }
}

async function add(img) {
  try {
    var newImg = await storageService.post('imgs', img);
    return img
  } catch (err) {
    console.log(err);
  }
}


export async function getNewImage(keyword) {
  var prmRes = axios.get(`https://api.unsplash.com/search/photos/?client_id=PA3Oow8kvS9lXoH0KnT7yxn2e_FAaKFzROSIXsAdPNE&query=${keyword}`)
  return prmRes.then(res => {
    return res.data
  })
}