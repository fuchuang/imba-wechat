
const changeFirstClass = data => {
  

  let value = data.detail.value,
      first = value[1],
      second = value[2];
  if(first>=second){
    first == 12 ? second = 12 : second = first + 1;
  }
  return [value[0], first, second]
}
const alertAndCloseMenu = function (str, that) {
  that.setData({
    [str]: false,
    chooseWeek: true,
    chooseMenu: true
  })
}
const closeAlert = function (str, that){
  if (str === 'setNowWeek') {
    // 设置周次
    that.setData({
      [str]: true,
      // setNowWeek : 0
    })
  } else {
    that.setData({
      [str]: true,
    })
  }

}

module.exports = {
  changeFirstClass: changeFirstClass, 
  alertAndCloseMenu: alertAndCloseMenu,
  closeAlert: closeAlert
}
