// pages/cart/childComps/c-bottom-bar/c-bottom-bar.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    selected: {
      type: Boolean,
      value: true
    },
    price: {
      type: Number
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
    allCheckCick(){
      this.triggerEvent("allCheckCick", {})
    },
    onClickButton(){
      this.triggerEvent("submitClick", {})
    }
  }
})
