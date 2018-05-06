/**
 * @fileOverview 演示会话服务和 WebSocket 信道服务的使用方式
 */

// 引入 QCloud 小程序增强 SDK
var qcloud = require('../../vendor/wafer2-client-sdk/index');

// 引入配置
var config = require('../../config');

// 显示繁忙提示
var showBusy = text => wx.showToast({
    title: text,
    icon: 'loading',
    duration: 10000
});

// 显示成功提示
var showSuccess = text => wx.showToast({
    title: text,
    icon: 'success'
});

// 显示失败提示
var showModel = (title, content) => {
    wx.hideToast();

    wx.showModal({
        title,
        content: JSON.stringify(content),
        showCancel: false
    });
};

var loadMore = function(that) {
  that.setData({
    hidden: false
  })
  wx.request({
    url: '',
  })
}

var app = getApp()
var DBJob = require('../../db/DBJob.js').DBJob 
var WxSearch = require('../wxSearch/wxSearch.js')

Page({

  data: {
    inputShowed: false, //输入框显示
    hasMore: true,
    hasRefesh: false,
    hidden: true, //加载提示框显示
    jobList: [],
    jobtitle: "",
    scrollTop: 0,
    scrollHeight: 0,
  },
  onLoad: function () {
    var that = this
    var dbJob = new DBJob()
    that.setData({
      jobList: dbJob.getAllJobData(),
      hidden: true
    })
    wx.getSystemInfo({
      success: function(res) {
        that.setData({
          scrollHeight: res.windowHeight
        })
      },
    })
    // loadMore(that)
    //初始化热门搜索
    WxSearch.init(that, 43, ['实习生']);
    WxSearch.initMindKeys([that.data.jobList[0].title, that.data.jobList[1].title, that.data.jobList[2].title, that.data.jobList[3].title, that.data.jobList[4].title, that.data.jobList[5].title, that.data.jobList[6].title, that.data.jobList[7].title,])
  },
  showInput: function () {
    var that = this
    that.setData({
      inputShowed: true
    })
  },
  toLoadMore: function() {
    var that = this
    loadMore(that)
  },
  scroll: function(e) {
    var that = this
    that.setData({
      scrollTop: e.detail.scrollTop
    })
  },
  toRefesh: function(e) {
    var that = this
    page = 0
    that.setData({
      jobList: [],
      scrollTop: 0
    })
    loadMore(that)
  },
  loadingChange: function() {
    var that = this
  },
  navigateToDetail: function (e) {
    var jobId = e.currentTarget.dataset.jobId
    wx.navigateTo({
      url: 'home-detail/home-detail?id=' + jobId
    })
  },
  //点击搜索，添加历史记录
  wxSearchFn: function(e) {
    var that = this
    var index = null
    WxSearch.wxSearchAddHisKey(that)
    // var jobtitle = wx.getStorageSync('jobtitle')
    // for(var i in that.data.jobList) {
    //   if(that.data.jobList[i].title == jobtitle) {
    //     index = i
    //   } 
    // }
    // console.log(that.data.jobList[index])
    // that.setData({
    //   jobList: that.data.jobList[index]
    // })
  }, 
  //搜索输入
  wxSearchInput: function (e) {
    var that = this
    WxSearch.wxSearchInput(e, that);
  },
  clearInput: function(e) {
    var that = this
    WxSearch.wxSearchInputClear(e, that)
  },
  //焦点获取
  wxSearchFocus: function (e) {
    var that = this
    WxSearch.wxSearchFocus(e, that);
  },
  //失去焦点匹配
  wxSearchBlur: function (e) {
    var that = this
    WxSearch.wxSearchBlur(e, that);
  },
  wxSearchKeyTap: function (e) {
    var that = this
    WxSearch.wxSearchKeyTap(e, that);
  },
  //删除一条搜索记录
  wxSearchDeleteKey: function (e) {
    var that = this
    WxSearch.wxSearchDeleteKey(e, that);
  },
  //清除历史记录
  wxSearchDeleteAll: function (e) {
    var that = this;
    WxSearch.wxSearchDeleteAll(that);
  },
  wxSearchTap: function (e) {
    var that = this
    WxSearch.wxSearchHiddenPancel(that);
  },
});
