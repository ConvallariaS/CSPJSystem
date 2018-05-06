// pages/mine/myresume/editresume/editresume.js
Page({
  data: {
    dates: '2018-03-11',
    region: ['广东省', '广州市', '海珠区'],
    jobarr: [],
    jobindex: 0,
    educationarr: [],
    educationindex: 0,
    collegearr: [],
    collegeindex: 0,
    checkboxItems: [
      { name: '星期一', value: '星期一', checked: false },
      { name: '星期二', value: '星期二' },
      { name: '星期三', value: '星期三' },
      { name: '星期四', value: '星期四' },
      { name: '星期五', value: '星期五' },
      { name: '星期六', value: '星期六' },
      { name: '星期天', value: '星期天' },
    ],
    jobarr: ["请选择", "移动互联网", "销售", "电子电气", "嵌入式", "智能硬件", "UI设计", "2D/3D", "推广", "人力资源", "电子商务", "教育培训", "外语外贸", "金融", "法务", "广告", "媒体", "财会", "生物医药", "IT软件", "建筑房产", "其他"],
    educationarr: ["请选择", "博士", "硕士", "本科", "大专"],
    collegearr: ["请选择", "四川大学", "四川师范大学", "电子科技大学", "成都理工大学", "西南财经大学", "西南石油大学", "成都大学", "西华大学", "西南政法大学", "北京大学", "清华大学", "厦门大学", "南开大学"],
    allValue: "",

  },
  onLoad: function () {
    var that = this
    that.fetchData()
    that.setData({
      allValue: that.data.allValue
    })
  },
  fetchData: function () {
    var that = this
    that.setData({
      jobarr: ["请选择", "移动互联网", "销售", "电子电气", "嵌入式", "智能硬件", "UI设计", "2D/3D", "推广", "人力资源", "电子商务", "教育培训", "外语外贸", "金融", "法务", "广告", "媒体", "财会", "生物医药", "IT软件", "建筑房产", "其他"],
      educationarr: ["请选择", "博士", "硕士", "本科", "大专"],
      collegearr: ["请选择", "四川大学", "四川师范大学", "电子科技大学", "成都理工大学", "西南财经大学", "西南石油大学", "成都大学", "西华大学", "西南政法大学", "北京大学", "清华大学", "厦门大学", "南开大学"]
    })
  },
  bindRegionPickerChange: function (e) {
    var that = this
    console.log("region = " + e.detail.value)
    that.setData({
      region: e.detail.value,
    })
  },
  bindJobPickerChange: function (e) {
    var that = this
    console.log("jobindex = " + e.detail.value)
    that.setData({
      jobindex: e.detail.value,
    })
  },
  bindCollegePickerChange: function (e) {
    var that = this
    console.log("collegeindex = " + e.detail.value)
    that.setData({
      collegeindex: e.detail.value,
    })
  },
  bindEducationPickerChange: function (e) {
    var that = this
    console.log("educationindex = " + e.detail.value)
    that.setData({
      educationindex: e.detail.value,
    })
  },
  bindDatesPickerChange: function (e) {
    var that = this
    console.log("dates = "+ e.detail.value)
    that.setData({
      dates: e.detail.value,
    })
  },
  checkboxChange: function (e) {
    var that = this
    var checkboxItems = that.data.checkboxItems
    var values = e.detail.value
    for (var i = 0, lenI = checkboxItems.length; i < lenI; ++i) {
      checkboxItems[i].checked = false
      for (var j = 0, lenJ = values.length; j < lenJ; ++j) {
        if (checkboxItems[i].value == values[j]) {
          checkboxItems[i].checked = true
          break;
        }
      }
    }
    that.setData({
      checkboxItems: checkboxItems
    })
    console.log("formData job = " + e.detail.value)
  },
  updateResumeName: function (e) {
    var that = this
      that.setData({
        resumename: e.detail.value
      })
  },
  updateResumePhone: function (e) {
    var that = this
      that.setData({
        resumephone: e.detail.value
      })
  },
  updateResumeIdCard: function (e) {
    var that = this
    that.setData({
      resumeIdcard: e.detail.value
    })
  },
  checkResumeName: function (resumeName) {
    if (!/^[\u4e00-\u9fa5]/.test(resumeName) || resumeName === '') {
      return false
    }
    return true
  },
  checkResumePhone: function (resumePhone) {
    if (!/^1[0-9]{10}$/.test(resumePhone) || resumePhone === '') {
      return false
    }
    return true
  },
  checkResumeIdCard: function (resumeIdCard) {
    if (!/(^\d{17}([0-9]|X)$)/.test(resumeIdCard) || resumeIdCard === '') {
      return false
    }
    return true
  },
  isValid: function (formData) {
    var that = this
    if (!that.checkResumeName(formData.resumename)) {
      that.showModal("请输入中文姓名");
      return false;
    } else if (!that.checkResumePhone(formData.resumephone)) {
      that.showModal("请输入11位手机号");
      return false;
    } else if (!that.checkResumeIdCard(formData.resumeIdcard)) {
      that.showModal("请输入18位身份证号");
      return false;
    } else if (formData.pickercity == '') {
      that.showModal("请选择求职城市");
      return false;
    } else if (formData.pickerjob == '') {
      that.showModal("请选择求职意向");
      return false;
    } else if (formData.pickercollege == '') {
      that.showModal("请选择毕业院校");
      return false;
    } else if (formData.pickereducation == '') {
      that.showModal("请选择最高学历");
      return false;
    } else if (formData.pickerdates == '') {
      that.showModal("请选择入学时间");
      return false;
    } else if (formData.checkboxfreetime == '') {
      that.showModal("请选择空闲时间");
      return false;
    }
    return true;
  },
  formSubmit: function (e) {
    var that = this
    console.log("form --->" + e.detail.value)
    var formData = e.detail.value
    console.log("formData job = " + that.data.jobarr[e.detail.value.checkboxfreetime])
    if (that.isValid(formData)) {
      that.setData({
        allValue: e.detail.value
      })
      wx.showModal({
        content: '已保存简历信息',
        showCancel: false,
        success: function (res) {
          wx.setStorageSync('allvalue', that.data.allValue)
          wx.setStorageSync('pickerjob', that.data.jobarr[e.detail.value.pickerjob])
          wx.setStorageSync('pickercollege', that.data.collegearr[e.detail.value.pickercollege])
          wx.setStorageSync('pickereducation', that.data.educationarr[e.detail.value.pickereducation])
          wx.redirectTo({
            url: '../myresume',
          })
        },
      })
    } 
  },
  formReset: function (e) {
    var that = this
    wx.showModal({
      content: '确定要重置简历信息吗？',
      showCancel: true,
      success: function (res) {
        if (res.confirm) {
          that.setData({
            allValue: ""
          })
        }
      },
    })
  },
  showModal: function (content) {
    wx.showModal({
      title: '提示',
      showCancel: false,
      confirmText: '知道了',
      content: content
    })
  }
})