// pages/mine/myjob/myjob.js
var app = getApp()
Page({

  data: {
    /**页面配置 */
    winWidth: 0,
    winHeight: 0,
    //tab切换
    currentTab: 0,
    isjob: false,
    job: [],
    count: 1
  },
  onShow: function () {
    var that = this
    var arr = wx.getStorageSync('job') || []
    console.log("myjob--> "+arr)
    if (arr.length > 0) {
      for (var i in arr) {
        console.log("arr[i]--> " + arr[i])
      }
      that.setData({
        isjob: true,
        job: arr
      })
    }
  },

  onLoad: function (options) {
    var that = this
    /**获取系统信息 */
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          winWidth: res.windowWidth,
          winHeight: res.windowHeight
        })
      },
    })
  },
  /**滑动切换tab */
  bindChange: function (e) {
    var that = this
    that.setData({
      currentTab: e.detail.current
    })
  },
  /**点击切换 */
  swichNav: function (e) {
    var that = this
    var cur = e.target.dataset.current
    if (that.data.currentTab === cur) {
      return false;
    } else {
      that.setData({
        currentTab: cur
      })
    }
  },
  applyJobDelete: function (e) {
    var that = this
    wx.showModal({
      title: '提示',
      content: '确定要取消该项申请吗？',
      cancelText: '不取消',
      confirmText: '确认取消',
      success: function(res) {
        if (res.confirm) {
          //主体数据的数组移除该项
          that.data.job.splice(e.target.id.substring(3), 1)
          that.setData({
            job: that.data.job
          })
          try {
            wx.setStorageSync('job', that.data.job)
          } catch (e) {
            console.log(e)
          }
        }
      },
      fail: function(res) {
        console.log(res)
      }
    })
  }
})