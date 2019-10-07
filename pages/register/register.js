// pages/register/register.js
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    num: 1937,
    name: '请刷新步数获取',
    steps: 0,
    hasData: false
  },

  getInput: function(e) {
    this.setData({
      num: e.detail.value
    })
  },

  /**
   * 上传步数
   */
  uploadSteps: function() {
    const self = this
    console.log(app.globalData.sessionId)
    wx.request({
      url: app.globalData.location + '/pedo/register.do',
      method: "GET",
      header: {
        'Cookie': "JSESSIONID=" + app.globalData.sessionId
      },
      success: function(res) {
        var content = '上传失败'
        if (res.data == 'success') {
          content = '上传成功'
          wx.setStorageSync("num", self.data.num)
          wx.setStorageSync("name", self.data.name)
        }
        wx.showModal({
          title: '提示',
          content: content,
          showCancel: false
        })
      },
      fail: function(res) {
        wx.showModal({
          title: '错误',
          content: '无法连接到服务器',
          showCancel: false
        })
      }
    })
  },

  /**
   * 获取步数
   */
  getSteps: function() {
    var self = this
    wx.login({
      success: function(resLogin) {
        if (resLogin.code) {
          wx.showLoading({
            title: '加载中..',
            mask: true
          })
          wx.request({
            url: app.globalData.location + '/pedo/login.do',
            method: 'GET',
            data: {
              code: resLogin.code
            },
            success: function(resSession) {
              wx.getWeRunData({
                success: function(resRun) {
                  wx.request({
                    url: app.globalData.location + '/pedo/getSteps.do',
                    method: 'GET',
                    data: {
                      stuNum: self.data.num,
                      encryptedData: resRun.encryptedData,
                      iv: resRun.iv,
                      code: resLogin.code
                    },
                    success: function(resDecrypt) {
                      if (resDecrypt.data.name != 'error') {
                        self.setData({
                          name: resDecrypt.data.name,
                          steps: resDecrypt.data.stepInfo.step
                        })
                        app.globalData.sessionId = resDecrypt.data.sessionId
                      } else {
                        wx.showModal({
                          title: '错误',
                          content: '读取运动信息失败',
                          showCancel: false
                        })
                      }
                    },
                  })
                }
              })
            },
            fail: function(res) {
              wx.showModal({
                title: '错误',
                content: '无法连接到服务器',
                showCancel: false
              })
            },
            complete: function(res) {
              setTimeout(function() {
                wx.hideLoading()
              }, 100)
            }
          })
        }
      },
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var num = wx.getStorageSync("num")
    var name = wx.getStorageSync("name")

    if (num && name) {
      this.setData({
        hasData: true,
        num: num,
        name: name
      })
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },
})