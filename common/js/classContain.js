
let fcu = {
  get24WeekClassContain (that, classContain) {

    let weekNums = new Array()
    for (let i = 0;i < 24; i++) {
      weekNums[i] = {
        'Mon':[],
        "Tues": [],
        "Wen": [],
        "Thur": [],
        "Fri": [],
        "Sat": [],
        "Sun": []
      }
    }
    for (let day in classContain) {
      // console.log(day);
      for (let i = 0;i < classContain[day].length;i++) {
        let message = classContain[day][i]
        let length = message.weekNums.length
        for (let weeekItem = 0;weeekItem < length; weeekItem++) {
          let weekNumber = message.weekNums[weeekItem]
          // console.log(weekNumber);
          // 添加到classContain
          // 需要每一周都做区别 -1是为了数组越位
          weekNums[weekNumber-1][day].push(message)
        }
      }
    }
    // console.log(weekNums)
    return weekNums
  },
  get7DaysClass (i,weekIndex,class24Weeks) {
    let week = ['Mon',"Tues","Wen","Thur","Fri","Sat","Sun"]
    let color = ['#FFC853','#53CDF3','#43FBC3']
    let srt = week[i]
    let contain = class24Weeks[weekIndex][srt]
    let classLength = 13,start = 1;
    // 排序
    contain.sort((pre, next)=>{
      return   pre.start - next.start 
    })
    if (contain.length!== 0) {
      // 处理课程表
      let length =  contain.length
      for (let item = 0;item < length; item++) {
        contain[item].color = color[parseInt(Math.random()*3)]
        let deltile =  contain[item].start - start
        if (start === 1) {        
          // 开头第一个
          if (deltile > 0) {
            length = contain.unshift({
              classLength : deltile,
              color:'transparent'
            })
            item++
          }
        } else {
          if (deltile > 0) {
            contain.splice(item,0,{
              classLength : deltile,
              color:'transparent'
            })
            length = contain.length
            item++
          }
        }
        start = deltile +  contain[item].classLength
      }
      return class24Weeks[weekIndex][srt]
    }
  
  }
}
module.exports= {
  fcu :fcu
}