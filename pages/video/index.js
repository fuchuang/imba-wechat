const app = getApp()
const windowWidth = app.globalData.windowWidth;
const windowHeight = app.globalData.windowHeight;
Page({
  data: {
    headTitle: app.globalData.statusBarHeight + 10,
    headHeight: app.globalData.statusBarHeight + 50,
    classPosition: (750 - 100) / 2,
    fooMassage: true,
    fooVideo: true,
    fooCommon: true,
    fooMy: true,
    title: 'IMBA课程表',
   
  },
  onLoad: function () {
    console.log(app.globalData.statusBarHeight)
  }
})
