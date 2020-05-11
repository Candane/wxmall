// pages/detail/childComps/d-popup-info/d-popup-info.js
import {
  storeBindingsBehavior
} from 'mobx-miniprogram-bindings'
import {
  store
} from './../../../../store/index.js'
import Toast from './../../../../miniprogram_npm/@vant/weapp/toast/toast.js'
import {
  USER_INFO
} from '../../../../config/const.js'

import {
  createOrder
} from "./../../../../network/cart.js"
const app = getApp()
Component({
  //-----------behavior 绑定MobX ------------------
  behaviors: [storeBindingsBehavior],
  storeBindings: {
    /* 绑定配置 */
    store,
    fields: ['cartList', 'cartLength'],
    actions: ['addCart', 'updateOrder'],
  },
  /**
   * 组件的属性列表
   */
  properties: {
    showPopup: {
      type: Boolean,
      value: false
    },
    btnObj: {
      type: String,
      value: null
    },
    buyGoodsInfo: {
      type: Object,
      value: {}
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    currentIndex: null,
    count: 1
  },
  /**
   * 组件的方法列表
   */
  methods: {
    _createOrder(goods) {
      app.showLoading()
      const product = {}
      product.product_id = goods._id
      product.product_title = goods.title
      product.product_image = goods.masterImage
      product.product_size = goods.size
      product.product_num = goods.count
      product.product_price = goods.realPrice
      const cartList = [product]
      const total_price = +goods.realPrice * +goods.count
      const nickName = wx.getStorageSync(USER_INFO).nickName
      if(!nickName){
        app.showLoading(false)
        return Toast('请先登录')
      }
      const createTime = Date.now()
      createOrder({
        nickName,
        cartList,
        create_time: createTime,
        total_price
      }).then(res => {
        app.showLoading(false)
        const ordercode = res.data.ordercode
        const orderInfo = {
          nickName,
          cartList,
          total_price,
          createTime,
          ordercode
        }
        this.updateOrder(orderInfo)
        this.updateStoreBindings()
        wx.navigateTo({
          url: '/pages/orderDetail/orderDetail'
        })
      }).catch(err => {
        console.log(err)
        Toast('购买出错')
      })
    },
    onClose() {
      this.triggerEvent('closePopup', {})
    },
    sizeItemClick(event) {
      //1.取出index
      const index = event.currentTarget.dataset.index
      //2.修改currentIndex
      this.setData({
        currentIndex: index
      })
    },
    onChange(event) {
      const count = event.detail
      if (count < 1) {
        count = 1
      }
      this.setData({
        count: count
      })
    },
    submit() {
      if (this.data.currentIndex === null) {
        return Toast('请选择商品尺码')
      }
      //获取购买对象
      const goods = {}
      const that = this.data
      goods._id = that.buyGoodsInfo._id
      goods.title = that.buyGoodsInfo.title
      goods.masterImage = that.buyGoodsInfo.masterImage
      goods.oldPrice = that.buyGoodsInfo.oldPrice
      goods.realPrice = that.buyGoodsInfo.realPrice
      goods.descript = that.buyGoodsInfo.descript
      goods.count = that.count
      goods.size = that.buyGoodsInfo.props[that.currentIndex].size
      if (this.data.btnObj === "cart") {
        //添加购物车，调用action，将数据写入store
        this.addCart(goods)
        this.updateStoreBindings()
        // 加入成功提示
        wx.showToast({
          title: '加入购物车成功',
        })
        this.triggerEvent('closePopup', {})
      } else {
        //创建订单
        this._createOrder(goods)
      }
    }
  }
})