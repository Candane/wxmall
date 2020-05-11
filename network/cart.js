import request from './request.js'
import { BASE_URL } from '../config/const.js'

export function createOrder({
  nickName,
  cartList,
  create_time,
  total_price
}) {
  return request({
    url: BASE_URL + '/order/add',
    method: "POST",
    data: {
      nickName,
      cartList,
      create_time,
      total_price
    }
  })
}

export function payment(ordercode) {
  return request({
    url: BASE_URL + '/order/pay',
    method: "POST",
    data: {
      ordercode
    }
  })
}