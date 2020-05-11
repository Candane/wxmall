// pages/home/childCpns/w-recommend/w-recommend.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    recommends: {
      type: Array,
      value: []
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    isTrigger:false
  },

  /**
   * 组件的方法列表
   */
  methods: {
    imgLoad(){
      if (!this.data.isTrigger){
        this.triggerEvent('recomImgLoad',{})
        this.data.isTrigger = true
      }
    }
  }
})
