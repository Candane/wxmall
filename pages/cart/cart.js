// pages/cart/cart.js
import {
  USER_INFO
} from '../../config/const.js'
import {
  createStoreBindings
} from 'mobx-miniprogram-bindings'
import {
  store
} from '../../store/index.js'

import {
  createOrder
} from '../../network/cart.js'

import Toast from '../../miniprogram_npm/@vant/weapp/toast/toast.js'
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.storeBindings = createStoreBindings(this, {
      store,
      fields: ['cartList', 'cartLength', 'isCheckAll', 'totalPrice'],
      actions: ['addCart', 'updateCart', 'deleteCart', 'checkedAll', 'updateOrder'],
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    const title = this.data.cartLength > 0 ? `购物车(${this.data.cartLength})` : '购物车'
    wx.setNavigationBarTitle({
      title: title,
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {
    this.storeBindings.destroyStoreBindings()
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },
  _createOrder({
    nickName,
    cartList,
    total_price
  }) {
    app.showLoading()
    const createTime = Date.now()
    createOrder({
      nickName,
      cartList,
      create_time: createTime,
      total_price
    }).then(res => {
      app.showLoading(false)
      const ordercode = res.data.ordercode
      const orderInfo = {
        nickName,
        cartList,
        total_price,
        createTime,
        ordercode
      }
      const indexList = []
      for (let [index, item] of this.data.cartList.entries()) {
        if (item.checked) {
          indexList.push(index)
        }
      }
      this.updateOrder(orderInfo)
      wx.navigateTo({
        url: '/pages/orderDetail/orderDetail'
      })
      this.deleteCart(indexList)
    }).catch(err => {
      console.log(err)
      Toast('购买出错')
    })
  },
  numChange(event) {
    const changeInfo = event.detail
    this.updateCart(changeInfo)
    this.storeBindings.updateStoreBindings()
  },
  deleteClick(event) {
    const index = event.detail.index
    const indexList = [index]
    this.deleteCart(indexList)
    this.storeBindings.updateStoreBindings()
  },
  checkedChange(event) {
    const index = event.detail.index
    const changeInfo = {
      index
    }
    this.updateCart(changeInfo)
    this.storeBindings.updateStoreBindings()
  },
  allCheckCick() {
    if (this.data.isCheckAll) {
      this.checkedAll(false)
    } else {
      this.checkedAll(true)
    }
  },
  submitClick() {
    const checkedFlag = this.data.cartList.some(item => item.checked)
    if (!checkedFlag) {
      return Toast.fail('请选择要购买的商品');
    }
    const cartList = this.data.cartList.filter(item => {
      return item.checked
    }).map(item => {
      return {
        product_id: item._id,
        product_title: item.title,
        product_image: item.masterImage,
        product_size: item.size,
        product_num: item.count,
        product_price: item.realPrice,
      }
    })
    const total_price = this.data.totalPrice
    const nickName = wx.getStorageSync(USER_INFO).nickName
    this._createOrder({
      nickName,
      cartList,
      total_price
    })
  }
})