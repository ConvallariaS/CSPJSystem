// pages/index/details/details.js
import { DBJob } from '../../../db/DBJob.js';
var app = getApp()

Page({

  data: {
    jobid: ''
  },

  /**
   * 生命周期函数--监听页面加载
   * 数据绑定
   */
  onLoad: function (options) {
    var that = this
    var jobId = options.id
    that.data.jobid = jobId
    that.dbJob = new DBJob(jobId)
    that.jobData = that.dbJob.getJobItemById().data
    that.setData({
      job: that.jobData
    })
  },
  /** 
   * 报名参加
   */
  goApply: function () {
    var that = this
    var id = that.data.jobid
    console.log("detail-id-- "+id)
    wx.navigateTo({
      url: 'apply/apply?id='+id,
    })
  },
  /**
   * 跳转到地图
   */
  navigateToMap: function (e) {
    wx.getLocation({
      type: 'gcj02',
      success: function (res) {
        var latitude = res.latitude
        var longitude = res.longitude
        wx.openLocation({
          latitude: latitude,
          longitude: longitude,
          scale: 28
        })
      },
    })
  },
  /**
   * 分享
   */
  onShareAppMessage: function () {
    return {
      title: this.jobData.title,
      desc: this.jobData.content,
      path: "pages/home/home-detail/home-detail.js"
    }
  }
})