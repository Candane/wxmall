// pages/orderDetail/orderDetail.js
import {
  createStoreBindings
} from 'mobx-miniprogram-bindings'
import {
  store
} from '../../store/index.js'

import {
  payment
} from '../../network/cart.js'
import Toast from '../../miniprogram_npm/@vant/weapp/toast/toast.js'

const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.storeBindings = createStoreBindings(this, {
      store,
      fields: ['orderInfo'],
      actions: ['updateOrder','payOrder'],
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

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

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
  _payment(ordercode){
    app.showLoading()
    payment(ordercode).then(res=>{
      app.showLoading(false)
      const payInfo = res.data
      this.payOrder(payInfo)
    }).catch(err=>{
      console.log(err)
      Toast('购买出错')
    })
  },
  submit(event){
    const ordercode = event.currentTarget.dataset.ordercode
    //提交订单
    this._payment(ordercode)
  }
})