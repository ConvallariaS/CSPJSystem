// pages/mine/mywallet/mywallet.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },

  onLoad: function (options) {
  
  },
  jumpToWithdrawal: function () {
    wx.navigateTo({
      url: 'withdrawal/withdrawal',
    })
  }
})