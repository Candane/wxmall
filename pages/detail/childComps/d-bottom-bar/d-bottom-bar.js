// pages/detail/childComps/d-bottom-bar/d-bottom-bar.js
import {
  storeBindingsBehavior
} from 'mobx-miniprogram-bindings'
import {
  store
} from './../../../../store/index.js'
Component({
  //-----------behavior 绑定MobX ------------------
  behaviors: [storeBindingsBehavior],
  storeBindings: {
    /* 绑定配置 */
    store,
    fields: ['cartLength'],
  },
  /**
   * 组件的属性列表
   */
  properties: {
  },

  /**
   * 组件的初始数据
   */
  data: {

    cartLength: 4
  },

  /**
   * 组件的方法列表
   */
  methods: {
    toHome(){
      wx.switchTab({
        url: '/pages/home/home'
      })
    },
    toCart(){
      wx.switchTab({
        url: '/pages/cart/cart'
      })
    },
    showPopup(event){
      const btnObj = event.currentTarget.id
      //3.通知页面内部点击事件，发送按钮对象参数
      this.triggerEvent('showPopup', { btnObj })
    }
  }
})
