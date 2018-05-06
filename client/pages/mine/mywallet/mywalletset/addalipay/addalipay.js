// pages/mine/mywallet/mywalletset/addalipay/addalipay.js
Page({
  data: {
  
  },

  onLoad: function (options) {
  
  },
  updateAlipayName: function (e) {
    var that = this
    that.setData({
      cardname: e.detail.value
    });
    var names = that.data.cardname
    if (!/^[\u4e00-\u9fa5]/.test(names) || names === '') {
      wx.showToast({
        title: '请输入姓名',
        duration: 2000
      })
    }
  },
  updateAlipayPhone: function (e) {
    var that = this
    that.setData({
      phone: e.detail.value
    });
    var phones = that.data.phone
    if (!/^1[0-9]{10}$/.test(phones) || phones === '') {
      wx.showToast({
        title: '请输入正确的支付宝账号(手机)',
        duration: 2000
      })
    }
  },
  formSubmit: function (e) {
    var that = this
    wx.setStorageSync('alipaylist', e.detail.value)
    wx.navigateBack({
      delta: 1
    })
  },
})