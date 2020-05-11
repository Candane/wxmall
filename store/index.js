import {
  observable,
  action
} from 'mobx-miniprogram'

export const store = observable({

  // 数据字段
  cartList: [],
  orderInfo: {},

  // 计算属性
  get cartLength() {
    return this.cartList.length
  },
  get isCheckAll() {
    return this.cartList.length && this.cartList.every(item => item.checked)
  },
  get totalPrice() {
    return this.cartList
      .filter(item => {
        return item.checked
      })
      .reduce((preValue, item) => {
        return preValue + item.realPrice * item.count
      }, 0)
  },
  // --------actions:Cart------------
  addCart: action(function(goods) {
    //根据Id查找购物车中，判断有没有已添加该商品
    let flag = this.cartList.some(item => {
      if (item._id === goods._id && item.size === goods.size) {
        //cartList有存在该相同码数商品,添加对应数量
        item.count += goods.count;
        return true
      }
    })
    //购物车不存在该商品
    if (!flag) {
      //购物车列表中商品是否被选中，默认false
      goods.checked = false
      this.cartList.push(goods)
    }
    this.cartList=[...this.cartList]
  }),
  updateCart: action(function(changeInfo) {
    if (!changeInfo.count) {
      //改选中状态
      this.cartList[changeInfo.index].checked = !this.cartList[changeInfo.index].checked
    } else {
      //改数量
      this.cartList[changeInfo.index].count = changeInfo.count
    }
    this.cartList = [...this.cartList]
  }),
  deleteCart: action(function(indexList) {
    indexList.forEach(item=>{
      // this.cartList.splice(this.cartList.indexOf(item),1)
      this.cartList.splice(item,1)
    })
    this.cartList = [...this.cartList]
  }),
  checkedAll: action(function(ischeckedAll) {
    if (ischeckedAll) {
      this.cartList.forEach(item => {
        item.checked = true
      })
      this.cartList = [...this.cartList]
    } else {
      this.cartList.forEach(item => {
        item.checked = false
      })
      this.cartList = [...this.cartList]
    }
  }),
  //------------action:Order------------
  updateOrder: action(function(orderInfo) {
    this.orderInfo = orderInfo
  }),
  payOrder:action(function(payInfo){
    if(this.orderInfo.ordercode===payInfo.ordercode){
      this.orderInfo.pay_time = payInfo.pay_time
      this.orderInfo = {...this.orderInfo}
    }
  })
})