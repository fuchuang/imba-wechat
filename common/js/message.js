

const turnInOther = function(str,that){
  let pageControll = that.data.pageControll
  for (var i in pageControll) {
    i === str ? pageControll[i] = false : pageControll[i] = true;
  }
  that.setData({
    pageControll: pageControll,
    // 设置二级页面的flag true 代表处于三级  false出于 1 2级
    secondPagse: true

  })
  console.log('结束')
}
const turnInSecond = function(str,that){
  let secondPageControll = that.data.secondPageControll
  let pageControll = that.data.pageControll
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
  let str2 = 'pageControll.' + str
  // 设置一级flag true 代表处于三级  false出于 1 2级
  that.setData({
    secondPagse: false,
    [str2] : false,
    [str1] : true
  })
}
module.exports = {
  turnInOther: turnInOther,
  turnInSecond:turnInSecond,
  returnSecond: returnSecond
}