const app = getApp()
const windowWidth = app.globalData.windowWidth;
const windowHeight = app.globalData.windowHeight;
const rpxTurnIntopx = 750 / app.globalData.windowWidth

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
    noticeHeight: rpxTurnIntopx * (windowHeight - 50 - app.globalData.statusBarHeight) - 250,
    gradeCardTop: rpxTurnIntopx * (50 + app.globalData.statusBarHeight),
    // index的btn
    indexBtn:[
      { text: '点播', color: '#7c7c7c', borderColor: '#7c7c7c' },
      { text: '直播', color: '#7c7c7c', borderColor: 'transparent' },
      { text: '收录', color: '#7c7c7c', borderColor: 'transparent' }
    ],
    scrollSearch:[
      { text: '计算机' },
      { text: '哲学' },
      { text: '外语' },
      { text: '理学' },
      { text: '工学' },
      { text: '心理学' },
      { text: '计算机' },
      { text: '哲学' },
      { text: '外语' },
      { text: '理学' },
      { text: '工学' },
      { text: '心理学' }
    ]
  },
  onLoad: function () {

  }
})
