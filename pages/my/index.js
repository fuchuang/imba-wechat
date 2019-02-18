const app = getApp()
const mes = require('../../common/js/message.js');
const rpxTurnIntopx = 750 / app.globalData.windowWidth;
const windowWidth = app.globalData.windowWidth;
const windowHeight = app.globalData.windowHeight;
Page({
  data: {
    //公共属性
    headTitle: app.globalData.statusBarHeight + 10,
    headHeight: app.globalData.statusBarHeight + 50,
    classPosition: (750 - 100) / 2,
    fooMassage: true,
    fooVideo: true,
    fooCommon: true,
    fooMy: true,
    title: 'IMBA课程表',
    noticeHeight:0,
    gradeCardTop: rpxTurnIntopx * (50 + app.globalData.statusBarHeight),

    //按钮信息
    btnMessage:[
      { logoUrl: 'recordlogo', text: '考勤记录' ,btnEvent:'record'},
      { logoUrl: 'treelogo', text: '我们的树', btnEvent: 'tree' },
      { logoUrl: 'lovelogo', text: '个人收藏', btnEvent: 'love'},
      { logoUrl: 'historylogo', text: '浏览记录', btnEvent: 'history' },
      { logoUrl: 'tielogo', text: '我的帖子', btnEvent: 'tie'},
      { logoUrl: 'savelogo', text: '下载附件', btnEvent: 'save' },
    ],
    // 考勤按钮
    recorderBtnFlag:false,
    recordBtnMessage:[
      { text: '大一第二学期', angleFlag: false,hidden:false },
      { text: '大二第一学期', angleFlag: true, hidden: true },
      { text: '大二第二学期', angleFlag: true, hidden: true },
    ],
    listData: [
      { "code": "01", "text": "text1", "type": "type1" },
      { "code": "02", "text": "text2", "type": "type2" },
      { "code": "03", "text": "text3", "type": "type3" },
      { "code": "04", "text": "text4", "type": "type4" },
      { "code": "05", "text": "text5", "type": "type5" },
      { "code": "06", "text": "text6", "type": "type6" },
      { "code": "07", "text": "text7", "type": "type7" }
    ],
    recorderMessage:[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21]

  },
  onLoad: function () {
    console.log(app.globalData.statusBarHeight)
    let noticeHeight = rpxTurnIntopx * (windowHeight - 50 - app.globalData.statusBarHeight) - 250
    this.setData({
      noticeHeight: noticeHeight
    })
  },
  // 记录按钮
  choseClose(e){
    let recordBtnMessage = this.data.recordBtnMessage
    let recorderBtnFlag = this.data.recorderBtnFlag
    if (recorderBtnFlag){
      for (let i = 0; i < recordBtnMessage.length; i++) {
        recordBtnMessage[i].hidden = recordBtnMessage[i].angleFlag;
      }// 隐藏所有按钮选项
      this.setData({
        recordBtnMessage: recordBtnMessage,
        recorderBtnFlag: false
      })
    }

  },
  recordChoose(e){
    console.log(e.currentTarget.dataset.index)
    let recordBtnMessage = this.data.recordBtnMessage
    let recorderBtnFlag = this.data.recorderBtnFlag
    if (recorderBtnFlag) {
      // 打开
      let index = e.currentTarget.dataset.index
      for (let i = 0; i < recordBtnMessage.length; i++) {
        recordBtnMessage[i].hidden = true;
        recordBtnMessage[i].angleFlag = true;
      }// 隐藏所有按钮选项
      recordBtnMessage[index].hidden = false
      recordBtnMessage[index].angleFlag = false
      this.setData({
        recordBtnMessage: recordBtnMessage,
        recorderBtnFlag: false
      })
    }else{
      //关闭
      console.log(recordBtnMessage)
      for (let i = 0; i < recordBtnMessage.length; i++) {
        recordBtnMessage[i].hidden = false
      }// 显示所有按钮选项
      console.log(recordBtnMessage)
      this.setData({
        recordBtnMessage: recordBtnMessage,
        recorderBtnFlag:true
      })
    }

  }
})
