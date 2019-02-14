

const turnInOther = function(str,that){
  let pageControll = that.data.pageControll
  for (var i in pageControll) {
    i === str ? pageControll[i] = false : pageControll[i] = true;
  }
  that.setData({
    pageControll: pageControll
  })
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
    pageControll:pageControll
  })
}

module.exports = {
  turnInOther: turnInOther,
  turnInSecond:turnInSecond
}