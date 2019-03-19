const app = getApp();
const index = require('../index/index.js');
const common = require('../common/index.js');
const message = require('../message/index.js');
const video = require('../video/index.js');
const my = require('../my/index.js');
const classContainJS = require('../../common/js/classContain.js');

Page({
  data: {
    // 内容 用户账号密码
    userName:'',
    password:'',
    classInfo:'',
    info:'',
    type:'',
    //公用属性
    headTitle: app.globalData.statusBarHeight+10,
    headHeight: app.globalData.statusBarHeight+50,
    classPosition: (750- 100)/2,
    fooMassage: true,
    fooVideo: true,
    fooCommon: true,
    fooMy: true,
    title: 'IMBA课程表',
    gradeCardTop: common.message.gradeCardTop,
    mygradeCardTop : my.message.gradeCardTop,
    noticeHeight : common.message.noticeHeight,
    chooseHeight : common.message.chooseHeight,
    //内容定位
    weekAndDataPosTop: index.message.weekAndDataPosTop,
    containPosTop: index.message.containPosTop,
    containPosHeight: index.message.containPosHeight,
    //x选择周次
    chooseWeek:true,
    testNum:1,
    //菜单
    chooseMenu:true,
    //弹出框信息
    setNowWeek: index.message.setNowWeek,
    addClassMes:index.message.addClassMes,
    shareClass:index.message.shareClass,
    sendDanMu:index.message.sendDanMu,
    classContainDetail:index.message.classContainDetail,
    // 当前日期
    nowData:index.message.nowData,
    //课程表和签筒切换
    isClass:true,
    qianTongHeight: index.message.qianTongHeight,
    qiantongClassContain:index.message.qiantongClassContain,
    //弹幕样式
    classDanmu: index.message.classDanmu,
    weekNums: index.message.weekNums,
    gradeNums: index.message.gradeNums,
    menuNums: index.message.menuNums,
    classContain:index.message.classContain,
    // foot导航
    footPage: index.message.footPage,

    // common data
    recordBtnMessage: common.message.recordBtnMessage,
    cardTop : message.message.cardTop,
    /* titlebtn 信息 */
    CommonindexBtn:common.message.indexBtn,
    /* 首页按钮的内容 */
    CommonpageContainControll:0,
    pageSecond:common.message.pageSecond,
    pageClassSecond:common.message.pageClassSecond,
    pageCommonSecond:common.message.pageCommonSecond,

    /* 班群信息 */
    classMessage:common.message.classMessage,
    /* 下载附件的信息 */
    downloadMessage:common.message.downloadMessage,
    // message  data
    path:message.message.path,
    pageControll:message.message.pageControll,
    secondPagse:message.message.secondPagse,
    secondPageControll:message.message.secondPageControll,
    gradeMessage:message.message.gradeMessage,
    detailGrade:message.message.detailGrade,

    gradeBtnOpen:message.message.gradeBtnOpen,
    gradeBtnMessage:message.message.gradeBtnMessage,
    teacherMessage:message.message.teacherMessage,
    examMessage:message.message.examMessage,

    btnMessage:message.message.btnMessage,
    noticeMessage:message.message.noticeMessage,
    windowHeight:message.message.windowHeight,
  
    chooseBGColor:message.message.chooseBGColor,
    chooseBtn:message.message.chooseBtn,
    chooseClass:message.message.chooseClass,

    // my data 
    mybtnMessage: my.message.btnMessage,
    secondPageTextColor: my.message.secondPageTextColor,
    mypageSecond: my.message.pageSecond,
    recorderBtnFlag: my.message.recorderBtnFlag,
    MyrecordBtnMessage: my.message.recordBtnMessage,
    listData: my.message.listData,
    displayRecorderMessage: my.message.displayRecorderMessage,
    recorderMessage: my.message.recorderMessage,
    collectBtn: my.message.collectBtn,
    collectContainControll: my.message.collectContainControll,
    collectChooseClass: my.message.collectChooseClass,
    collectnoticeMessage: my.message.collectnoticeMessage,
    myTieBtn: my.message.myTieBtn,
    historyBtn: my.message.historyBtn,
    historynoticeMessage: my.message.historynoticeMessage,

    // video data
    Video_indexBtn : video.message.indexBtn,
    scrollSearch : video.message.scrollSearch,
    Video_pageContainControll : video.message.pageContainControll,
  },
  onLoad: function (option) {
    // 判断缓存有没有setWeek
    let flag = option.flag
    // console.log(option.classContain);
    let classContain = option.classContain;
    
    // classContain =   JSON.parse(option.classContain)//
    // console.log(flag,JSON.parse(classContain));
    
      
    if (flag === 'false'){
      classContain = classContainJS.fcu.get24WeekClassContain(this, classContain)
      wx.setStorageSync('classContain', classContain)
    } else {
      classContain =JSON.parse(classContain)
    }


    // 判断是否发生 跳转
    this.setData({
      userName : option.userName,
      password: option.password,
      classInfo : option.classInfo,
      info : option.info,
      type : option.type,
      classContain:classContain// 课程表
    })
    //获取周次选择文字宽度
    index.fuc.onload(this)
    // console.log(classContain);
   
  },

  // 选择周次
  chooseWeekEvent: index.fuc.chooseWeekEvent,
  //关闭菜单
  clooseOpenMenuAndWC: index.fuc.clooseOpenMenuAndWC,
  //打开菜单
  chooseMenuEvent:index.fuc.chooseMenuEvent,
  //菜单点击事件
  menuBindEvent:index.fuc.menuBindEvent,
  //关闭设置弹出框
  closeTan:index.fuc.closeTan,
  // 确定设置周次
  changeValue:index.fuc.changeValue,
  //课程详情点击
  classContainDetail:index.fuc.classContainDetail,
  // 添加课程 滚动第一节课 改变第二节的上限
  changeFirstClass:index.fuc.changeFirstClass,
  addClassSelectWeeks:index.fuc.addClassSelectWeeks,
  addClassSelectWeeksInput:index.fuc.addClassSelectWeeksInput,
  // 改变课程表显示模式
  changeClassStyle: index.fuc.changeClassStyle,
  // 底部导航
  navigatorFooter : index.fuc.navigatorFooter,
  // 切换周次
  selectWeek : index.fuc.selectWeek,
  determineTan : index.fuc.determineTan,
  // common 的事件
  choseClose : common.fuc.choseClose,
  recordChoose : common.fuc.recordChoose,
  CommonindexBtn : common.fuc.indexBtn,
  classBtn : common.fuc.classBtn,
  //video 事件
  Video_indexBtn : video.fuc.indexBtn,
  // message 事件
  addEvent :message.fuc.addEvent,
  chooseBtn :message.fuc.chooseBtn,
  chooseEvent :message.fuc.chooseEvent,
  noticeEvent :message.fuc.noticeEvent,
  message_returnIndex :message.fuc.returnIndex,
  choseClose :message.fuc.choseClose, 
  choseGradeData: message.fuc.choseGradeData,
  btnEvent : function(e) {
    console.log(1);
    
    let query = new wx.BaaS.Query()
    let that =this
    // 触发对应的按钮
    let str = e.currentTarget.dataset.message
    if (str === 'messageGrade') {
      // 成绩请求
      let userName = this.data.userName
     // let query = new wx.BaaS.Query()
      let tableId = 'studentGrade'
      let Product = new wx.BaaS.TableObject(tableId)
     query.contains('useId', userName)
     wx.showLoading({
       title:'加载中'
     })
     Product.find().then(res => {
      console.log(res)
      // 跳转
      message.fuc.btnEvent(str, that)
    }, err => {
      // err
    })
    }
    

  },


  // my事件
  returnIndex :my.fuc.returnIndex,
  turnToNext : my.fuc.turnToNext,
  recordBtn :my.fuc.recordBtn,
  recordChoose :my.fuc.recordChoose,
  choseClose:my.fuc.choseClose,
  collectBtn:my.fuc.collectBtn,


})
