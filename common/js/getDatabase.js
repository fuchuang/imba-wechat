let fuc = {
  getCommonClassList:(that, url, cookies)=>{
    wx.showLoading({
      title:'正在加载'
    })
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
      },complete(e) {
        wx.hideLoading()
      }
    })
  },
  getCommonClassListDetail :(that,id,type,index)=>{
    wx.showLoading({
      title:'正在加载'
    })
    let url ='https://campus.gbdev.cn:8080/IMBA'.concat('/student/reggisterstatus')
    let cookies = wx.getStorageSync('cookies')
    if(type=== 'student') {
      wx.request({
        url: url,
        data: {
          courseinfoid:id
        },
        method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
        header: {
          'content-type': 'application/json',
          "Cookie": `JSESSIONID=${cookies}`
         },
        success: function(res){
          // success
          console.log(res.data.msg)
          let classMessageDetial = res.data.msg
          classMessageDetial.id = id
          classMessageDetial.index = index
          that.setData({
            //classDetialPeople:data,//跳转
            classMessageDetial:classMessageDetial,
            ['pageSecond.commonIndex']:true,
            ['pageSecond.classMessage']:false,
            ['pageClassSecond.classIndex']:false
          })
          
        },complete(e) {
          wx.hideLoading()
        }
      })
      url = 'https://campus.gbdev.cn:8080/IMBA'.concat('/student/notification')
      wx.request({
        url: url,
        data: {
          courseinfoid:id
        },
        method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
        header: {
          'content-type': 'application/json',
          "Cookie": `JSESSIONID=${cookies}`
         },
        success: function(res){
          // success
          console.log(res.data.msg)
          // let classMessageDetialNoti = res.data.msg
          that.setData({
            classMessageDetialNoti:res.data.msg,
            classMessageDetialNotiLength:res.data.msg.length
          })
        },complete(e) {
          wx.hideLoading()
        }
      })
      // 请求右上角
    } else {
      url='https://campus.gbdev.cn:8080/IMBA'.concat('/student/course/reggisterlist')
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
          let obj = {
            flag:true,
            status:0,
            classDetialBtn:[
              {name:'已到',btn:true,color:'#38FBBF'},
              {name:'迟到',btn:true,color:'#FEC25B'},
              {name:'未到',btn:true,color:'#EB5526'}]
            
          }
          console.log(res.data.msg);
          let data = res.data.msg
          for (let index of data.keys()) {
            // data[index].concat(obj)
            for(let item in obj) {
           
              data[index][item] = obj[item]
            }
            // console.log(data);
            
          }
          that.setData({
            classDetialPeople:data,//跳转
            ['pageSecond.commonIndex']:true,
            ['pageSecond.classMessage']:false,
            ['pageClassSecond.classIndex']:false
          })
          return data
        },complete(e) {
          wx.hideLoading()
        }
      })
    }
  },
  getTieList:function (that) {
    wx.showLoading({
      title:'正在加载'
    })
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
        
      },complete(e) {
        wx.hideLoading()
      }
    })
  },
  getTieDetail:function(that,now,next,second,item) {
    wx.showLoading({
      title:'正在加载'
    })
    let url ='https://campus.gbdev.cn:8080/IMBA'.concat('/commnity/commentsid')
    let cookies = wx.getStorageSync('cookies')
    wx.request({
      url: url,
      data: {
        post_id:item.post.id
      },
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: {
        'content-type': 'application/json',
        "Cookie": `JSESSIONID=${cookies}`
      }, // 设置请求的 header
      success: function(res){
        // success
        console.log(res.data.msg.list);
        // tieDetailMessage
        let peopleImagaUrl ='"https://www.gdutrex.xyz/imba/ladyStu.png"'
        
        let tieDetailMessage ={
          title :item.post.postsTitle,
          content:item.post.postsContent,
          time:item.post.postsTime,
          tag:item.post.postsTags,
          postName:item.post.name,
          peopleCommon:res.data.msg.list,
          peopleImagaUrl:peopleImagaUrl
        }
        that.setData({
          tieDetailMessage:tieDetailMessage,
          [`pageSecond.${now}`] :  true,
          [`pageSecond.${next}`] :  false,
          [`pageCommonSecond.${second}`] :  false,
        })
        
      },complete(e) {
        wx.hideLoading()
      }
    })
  },
  getDownloadFileMessage(that,id) {
    wx.showLoading({
      title:'正在加载'
    })
    let url ='https://campus.gbdev.cn:8080/IMBA'.concat('/filedownload/filelist')
    let cookies = wx.getStorageSync('cookies')
    wx.request({
      url: url,
      data: {
        courseinfoid:id
      },
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: {
        'content-type': 'application/json',
        "Cookie": `JSESSIONID=${cookies}`
      }, // 设置请求的 header
      success: function(res){
        console.log(res.data.msg);
        
      },complete(e) {
        wx.hideLoading()
      }
    })
  },
  getVideoList(that) {
    // 这里提前加载 一些个人信息
    wx.showLoading({
      title:'正在加载'
    })
    let url ='https://campus.gbdev.cn:8080/IMBA'.concat('/Live/Livelist')
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
        console.log(res.data.msg.list);
        that.setData({
          lineList:res.data.msg.list
        })
       /* that.setData({
          videolist:res.data.msg.list
        })*/
      },complete(e) {
        wx.hideLoading()
      }
    })//天数
  },
  getVideoPlayList(that,str) {
    wx.showLoading({
      title:'正在加载'
    })
    let myselyVideo = that.data.myselyVideo
    let url ='https://campus.gbdev.cn:8080/IMBA'.concat('/teacher/videoseries/list')
    let cookies = wx.getStorageSync('cookies')
    console.log(str);
    // let str='计算机'
    if (typeof str === 'undefined') {
      str ='计算机'
    }
    wx.request({
      url: url,
      data: {
        course_type:str
      },
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: {
        'content-type': 'application/json',
        "Cookie": `JSESSIONID=${cookies}`
      }, 
      success: function(res){
        // success
        console.log(res.data.msg);
        that.setData({
          videolist:res.data.msg.list
        })
      },complete(e) {
        wx.hideLoading()
      }
    })
    if(typeof myselyVideo.flag === 'undefined'){
      console.log(typeof myselyVideo.flag, 'flase');
      wx.request({
        url: 'https://campus.gbdev.cn:8080/IMBA/video/clockstatus',
        data: {},
        method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
        header: {
          'content-type': 'application/json',
          "Cookie": `JSESSIONID=${cookies}`
        }, //
        success: function(res){
          // success
          console.log(res.data.msg);
          that.setData({
            ['myselyVideo.flag']:res.data.msg
          })
        },complete(e) {
          wx.hideLoading()
        }
      })
      wx.request({
        url: 'https://campus.gbdev.cn:8080/IMBA/video/clocknums',
        data: {},
        method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
        header: {
          'content-type': 'application/json',
          "Cookie": `JSESSIONID=${cookies}`
        }, //
        success: function(res){
          // success
          console.log(res.data.msg);
          that.setData({
            ['myselyVideo.dayNums']:res.data.msg
          })
        },complete(e) {
          wx.hideLoading()
        }
      })
    }   
  },
  getVideoPlayDetail(that,id,index) {
    wx.showLoading({
      title:'正在加载'
    })
    // let myselyVideo = that.data.myselyVideo
    let url ='https://campus.gbdev.cn:8080/IMBA'.concat('/video/list')
    let cookies = wx.getStorageSync('cookies')
    let video_series_id = id
    
    wx.request({
      url: url,
      data: {
        video_series_id:video_series_id
      },
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: {
        'content-type': 'application/json',
        "Cookie": `JSESSIONID=${cookies}`
      }, 
      success: function(res){
        // success
        console.log(res.data.msg);
        res.data.msg[0].imageURL = `https://www.gdutrex.xyz/imba/video/videoLogo(${index}).png`
        that.setData({
          ['videoDetailMessage']:res.data.msg[0],
          ['videoPage.first']:true,
          ['videoPage.second']:false
       })
       /* that.setData({
          videolist:res.data.msg.list
        })*/
      },complete(e) {
        wx.hideLoading()
      }
    })
 
  },
  getMyselfVideo(that,str) {
    wx.showLoading({
      title:'正在加载'
    })
    let str2=str.slice(7)
    let url ='https://campus.gbdev.cn:8080/IMBA'.concat(str)
    let cookies = wx.getStorageSync('cookies')
    wx.request({
      url: url,
      data: {},
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: {
        'content-type': 'application/json',
        "Cookie": `JSESSIONID=${cookies}`
      }, 
      success: function(res){
        // success
        console.log(res.data.msg.list);
        that.setData({
          [`myselyVideo.${str2}`] : res.data.msg.list
        })
      },complete(e) {
        wx.hideLoading()
      }
    })
  },
  getMyMessage(that,URL) {
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
        let lever = ['树苗','树芽','树枝','大树']
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
  },getMyMessageNotree(that,URL) {
    wx.showLoading({
      title:'正在加载'
    })
    let cookies = wx.getStorageSync('cookies')
    wx.request({
      url: URL,
      data: {
        stuId:1
      },
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: {
        'content-type': 'application/json',
        "Cookie": `JSESSIONID=${cookies}`
      }, 
      success: function(res){
        console.log(res.data);
        
        that.setData({
          myMessage:res.data.data
        })
  
      },complete(e) {
        wx.hideLoading()
      }
    })
  },getSearchMes(that){
    let url ='https://campus.gbdev.cn:8080/IMBA'.concat('/commnity/findkeywordposts?')
    wx.showLoading({
      title:'正在加载'
    })
    let cookies = wx.getStorageSync('cookies')
    wx.request({
      url: url,
      data: {
        title:that.data.searchMessage
      },
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: {
        'content-type': 'application/json',
        "Cookie": `JSESSIONID=${cookies}`
      }, 
      success: function(res){
        wx.setStorageSync('tieMessage', res.data.msg.objectList)
        that.setData({
          tieMessage:res.data.msg.objectList
        })
      },complete(e) {
        wx.hideLoading()
      }
    })
  }
}
module.exports = {
  fuc
}