Page({
  data:{
    cameraHeight:0
  },
  onLoad(e) {
  console.log(e);
  
  this.setData({
    // cameraHeight:e.options.cameraHeight
    cameraHeight:e.cameraHeight
  })

  },
  returnLive(e){
    console.log(21);
    
    wx.navigateBack({
      delta: 1, // 回退前 delta(默认为1) 页面
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
  }
})