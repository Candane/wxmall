import request from './request.js'
import { BASE_URL } from '../config/const.js'

export function getUnpaid(page) {
  return request({
    url: BASE_URL + '/profile/unpaid',
    data:{
      page
    }
  })
}
export function getPayment(page) {
  return request({
    url: BASE_URL + '/profile/payment',
    data: {
      page
    }
  })
}
