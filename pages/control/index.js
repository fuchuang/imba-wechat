const app = getApp();
const index = require('../index/index.js');
const common = require('../common/index.js');
const message = require('../message/index.js');
const video = require('../video/index.js');
const my = require('../my/index.js');
const classContainJS = require('../../common/js/classContain.js');
const getDataBase = require('../../common/js/getDatabase')
const URL = 'https://campus.gbdev.cn:8080/IMBA'
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
    // 弹幕内容
    danContent:index.message.danContent,
    // add danmu
    //相机高度
    cameraHeight:index.message.cameraHeight,
    addContenAboutDM:index.message.addContenAboutDM,
    //弹幕样式
    classDanmu: index.message.classDanmu,
    weekNums: index.message.weekNums,
    gradeNums: index.message.gradeNums,
    menuNums: index.message.menuNums,
    classContain:index.message.classContain,
    // foot导航
    footPage: index.message.footPage,
    alertEveryDay:true,
    // common data
    recordBtnMessage: common.message.recordBtnMessage,
    cardTop : message.message.cardTop,
    /* titlebtn 信息 */
    CommonindexBtn:common.message.indexBtn,
    // tag的信息
    tag:[{name:'艺术',flag:true},{name:'理科',flag:true},{name:'工科',flag:true},{name:'文科',flag:true},{name:'比赛',flag:true}],
    /* 首页按钮的内容 */
    CommonpageContainControll:0,
    pageSecond:common.message.pageSecond,
    pageClassSecond:common.message.pageClassSecond,
    pageCommonSecond:common.message.pageCommonSecond,
    // 签到按钮
    isArrayClass:false,
    /* 班群信息 */
    classMessage:common.message.classMessage,
    classDetialPeople:common.message.classMessagePeople,
    tieMessage:[],
    //帖子具体信息
    tieDetailMessage:{},
    // common 搜索
    searchMessage:{},
    // common 发问题
    questionMessage:{},
    // 班群签到的按钮的信息
    classMessageDetial:common.message.classMessageDetial,
    classMessageDetialNoti:[],
    classMessageDetialNotiLength:0,
    // notice
    noticeMessageDetauil:{},
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
// addMessage
    addMessage:[],
    btnMessage:message.message.btnMessage,
    
    noticeMessage:message.message.noticeMessage,
    windowHeight:message.message.windowHeight,
  
    chooseBGColor:message.message.chooseBGColor,
    chooseBtn:message.message.chooseBtn,
    chooseClass:message.message.chooseClass,

    // my data 
    // 排行
    getTree:[],
    mybtnMessage: my.message.btnMessage,
    secondPageTextColor: my.message.secondPageTextColor,
    mypageSecond: my.message.pageSecond,
    recorderBtnFlag: my.message.recorderBtnFlag,
    MyrecordBtnMessage: my.message.recordBtnMessage,
    listData: my.message.listData,
    displayRecorderMessage: my.message.displayRecorderMessage,
    recorderMessage: my.message.recorderMessage,
    collectBtn: my.message.collectBtn,
    // 个人帖子的
    noticeMessageIndex:0,
    myNoticeMessage:[],
    myTieBtn: my.message.myTieBtn,
    historyBtn: my.message.historyBtn,
// // mySecond 三级页面
//     mySecond:{
//       choose:true,
//       video:true,
//       tie:true
//     },
    //   个人信息
    myMessage:{},
    // video data
    Video_indexBtn : video.message.indexBtn,
    scrollSearch : video.message.scrollSearch,
    Video_pageContainControll : video.message.pageContainControll,
    videoPage:{
      first:false,
      second:true,
      playVideo:true
    },
    // video信息页面
    videoDetailMessage:{},
    //video的个人页面
    myselyVideo:[],
    //点播信息
    videolist:[],
    // 直播信息
    lineList:[]
  },
  
  onLoad: function (option) {
    // 保存 foot 初始化 到本地缓存
    //message
    wx.setStorageSync('chooseBtn',  this.data.chooseBtn)
    wx.setStorageSync('pageControll', this.data.pageControll)
    wx.setStorageSync('secondPagse', this.data.secondPagse)
    wx.setStorageSync('secondPageControll', this.data.secondPageControll)
    // classDetialBtn tag
    wx.setStorageSync('tag', this.data.tag)
    //danmu 
    wx.setStorageSync('danContent', this.data.danContent)
    //my
    // wx.setStorageSync('mySecond', this.data.mySecond)
    wx.setStorageSync('mypageSecond', this.data.mypageSecond)    
    wx.setStorageSync('collectBtn', this.data.collectBtn)  
    wx.setStorageSync('historyBtn', this.data.historyBtn)
    wx.setStorageSync('myTieBtn', this.data.myTieBtn)
    // video
    wx.setStorageSync('Video_pageContainControll', this.data.Video_pageContainControll)
    wx.setStorageSync('videoPage', this.data.videoPage)
    wx.setStorageSync('Video_indexBtn', this.data.Video_indexBtn)
    wx.setStorageSync('videoPage', this.data.videoPage)
    // common
    wx.setStorageSync('CommonindexBtn', this.data.CommonindexBtn)
    wx.setStorageSync('pageCommonSecond', this.data.pageCommonSecond)
    wx.setStorageSync('pageClassSecond', this.data.pageClassSecond)
    wx.setStorageSync('pageSecond', this.data.pageSecond)
    wx.setStorageSync('CommonpageContainControll', this.data.CommonpageContainControll)

    let flag = option.flag
    let classContain = option.classContain;
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
  // danmu 
  sendDanmu:index.fuc.sendDanmu,
  // 改变课程表显示模式
  changeClassStyle: index.fuc.changeClassStyle,
  // 底部导航
  navigatorFooter :function(e){
    let str=  e.currentTarget.dataset.str 
    let url = URL.concat('/student/courselist')
    let cookies = wx.getStorageSync('cookies')
    // console.log(str);
    // 重置全部？
    this.setData({
      collectBtn:wx.getStorageSync('collectBtn'),
      historyBtn:wx.getStorageSync('historyBtn'),
      myTieBtn:wx.getStorageSync('myTieBtn'),
      pageControll:wx.getStorageSync('pageControll'),
      secondPagse:wx.getStorageSync('secondPagse'),
      secondPageControll:wx.getStorageSync('secondPageControll'),
      mypageSecond:wx.getStorageSync('mypageSecond'),
      Video_pageContainControll:wx.getStorageSync('Video_pageContainControll'),
      videoPage:wx.getStorageSync('videoPage'),
      CommonindexBtn:wx.getStorageSync('CommonindexBtn'),
      Video_indexBtn:wx.getStorageSync('Video_indexBtn'),
      pageCommonSecond:wx.getStorageSync('pageCommonSecond'),
      pageClassSecond:wx.getStorageSync('pageClassSecond'),
      tag:wx.getStorageSync('tag'),
      pageSecond:wx.getStorageSync('pageSecond'),
      secondPageControll:wx.getStorageSync('secondPageControll'),
      CommonpageContainControll:wx.getStorageSync('CommonpageContainControll'),
      isClass:true
    })
    if (str === 'common') {
      // 社区请求
      getDataBase.fuc.getCommonClassList(this, url, cookies)
      
    }
    if (str==='video') {
      console.log('video');
      getDataBase.fuc.getVideoPlayList(this)
    }
    if(str==='my') {
      //个人请求
      getDataBase.fuc.getMyMessage(this,URL.concat('/tree/list'))
      getDataBase.fuc.getMyMessageNotree(this,URL.concat('/Profile/personalInfo'))
    }
    index.fuc.navigatorFooter(e, this)
  } ,
  // 切换周次
  selectWeek : index.fuc.selectWeek,
  determineTan : index.fuc.determineTan,
  // common 的事件
  choseClose : common.fuc.choseClose,
  recordChoose : common.fuc.recordChoose,
  CommonindexBtn : common.fuc.indexBtn,
  classBtn : common.fuc.classBtn,
  classMessageBtn :common.fuc.classMessageBtn,
// 进入发帖
  commonTiebtn:common.fuc.commonTiebtn,

  //search
  inputSearch:common.fuc.inputSearch,
  //删除tag
  tagContainClose:common.fuc.tagContainClose,
  // 提问
  returnTie:common.fuc.returnTie,
  inputQuestion:common.fuc.inputQuestion,
  intoQuestion:common.fuc.intoQuestion,
  // 班群详情的按钮
  //树
  intoCommonClssTree:common.fuc.intoCommonClssTree,
  // 教务通知
  inToCommonClassNotice:common.fuc.inToCommonClassNotice,
  // 签到按钮
  isArrayNowClass:common.fuc.isArrayNowClass,
  classMessageDetailBtn:common.fuc.classMessageDetailBtn,
  classMessageChageStatus:common.fuc.classMessageChageStatus,
  turnIntoSecond:common.fuc.turnIntoSecond,
  // 帖子二级页面
  intoTiePage:common.fuc.intoTiePage,
  // 返回二级页面
  turnIntoThird:common.fuc.turnIntoThird,
  // 关闭状态修改按钮
  closeStatusBtn:common.fuc.closeStatusBtn,
  //video 事件
  intoVideoDetail:video.fuc.intoVideoDetail,
  intoLivePlay:function(e){
     let cameraHeight =  this.data.cameraHeight
     console.log(cameraHeight);
      wx.navigateTo({
        url: `../live/index?cameraHeight=${cameraHeight}`,
    })
    
  },
  downloadFile:function(e){
    wx.showLoading({
      title:'传送中'
    })
    setTimeout(() => {
      wx.hideLoading()
      wx.showToast({
        title:'发送完成',
        icon:'suesses'
      })

    }, 2000);
  },
  // 二级页面返回
  returnVideo:video.fuc.returnVideo,
  playVideo:function(e){
    this.setData({
      ['videoPage.second']:true,
      ['videoPage.playVideo']:false,
    })
  },chageClass(e){
    this.setData({
      isClass:true,
      chooseWeek: true,
      chooseMenu: true
    })
  },
  changQiantongClass(e){
    let str = e.currentTarget.dataset.str
    console.log(str);
    let data = this.data.nowData
    wx.setStorageSync('data',data)
    let now;
    console.log(data);
    
    for(let index of data.keys()) {
      if(!data[index].nowData) {
        // now =index
        // 获取到之后重新
        if(str === 'next') {
          // 找到当天的
          let last = (index+6)%7,next = (index+8)%7
          //前一天的
          data[index].nowData = true
          data[(index+1)%7].nowData = false
          data[index].lastData = false
          data[(index+6)%7].lastData = true
          data[(index+8)%7].nextData = true
          data[(index+9)%7].nextData = false
        } else{
          data[index].nowData = true
          data[(index+6)%7].nowData = false
          data[(index+6)%7].lastData = true
          data[(index+5)%7].lastData = false
          data[(index+1)%7].nextData = true
          data[index].nextData = false
        }
        this.setData({
          nowData:data
        })
        return;
      }
    }

 
  },
  alertEveryDay(e){
    let type = e.currentTarget.dataset.type
    console.log(1);
    
    if(type === 'open') {
      this.setData({
        alertEveryDay:false
      })
      
    }else {
      this.setData({
        alertEveryDay:true
      })
      
    }
  
  },
  //  比赛信息
  messageContent:{},
  Video_indexBtn : video.fuc.indexBtn,
  videoListBtn:video.fuc.videoListBtn,

  // message 事件
  addEvent :message.fuc.addEvent,
  chooseBtn :message.fuc.chooseBtn,
  chooseEvent :message.fuc.chooseEvent,
  noticeEvent :message.fuc.noticeEvent,
  message_returnIndex :message.fuc.returnIndex,
  choseClose :message.fuc.choseClose, 
  choseGradeData: message.fuc.choseGradeData,
  btnEvent : function(e) {
    let str = e.currentTarget.dataset.message
    // let Url = app.globalData.requestURL
    message.fuc.btnEvent(str, this, URL)
  },
  // class
  addExamToClass:message.fuc.addExamToClass,

  // my事件
  returnIndex :my.fuc.returnIndex,
//  myIntoChoose
  myIntoNotice:my.fuc.myIntoNotice,
  myIntoChoose:my.fuc.myIntoChoose,
  myHistoyVedio:my.fuc.myHistoyVedio,
  //返回树木
  returnTree:my.fuc.returnTree,
  turnToNext : my.fuc.turnToNext,
  recordBtn :my.fuc.recordBtn,
  recordChoose :my.fuc.recordChoose,
  choseClose:my.fuc.choseClose,
  collectBtn:my.fuc.collectBtn,


})
