const app = getApp()
const my = require('../../common/js/my.js')
const rpxTurnIntopx = 750 / app.globalData.windowWidth
const windowWidth = app.globalData.windowWidth
const windowHeight = app.globalData.windowHeight
Page({
  data: {
    // 公共属性
    headTitle: app.globalData.statusBarHeight + 10,
    headHeight: app.globalData.statusBarHeight + 50,
    classPosition: (750 - 100) / 2,
    fooMassage: true,
    fooVideo: true,
    fooCommon: true,
    fooMy: true,
    title: 'IMBA课程表',
    noticeHeight: 0,
    gradeCardTop: rpxTurnIntopx * (50 + app.globalData.statusBarHeight),

    // 按钮信息
    btnMessage: [
      { logoUrl: 'recordlogo', text: '考勤记录', btnEvent: 'record' },
      { logoUrl: 'treelogo', text: '我们的树', btnEvent: 'tree' },
      { logoUrl: 'lovelogo', text: '个人收藏', btnEvent: 'love' },
      { logoUrl: 'historylogo', text: '浏览记录', btnEvent: 'history' },
      { logoUrl: 'tielogo', text: '我的帖子', btnEvent: 'tie' },
      { logoUrl: 'savelogo', text: '下载附件', btnEvent: 'save' }
    ],
    // 考勤按钮
    recorderBtnFlag: false,
    recordBtnMessage: [
      { text: '大一第二学期', angleFlag: false, hidden: false },
      { text: '大二第一学期', angleFlag: true, hidden: true },
      { text: '大二第二学期', angleFlag: true, hidden: true }
    ],
    listData: [
      { 'code': '01', 'text': 'text1', 'type': 'type1' },
      { 'code': '02', 'text': 'text2', 'type': 'type2' },
      { 'code': '03', 'text': 'text3', 'type': 'type3' },
      { 'code': '04', 'text': 'text4', 'type': 'type4' },
      { 'code': '05', 'text': 'text5', 'type': 'type5' },
      { 'code': '06', 'text': 'text6', 'type': 'type6' },
      { 'code': '07', 'text': 'text7', 'type': 'type7' }
    ],
    displayRecorderMessage: [1, 2, 3, 4, 5, 6, 7, 8],
    recorderMessage: [
      { className: '高数英语', record: [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1], displayRecord: [0, 1, 1, 1, 1, 1, 1, 1] },
      { className: '体育育育育育育育育育育育育育', record: [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1], displayRecord: [0, 1, 1, 1, 1, 1, 1, 1] },
      { className: '大学英语', record: [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1], displayRecord: [0, 1, 1, 1, 1, 1, 1, 1] }
    ],
    // 收藏
    chooseBtn: [
      { title: '通知', bgColor: '#51D6FF' },
      { title: '视频', bgColor: '#49F7C2' },
      { title: '公选课', bgColor: '#FEBF50' }
    ],
    chooseClass: [
      { title: '中国建筑', teacher: '王阳', zan: false, num: 123 },
      { title: '中国建筑1', teacher: '王阳', zan: false, num: 123 },
      { title: '中国建筑2', teacher: '王阳', zan: false, num: 123 },
      { title: '中国建筑3', teacher: '王阳', zan: false, num: 123 },
      { title: '中国建筑4', teacher: '王阳', zan: false, num: 123 }
    ],
    noticeMessage: [
      {
        title: '教务处',
        contain: '热烈欢迎',
        hasRead: false
      },
      {
        title: '教务处',
        contain: '热烈欢迎',
        hasRead: false
      },      
      {
        title: '教务处',
        contain: '热烈欢迎',
        hasRead: false
      },
      {
        title: '教务处',
        contain: '热烈欢迎',
        hasRead: false
      },
      {
        title: '教务处',
        contain: '热烈欢迎',
        hasRead: false
      },
      {
        title: '教务处',
        contain: '热烈欢迎',
        hasRead: false
      },
      {
        title: '教务处',
        contain: '热烈欢迎',
        hasRead: false
      },
      {
        title: '教务处',
        contain: '热烈欢迎',
        hasRead: false
      },
    ]
  },
  onLoad: function () {
    console.log(app.globalData.statusBarHeight)
    let noticeHeight = rpxTurnIntopx * (windowHeight - 50 - app.globalData.statusBarHeight) - 250
    this.setData({
      noticeHeight: noticeHeight
    })
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
  recordBtn (e) {
    let rotation = e.currentTarget.dataset.rotation
    if (rotation === 'right') {
      // 进行转换
      my.recordBtn(this, 8, 1, 17)
    } else {
      // left
      my.recordBtn(this, -8, 2, 18)
    }
  }
})
