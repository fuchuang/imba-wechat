const app = getApp()
const common = require('../common/index.js');
const my = require('../my/index.js');
let openAlert = function (str,that) {
  that.setData({
    alertContainFlag:false,
    alertContain:str
  })
}
Page({
  data:{
    //公用属性
    headTitle: app.globalData.statusBarHeight+10,
    headHeight: app.globalData.statusBarHeight+50,
    classPosition: (750- 100)/2,
    fooMassage: true,
    fooVideo: true,
    fooCommon: true,
    fooMy: true,
    title: 'IMBA课程表',
    gradeCardTop: common.message.gradeCardTop,
    mygradeCardTop : my.message.gradeCardTop,
    noticeHeight : common.message.noticeHeight,
    chooseHeight : common.message.chooseHeight,
    // 空白页面
    onloadStatus:true,
    // 内容
    userName:'',
    password:'',
    
    // 弹窗
    alertContainFlag : true,
    alertContain:'重新输入密码',
  },
  //判断是否缓冲
  onLoad (e) {
    try{
      let userName = wx.getStorageSync('userName')
      let password = wx.getStorageSync('password')
      let classInfo = wx.getStorageSync('classInfo')
      let info = wx.getStorageSync('info')
      let type = wx.getStorageSync('type')
      let classContain = wx.getStorageSync('classContain')
      // console.log(classContain);
      classContain=JSON.stringify(classContain)
      if(userName !== ''&& password!==''&&type!==''&&info!==''&&classInfo!=='') {
        // console.log(userName,password,classInfo,info,type)
        // classContain=JSON.parse(option.classContain)//
        let url =    '../control/index?userName='+ this.data.userName +'&password='+this.data.password +'&type=' + type + '&info='+info + '&classInfo=' +classInfo + '&classContain=' +classContain +'&flag=' + 'true'
        wx.redirectTo({
          url: url,
        })
      }else{
        this.setData({
          onloadStatus:false
        })
      }
    } catch (e) {

    }
  }, 
  login : function (e){
    let userName = this.data.userName,password=this.data.password
    let query = new wx.BaaS.Query()
    let tableId = 'userInfo'
    if (this.data.userName === ''||this.data.password === ''){
      openAlert('请输入密码' ,this)
    } else {
      query.contains('userId', userName)
      let Product = new wx.BaaS.TableObject(tableId)
      Product.setQuery(query).find().then(res => {
        // success
        //console.log(res)
        res = res.data
        
        if (res.objects.length=== 1 && res.objects[0].password===password) {
          // success
        let url =   '../control/index?userName='+ this.data.userName +'&password='+this.data.password +'&type=' + res.objects[0].type + '&info='+res.objects[0].info + '&classInfo=' + res.objects[0].classInfo +'&classContain=' + res.objects[0].classContain +'&flag=' + 'false'
          
          wx.setStorageSync('userName', this.data.userName)
          wx.setStorageSync('password', this.data.password)
          wx.setStorageSync('classInfo', res.objects[0].classInfo)
          wx.setStorageSync('info', res.objects[0].info)
          wx.setStorageSync('type',  res.objects[0].type)
          //console.log(res.objects[0].classContain);
          
          wx.setStorageSync('classContain', res.objects[0].classContain)
          wx.redirectTo({
            url: url,
            })
        } else {
          openAlert('账号密码错误' ,this)
        }
      }, err => {
        // err
        openAlert('网络不稳定 请重新登录' ,this)
      })
    }

  },
  inputValue(e) {
    //console.log(e)
    let str = e.target.dataset.name
    this.setData({
      [str]:e.detail.value
    })
  },
  closeAlert(e) {
    this.setData({
      alertContainFlag:true
    })
  }
})
