// pages/home/home.js
import { getMultiData, getGoodsData} from '../../network/home.js'
const TOP_DISTANCE = 900
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    banners:[],
    recommends:[],
    titles: ['流行', '新款', '精选'],
    goods: {
      new: { page: 0, list:[]},
      pop: { page: 0, list:[]},
      sell: { page: 0, list:[]}
    },
    currentType:'pop',
    types:['pop','new','sell'],
    showBackTop:false,
    isTabFixed:false,
    tabControlTop:0
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //发送网络请求
    this._getData()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    //上拉加载更多
    this._getGoodsData(this.data.currentType)
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  //监听页面滚动
  onPageScroll(options){
    const scrollTop = options.scrollTop;
    const flagBackTop = scrollTop >= TOP_DISTANCE ? true : false
    if (flagBackTop != this.data.showBackTop){
      this.setData({
        showBackTop: flagBackTop
      })
    }
    
    const flagRecommend = scrollTop >= this.data.tabControlTop ? true : false
    if (flagRecommend != this.data.isTabFixed){
      this.setData({
        isTabFixed: flagRecommend
      })
    }
  },
  //-------------------网咯请求函数----------------
  // 网络请求相关方法
  _getData() {
    //获取上面的数据
    this._getMultiData()
    this._getGoodsData('pop')
    this._getGoodsData('new')
    this._getGoodsData('sell')
  },
  _getMultiData() {
    //1.请求轮播图以及推荐数据
    getMultiData().then(res => {
      //取出轮播图和推荐的数据
      // console.log(res)
      const banners = res.data.data[0].swiper
      const recommends = res.data.data[0].recommend
      //将banners和recommends数据放入data中
      this.setData({
        banners,
        recommends
      })
    })
  },
  _getGoodsData(type){
    // app.showLoding()
    app.showLoading()
    // 1.获取数据对应的页码
    const page = this.data.goods[type].page + 1;
    getGoodsData(type,page).then(res => {
      app.showLoading(false)
      const list = res.data.data;
      const oldList = this.data.goods[type].list;
      oldList.push(...list)

      // 3.最新的goods设置到goods中
      const typeKey = `goods.${type}.list`
      const pageKey = `goods.${type}.page`
      this.setData({
        [typeKey]: oldList,
        [pageKey]: page
      })
    })
  },
  //-----------------事件监听函数-------------------
  tabItemClick(event){
    //取出index
    const index = event.detail.index;
    const type = this.data.types[index]
    this.setData({
      currentType: type
    })
    this.selectComponent('.tab-control').setCurrentIndex(index)
    this.selectComponent('.tab-control-temp').setCurrentIndex(index)
  },
  recomImgLoad(){
    wx.createSelectorQuery().select('#tab-control').boundingClientRect(rect => {
      this.data.tabControlTop = rect.top
    }).exec()
  },
  downLoadClick(){
    this._getGoodsData(this.data.currentType)
  }
})