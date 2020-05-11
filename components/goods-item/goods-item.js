// components/goods-item/goods-item.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    goodsitem: {
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
    itemClick(event) {
      // 1.获取iid
      const _id = this.data.goodsitem._id;
      // 2.跳转到对应的路径
      wx.navigateTo({
        url: '/pages/detail/detail?_id=' + _id,
      })
    }
  }
})
