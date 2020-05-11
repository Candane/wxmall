// pages/search/search.js
import {
  searchGoods,
  subGoods
} from "../../network/search.js"

const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isLoading: false,
    name: null,
    title: null,
    searchList: {
      page: 0,
      list: []
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // const pages = getCurrentPages();
    // const prevpage = pages[pages.length - 2];
    if (options.name) {
      const name = options.name
      this.setData({
        name
      })
      this._searchGoods()
    } else {
      const title = options.title
      this.setData({
        title
      })
      this._subGoods()
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
    if (this.data.name) {
      this._searchGoods()
    } else {
      this._subGoods()
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },
  //-----------网络请求函数-----------
  _searchGoods() {
    app.showLoading()
    const page = this.data.searchList.page + 1;
    const name = this.data.name
    searchGoods(page, name).then(res => {
      app.showLoading(false)
      const list = res.data.data
      if (list.length === 0) {
        this.setData({
          isLoading: true
        })
        return;
      }
      const oldList = this.data.searchList.list
      oldList.push(...list)
      this.setData({
        isLoading: true,
        'searchList.page': page,
        'searchList.list': oldList
      })
    })
  },
  _subGoods() {
    app.showLoading()
    const page = this.data.searchList.page + 1;
    const title = this.data.title
    const image = this.data.image
    subGoods(page, title).then(res => {
      app.showLoading(false)
      const list = res.data.data
      if (list.length === 0) {
        this.setData({
          isLoading: true
        })
        return;
      }
      const oldList = this.data.searchList.list
      oldList.push(...list)
      this.setData({
        isLoading: true,
        'searchList.page': page,
        'searchList.list': oldList
      })
    })
  },
  //----------事件监听函数------------
  searchEnter(event) {
    const name = event.detail
    //每次搜索都重新初始化
    this.setData({
      name,
      searchList: {
        isLoading: false,
        page: 0,
        list: []
      }
    })
    this._searchGoods()
  }
})