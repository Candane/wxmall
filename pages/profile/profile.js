// pages/profile/profile.js
import {
  USER_INFO
} from './../../config/const.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hasUserInfo: false,
    userInfo: {},
    profileList: [
      { icon: 'envelop-o', info: '我的消息' },
      { icon: 'points', info: '积分商城' },
      { icon: 'gem-o', info: '会员卡' },
    ],
    serviceList: [
      { icon: 'phone-o', info: '客服电话' },
      { icon: 'setting-o', info: '设置' },
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    const userInfo = wx.getStorageSync(USER_INFO)
    if (userInfo && Object.keys(userInfo).length !== 0) {
      //已有userInfo
      this.setData({
        hasUserInfo: true,
        userInfo: userInfo
      })
    } else {
      //尝试获取userInfo
      this._wxGetuserInfo()
    }
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

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },
  //-------------------网咯请求函数----------------
  _wxGetuserInfo() {
    // 查看是否授权
    wx.getSetting({
      success: res=>{
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称
          wx.getUserInfo({
            success: res => {
              const userInfo = res.userInfo
              this.setData({
                hasUserInfo: true,
                userInfo: userInfo
              })
              wx.setStorageSync(USER_INFO, userInfo)
            }
          })
        }
      }
    })
  },
  //-------------------事件监听函数----------------
  bindGetUserInfo(event) {
    const userInfo = event.detail.userInfo
    this.setData({
      hasUserInfo: true,
      userInfo: userInfo
    })
    wx.setStorageSync(USER_INFO, userInfo)
  }
})