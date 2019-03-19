
const util = require('./util.js')
let fcu = {
  get24WeekClassContain (that, classContain) {
    classContain =JSON.parse(classContain)
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
    // console.log('get7DaysClass',class24Weeks[weekIndex][srt]);
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
  
  },
  getQianClass(classContain, nowdata, that) {
    
    let lastdata = ((nowdata-1) + 7 ) % 7 ;
    let nextdata = ((nowdata+1) + 7 ) % 7 ;
    let data = that.data.nowData
    data[nowdata].nowData = data[lastdata].lastData  = data[nextdata].nextData = false
    // console.log(classContain);
    for (let [inedx,value] of classContain.entries()) {
      let classContain = value.class
      data[inedx].class = []
      if (typeof classContain === 'object') {
        for (let item of classContain) {
          if (typeof item.start === 'number') {
            // console.log(item.start);
            // 判断长度和start
            let length =data[inedx].class.length,
            start = parseInt(item.start)+1
            // console.log(length,start);
            while(start > length) {
              length =data[inedx].class.length
              data[inedx].class.push({})
            }
            data[inedx].class.push(item)
            
            
          }
        }
      }
      // data[inedx].class= value.class
      
    }
    return data
  },
  updateWeekAndData(that, index) {
   let oneWeek = 24 * 60 * 60 * 1000 * 7;
    // 获取选择当前周次的日期
   let detail = index - that.data.setNowWeek.index
   let time = new Date((new Date).getTime() + detail * oneWeek);
   let data = util.getDates(7, time);
   let classAboutSevenM = []
   // 月份
   //周次和日期
   // console.log('updateWeekAndData',that.data.classContain)
   for (var i = 0; i < 7; i++) {
      time = data[i].time.substring(8)
     if (time == '01') {
       time = parseInt(data[i].time.substring(5, 7)) + '月'
     }
     // 获取对应的7天课程

     let class7Days = this.get7DaysClass(i, index, that.data.classContain);
     classAboutSevenM[i] = {
       week: data[i].week,
       time: time,
       class: class7Days
         // 对应天数的课程内容  
     }
   }
   // console.log(that.data.classContain);
   
  //保存缓存
  /* if (index !== that.data.setNowWeek.index)// 只保存当周
    wx.setStorageSync('classAboutSevenM', classAboutSevenM)*/
   return classAboutSevenM
  },
  selectUpdate(that, index) {
    let classAboutSevenM =  []
    let nowMonth,time;
    // console.log(typeof classAboutSevenM);
    let oneWeek = 24 * 60 * 60 * 1000 * 7;
    let detail = index - that.data.setNowWeek.index
    time = new Date((new Date).getTime() + detail * oneWeek);
    let data = util.getDates(7, time);
    nowMonth = parseInt(data[0].time.substring(5, 7)) + '月'
    // 缓存没保存
    classAboutSevenM = this.updateWeekAndData(that, index)

    //当前 周几
    let nowdata = (new Date(time).getDay() + 6) % 7 ;
    // 处理签筒 的课程
    nowdata = this.getQianClass(classAboutSevenM, nowdata, that)
    // 处理签筒的课程表
    // console.log(classAboutSevenM)
    that.setData({
      nowMonth:nowMonth,
      classAboutSevenM: classAboutSevenM,
      nowData :nowdata
    })
  },
  addClassContain(that,start,selectWeeks,teacher,className,classPosition,classLength) {
    // console.log(that.data.classContain);
    /// 添加课程
    let color = ['#FFC853','#53CDF3','#43FBC3']
    let addClassMes = that.data.addClassMes
    let classContain = that.data.classContain
    let week = addClassMes.value[0]
    let numsLength=[] ;
    for (let [index, item] of selectWeeks.entries()) {
      if(!item) {
        // let i = index-1
        // console.log(--index)

        numsLength.push(index)
      }
    }
   // console.log(numsLength);
    
    for (let [index,item] of selectWeeks.entries()) {
       // console.log(item,index)
      if(!item) {
        let str = `this.data.classContain[0].${week}`
        let weeknums ;
        // 需要重新添加对应的周次
        index--
        switch (week) {
          case 0: weeknums=classContain[index].Mon;break;
          case 1: weeknums=classContain[index].Tues;break;
          case 2: weeknums=classContain[index].Wen;break;
          case 3: weeknums=classContain[index].Thur;break;
          case 4: weeknums=classContain[index].Fri;break;
          case 5: weeknums=classContain[index].Sat;break;
          case 6: weeknums=classContain[index].Sun;break;
          default:break;
        } 
        index++
      //  console.log('Nopush',weeknums);
      //  console.log(typeof weeknums !== 'object');
      // console.log(index,weeknums);
        if(typeof weeknums !== 'object') {
          weeknums=[]
        }
     //   console.log('push',weeknums);
        weeknums.push({
           classLength:classLength,
           color:color[parseInt(Math.random()*3)],
           name:className,
           position:classPosition,
           start:start,
           teacher:teacher,
           weekNums:numsLength
          
        })
        weeknums.sort((pre,next)=>{
          return pre.start-next.start
        })
       
      }
    }
    //添加课程之后显示本周课程表
    let setNowWeekindex = that.data.setNowWeek.index
    that.setData({
      classContain :classContain,
      ['setNowWeek.lastIndex'] :setNowWeekindex
    })
  
    
    this.selectUpdate(that,that.data.setNowWeek.index)

    let strclassContain = JSON.stringify(classContain)
 
     wx.setStorageSync('classContain', strclassContain)

    
  }

}
module.exports= {
  fcu :fcu
}