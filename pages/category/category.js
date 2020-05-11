// pages/category/category.js
import {
  getCategoryInfo,
  getSubGoods
} from '../../network/category.js'

const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    categories: [],
    currentIndex: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this._getCategoryInfo()
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
  onUnload: function() {},

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
  //-----------网络请求函数--------------
  _getCategoryInfo() {
    app.showLoading()
    getCategoryInfo().then(res => {
      app.showLoading(false)
      const categories = res.data.data
      this.setData({
        categories
      })
    })
  },
  //----------事件监听函数---------------
  menuClick(e) {
    // 1.改变当前的currentIndex
    const currentIndex = e.detail.currentIndex;
    this.setData({
      currentIndex
    })
  },
  searchEnter(event) {
    const name = event.detail
    if (name && name.length !== 0) {
      wx.navigateTo({
        url: `/pages/search/search?name=${name}`,
      })
    }
  }
})