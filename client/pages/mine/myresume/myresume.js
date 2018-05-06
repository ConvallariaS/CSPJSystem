// pages/mine/myresume/myresume.js
Page({
  data: {
    resumename: "",
    resumephone: "",
    resumeIdcard: "",
    pickercity: "",
    pickerjob: "",
    pickercollege: "",
    pickereducation: "",
    pickerdates: "",
    checkboxfreetime: ""
  },
  onLoad: function () {
    var that = this
    var allvalue = wx.getStorageSync('allvalue')
    var jobchoose = wx.getStorageSync('pickerjob')
    var collegechoose = wx.getStorageSync('pickercollege')
    var educhoose = wx.getStorageSync('pickereducation')
    that.setData({
      resumename: allvalue.resumename,
      resumephone: allvalue.resumephone,
      resumeIdcard: allvalue.resumeIdcard,
      pickercity: allvalue.pickercity,
      pickerjob: jobchoose,
      pickercollege: collegechoose,
      pickereducation: educhoose,
      pickerdates: allvalue.pickerdates,
      checkboxfreetime: allvalue.checkboxfreetime
    })
  },
  goToEdit: function () {
    var that = this
    wx.redirectTo({
      url: 'editresume/editresume',
    })
  },
})