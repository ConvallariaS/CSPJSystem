//DBJob.js
/**用ES6 */
class DBJob {
  constructor(jobId) {
    this.storageKeyName = 'jobList'
    this.jobId = jobId
  }
  //得到全部信息
  getAllJobData() {
    var res = wx.getStorageSync(this.storageKeyName)
    if (!res) {
      res = require('../data/data.js').jobList
      this.execSetStorageSync(res)
    }
    return res
  }
  //保存或者更新缓存数据
  execSetStorageSync(data) {
    wx.setStorageSync(this.storageKeyName, data)
  }
  //获取指定ID号的job数据
  getJobItemById() {
    var jobsData = this.getAllJobData()
    var len = jobsData.length
    for (var i = 0; i < len; i++) {
      if (jobsData[i].jobId == this.jobId) {
        return {
          //当前job在缓存数据库数组中的序号
          index: i,
          data: jobsData[i]
        }
      }
    }
  }
  //获取指定title的job数据
  getJobItemByTitle() {
    var jobsData = this.getAllJobData()
    var len = jobsData.length
    for (var i = 0; i < len; i++) {
      if (jobsData[i].title == this.title) {
        return {
          //当前job在缓存数据库数组中的序号
          index: i,
          data: jobsData[i]
        }
      }
    }
  }
}
export { DBJob }