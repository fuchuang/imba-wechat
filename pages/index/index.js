const app = getApp()
const windowWidth = app.globalData.windowWidth;
const windowHeight = app.globalData.windowHeight;
const util = require('../../common/js/util.js');
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
  that.setData({
    classAboutSevenM: classAboutSevenM
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
    //弹出框位置
    setNowWeek: { 
      alertLeft: windowWidth / 2 - windowWidth / 750 * 200, 
      alertHeight: 300, 
      alertTop: windowHeight / 2 - windowWidth / 750 * 150,
      value: ['第1周', '第2周', '第3周', '第4周', '第5周', '第6周', '第7周', '第8周', '第9周', '第10周', '第11周', '第12周', '第13周', '第14周', '第15周', '第16周', '第17周', '第18周', '第19周', '第20周', '第21周', '第22周', '第23周', '第24周'],
      index:0,
      hidden:true
      },
    alertLeft: windowWidth/2 - windowWidth/ 750 * 200 ,
    alertHeight:400,
    alertTop: windowHeight / 2 - windowWidth / 750 * 200,
    //弹幕样式
    classDanmu: [false, 'borderRadiuClose','borderCircleColse'],
   
    weekNums: ['第1周', '第2周', '第3周', '第4周', '第5周', '第6周', '第7周', '第8周', '第9周', '第10周', '第11周', '第12周', '第13周', '第14周', '第15周', '第16周', '第17周', '第18周', '第19周', '第20周', '第21周', '第22周', '第23周', '第24周'],
    gradeNums: ['大一 上学期', '大一 下学期', '大二 上学期', '大二 下学期', '大三 上学期', '大三 下学期', '大四 上学期', '大四 下学期', '大五 上学期', '大五 下学期'],
    menuNums : ['修改周次','添加课程','分享课程','添加背景','扫一扫','弹幕  '],

    classAboutSevenM:{}
  },
  onLoad: function () {
    //获取周次选择文字宽度
    getWeekAndData(this)

  },
  chooseWeekEvent: function(e){
    let flag = !this.data.chooseWeek;
    this.setData({
      chooseWeek: flag
    })
    console.log('open')
  },
  clooseOpenMenuAndWC: function (e) {

    this.setData({
       chooseWeek: true,
       chooseMenu: true
    })
    console.log('close')
  },
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
    console.log(e.currentTarget.dataset.index)
    //弹幕
    let index = e.currentTarget.dataset.index
    switch (index){
      case 5 :
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
        
        break;
      case 0:
        let str = 'setNowWeek.hidden'
        this.setData({
          [str] : false,
          chooseWeek: true,
          chooseMenu: true

        })
      break;
      default:break;
    }
  },
  //关闭弹出框
  closeSetWeek:function(e){
    let str = 'setNowWeek.hidden'
    this.setData({
      [str]: true,
    })
  }
})
