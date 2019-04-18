const app = getApp()
const mes = require('../../common/js/message.js')
const rpxTurnIntopx = 750 / app.globalData.windowWidth
const windowWidth = app.globalData.windowWidth
const windowHeight = app.globalData.windowHeight
let message = {
// 信息定位
    // 绩点定位
    cardTop: rpxTurnIntopx * (70 + app.globalData.statusBarHeight) + 220,
    //  页面切换
    path: '../../common/xml/message/messageTeacher.wxml',
    pageControll: {
      messageIndex: false,
      messageGrade: true,
      messageNotice: true,
      messageTeacher: true,
      messageExam: true,
      messageChoose: true,
      messageAdd: true
    },
    secondPagse: true,
    secondPageControll: {
      messageNotice: true,
      messageTeacher: true,
      messageChoose: true,
      messageAdd1: true,
      messageAdd2: true
    },
    // 成绩信息
    gradeMessage: [ ],
    // 具体成绩
    detailGrade: [ ],
    // 成绩页面的按钮信息
    gradeBtnOpen: false,
    gradeBtnMessage: [
      {
        title: '大一下学期',
        message: '',
        angleFlag: false,
        flag: false,
        detailGrade: []
      },
      {
        title: '大二下学期',
        message: '',
        angleFlag: true,
        flag: true,
        detailGrade: []
      },
      {
        title: '大三下学期',
        message: '',
        angleFlag: true,
        flag: true,
        detailGrade: []
      }
    ],
    // 教师信息
    teacherMessage: [
     
    ],
    // 考试信息
    examMessage: [
      ],
    // 按钮信息
    btnMessage: [
      [
        {
          key: 'left1',
          btnTitle: '成绩查询',
          bindEvent: 'messageGrade',
          url: 'message_logo(1)',
          flag: false
        },
        { key: 'right1', btnTitle: '教务通知', bindEvent: 'messageNotice', url: 'message_logo(2)', flag: false }
      ],
      [
        { key: 'left2', btnTitle: '教师信息', bindEvent: 'messageTeacher', url: 'message_logo(3)', flag: false },
        { key: 'right2', btnTitle: '考试安排', bindEvent: 'messageExam', url: 'message_logo(4)', flag: false }
      ],
      [
        { key: 'left3', btnTitle: '选课宝典', bindEvent: 'messageChoose', url: 'message_logo(5)', flag: false },
        { key: 'right3', btnTitle: '', bindEvent: 'messageAdd', url: 'message_add', flag: true }
      ]
    ],
    // 教务通知信息

    noticeMessage: [],
    // 选课宝典的内容高度
    windowHeight: app.globalData.windowHeight,
    chooseHeight: 0,
    chooseBGColor: '#29C1F2',
    chooseBtn: [
      { title: '人文科学', bgColor: '#51D6FF' },
      { title: '自然科学', bgColor: '#49F7C2' },
      { title: '创新创业', bgColor: '#FEBF50' }
    ],
    // 宝典的课程
    chooseClass: [
      { title: '中国建筑', teacher: '王阳', zan: false, num: 123 },
      { title: '中国建筑1', teacher: '王阳', zan: false, num: 123 },
      { title: '中国建筑2', teacher: '王阳', zan: false, num: 123 },
      { title: '中国建筑3', teacher: '王阳', zan: false, num: 123 },
      { title: '中国建筑4', teacher: '王阳', zan: false, num: 123 }
    ]
}

    
  // 首页窗口
  let btnEvent= function (str, that, URL) {
    // 请求
    let cookies = wx.getStorageSync('cookies')
    console.log(str);
    
    if(str === 'messageGrade') {
      mes.fucBtnEvent.getGrade(URL, cookies, that)
    }
    if(str==='messageNotice') {
      // 教务通知
      mes.fucBtnEvent.getNoticeList(URL,cookies, that) 
    }
    if(str==='messageTeacher') {
      // 教师信息
      mes.fucBtnEvent.getTeacherList(URL, cookies, that)
    }
    if(str=='messageExam') {
      mes.fucBtnEvent.getExamMessage(URL, cookies, that)
    }
    /// messageAdd
    if(str==='messageAdd') {
      mes.fucBtnEvent.getAddMore(URL,cookies,that)
    }
    
    
          
    mes.turnInOther(str, that)
    
  },
  // 选择 成绩对应的日期
  choseGradeData= function (e) {
    let flag = this.data.gradeBtnOpen
    let gradeBtnMessage = this.data.gradeBtnMessage
    if (!flag) {
      // 关闭
      for (var i = 0; i < gradeBtnMessage.length; i++) {
        gradeBtnMessage[i].flag = false 
      }
    } else {
      // 打开
      let index = e.currentTarget.dataset.index
      for (var i = 0; i < gradeBtnMessage.length; i++) {
        if (i != index) {
          gradeBtnMessage[i].flag = true
          gradeBtnMessage[i].angleFlag = true
          
        } else {
          gradeBtnMessage[i].angleFlag = false
        }
      }
    }
    this.setData({
      gradeBtnMessage: gradeBtnMessage,
      gradeBtnOpen: !flag
    })
  },
  // 关闭成绩选择窗口
  choseClose = function (e) {
    let flag = this.data.gradeBtnOpen
    let gradeBtnMessage = this.data.gradeBtnMessage
    for (var i = 0; i < gradeBtnMessage.length; i++) {
      gradeBtnMessage[i].flag = gradeBtnMessage[i].angleFlag
    }
    this.setData({
      gradeBtnMessage: gradeBtnMessage,
      gradeBtnOpen: !flag
    })
  },
  //  返回键
  returnIndex = function (e) {
    let secondPagse = this.data.secondPagse
    let secondPageControll = this.data.secondPageControll
    let str = 'messageIndex'
    let flag = true
    if (!secondPagse) {
      mes.turnInOther(str, this)
      // console.log('321')
    } else{
      // 返回二级页面
      for (let i in secondPageControll) {
        if (secondPageControll[i] === false) {
          str = i
          flag = false
        }
      }
      if (flag) {
        // 如果没有进一步进入第三级
        mes.turnInOther(str, this)
      } else {
        mes.returnSecond(str, this)
      }
    }
  },
  // 教务通知事件
  noticeEvent = function (e) {
    let str = e.currentTarget.dataset.message
    // if(noticeDetail)
    if ('noticeDetail' === e.currentTarget.dataset.type) {
      // 处理数据
     
      this.setData({
        noticeMessageDetauil:e.currentTarget.dataset.item
      })
    }
    mes.turnInSecond(str, this)
  },
  // 选课宝典时间
  chooseEvent =function (e) {
    let str = e.currentTarget.dataset.message
    mes.turnInSecond(str, this)
  },
  // 宝典内部按钮
  chooseBtn = function(e) {
    let color = e.currentTarget.dataset.color
    this.setData({
      chooseBGColor: color
    })
  },
  // 比赛信息事件
  addEvent= function (e) {
    let str = e.currentTarget.dataset.message
    let index = e.currentTarget.dataset.kind
    mes.turnInSecond(str, this, index)
  }
  let fuc = {
    addEvent :addEvent,
    chooseBtn :chooseBtn,
    chooseEvent :chooseEvent,
    noticeEvent :noticeEvent,
    returnIndex :returnIndex,
    choseClose :choseClose, 
    choseGradeData: choseGradeData,
    btnEvent :btnEvent
    
  }
  module.exports = {
    fuc :fuc,
    message : message
  }