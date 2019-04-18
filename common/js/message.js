

const turnInOther = function(str,that){
  let pageControll = that.data.pageControll
  console.log(pageControll);
  
  for (var i in pageControll) {
    i === str ? pageControll[i] = false : pageControll[i] = true;
  }
  that.setData({
    pageControll: pageControll,
    // 设置二级页面的flag true 代表处于三级  false出于 1 2级
    secondPagse: true
  })
}
const turnInSecond = function(str,that,nums){
  let secondPageControll = that.data.secondPageControll
  let pageControll = that.data.pageControll
  console.log(nums)
  if(typeof nums !== 'undefined'){
    str = str+ nums
  }
  for (var i in secondPageControll) {
    i === str ? secondPageControll[i] = false : secondPageControll[i] = true;
  }
  for (var i in pageControll) {
     pageControll[i] = true

  }
  that.setData({
    secondPageControll: secondPageControll,
    pageControll:pageControll,
    // 设置二级页面的flag true 代表处于三级  false出于 1 2级
    secondPagse:true
  })
  console.log('结束')
}
const returnSecond = function (str,that) {
  //关闭二级
  let str1 = 'secondPageControll.'+ str
  //打开对应的一级
  if( str === 'messageAdd1'||str ==='messageAdd2'){
    str = 'messageAdd' // 对于2种类二级页面的处理
  }
  let str2 = 'pageControll.' + str

  // 设置一级flag true 代表处于三级  false出于 1 2级
  that.setData({
    secondPagse: false,
    [str1] : true,
    [str2] : false
    
  })
}

let fucBtnEvent = {
  getGrade: function (URL, cookies, that) {
    var URL = URL+ '/Info/scoreInquiry'
      // console.log(cookies);
      wx.showLoading({title:"加载中"})
      wx.request({
        url: URL,
        data: {
          stuId:1,
          year:"2019年上半学期"
        },
        method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
        header: {
          'content-type': 'application/json',
          "Cookie": 'JSESSIONID='+cookies
        }, // 设置请求的 header
        success: function(res){
          // success
          let gradeData = res.data.data
          let semesterGPA =gradeData.semesterGPA,averageGPA=gradeData.averageGPA,rank=gradeData.rank
          // 成绩详情 的平均绩点
          let gradeMessage = [
            {
              title: '绩点',
              num: semesterGPA
            },
            {
              title: '平均绩点',
              num: averageGPA
            },
            {
              title: '绩点排名',
              num: rank
            },
            {
              title: '综合测评',
              num: 12
            }
          ]
          let detailGrade = gradeData.courseScore
          that.setData({
            gradeMessage:gradeMessage,
            detailGrade:detailGrade
          })
        },complete(){
          wx.hideLoading()
        }
      })
  },
  getNoticeList(URL, cookies, that) {
    URL = URL.concat('/Info/notificationList')
    wx.showLoading({title:"加载中"})
    wx.request({
      url: URL,
      data: {
        stuId:1,
        offset:6,
        limit:1
      },
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: {
        'content-type': 'application/json',
        "Cookie": 'JSESSIONID='+cookies
      }, // 设置请求的 header
      success: function(res){
        // success
        let data = res.data.data.data
      
        let arr ={},noticeMessage=[]
        for(let i of res.data.data.data.keys()){
          noticeMessage.push({
            title:'教务处',
            notiTitle:data[i].notiTitle,
            hasRead :true,
            content : data[i].notiSummarized
          })

        }
        console.log(noticeMessage);
        that.setData({
          noticeMessage:noticeMessage
        })
        
      },complete(){
        wx.hideLoading()
      }
    })
  },
  getTeacherList(URL, cookies, that) {
    URL = URL.concat('/Info/teachersInfo')
    wx.showLoading({title:"加载中"})
    wx.request({
      url: URL,
      data: {
        stuId:1
      },
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: {
        'content-type': 'application/json',
        "Cookie": 'JSESSIONID='+cookies
      }, // 设置请求的 header
      success: function(res){
        // success
        let data = res.data.data
        let arr = []
        let first;
        for(let i of data.keys()) {
          // if(data[i].coursesName.join(',').lenth>20)
          if(data[i].coursesName.length > 2 ) {
            data[i].coursesName.splice(2,data[i].coursesName.length-2,'...')
          }

          let teacher = {
            bindtap: data[i].teacherName,
            id:data[i].id,
            photoUrl: 'https://www.gdutrex.xyz/imba/teacherCircle.png',
            message: [
              { title: '姓名', contain: data[i].teacherName },
              { title: '任教科目',  contain: data[i].coursesName.join(',')},
              { title: '联系电话', contain: data[i].phoneNumber },
              { title: '电子邮箱', contain: data[i].eMail},
              { title: '办公室', contain: data[i].avatarPath }
            ]
          }
          arr.push(teacher)
        }
        that.setData({
          teacherMessage:arr
        })
      },complete(){
        wx.hideLoading()
      }
    })
  },getExamMessage(URL,cookies, that) {
    wx.showLoading({title:"加载中"})
    URL = URL.concat('/Info/examInfo')
    wx.request({
      url: URL,
      data: {
        stuId:1
      },
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: {
        'content-type': 'application/json',
        "Cookie": 'JSESSIONID='+cookies
      }, // 设置请求的 header
      success: function(res){
        // success

        console.log(res);
        let data = res.data.data
        let arr =[]
        for (let i of data.keys()) {
          let item = data[i]
          let examMessage = {
            title:item.coursesName,
            position:item.site,
            number:item.seatNumber,
            teacherName:item.invigilator,
            time:[`第${item.dayOfWeek}周 星期${item.dayOfWeek}  ${item.examTime}`]
          }
          arr.push(examMessage)
        }
        that.setData({
          examMessage:arr
        })
      },complete(){
        wx.hideLoading()
      }
    })
  },
  getAddMore(URL,cookies,that) {
    wx.showLoading({title:"加载中"})
    URL = URL.concat('/Info/matchInfo')
    wx.request({
      url: URL,
      data: {
        matchType:1,
        offset:0,
        dataNum:6
      },
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: {
        'content-type': 'application/json',
        "Cookie": 'JSESSIONID='+cookies
      }, // 设置请求的 header
      success: function(res){
        // success
        console.log(res.data.data);
        let addMessage =res.data.data
        that.setData({
          addMessage:addMessage
        })
      },complete(){
        wx.hideLoading()
      }
    })
  }
}
module.exports = {
  turnInOther: turnInOther,
  turnInSecond:turnInSecond,
  returnSecond: returnSecond,
  fucBtnEvent:fucBtnEvent
}