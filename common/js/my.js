const recordBtn = function (that, addNum, firstNum, secondNum) {
  let displayRecorderMessage = that.data.displayRecorderMessage
  let index = displayRecorderMessage[0]
  let recorderMessage = that.data.recorderMessage
  if (index >= firstNum && index < secondNum) {
    // 进行转换
    for (let i in recorderMessage) {
      for (let n = 0; n < 8; n++) {
        recorderMessage[i].displayRecord[n] = recorderMessage[i].record[index + n]
      }
    }
    for (let i = 0; i < 8; i++) {
      displayRecorderMessage[i] += addNum
    }
  } else { return }
  that.setData({
    recorderMessage: recorderMessage,
    displayRecorderMessage: displayRecorderMessage
  })
}
const openChooseBtn = function (that, recordBtnMessage, index) {
  for (let i = 0; i < recordBtnMessage.length; i++) {
    recordBtnMessage[i].hidden = true
    recordBtnMessage[i].angleFlag = true
  }// 隐藏所有按钮选项
  recordBtnMessage[index].hidden = false
  recordBtnMessage[index].angleFlag = false
  that.setData({
    recordBtnMessage: recordBtnMessage,
    recorderBtnFlag: false
  })
}
const displayAllBtn = function (that, recordBtnMessage) {
  for (let i = 0; i < recordBtnMessage.length; i++) {
    recordBtnMessage[i].hidden = false
  }// 显示所有按钮选项
  that.setData({
    recordBtnMessage: recordBtnMessage,
    recorderBtnFlag: true
  })
}
// 一些请求
let requset1 = function(that,stuId,offset,limit,str) {
  wx.showLoading({
    title:'正在加载'
  })
  let url ='https://campus.gbdev.cn:8080/IMBA'.concat(str)
  let cookies = wx.getStorageSync('cookies')
  wx.request({
    url: url,
    data: {
      stuId:stuId,
      offset:offset,
      limit:limit
    },
    method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
    header: {
      'content-type': 'application/json',
      "Cookie": `JSESSIONID=${cookies}`
    }, 
    success: function(res){
      // success
      console.log(res.data.data);
      str = str.slice(9)
      that.setData({
        [`myMessage.${str}`]:res.data.data
      })
    },complete(e) {
      wx.hideLoading()
    }
  })
}
let requset2 = function (that,stuId,str) {
  wx.showLoading({
    title:'正在加载'
  })
  let url ='https://campus.gbdev.cn:8080/IMBA'.concat(str)
  let cookies = wx.getStorageSync('cookies')
  wx.request({
    url: url,
    data: {
      stuId:stuId
    },
    method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
    header: {
      'content-type': 'application/json',
      "Cookie": `JSESSIONID=${cookies}`
    }, 
    success: function(res){
      // success
      console.log(res.data.data);
      str = str.slice(9)
      that.setData({
        [`myMessage.${str}`]:res.data.data
      })
    },complete(e) {
      wx.hideLoading()
    }
  })
}
let requset3 = function (that,stuId,str,index) {
  wx.showLoading({
    title:'正在加载'
  })
  let url ='https://campus.gbdev.cn:8080/IMBA'.concat(str)
  let cookies = wx.getStorageSync('cookies')
  wx.request({
    url: url,
    data: {
      stuId:stuId
    },
    method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
    header: {
      'content-type': 'application/json',
      "Cookie": `JSESSIONID=${cookies}`
    }, 
    success: function(res){
      // success
      let noticeMessage = that.data.noticeMessage
      if (typeof noticeMessage !== 'object') {
        noticeMessage = []
      }
      noticeMessage[index] = res.data.data
     
      console.log(res.data.data);
      str = str.slice(9)
      console.log(that.data.noticeMessage);
      
      that.setData({
        ['myNoticeMessage']:noticeMessage
      })
      
    },complete(e) {
      wx.hideLoading()
    }
  })
}
let getTree = function (that,URL) {
  wx.showLoading({
    title:'正在加载'
  })
  let cookies = wx.getStorageSync('cookies')
  wx.request({
    url: URL,
    data: {},
    method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
    header: {
      'content-type': 'application/json',
      "Cookie": `JSESSIONID=${cookies}`
    }, 
    success: function(res){
      // success
      console.log(res.data.msg);
      /*that.setData({
        myMessage:res.data.data
      })*/
      let lever = ['树苗','树芽','树枝','大树']
      // console.log(lever[parseInt(26/25)]);
      
      for(let i of res.data.msg.keys()) {
        res.data.msg[i].score=i
        res.data.msg[i].level = lever[parseInt(res.data.msg[i].score/25)]
      }
      // 排序
      res.data.msg.sort((pre,nex)=>{
        return nex.score-pre.score 
      })
      that.setData({
        getTree:res.data.msg
      })

    },complete(e) {
      wx.hideLoading()
    }
  })
}
// 切换页面
const changePage = function (that,str,index) {
  let pageSecond = that.data.mypageSecond
  for (let i in pageSecond) {
    str === i ? pageSecond[i] = false : pageSecond[i] = true;
  }
  console.log(str);
  if(str==='pagecollect') {
    // 收藏列表
    requset2(that,1,'/Profile/videoCollection')
    requset2(that,1,'/Profile/electiveCollection')
    requset1(that,1,0,6,'/Profile/notificationCollection')
  }
  // 浏览历史
  if(str==='pagehistory') {
    requset1(that,1,0,6,'/Profile/viewRecentlyNotice')
    requset1(that,1,0,6,'/Profile/videoViewedHistory')
  }
  //收藏帖子信息
  if(str==='pagetie') {
    let url = ['/Profile/myPosts/posted','/Profile/myPosts/viewdRecently','/Profile/myPosts/likes']
    requset3(that,1,url[0],0)
    requset3(that,1,url[1],1)
    requset3(that,1,url[2],2)
  }
  if(str==='pagetree') {
    // 请求排行榜
    let url ='https://campus.gbdev.cn:8080/IMBA'.concat('/tree/list')
    getTree(that,url)
  }
  that.setData({
    mypageSecond: pageSecond
  })
}

module.exports = {
  recordBtn: recordBtn,
  openChooseBtn: openChooseBtn,
  displayAllBtn: displayAllBtn,
  changePage: changePage,
  requset3:requset3
}
