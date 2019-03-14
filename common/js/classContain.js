
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
    let color = ['#FFC853','#53CDF3','#43FBC3']
    for (let day in classContain) {
      // console.log(day);
      for (let i = 0;i < classContain[day].length;i++) {
        let message = classContain[day][i]
        let length = message.weekNums.length
        message.color=color[parseInt(Math.random()*3)]
        for (let weeekItem = 0;weeekItem < length; weeekItem++) {
          let weekNumber = message.weekNums[weeekItem]
          // console.log(message);
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
    // let color = ['#FFC853','#53CDF3','#43FBC3']
    let srt = week[i]
    let contain = []
    class24Weeks[weekIndex][srt].forEach((Element, index)=>{
      // console.log(Element, index)
      contain[index] = Element
    })
   // console.log(contain);
    
    let start = 1;
    // 排序
    contain.sort((pre, next)=>{
      return   pre.start - next.start 
    })
    // console.log(contain);
    if (contain.length!== 0) {
      // 处理课程表
      let length =  contain.length
      for (let item = 0;item < length; item++) {
        // contain[item].color = color[parseInt(Math.random()*3)]
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
              classLength : deltile-1,
              color:'transparent'
            })
            length = contain.length
            item++
          }
        }
        start = deltile +  contain[item].classLength
      }
      return contain
    }
  
  }
}
module.exports= {
  fcu :fcu
}