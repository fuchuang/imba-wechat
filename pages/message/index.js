const app = getApp()
const mes = require('../../common/js/message.js')
const classContain = require('../../common/js/classContain.js')
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
      { title: '人文科学', bgColor: '#51D6FF' ,class:[
        { title: '基础日语', teacher: '王阳', zan: false, num: 123 },
        { title: '旅游英语', teacher: '程远', zan: false, num: 123 },
        { title: '中国建筑赏析', teacher: '王鑫', zan: false, num: 123 },
        { title: '旅行日语', teacher: '王阳', zan: false, num: 123 },
        { title: '西班牙舞蹈', teacher: '刘越', zan: false, num: 123 }
      ]},
      { title: '自然科学', bgColor: '#49F7C2' ,class:[
        { title: '植物赏析', teacher: '王阳', zan: false, num: 123 },
        { title: '园林设计', teacher: '程远', zan: false, num: 123 },
        { title: '服装设计', teacher: '王鑫', zan: false, num: 123 }
      ]},
      { title: '创新创业', bgColor: '#FEBF50' ,class:[
        { title: '创业项目', teacher: '王阳', zan: false, num: 123 },
        { title: '广告设计', teacher: '程远', zan: false, num: 123 },
        { title: '无人机设计', teacher: '王鑫', zan: false, num: 123 }
      ]}
    ],
    // 宝典的课程
    chooseClass: [
      { title: '基础日语', teacher: '王阳', zan: false, num: 123 },
      { title: '旅游英语', teacher: '程远', zan: false, num: 123 },
      { title: '中国建筑赏析', teacher: '王鑫', zan: false, num: 123 },
      { title: '旅行日语', teacher: '王阳', zan: false, num: 123 },
      { title: '西班牙舞蹈', teacher: '刘越', zan: false, num: 123 }
    ],
    chooseClassDetail:{}
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
      let item =e.currentTarget.dataset.item
      console.log(item);
      item.notiTitle='"关于举办2018年新入职教师岗前培训"'
      this.setData({
        noticeMessageDetauil:item
      })
    }
    mes.turnInSecond(str, this)
  },
  // 选课宝典时间
  chooseEvent =function (e) {
    let str = e.currentTarget.dataset.message
    // 数据绑定
    let item =e.currentTarget.dataset.item
    console.log(e.currentTarget.dataset.item);
    let chooseClassDetail={
      content:[
        {name:'授课名称',value:item.title},
        {name:'授课教师',value:item.teacher},
        {name:'学分',value:1.5},
        {name:'总学时',value:'1-16周'}
      ],
      comment:[
        {name:'小明',content:'老师人很好',time:'2019-1-21',imageUrl:'https://www.gdutrex.xyz/imba/ladyStu.png'},
        {name:'小刚',content:'受益匪浅',time:'2019-1-21',imageUrl:'https://www.gdutrex.xyz/imba/ladyStu.png'},
        {name:'小杰',content:'不错 老师认真负责',time:'2019-1-21',imageUrl:'https://www.gdutrex.xyz/imba/ladyStu.png'}
      ]
    }
    this.setData({
      chooseClassDetail:chooseClassDetail
      // chooseClass:chooseBtn[index]
    })
    console.log(1);
    
    mes.turnInSecond(str, this)
  },
  // 宝典内部按钮
  chooseBtn = function(e) {
    let color = e.currentTarget.dataset.color
    let item =e.currentTarget.dataset.item

    this.setData({
      chooseClass:item.class,
      chooseBGColor: color
    })
  },
  // 比赛信息事件
  addEvent= function (e) {
    let str = e.currentTarget.dataset.message
    let index = e.currentTarget.dataset.kind
    if(str === 'messageAdd' ){
    // 比赛信息
      let item = e.currentTarget.dataset.item
      console.log(item);
      this.setData({
        messageContent:{
          title:item.matchTitle,
          content:'通过开展服务外包创新创业能力竞赛，引导和促进高校加强服务外包人才培养，为服务外包产业发展提供人才保障；推动大学生关注服务外包，关注服务外包企业就业机会；促进高校教育改革，使人才培养方向更紧密贴合新兴产业发展的需要。同时，大赛将坚持公益性、公开性、公正性，努力打造人才培养和产业发展互动融合、选才用才的典范。'
        }
      })
    }
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
    btnEvent :btnEvent,
    //添加到 class
    addExamToClass:function(e) {
      let index=e.currentTarget.dataset.index
      console.log(this.data.examMessage[index].addMessage)
      let data =this.data.examMessage[index].addMessage
      let start = parseInt(data.start.split(':')[0]) -7
      let selectWeeks =[true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true]
      selectWeeks[data.week]=false
      this.setData({
        [`examMessage[${index}].flag`]:true
      })
      classContain.fcu.addClassContain(this,start,selectWeeks,data.teacherName,data.title,data.position,2)
      //添加成功
      wx.showToast({
        title:"添加成功"
      })
    }
  }
  module.exports = {
    fuc :fuc,
    message : message
  }