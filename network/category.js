import request from './request.js'
import { BASE_URL } from '../config/const.js'

export function getCategoryInfo(){
  return request({
    url: BASE_URL + '/admin/category'
  })
}

export function getSubGoods(page, sub_category){
  return request({
    url: BASE_URL + '/category/goods',
    data: {
      page, name
    }
  })
}