// pages/mine/mine.js

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

Page({
  data: {
    userImg: '',
    userName: '',
    isLogined: false
  },
  onLoad: function (options) {
    var that = this
    
  },
  //点击登录按钮
  goLogined: function() {
    var that = this
    showBusy('正在登录')
    qcloud.login({
      success(result) {
          showSuccess('登录成功')
          console.log('登录成功', result) 
          that.data.userImg = result.avatarUrl
          that.data.userName = result.nickName
          //数据绑定
          that.setData({
            userImg: that.data.userImg,
            userName: that.data.userName,
            isLogined: true
          })
      },
      fail(error) {
          showModel('登录失败', error);
          console.log('登录失败', error);
          //数据绑定
          that.setData({
            isLogined: false
          })
      }
    });
  },
  isGoMyJob: function(e) {
    var that = this
    if(that.data.isLogined) {
      wx.navigateTo({
        url: '../mine/myjob/myjob',
      })
    } else {
      wx.showModal({
        title: '提示',
        content: '请先登录！！！！',
      })
    }
  },
  isGoMyWallet: function (e) {
    var that = this
    if (that.data.isLogined) {
      wx.navigateTo({
        url: '../mine/mywallet/mywallet',
      })
    } else {
      wx.showModal({
        title: '提示',
        content: '请先登录！！！！',
      })
    }
  },
  isGoMyResume: function (e) {
    var that = this
    if (that.data.isLogined) {
      wx.navigateTo({
        url: '../mine/myresume/myresume',
      })
    } else {
      wx.showModal({
        title: '提示',
        content: '请先登录！！！！',
      })
    }
  },
  
})