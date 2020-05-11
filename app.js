import {BASE_URL,TOKEN} from './config/const.js'

App({
  globalData: {
    token: ''
  },
  /**
   * 当小程序初始化完成时，会触发 onLaunch（全局只触发一次）
   */
  onLaunch: function() {
    const token = wx.getStorageSync(TOKEN)
    if (token && token.length !== 0) {
      //已有token，验证是否过期
      this.check_token(token)
    }else{
      //没有token，进行登录
      this.login()
    }

  },

  /**
   * 当小程序启动，或从后台进入前台显示，会触发 onShow
   */
  onShow: function(options) {
  },

  /**
   * 当小程序从前台进入后台，会触发 onHide
   */
  onHide: function() {

  },

  /**
   * 当小程序发生脚本错误，或者 api 调用失败时，会触发 onError 并带上错误信息
   */
  onError: function(msg) {

  },
  login() {
    //登录操作
    wx.login({
      success: res => {
        const code = res.code;
        //获取openid
        wx.request({
          url: BASE_URL + '/login',
          method: 'post',
          data: {
            code
          },
          success: res => {
            const token = res.data.token
            this.globalData.token = token
            //进行本地存储
            wx.setStorage({
              key: TOKEN,
              data: token
            })
          },
          fail: res => {
            console.log(res)
          }
        })
      }
    })
  },
  check_token(token){
    wx.request({
      url: BASE_URL + '/auth',
      method:"post",
      header:{
        authorization:token
      },
      success: res => {
        if (!res.data.errcode) {
          //token没过期，继续使用原来token
          this.globalData.token = token
        } else {
          //重新登录
          this.login()
        }
      },
      fail:res=>{
        console.log(res)
      }
    })
  },
  showLoading(flag=true){
    if(!flag){
      return wx.hideLoading()
    }
    wx.showLoading({
      title: '加载中',
    })
  }
})