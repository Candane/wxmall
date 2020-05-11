import request from './request.js'
import { BASE_URL} from '../config/const.js'

export function getMultiData() {
  return request({
    url: BASE_URL + '/admin/marketing'
  })
}

export function getGoodsData(type, page) {
  return request({
    url: BASE_URL + '/home',
    data: {
      type,
      page
    }
  })
}