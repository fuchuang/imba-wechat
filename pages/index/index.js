
const app = getApp()
const windowWidth = app.globalData.windowWidth;
const windowHeight = app.globalData.windowHeight;
const util = require('../../common/js/util.js');
const alertEvent = require('../../common/js/alertEvent.js');
const classContainJS = require('../../common/js/classContain.js');
let startDanmu= function(that){
  // 重置
  that.setData({
    danContent:wx.getStorageSync('danContent')
  })
  let animation = wx.createAnimation({
    duration:3000
  })
  let danContent = that.data.danContent
  let query = wx.createSelectorQuery()
  for(let i of danContent.keys()){
    query.select(`#danmu${i}`).boundingClientRect((res)=>{
     // console.log(res)
      animation = animation.translateX(-res.left -res.width).step()
      danContent[i].animationData = animation.export()
      // that.setData({
      //   [`danContent[${i}].animationData`]:animation.export()
      // })
      }).exec()
  }
  setTimeout(() => {
    // console.log('danmu');
    that.setData({
      danContent:danContent,
      classDanmu: [false, 'borderRadiuClose', 'borderCircleColse'],
    })
  }, 1000);
 

}
let getWeekAndData = function (that,index) {

  let classAboutSevenM //=  wx.getStorageSync('classAboutSevenM')
  let nowMonth,time;
  // console.log(typeof classAboutSevenM);
  let oneWeek = 24 * 60 * 60 * 1000 * 7;
  let detail = index - that.data.setNowWeek.index
  time = new Date((new Date).getTime() + detail * oneWeek);
  let data = util.getDates(7, time);
  nowMonth = parseInt(data[0].time.substring(5, 7)) + '月'
  // 缓存没保存
  if (typeof classAboutSevenM !== 'Object') {
   classAboutSevenM = classContainJS.fcu.updateWeekAndData(that, index)
  }
  //当前 周几
  let nowdata = (new Date(time).getDay() + 6) % 7 ;
  // 处理签筒 的课程
  nowdata = classContainJS.fcu.getQianClass(classAboutSevenM, nowdata, that)
  // 处理签筒的课程表
  //console.log(that.data.classContain)

  that.setData({
    nowMonth:nowMonth,
    classAboutSevenM: classAboutSevenM,
    nowData :nowdata
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
  classContainJS.fcu.selectUpdate(this, index)
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
  
  if (index===5){// 切换弹幕样式
    // 弹幕样式
      let classDanmu = this.data.classDanmu
      if (classDanmu[0]){
        this.setData({
          classDanmu: [false, 'borderRadiuClose', 'borderCircleColse'],
        }) 
      }else{
        this.setData({
          classDanmu: [true, 'borderRadiuOpen', 'borderCircleOpen'],
        }) 
        //重置
        startDanmu(this)
        this.setData({
         
          chooseWeek: true,
          chooseMenu: true
        })
      }
  }else if(index === 6){
    // 课程表样式
    this.setData({
      isClass:true,
      chooseWeek: true,
      chooseMenu: true
    })
    
  } else {
    alertEvent.alertAndCloseMenu(str, this)
  }
},
//fasong 弹幕
sendDanmu=function(e) {
  let type = e.currentTarget.dataset.type
  if(type==='input') {
    this.setData({
      ['addContenAboutDM.top']:Math.floor(Math.random()*300)+200,
      ['addContenAboutDM.left']:Math.floor(Math.random()*300)+750,
      ['addContenAboutDM.content']:e.detail.value
    })
  }
  if(type==='btn') {
    wx.showLoading()
    let addContenAboutDM =this.data.addContenAboutDM
    let animation = wx.createAnimation({
      duration:3000
    })
    let danContent = this.data.danContent
    danContent.push(addContenAboutDM)
    let query = wx.createSelectorQuery()
    query.select(`#addContenAboutDM`).boundingClientRect((res)=>{
      console.log(danContent)
      wx.setStorageSync('danContent', danContent)
      animation = animation.translateX(-res.left -res.width).step()
      addContenAboutDM.animationData = animation.export()
      this.setData({
      addContenAboutDM:addContenAboutDM,
      // danContent:danContent,
      [e.currentTarget.dataset.str.concat('.hidden')]:true
      })
      wx.hideLoading()
      }).exec()
    


  }
},
//关闭设置弹出框
closeTan = function(e){
  let type = e.currentTarget.dataset.type,
  str = type + '.hidden'
  if (type === 'setNowWeek') {
    let index = this.data.setNowWeek.lastIndex
    this.setData({
      ['setNowWeek.index']:index
      // [str1]:true
    })
  } else if (type === 'addClassMes') {
    // 重置selectWeeks
    let selectWeeks =[true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true]
    let str = 'addClassMes.selectWeeks'
    let value =  [0, 0, 1]
    this.setData({
      [str] : selectWeeks,
      'addClassMes.value' :value,
      'addClassMes.className' :'',
      'addClassMes.position' :'',
      'addClassMes.classTeacher' :''

    })
  } else {

  }
  alertEvent.closeAlert(str, this)
  
},// 确定按钮
determineTan = function (e) {
  // console.log(this.data.classContain);
  let type = e.currentTarget.dataset.type,
  str = type + '.hidden'
  if (type === 'setNowWeek') {
   
    let index = this.data.setNowWeek.index
    // 切换对应的课程表
    this.setData({
      ['setNowWeek.lastIndex']:index
      // [str1]:true
    })
    let setNowWeek = this.data.setNowWeek
    console.log(index);
    
    wx.setStorageSync('setNowWeek', setNowWeek)
    classContainJS.fcu.selectUpdate(this, index)
    // 关闭弹框
    alertEvent.closeAlert(str, this)
  } else if (type === 'addClassMes'){

    console.log('添加课程')
    let addClassMes = this.data.addClassMes
    let selectWeeks = addClassMes.selectWeeks,
    teacher = addClassMes.classTeacher,
    className = addClassMes.className,
    classPosition = addClassMes.position,
    start = addClassMes.value[1] +1,
    classLength = addClassMes.value[2] - start + 2
    console.log(classPosition,className,teacher);
    
    if (classPosition === '' || className === ''|| teacher === '') {
      wx.showToast({
        title:'存在没有填空的选项，请输入',
      })
    } else {
      classContainJS.fcu.addClassContain(this,start,selectWeeks,teacher,className,classPosition,classLength)
      alertEvent.closeAlert(str, this)
    }
    

    
  } else {
    alertEvent.closeAlert(str, this)
  }
  // alertEvent.closeAlert(str, this)
},
// 确定设置周次
changeValue=function(e){
  let index = e.detail.value[0]
  let str1 = 'setNowWeek.index'
  // 更新课程表
  this.setData({
    [str1]: index
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
// 添加课程的选择周次
addClassSelectWeeks = function (e) {
  let index = e.currentTarget.dataset.index
  let str = `addClassMes.selectWeeks[${index}]`
  let flag = this.data.addClassMes.selectWeeks[index]
  // console.log(flag);
  this.setData({
    [str] : !flag
  })
},
addClassSelectWeeksInput= function(e) {
  let type='addClassMes.' +e.currentTarget.dataset.type
  console.log(type);
  this.setData({
    [type] : e.detail.value
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
navigatorFooter = function (e, that) {
  let str=  e.currentTarget.dataset.str 
  let footPage = that.data.footPage
  for (let i in footPage) {
    if (footPage[i] === false) {
      footPage[i] = true;
      break;
    }
  }
  footPage[str] = false;
  that.setData({
    footPage :footPage
  })
},

onload = function (that) {
  // 判断是否有缓存setNowWeek
  let setNowWeek = wx.getStorageSync('setNowWeek')
  // console.log(setNowWeek)
  if (typeof setNowWeek === 'object') {
    // 有的话 触发setData
    setNowWeek.hidden = true
    that.setData({
      setNowWeek :setNowWeek
    })
  }
  getWeekAndData(that,that.data.setNowWeek.index)
  // console.log('这个是',that.data.classContain);
  
},
// 课程详情的点击事件
classContainDetail = function(e) {
  let message = e.currentTarget.dataset.message
  if(typeof message.position==='undefined'){
    return
  }
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
 // console.log(startTime);
  
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
  addClassSelectWeeks:addClassSelectWeeks,
  changeFirstClass : changeFirstClass,
  addClassSelectWeeksInput:addClassSelectWeeksInput,
  changeClassStyle : changeClassStyle,
  getWeekAndData : getWeekAndData,
  chooseWeekEvent :chooseWeekEvent,
  navigatorFooter:navigatorFooter,
  onload:onload,
  selectWeek:selectWeek,
  determineTan :determineTan,
  sendDanmu:sendDanmu
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
    selectWeeks:[true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true],
    className:'',
    classStart:'',
    position:'',
    classTeacher:''
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
  qiantongClassContain :[],
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
    { name: '课程样式   ', type: 'classStyle' },
    ],
    //当前月份
  nowMonth:12,
  classContain:{},
 // 弹幕内容
  danContent:[
    {content:'这周的课好多啊',left:750,animationData:{},top:300},
    {content:'不想上课了',left:900,animationData:{},top:400},
    {content:'我想家了',left:1800,animationData:{},top:600},
    {content:'数字媒体基础有人组队吗',left:1200,animationData:{},top:200},
    {content:'数字媒体基础有人组队',left:800,animationData:{},top:450},
    {content:'这周的课好多啊',left:750,animationData:{},top:600},
    {content:'不想上课了',left:900,animationData:{},top:100},
    {content:'我想家了',left:1800,animationData:{},top:400},
    {content:'数字媒体基础有人组队吗',left:1200,animationData:{},top:500},
    {content:'数字媒体基础有人组队',left:800,animationData:{},top:150}
  ],
  addContenAboutDM:{content:'',animationData:{},left:'',top:''}

  
}

module.exports = {
  fuc : fuc,
  message : message
}