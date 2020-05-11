// pages/profile/childComps/p-header/p-header.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    hasUserInfo: {
      type: Boolean,
      value: false
    },
    userInfo:{
      type:Object,
      value:{}
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
  },

  /**
   * 组件的方法列表
   */
  methods: {
    bindGetUserInfo(e) {
      const userInfo = e.detail.userInfo
      //通知页面内部点击事件，发送按钮对象参数
      this.triggerEvent('bindGetUserInfo', { userInfo })
    }
  }
})
