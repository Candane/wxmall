// pages/order/order.js
import {
  getUnpaid,
  getPayment
} from "../../network/order.js"
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isLoading: false,
    currentType: 'payment',
    orderList: {
      unpaid: {
        page: 0,
        list: []
      },
      payment: {
        page: 0,
        list: []
      },
      unfilled: {
        page: 0,
        list: []
      },
      evaluation: {
        page: 0,
        list: []
      }
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this._getData()
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
    switch (this.data.currentType) {
      case 'payment':
        this._getPayment()
        break
      case 'unpaid':
        this._getUnpaid()
        break
      default:
        break
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },
  //------------网络请求函数----------------
  _getData() {
    this._getPayment()
    this._getUnpaid()
  },
  _getUnpaid() {
    app.showLoading()
    const unpaid = this.data.orderList.unpaid
    const page = unpaid.page + 1
    getUnpaid(page).then(res => {
      app.showLoading(false)
      const list = res.data.data;
      if (list.length === 0) {
        this.setData({
          isLoading: true
        })
        return;
      }
      const oldList = unpaid.list;
      oldList.push(...list)

      this.setData({
        isLoading: true,
        'orderList.unpaid.list': oldList,
        'orderList.unpaid.page': page
      })
    })
  },
  _getPayment() {
    app.showLoading()
    const payment = this.data.orderList.payment
    const page = payment.page + 1;
    getPayment(page).then(res => {
      app.showLoading(false)
      const list = res.data.data;
      if (list.length === 0) {
        this.setData({
          isLoading: true
        })
        return;
      }
      const oldList = payment.list;
      oldList.push(...list)

      this.setData({
        isLoading: true,
        'orderList.payment.list': oldList,
        'orderList.payment.page': page
      })
    })
  },
  //------------事件监听函数----------------
  onClick(event) {
    const type = event.detail.params.name
    console.log(type)
    this.setData({
      currentType: type
    })
  }
})