const app = getApp()
const windowWidth = app.globalData.windowWidth;
const rpxTurnIntopx = 750 / app.globalData.windowWidth
const my = require('../../common/js/my.js')
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
    noticeHeight : rpxTurnIntopx * (windowHeight - 50 - app.globalData.statusBarHeight) - 250,
    chooseHeight : rpxTurnIntopx * (windowHeight -115 - app.globalData.statusBarHeight) - 250,
    gradeCardTop: rpxTurnIntopx * (50 + app.globalData.statusBarHeight),
    recordBtnMessage: [
      { text: '大一第二学期', angleFlag: false, hidden: false },
      { text: '大二第一学期', angleFlag: true, hidden: true },
      { text: '大二第二学期', angleFlag: true, hidden: true }
    ],
  },
  onLoad: function () {
    console.log(app.globalData.statusBarHeight)
  },
    // 记录按钮
    choseClose (e) {
      let recordBtnMessage = this.data.recordBtnMessage
      let recorderBtnFlag = this.data.recorderBtnFlag
      if (recorderBtnFlag) {
        for (let i = 0; i < recordBtnMessage.length; i++) {
          recordBtnMessage[i].hidden = recordBtnMessage[i].angleFlag
        }// 隐藏所有按钮选项
        this.setData({
          recordBtnMessage: recordBtnMessage,
          recorderBtnFlag: false
        })
      }
    },
    // 打开选择年级
    recordChoose (e) {
      console.log(e.currentTarget.dataset.index)
      let recordBtnMessage = this.data.recordBtnMessage
      let recorderBtnFlag = this.data.recorderBtnFlag
      let index = e.currentTarget.dataset.index
      if (recorderBtnFlag) {
        // 打开
        my.openChooseBtn(this, recordBtnMessage, index)
      } else {
        // 关闭
        my.displayAllBtn(this, recordBtnMessage)
      }
    },
})
