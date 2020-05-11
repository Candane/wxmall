// pages/search/childComps/s-list-item/s-list-item.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    goods: {
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
    itemClick(){
      // 1.获取_id
      const _id = this.data.goods._id;
      // 2.跳转到对应的路径
      wx.navigateTo({
        url: '/pages/detail/detail?_id=' + _id,
      })
    }
  }
})
