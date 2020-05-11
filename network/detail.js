import request from './request.js'
import {
  BASE_URL
} from '../config/const.js'

export function getDetail(_id) {
  return request({
    url: BASE_URL + '/detail',
    data: {
      _id
    }
  })
}

export class BuyGoodsInfo {
  constructor({ _id, masterImage, baseInfo, props, paramInfo}) {
    this._id = _id
    this.title = baseInfo.title
    this.masterImage = masterImage
    this.oldPrice = baseInfo.oldPrice
    this.realPrice = baseInfo.realPrice
    this.descript = paramInfo.descript
    this.skuCount = this.getSkuCount(props)
    this.props =props
  }
  getSkuCount(props) {
    return props.reduce((prev, cur) => {
      return prev + +cur.inventory;
    }, 0);
  }
}