// pages/cart/childComps/c-list-item/c-list-item.js
import Dialog from "../../../../miniprogram_npm/@vant/weapp/dialog/dialog"
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    goods: {
      type: Object,
      value: {}
    },
    index: {
      type: Number
    }
  },

  /**
   * 组件的初始数据
   */
  data: {},

  /**
   * 组件的方法列表
   */
  methods: {
    numChange(event) {
      const count = event.detail
      const index = event.currentTarget.dataset.index
      if (count < 1) {
        count = 1
      }
      this.triggerEvent("numChange", {
        index,
        count
      })
    },
    checkCick(event) {
      const index = event.currentTarget.dataset.index
      this.triggerEvent("checkedChange", {
        index
      })
    },
    onClose(event) {
      const {
        position,
        instance
      } = event.detail;
      if (position === 'right') {
        Dialog.confirm({
          message: '确定删除吗？'
        }).then(() => {
          const index = event.currentTarget.dataset.index
          this.triggerEvent("deleteClick", {
            index
          })
        }).catch(err => {})
      }
      instance.close();
    }
  },
  //解决stepper在checkbox中冒泡无法阻止的bug
  stopbubble(e){
  }
})