let fuc = {
  getCommonClassList:(that, url, cookies)=>{
    wx.request({
      url: url,
      data: {
        course_year:'2019年上半学期'
      },
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: {
        'content-type': 'application/json',
        "Cookie": `JSESSIONID=${cookies}`
      }, // 设置请求的 header
      success: (res)=>{
        // success
        let color = ['#38FBBF', '#51D6FF', '#FFC853']
        let msg =res.data.msg
        try{
          for (let i =0;i< msg.length;i++ ){
            // console.log(i);
            msg[i].bgColor = color[i%3]
          }
         console.log(res.data.msg);
         that.setData({
           classMessage:msg
         })
        } catch(e) {

        }
         
      }
    })
  },
  getCommonClassListDetail :(that,id)=>{
    let url ='https://campus.gbdev.cn:8080/IMBA'.concat('/student/course/reggisterlist')
    let cookies = wx.getStorageSync('cookies')
    wx.request({
      url: url,
      data: {
        course_id:id
      },
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
       header: {
        'content-type': 'application/json',
        "Cookie": `JSESSIONID=${cookies}`
       }, // 设置请求的 header
      success: function(res){
        // success
        console.log(res.data.msg);
        
      }
    })
  },
  getTieList:function (that) {
    let url ='https://campus.gbdev.cn:8080/IMBA'.concat('/commnity/postlist')
    let cookies = wx.getStorageSync('cookies')
    wx.request({
      url: url,
      data: {

      },
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: {
        'content-type': 'application/json',
        "Cookie": `JSESSIONID=${cookies}`
      }, // 设置请求的 header
      success: function(res){
        // success
        console.log(res.data.msg.objectList)
        that.setData({
          tieMessage:res.data.msg.objectList
        })
        
      }
    })
  }
}
module.exports = {
  fuc
}