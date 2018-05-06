// pages/mine/mywallet/mywalletset/addbankcard/addbankcard.js
var CountDown = require('../addbankcard/count-down/count-down.js')
var app = getApp()
Page({

  data: {
    cardname: '',
    code: '',
    phone: '',
    cardnum: '',
    isNotSubmit: true,
    cards: [],
  },
  onLoad: function (options) {
    this.countDown = new CountDown(this)
    this.countDown.setDisabledValue(false)
  },
  updateCardNum: function (e) {
    var that = this
    that.setData({
      cardnum: e.detail.value
    })
    var cardnums = that.data.cardnum
    if (!/(^\d{19}$)|(^\d{16}$)/.test(cardnums) || cardnums === '') {
      wx.showToast({
        title: '请输入正确的银行卡号',
        duration: 2000
      })
    }
  },
  updateName: function (e) {
    var that = this
    that.setData({
      cardname: e.detail.value
    });
    var names = that.data.cardname
    if (!/^[\u4e00-\u9fa5]/.test(names) || names === '') {
      wx.showToast({
        title: '请输入开户姓名',
        duration: 2000
      })
    }
  },
  updatePhone: function (e) {
    var that = this
    that.setData({
      phone: e.detail.value
    });
    var phones = that.data.phone
    if (!/^1[0-9]{10}$/.test(phones) || phones === '') {
      wx.showToast({
        title: '请输入正确的电话号码',
        duration: 2000
      })
    }
  },
  updateCode: function (e) {
    var that = this
    that.setData({
      code: e.detail.value
    });
  },
  // checkCardName: function (cardname) {
  //   if (!/^[\u4e00-\u9fa5]/.test(cardname) || cardname === '') {
  //     return false
  //   }
  //   return true
  // },
  //银行卡号
  // checkCardNum: function (cardnum) {
  //   if (!/(^\d{19}$)|(^\d{16}$)/.test(cardnum) || cardnum === '') {
  //     return false;
  //   }
  //   return true;
  // },
  //检查电话号码
  // checkPhone: function (phone) {
  //   if (!/^1[0-9]{10}$/.test(phone) || phone === '') {
  //     return false;
  //   }
  //   return true;
  // },
  checkCode: function (code) {
    if (!/[0-9]{6}$/.test(code)) {
      return false;
    }
    return true;
  },
  //获取验证码
  _getCode: function () {
    var that = this;
    that.countDown.run(60);
    that.setData({
      isNotSubmit: false
    }) 
  },
  formSubmit: function (e) {
    var that = this
    console.log("e.detail.value--> " + e.detail.value)
    wx.setStorageSync('cardlist', e.detail.value)
    wx.navigateBack({
      delta: 1
    })
    // for (var i in e.detail.value) {
    //   console.log("e.detail.value["+i+"]--> " + e.detail.value[i])
    // }
    // if (that.checkCardName(that.data.cardname) && that.checkCardNum(that.data.cardnum)) {
      

    //   wx.setStorageSync('cardlist', e.detail.value)
    //   wx.navigateBack({
    //     delta: 1
    //   })
    // } else if (!that.checkCardName(that.data.name)) {
    //   wx: wx.showModal({
    //     content: '名字格式不正确，请重新输入名字',
    //     success: function (res) {
    //       if (res.confirm) {
    //         console.log("用户点击确定")
    //       }
    //     }
    //   })
    // } else if (!that.checkCardNum(that.data.cardnum)) {
    //   wx: wx.showModal({
    //     content: '请输入正确的银行卡号',
    //     success: function (res) {
    //       if (res.confirm) {
    //         console.log("用户点击确定")
    //       }
    //     }
    //   })
    // }

  },
})