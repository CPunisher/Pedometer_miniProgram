// pages/rank/rank.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    listData: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var self = this
    wx.request({
      url: app.globalData.location + "/pedo/rankDataAll.do",
      method: "POST",
      success: function(res) {
        for (var i = 0; i < res.data.length; i++) {
          res.data[i]["distance"] = (res.data[i]["steps"] * 0.57).toFixed(0)
        }
        self.setData({listData: res.data})
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})