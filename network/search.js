import request from './request.js'
import { BASE_URL } from '../config/const.js'
export function searchGoods(page, name) {
  return request({
    url: BASE_URL + '/search/goods',
    data: {
      page,
      name
    }
  })
}

export function subGoods(page, title) {
  return request({
    url: BASE_URL + '/category/goods',
    data: {
      page,
      title
    }
  })
}