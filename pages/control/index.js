const app = getApp()
const windowWidth = app.globalData.windowWidth;
const windowHeight = app.globalData.windowHeight;
const util = require('../../common/js/util.js');
const alertEvent = require('../../common/js/alertEvent.js');
let getWeekAndData = function (that) {
  let time = util.formatTime(new Date());
  let data = util.getDates(7, time);
  let classAboutSevenM = []
  //周次和日期
  for (var i = 0; i < 7; i++) {
    let time = data[i].time.substring(8)
    if (time == '01') {
      time = parseInt(data[i].time.substring(5, 7)) + '月'
    }
    classAboutSevenM[i] = {
      week: data[i].week,
      time: time
    }
  }
  //当前 周几
  let nowdata = (new Date(time).getDay() + 6) % 7 ;
  let lastdata = ((nowdata-1) + 7 ) % 7 ;
  let nextdata = ((nowdata+1) + 7 ) % 7 ;
  let str1 ='nowData[' + nowdata +'].nowData',
  str2 = 'nowData[' + lastdata + '].lastData',
  str3 = 'nowData[' + nextdata + '].nextData'
  that.setData({
    classAboutSevenM: classAboutSevenM,
    [str1] :false,
    [str2]:false,
    [str3]:false
  })

}
Page({
  data: {
    //x选择周次
    chooseWeek:true,
    testNum:1,
    //菜单
    chooseMenu:true,
    //公用属性
    headTitle: app.globalData.statusBarHeight+10,
    headHeight: app.globalData.statusBarHeight+50,
    classPosition: (750- 100)/2,
    fooMassage: true,
    fooVideo: true,
    fooCommon: true,
    fooMy: true,
    title: 'IMBA课程表',
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
      value: [0, 0, 1]
    },
    shareClass:{
      alertWidth: 600,
      alertLeft: windowWidth / 2 - windowWidth / 750 * 300,
      alertHeight: 700,
      alertTop: windowHeight / 2 - windowWidth / 750 * 350,
      index: 0,
      hidden: true,
      scanUrl:'https://campus.gbdev.cn:8443/Miniapp/imba/scan.png'
    },
    sendDanMu:{
      alertWidth: 500,
      alertLeft: windowWidth / 2 - windowWidth / 750 * 250,
      alertHeight: 500,
      alertTop: windowHeight / 2 - windowWidth / 750 * 250,
      hidden: true

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

    classAboutSevenM:{}
  },
  onLoad: function () {
    //获取周次选择文字宽度
    getWeekAndData(this)

  },
  // 选择周次
  chooseWeekEvent: function(e){
    let flag = !this.data.chooseWeek;
    this.setData({
      chooseWeek: flag
    })
    console.log('open')
  },
  //关闭菜单
  clooseOpenMenuAndWC: function (e) {

    this.setData({
       chooseWeek: true,
       chooseMenu: true
    })
    console.log('close')
  },
  //打开菜单
  chooseMenuEvent: function(e){
    let flag = !this.data.chooseMenu
    this.setData({
      chooseMenu: flag,
      chooseWeek: true,
    })
    console.log('open')
  },
  //菜单点击事件
  menuBindEvent:function(e){
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
  closeTan:function(e){
    let type = e.currentTarget.dataset.type,
    str = type + '.hidden'
    alertEvent.closeAlert(str, this)
    
  },
  // 确定设置周次
  changeValue:function(e){
    console.log(e)
    let str = 'setNowWeek.index', str1 = 'setNowWeek.hidden'
    this.setData({
      [str]: e.detail.value,
      [str1]:true
    })

  },
  // 添加课程 滚动第一节课 改变第二节的上限
  changeFirstClass: function(e){
    let value = alertEvent.changeFirstClass(e)
    let str = 'addClassMes.value'
    this.setData({
      [str]: value
    })
  },
  // 改变课程表显示模式
  changeClassStyle: function (e) {
    let isClass = !this.data.isClass
    this.setData({
      isClass: isClass
    })
  },
  // 底部导航
  navigatorFooter : function (e) {
    let str= '../' + e.currentTarget.dataset.str + '/index'
    console.log(e.currentTarget.dataset.str)
    wx.redirectTo({
      url: str,
      success: function(res){
        // success
      },
      fail: function() {
        // fail
      },
      complete: function() {
        // complete
      }
    })
  }
})
