//app.js
App({
  globalData: {
    userInfo: null,
    sessionId: null,
    location: null,
  },
  onLaunch: function() {
    this.globalData.location = 'http://www.ciaochaos.com:8080'
  }
})