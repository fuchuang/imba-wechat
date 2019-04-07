const app = getApp()
const windowWidth = app.globalData.windowWidth;
const windowHeight = app.globalData.windowHeight;
const rpxTurnIntopx = 750 / app.globalData.windowWidth
const util= require('../../common/js/util.js')
const getDataBase = require('../../common/js/getDatabase.js')
let message = {
    // index的btn
    indexBtn:[
      { text: '点播', color: '#28C1F1', borderColor: '#28C1F1' },
      { text: '直播', color: '#7c7c7c', borderColor: 'transparent' },
      { text: '收录', color: '#7c7c7c', borderColor: 'transparent' }
    ],
    scrollSearch:[
      { text: '计算机' },
      { text: '哲学' },
      { text: '外语' },
      { text: '理学' },
      { text: '工学' },
      { text: '心理学' }
    ],
    // index 内容的控制器
    pageContainControll : 0
}

    // 底部导航
  let navigatorFooter = function (e) {
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
  },
  indexBtn = function (e) {
    let str = e.currentTarget.dataset.str 
    console.log(str)
    let index = e.currentTarget.dataset.index
    let color = e.currentTarget.dataset.color
    let item = this.data[str]
    for (let i = 0; i<item.length; i++) {
      if (i === index) {
        item[i].color = item[i].borderColor = color
      } else {
        item[i].color = '#7c7c7c'
        item[i].borderColor= 'transparent'
      }
    }
    if(index === 1) {
      getDataBase.fuc.getVideoList(this)
    }
    if(index===2) {
      getDataBase.fuc.getMyselfVideo(this,'/video/studenting')
      getDataBase.fuc.getMyselfVideo(this,'/video/collectionlist')
    }
    this.setData({
      [str] :item,
      Video_pageContainControll : index
    })
  },
  videoListBtn = function(e) {
    let str = e.currentTarget.dataset.str
    // 获取点播信息
    getDataBase.fuc.getVideoPlayList(this,str)
  }

  let fuc = {
    indexBtn : indexBtn,
    videoListBtn:videoListBtn,
    navigatorFooter :navigatorFooter,
    intoVideoDetail:function(e) {
      // 请求对应的video内容
      let id = e.currentTarget.dataset.id,index=e.currentTarget.dataset.index%10+1
      getDataBase.fuc.getVideoPlayDetail(this,id,index)
    },
    returnVideo:function(e) {
      let type = e.currentTarget.dataset.type
      if(typeof type === 'undefined') {
        this.setData({
          ['videoPage.first']:false,
          ['videoPage.second']:true
       })
      } else {
        this.setData({
          ['videoPage.second']:false,
          ['videoPage.playVideo']:true
       })
      }

    }
  }
module.exports = {
  message :message,
  fuc :fuc
}
