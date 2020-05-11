// pages/order/childComps/o-list/o-list.js
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
    actions: [ 'updateOrder'],
  },
  /**
   * 组件的属性列表
   */
  properties: {
    order: {
      type: Object,
      value: {}
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
    orderClick(){
      const orderInfo = this.data.order
      this.updateOrder(orderInfo)
      this.updateStoreBindings()
      wx.navigateTo({
        url: '/pages/orderDetail/orderDetail'
      })
    }
  }
})
