const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

//封装request请求
const request = (obj) => {
  let header = {
    "Content-Type": "application/json",
    'Accept': 'application/json',
    'appid': 'wxe5f492f1b7ff38ca',
    'appType': '102',
    'version': '1.0',
  }
  let token = wx.getStorageSync('auth_token') || ''
  if (token) {
    header['auth_token'] = token
  }
  let userId = wx.getStorageSync('user_id') || ''
  if (userId) {
    header['userId'] = userId
  }
  if(obj.header) {
    header = Object.assign(header,obj.header)
  }

  return new Promise(function (resolve, reject) {
    wx.request({
      url: obj.url,
      method: obj.method || 'GET',
      data: obj.data || {},
      header: header,
      success: function (res) {
        if (res.data.success === true) {
          resolve(res.data)
        } else {
          reject(res.data)
        }
      },
      fail: function (err) {
        wx.showToast({
          title: '网络加载失败',
        })
      }
    });
  });
}

module.exports = {
  formatTime: formatTime,
  request: request,
}
