const app = getApp()
const index = require('../index/index.js');
const common = require('../common/index.js');
Page({
  data: {
 
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
    // 当前日期
    nowData:index.message.nowData,
    //课程表和签筒切换
    isClass:true,
    qianTongHeight: index.message.qianTongHeight,
    //弹幕样式
    classDanmu: index.message.classDanmu,
    weekNums: index.message.weekNums,
    gradeNums: index.message.gradeNums,
    menuNums: index.message.menuNums,
    classAboutSevenM:index.message.classAboutSevenM,


    // common data
    noticeHeight : common.message.noticeHeight,
    chooseHeight : common.message.chooseHeight,
    gradeCardTop: common.message.gradeCardTop,
    recordBtnMessage: common.message.recordBtnMessage,

    /* titlebtn 信息 */
    indexBtn:common.message.indexBtn,
    /* 首页按钮的内容 */
    pageContainControll:0,
    pageSecond:common.message.pageSecond,
    pageClassSecond:common.message.pageClassSecond,
    pageCommonSecond:common.message.pageCommonSecond,

    /* 班群信息 */
    classMessage:common.message.classMessage,
    /* 下载附件的信息 */
    downloadMessage:common.message.downloadMessage,
  },
  onLoad: function () {
    //获取周次选择文字宽度
    index.fuc.getWeekAndData(this)

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
  // 添加课程 滚动第一节课 改变第二节的上限
  changeFirstClass:index.fuc.changeFirstClass,
  // 改变课程表显示模式
  changeClassStyle: index.fuc.changeClassStyle,
  // 底部导航
  navigatorFooter : index.fuc.navigatorFooter,


  // common 的事件
  choseClose : common.fuc.choseClose,
  recordChoose : common.fuc.recordChoose,
  indexBtn : common.fuc.indexBtn,
  classBtn : common.fuc.classBtn,
})
