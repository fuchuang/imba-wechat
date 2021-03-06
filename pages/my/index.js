const app = getApp()
const my = require('../../common/js/my.js')
const rpxTurnIntopx = 750 / app.globalData.windowWidth
const windowWidth = app.globalData.windowWidth
const windowHeight = app.globalData.windowHeight
let message = {
    gradeCardTop: rpxTurnIntopx * (50 + app.globalData.statusBarHeight),
    // 按钮信息
    btnMessage: [
      { logoUrl: 'recordlogo', text: '考勤记录', btnEvent: 'pagerecord' },
      { logoUrl: 'treelogo', text: '我们的树', btnEvent: 'pagetree' },
      { logoUrl: 'lovelogo', text: '个人收藏', btnEvent: 'pagecollect' },
      { logoUrl: 'historylogo', text: '浏览记录', btnEvent: 'pagehistory' },
      { logoUrl: 'tielogo', text: '我的帖子', btnEvent: 'pagetie' },
      { logoUrl: 'savelogo', text: '下载附件', btnEvent: 'pagesave' }
    ],
    secondPageTextColor: '#fadb91;',
    pageSecond:{
      pagerecord: true, 
      pagetreeRank:true,
      pagetree: true, 
      pagecollect: true, 
      pagehistory: true, 
      pagetie: true, 
      pagesave: true, 
      pageindex: false, 
    },
    // 考勤按钮
    recorderBtnFlag: false,
    recordBtnMessage: [
      { text: '大一第二学期', angleFlag: false, hidden: false },
      { text: '大二第一学期', angleFlag: true, hidden: true },
      { text: '大二第二学期', angleFlag: true, hidden: true }
    ],
    listData: [
      { 'code': '01', 'text': 'text1', 'type': 'type1' },
      { 'code': '02', 'text': 'text2', 'type': 'type2' },
      { 'code': '03', 'text': 'text3', 'type': 'type3' },
      { 'code': '04', 'text': 'text4', 'type': 'type4' },
      { 'code': '05', 'text': 'text5', 'type': 'type5' },
      { 'code': '06', 'text': 'text6', 'type': 'type6' },
      { 'code': '07', 'text': 'text7', 'type': 'type7' }
    ],
    displayRecorderMessage: [1, 2, 3, 4, 5, 6, 7, 8],
    recorderMessage: [
      { className: '高数英语', record: [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1], displayRecord: [0, 1, 1, 1, 1, 1, 1, 1] },
      { className: '体育育育育育育育育育育育育育', record: [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1], displayRecord: [0, 1, 1, 1, 1, 1, 1, 1] },
      { className: '大学英语', record: [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1], displayRecord: [0, 1, 1, 1, 1, 1, 1, 1] }
    ],
    // 收藏页面按钮
    collectBtn: [
      { title: '通知', color: '#51d6ff;', borderColor: '#51d6ff' },
      { title: '视频', color: '#7c7c7c;', borderColor: 'transparent' },
      { title: '公选课', color: '#7c7c7c;', borderColor: 'transparent' }
    ],
    // 二级页面对应的内容控制器
    collectContainControll:0,
 
    // 我的帖子按钮
    myTieBtn: [
      { title: '已发', color: '#5BFFCD;', borderColor: '#5BFFCD'},
      { title: '已看', color: '#7c7c7c', borderColor: 'transparent' },
      { title: '喜欢', color: '#7c7c7c;', borderColor: 'transparent' }
    ],
    // 浏览记录
    historyBtn:[
      { title: '通知', color: '#37fbbf;', borderColor:'#37fbbf'},
      { title: '视频', color: '#7c7c7c;', borderColor: 'transparent;' }
    ],
    historynoticeMessage: [
      {
        title: '教务处',
        contain: '热烈欢迎',
        hasRead: false
      },
      {
        title: '教务处',
        contain: '热烈欢迎',
        hasRead: false
      },
      {
        title: '教务处',
        contain: '热烈欢迎',
        hasRead: false
      },
      {
        title: '教务处',
        contain: '热烈欢迎',
        hasRead: false
      },
      {
        title: '教务处',
        contain: '热烈欢迎',
        hasRead: false
      },
      {
        title: '教务处',
        contain: '热烈欢迎',
        hasRead: false
      },
      {
        title: '教务处',
        contain: '热烈欢迎',
        hasRead: false
      },
      {
        title: '教务处',
        contain: '热烈欢迎',
        hasRead: false
      },
    ],
}

  // 二级页面的切换按钮事件
  let collectBtn = function(e) {
    let index =e.currentTarget.dataset.index
    let item = e.currentTarget.dataset.item
    let color = e.currentTarget.dataset.color
    let data = this.data[item]
    if(item === 'myTieBtn') {
      // 更新页面
      console.log(index);
      this.setData({
        noticeMessageIndex:index
      })
      /*let url = ['/Profile/myPosts/viewdRecently','/Profile/myPosts/posted','/Profile/myPosts/likes']
      my.requset3(this,1,url[index])*/
    }
    for (let i = 0; i < data.length;i++) {
      if(i === index) {
        data[i].color = color;
        data[i].borderColor = color
      }else {
        data[i].color = '#7c7c7c;';
        data[i].borderColor = 'transparent';
      }
    
    }
    console.log(this.data[item])
    this.setData({
      collectContainControll:index,
      [item] :data
    }) 
  },
  // 记录按钮
  choseClose = function(e) {
    let recordBtnMessage = this.data.recordBtnMessage
    let recorderBtnFlag = this.data.recorderBtnFlag
    if (recorderBtnFlag) {
      for (let i = 0; i < recordBtnMessage.length; i++) {
        recordBtnMessage[i].hidden = recordBtnMessage[i].angleFlag
      }// 隐藏所有按钮选项
      this.setData({
        recordBtnMessage: recordBtnMessage,
        recorderBtnFlag: false
      })
    }
  },
  // 打开选择年级
  recordChoose = function(e) {
    console.log(e.currentTarget.dataset.index)
    let recordBtnMessage = this.data.recordBtnMessage
    let recorderBtnFlag = this.data.recorderBtnFlag
    let index = e.currentTarget.dataset.index
    if (recorderBtnFlag) {
      // 打开
      my.openChooseBtn(this, recordBtnMessage, index)
    } else {
      // 关闭
      my.displayAllBtn(this, recordBtnMessage)
    }
  },
  recordBtn = function(e) {
    let rotation = e.currentTarget.dataset.rotation
    if (rotation === 'right') {
      // 进行转换
      my.recordBtn(this, 8, 1, 17)
    } else {
      // left
      my.recordBtn(this, -8, 2, 18)
    }
  },
  // 下一个页面的时间
  turnToNext = function(e) {
    let btnEvent = e.currentTarget.dataset.btnevent
    let index = 0
    my.changePage(this, btnEvent,index)
  },
  // 返回
  returnIndex = function(e) {
    let str = 'pageindex'
    my.changePage(this,str)
    // 初始化 页面内容显示的页面
    this.setData({
      collectContainControll: 0
    }) 
  },
  returnTree=function(e){
    let str= 'pagetree'
    my.changePage(this,str)
  }
  let fuc = {
    returnTree:returnTree,
    returnIndex :returnIndex,
    turnToNext : turnToNext,
    recordBtn :recordBtn,
    recordChoose :recordChoose,
    choseClose:choseClose,
    collectBtn:collectBtn,
    myHistoyVedio:function(e) {
      console.log(e.currentTarget.dataset);
      
    }
  }

module.exports={
  message :message,
  fuc :fuc
}
