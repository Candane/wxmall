import {
  getDetail,
  BuyGoodsInfo
} from '../../network/detail.js'
import {
  createOrder,
  payment
} from '../../network/cart.js'

const app = getApp()
// pages/detail/detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isLoading:false,
    _id: '',
    masterImage: null,
    showImages: [],
    baseInfo: {},
    paramInfo: {},
    props: [],
    showPopup: false,
    btnObj: null,
    buyGoodsInfo: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    const _id = options._id
    // 1.获取传入的_id
    this.setData({
      _id: _id
    })
    // 2.请求商品详情数据
    this._getDetail(_id)
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
  _getDetail(_id) {
    app.showLoading()
    getDetail(_id).then(res => {
      app.showLoading(false)
      const baseInfo = {}
      const paramInfo = {}
      const masterImage = res.data.data[0].master_image

      const detail_info = res.data.data[0].detail_info
      let showImages = detail_info.show_image
      baseInfo.title = res.data.data[0].product_name
      baseInfo.sales = detail_info.sales
      baseInfo.services = detail_info.services
      baseInfo.oldPrice = detail_info.old_price
      baseInfo.realPrice = detail_info.lowNowPrice
      baseInfo.discount = detail_info.discountDesc
      paramInfo.descript = detail_info.descript
      paramInfo.key = detail_info.key
      paramInfo.paramsImages = detail_info.param_image
      const props = detail_info.props
      this.setData({
        isLoading:true,
        masterImage,
        showImages,
        baseInfo,
        paramInfo,
        props
      })
    })
  },
  //-------------------事件监听函数----------------
  showPopup(event) {
    const btnObj = event.detail.btnObj
    const that = this.data
    const buyGoodsInfo = new BuyGoodsInfo({
      _id: that._id,
      masterImage: that.masterImage,
      baseInfo: that.baseInfo,
      props: that.props,
      paramInfo: that.paramInfo
    })
    this.setData({
      showPopup: true,
      btnObj,
      buyGoodsInfo
    })
  },
  closePopup() {
    this.setData({
      showPopup: false
    })
  }
})