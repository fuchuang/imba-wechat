
const app = getApp()
const windowWidth = app.globalData.windowWidth;
const windowHeight = app.globalData.windowHeight;
const util = require('../../common/js/util.js');
const alertEvent = require('../../common/js/alertEvent.js');
const classContainJS = require('../../common/js/classContain.js');
let getWeekAndData = function (that,index) {
  let classAboutSevenM =  wx.getStorageSync('classAboutSevenM')
  let nowMonth,time;
  console.log(typeof classAboutSevenM);
  
  // 缓存没保存
  if (typeof classAboutSevenM !== 'Object') {
    let oneWeek = 24 * 60 * 60 * 1000 * 7;
    // 获取选择当前周次的日期
   let detail = index - that.data.setNowWeek.index
   time = new Date((new Date).getTime() + detail * oneWeek);
   classAboutSevenM = []
   let data = util.getDates(7, time);
   
   // 月份
   nowMonth = parseInt(data[0].time.substring(5, 7)) + '月'
   //周次和日期
   // console.log(time,data)
   for (var i = 0; i < 7; i++) {
     let time = data[i].time.substring(8)
     if (time == '01') {
       time = parseInt(data[i].time.substring(5, 7)) + '月'
     }
     let class7Days = classContainJS.fcu.get7DaysClass(i, index, that.data.classContain);
     classAboutSevenM[i] = {
       week: data[i].week,
       time: time,
       class: class7Days
         // 对应天数的课程内容  
     }
   }
  //保存缓存
   if (index !== that.data.setNowWeek.index)// 只保存当周
    wx.setStorageSync('classAboutSevenM', classAboutSevenM)
  }

  //保存缓存
  // wx.setStorageSync('classAboutSevenM', classAboutSevenM)

  //当前 周几
  let nowdata = (new Date(time).getDay() + 6) % 7 ;
  let lastdata = ((nowdata-1) + 7 ) % 7 ;
  let nextdata = ((nowdata+1) + 7 ) % 7 ;
  let str1 ='nowData[' + nowdata +'].nowData',
  str2 = 'nowData[' + lastdata + '].lastData',
  str3 = 'nowData[' + nextdata + '].nextData'
  // console.log(classAboutSevenM);
  
  that.setData({
    nowMonth:nowMonth,
    classAboutSevenM: classAboutSevenM,
    [str1] :false,
    [str2]:false,
    [str3]:false
  })
},
// 选择周次
chooseWeekEvent = function(e){
  let flag = !this.data.chooseWeek;
  this.setData({
    chooseWeek: flag
  })
  // console.log('open')
},
// 选择周次事件
selectWeek = function (e) {
  // console.log(e.currentTarget.dataset.index)
  let index = e.currentTarget.dataset.index
  // 点击之后设置显示的对应课程内容
  getWeekAndData(this, index)
  let str = 'setNowWeek.lastIndex'
  this.setData({
    chooseWeek: true,
    chooseMenu: true,
    [str] : index
  })
},
//关闭菜单
clooseOpenMenuAndWC = function (e) {
  this.setData({
     chooseWeek: true,
     chooseMenu: true
  })
  console.log('close')
},
//打开菜单
chooseMenuEvent = function(e){
  let flag = !this.data.chooseMenu
  this.setData({
    chooseMenu: flag,
    chooseWeek: true,
  })
  console.log('open')
},
//菜单点击事件
menuBindEvent = function(e){
  console.log(e.currentTarget.dataset)
  //弹框
  let index = e.currentTarget.dataset.index
  let type = e.currentTarget.dataset.type
  let str = type + '.hidden'
  if (index===5){
      let classDanmu = this.data.classDanmu
      if (classDanmu[0]){
        this.setData({
          classDanmu: [false, 'borderRadiuClose', 'borderCircleColse'],
        }) 
      }else{
        this.setData({
          classDanmu: [true, 'borderRadiuOpen', 'borderCircleOpen'],
        }) 
      }
  }else{
    alertEvent.alertAndCloseMenu(str, this)
  }
},
//关闭设置弹出框
closeTan = function(e){
  let type = e.currentTarget.dataset.type,
  str = type + '.hidden'
  if (type === 'setNowWeek') {
    let index = this.data.setNowWeek.index
    this.setData({
      ['setNowWeek.lastIndex']:index
      // [str1]:true
    })
  }
  alertEvent.closeAlert(str, this)
  
},// 确定按钮
determineTan = function (e) {
  let type = e.currentTarget.dataset.type,
  str = type + '.hidden'
  if (type === 'setNowWeek') {
   
    let index = this.data.setNowWeek.lastIndex
    // 切换对应的课程表
    this.setData({
      ['setNowWeek.index']:index
      // [str1]:true
    })
    let setNowWeek = this.data.setNowWeek
    console.log(setNowWeek);
    
    wx.setStorageSync('setNowWeek', setNowWeek)
    getWeekAndData(this, index)
  }
  alertEvent.closeAlert(str, this)
},
// 确定设置周次
changeValue=function(e){
  console.log(e.detail.value[0])
  let str = 'setNowWeek.lastIndex', str1 = 'setNowWeek.hidden'
  this.setData({
    [str]: e.detail.value[0]
  })

},
// 添加课程 滚动第一节课 改变第二节的上限
changeFirstClass = function(e){
  let value = alertEvent.changeFirstClass(e)
  let str = 'addClassMes.value'
  this.setData({
    [str]: value
  })
},
// 改变课程表显示模式
changeClassStyle = function (e) {
  let isClass = !this.data.isClass
  this.setData({
    isClass: isClass
  })
},
// 底部导航
navigatorFooter = function (e) {
  let str=  e.currentTarget.dataset.str 
  let footPage = this.data.footPage
  for (let i in footPage) {
    if (footPage[i] === false) {
      footPage[i] = true;
      break;
    }
  }
  footPage[str] = false;
  this.setData({
    footPage :footPage
  })
},

onload = function (that) {
  // 判断是否有缓存setNowWeek
  let setNowWeek = wx.getStorageSync('setNowWeek')
  console.log(setNowWeek)
  if (typeof setNowWeek === 'object') {
    // 有的话 触发setData
    setNowWeek.hidden = true
    that.setData({
      setNowWeek :setNowWeek
    })
  }
  getWeekAndData(that,that.data.setNowWeek.index)
},
// 课程详情的点击事件
classContainDetail = function(e) {
  let message = e.currentTarget.dataset.message
  console.log(message)
  let str = 'classContainDetail.hidden',str2='classContainDetail.message'
  // 设置课程信息
  let startTime = 480;
  let time = (message.start-1)*50 ; //开始时间
  if(message.start>2) time+= (message.start-2)*10//课间时间
  startTime += time
  let endTime = startTime + message.classLength*60-10
  //start转计时器
  startTime=util.minTurnHour(startTime)
  endTime=util.minTurnHour(endTime)
  console.log(startTime);
  
  let classContainDetailMess = {
      'class':message.name,
      'position':message.position,
      'teacher':message.teacher,
      'time':startTime+'-'+endTime,
      'className':''
  }
  this.setData({
    [str]:false,
    [str2]:classContainDetailMess
  })
}
let fuc = {
  classContainDetail:classContainDetail,
  clooseOpenMenuAndWC :clooseOpenMenuAndWC,
  chooseMenuEvent :chooseMenuEvent,
  menuBindEvent :menuBindEvent,
  closeTan :closeTan,
  changeValue :changeValue,
  changeFirstClass : changeFirstClass,
  changeClassStyle : changeClassStyle,
  getWeekAndData : getWeekAndData,
  chooseWeekEvent :chooseWeekEvent,
  navigatorFooter:navigatorFooter,
  onload:onload,
  selectWeek:selectWeek,
  determineTan :determineTan
}
let message = {
  // footer 导航
  footPage :{
    // login:false,
    index:false,
    message:true,
    video:true,
    common:true,
    my:true,
  },
  //x选择周次
  chooseWeek:true,
  testNum:1,
  //菜单
  chooseMenu:true,
  //内容定位
  weekAndDataPosTop: app.globalData.statusBarHeight + (windowWidth / 750 * 120) +50,
  containPosTop: app.globalData.statusBarHeight + (windowWidth / 750 * 190) + 50 ,
  containPosHeight: windowHeight - app.globalData.statusBarHeight - (windowWidth / 750 * 320) - 50 ,
  //弹出框信息
  setNowWeek: { 
    alertLeft: windowWidth / 2 - windowWidth / 750 * 200, 
    alertHeight: 300, 
    alertTop: windowHeight / 2 - windowWidth / 750 * 150,
    value: ['第1周', '第2周', '第3周', '第4周', '第5周', '第6周', '第7周', '第8周', '第9周', '第10周', '第11周', '第12周', '第13周', '第14周', '第15周', '第16周', '第17周', '第18周', '第19周', '第20周', '第21周', '第22周', '第23周', '第24周'],
    index:0,
    lastIndex:0,
    hidden:true
    },
  addClassMes:{
    alertWidth: 600,
    alertLeft: windowWidth / 2 - windowWidth / 750 * 300,
    alertHeight: 900,
    alertTop: windowHeight / 2 - windowWidth / 750 * 450,
    index: 0,
    hidden: true,
    week: ['周一', '周二', '周三', '周四', '周五', '周六', '周七'],
    firstClass:[1,2,3,4,5,6,7,8,9,10,11,12,13],
    secondClass: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13],
    value: [0, 0, 1],

  },
  shareClass:{
    alertWidth: 600,
    alertLeft: windowWidth / 2 - windowWidth / 750 * 300,
    alertHeight: 700,
    alertTop: windowHeight / 2 - windowWidth / 750 * 350,
    index: 0,
    hidden: true,
    scanUrl:'https://www.gdutrex.xyz/imba/scan.png'
  },
  sendDanMu:{
    alertWidth: 500,
    alertLeft: windowWidth / 2 - windowWidth / 750 * 250,
    alertHeight: 500,
    alertTop: windowHeight / 2 - windowWidth / 750 * 250,
    hidden: true

  },
  //课程详情
  classContainDetail:{
    alertWidth: 500,
    alertLeft: windowWidth / 2 - windowWidth / 750 * 250,
    alertHeight: 500,
    alertTop: windowHeight / 2 - windowWidth / 750 * 250,
    hidden:true,
    message:{
      'class':'马克思',
      'position':'',
      'teacher':'',
      'time':'',
      'className':''
    }
  },
  // 当前日期
  nowData: [
    { data: '周一', flag: true, nowData: true, lastData: true, nextData: true }, 
    { data: '周二', flag: true, nowData: true, lastData: true, nextData: true }, 
    { data: '周三', flag: true, nowData: true, lastData: true, nextData: true }, 
    { data: '周四', flag: true, nowData: true, lastData: true, nextData: true }, 
    { data: '周五', flag: true, nowData: true, lastData: true, nextData: true }, 
    { data: '周六', flag: true, nowData: true, lastData: true, nextData: true }, 
    { data: '周日', flag: true, nowData: true, lastData: true, nextData: true}],
  //课程表和签筒切换
  isClass:true,
  qianTongHeight: windowHeight - app.globalData.statusBarHeight - 50 - (windowWidth / 750 * 130) ,
  //弹幕样式
  classDanmu: [false, 'borderRadiuClose','borderCircleColse'],
 
  weekNums: ['第1周', '第2周', '第3周', '第4周', '第5周', '第6周', '第7周', '第8周', '第9周', '第10周', '第11周', '第12周', '第13周', '第14周', '第15周', '第16周', '第17周', '第18周', '第19周', '第20周', '第21周', '第22周', '第23周', '第24周'],
  gradeNums: ['大一 上学期', '大一 下学期', '大二 上学期', '大二 下学期', '大三 上学期', '大三 下学期', '大四 上学期', '大四 下学期', '大五 上学期', '大五 下学期'],
  menuNums: [
    { name: '修改周次', type: 'setNowWeek' }, 
    { name: '添加课程', type: 'addClassMes' }, 
    { name: '分享课程', type: 'shareClass' }, 
    { name: '添加背景', type: 'changeBG' },
    { name: '扫一扫', type: 'havaAScan' },
    { name: '弹幕   ', type: 'danMu' },
    ],
    //当前月份
  nowMonth:12,
  classContain:{}

  
}

module.exports = {
  fuc : fuc,
  message : message
}