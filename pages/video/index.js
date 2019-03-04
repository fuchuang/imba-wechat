const app = getApp()
const windowWidth = app.globalData.windowWidth;
const windowHeight = app.globalData.windowHeight;
const rpxTurnIntopx = 750 / app.globalData.windowWidth
const util= require('../../common/js/util.js')
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
      { text: '心理学' },
      { text: '计算机' },
      { text: '哲学' },
      { text: '外语' },
      { text: '理学' },
      { text: '工学' },
      { text: '心理学' }
    ],
    // index 内容的控制器
    pageContainControll : 2
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
    util.indexBtn(e,this)
/*     let str = e.currentTarget.dataset.str
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
    this.setData({
      [str] :item,
      pageContainControll : index
    }) */
  }
  let fuc = {
    indexBtn : indexBtn,
    navigatorFooter :navigatorFooter
  }
module.exports = {
  message :message,
  fuc :fuc
}
