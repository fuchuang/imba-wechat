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
// 切换页面
const changePage = function (that,str) {
  let pageSecond = that.data.pageSecond
  for (let i in pageSecond) {
    str === i ? pageSecond[i] = false : pageSecond[i] = true;
  }
  that.setData({
    pageSecond: pageSecond
  })
}
module.exports = {
  recordBtn: recordBtn,
  openChooseBtn: openChooseBtn,
  displayAllBtn: displayAllBtn,
  changePage: changePage
}
