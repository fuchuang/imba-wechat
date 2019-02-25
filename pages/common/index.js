const app = getApp()
const windowWidth = app.globalData.windowWidth;
const rpxTurnIntopx = 750 / app.globalData.windowWidth
const my = require('../../common/js/my.js');
const util = require('../../common/js/util.js')
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

    /* titlebtn 信息 */
    indexBtn:[
      { text: '班群', color: '#28C1F1', borderColor: '#28C1F1' },
      { text: '社区', color: '#7c7c7c', borderColor: 'transparent' }
    ],
    /* 首页按钮的内容 */
    pageContainControll:0,
    pageSecond:{
      commonIndex:true,
      classMessage:true,
      commonDetail:false
    },
    pageClassSecond:{
      classIndex:false,
      download:true,
      calssDetail:true
    },

    /* 班群信息 */
    classMessage:[
      {title:'线性代数',teacher:'李玉',nums:'67',bgColor:'#38FBBF'},
      {title:'线性代数',teacher:'李玉',nums:'67',bgColor:'#51D6FF'},
      {title:'线性代数',teacher:'李玉',nums:'67',bgColor:'#FFC853'}

    ],
    /* 下载附件的信息 */
    downloadMessage:[
      {fileName:'线性代数',fileType:1,fileSize:'11.8k',time:'1-14'},
      {fileName:'线性代数',fileType:2,fileSize:'11.8k',time:'1-14'},
      {fileName:'线性代数',fileType:1,fileSize:'11.8k',time:'1-14'}
    ]
  },
  onLoad: function () {
    console.log(3%3)
    
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
    /* btnTitle */
    indexBtn (e) {
      util.indexBtn(e,this)
    },
    /* 班群里面的按钮 */
    classBtn (e) {
      let page = e.currentTarget.dataset.page
      let str = e.currentTarget.dataset.str
      let pageStr = this.data[page]
      console.log(pageStr)
      for (let i in pageStr) {
        i === str? pageStr[i] = false:pageStr[i] = true;
      }
      console.log(pageStr)
      this.setData({
        [page] : pageStr
      })
    }
})