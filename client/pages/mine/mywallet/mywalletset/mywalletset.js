// pages/mine/mywallet/mywalletset/mywalletset.js
Page({
  data: {
    cardlist: [],
    alipaylist: [],
    cardname: "",
    cardnum: ""
  },
  onLoad: function (options) {

  },
  onShow: function () {
    var that = this
    that.setData({
      cardlist: wx.getStorageSync('cardlist'),
      alipaylist: wx.getStorageSync('alipaylist')
    })
  },
  jumpToAddBankCard: function () {
    wx.navigateTo({
      url: 'addbankcard/addbankcard',
    })
  },
  jumpToAddAlipay: function () {
    wx.navigateTo({
      url: 'addalipay/addalipay',
    })
  },

})