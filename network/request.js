export default function(options) {
  let token = getApp().globalData.token
  // console.log(token)
  // options.header = Object.assign({
  //   Authorization: token
  // }, {...options.header})
  options.header = !token ? {} : { Authorization: token}

  return new Promise((resolve, reject) => {
    wx.request({
      url: options.url,
      data: options.data || '',
      header: options.header,
      method: options.method || 'GET',
      dataType: options.dataType || 'json',
      responseType: options.responseType || 'text',
      success: resolve,
      fail: reject
    })
  })
}