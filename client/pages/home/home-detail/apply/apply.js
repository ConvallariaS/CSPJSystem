// pages/index/index-detail/apply/apply.js
import { DBJob } from '../../../../db/DBJob.js';
var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    jobid: '',
    joblist: [],
    workday: [],
    addr: [],
    workflag: false,
    addrflag: false
  },
  onLoad: function (options) {
    var that = this
    var jobId = options.id
    that.data.jobid = jobId
    console.log("apply jobid-- " + that.data.jobid)
    var dbJob = new DBJob()
    this.setData({
      joblist: dbJob.getAllJobData(),
    })
  },
  onShow() {
    this.setData({
      workday: [
        { id: 1, name: "白班 09:00~18:00", isSelect: false },
        { id: 2, name: "白班 10:00~18:00", isSelect: false },
        { id: 3, name: "晚班 13:30~23:30", isSelect: false }
      ],
      addr: [
        { id: 1, name: "成都市武侯区", selected: false },
        { id: 2, name: "成都市温江区", selected: false },
        { id: 3, name: "成都市锦江区", selected: false },
        { id: 4, name: "成都市双流区", selected: false },
      ]
    })
  },

  selectTimeOk: function (e) {
    var that = this
    for (var i = 0; i < that.data.workday.length; i++) {
      if (e.currentTarget.dataset.index == i) {
        that.data.workday[i].isSelect = true
        this.data.workflag = true;
      }
      else {
        that.data.workday[i].isSelect = false
      }
    }
    that.setData(that.data)
  },
  selectAddrOk: function (e) {
    var that = this
    for (var i = 0; i < that.data.addr.length; i++) {
      if (e.currentTarget.dataset.index == i) {
        that.data.addr[i].selected = true
        that.data.addrflag = true
      }
      else {
        that.data.addr[i].selected = false
      }
    }
    that.setData(that.data)
  },
  goBack: function () {
    wx.navigateBack({
      delta: 1
    })
  },
  //报名是否成功
  showOk: function () {
    var that = this
    var id = that.data.jobid
    if (that.data.workflag && that.data.addrflag) {   
      for (var i in that.data.joblist) {
        if(that.data.joblist[i].jobId == id) {
          that.data.joblist[i].count = 1
          var arr = wx.getStorageSync('job') || []
          if(arr.length > 0) {
            for (var j in arr) {
              if (arr[j].jobId == id) {
                wx.showModal({
                  title: '提示',
                  content: '已经申请过该职位了哟',
                  success: function(res) {
                    wx.navigateBack({
                      delta: 1
                    })
                  }
                })
                return
              }
            }
            arr.push(that.data.joblist[i])
          } else {
            arr.push(that.data.joblist[i])
          }
          try {
            wx.setStorageSync('job', arr)
            return
          } catch (e) {
            console.log(e)
          }
        }
        wx.showModal({
          content: '报名成功，您可以在我的兼职查看已申请的兼职工作哦',
          showCancel: false,
          success: function(res) {
            wx.navigateBack({
              delta: 2
            })
          }
        }) 
      }
    } else if (!this.data.workflag && this.data.addrflag) {
      wx.showModal({
        content: '请选择工作时间',
        showCancel: false,
      })
    } else if (!this.data.addrflag && this.data.workflag) {
      wx.showModal({
        content: '请选择工作地点',
        showCancel: false,
      })
    } else {
      wx.showModal({
        content: '请选择工作时间和地点',
        showCancel: false,
      })
    }
  },
})