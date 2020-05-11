// pages/category/childComps/c-content/c-content.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    subcategories: {
      type: Array
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
      // 1.获取item
      const title = event.currentTarget.dataset.title
      // // 2.跳转到对应的路径
      wx.navigateTo({
        url: `/pages/search/search?title=${title}`,
      })
    }
  }
})
