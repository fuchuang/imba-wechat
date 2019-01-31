const app = getApp()

Page({
  data: {
    headTitle: app.globalData.statusBarHeight+10,
    headHeight: app.globalData.statusBarHeight+50,
    fooMassage:true,
    fooVideo:true,
    fooCommon:true,
    fooMy:true,
    title:'IMBA课程表'
   
  },
  onLoad: function () {
    console.log(app.globalData.statusBarHeight)
  }
})
