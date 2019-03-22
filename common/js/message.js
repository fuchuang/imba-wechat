

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
    var URL = URL+ '/scoreInquiry'
      // console.log(cookies);
      wx.request({
        url: URL,
        data: {
          stuId:1,
          year:"2018年"
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
          console.log(res.data.data);

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