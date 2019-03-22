const app = getApp()
const windowWidth = app.globalData.windowWidth;
const rpxTurnIntopx = 750 / app.globalData.windowWidth
const my = require('../../common/js/my.js');
const util = require('../../common/js/util.js')
const windowHeight = app.globalData.windowHeight;
const getDataBase =require('../../common/js/getDatabase.js')
let message = {
    noticeHeight : rpxTurnIntopx * (windowHeight - 50 - app.globalData.statusBarHeight) - 250,
    chooseHeight : rpxTurnIntopx * (windowHeight -115 - app.globalData.statusBarHeight) - 250,
    gradeCardTop: rpxTurnIntopx * (50 + app.globalData.statusBarHeight),
    recordBtnMessage: [
      { text: '大一第二学期', angleFlag: false, hidden: false },
      { text: '大二第一学期', angleFlag: true, hidden: true },
      { text: '大二第二学期', angleFlag: true, hidden: true }
    ],

    /* titlebtn 信息 */
    indexBtn:[
      { text: '班群', color: '#28C1F1', borderColor: '#28C1F1' },
      { text: '社区', color: '#7c7c7c', borderColor: 'transparent' }
    ],
    /* 首页按钮的内容 */
    pageContainControll:0,
    pageSecond:{
      commonIndex:true,
      classMessage:false,
      commonDetail:true
    },
    pageClassSecond:{
      classIndex:true,
      download:true,
      calssDetail:false,
      tree:true
    },
    pageCommonSecond:{
      commonindex:true,
      commonSend:true
    },

    /* 班群信息 */
    classMessage:[/*
      {course_name:'线性代数',teacher_name:'李玉',nums:'67',bgColor:'#38FBBF',course_id:''},
      {course_name:'线性代数',teacher_name:'李玉',nums:'67',bgColor:'#51D6FF',course_id:''},
      {course_name:'线性代数',teacher_name:'李玉',nums:'67',bgColor:'#FFC853',course_id:''}
      */
    ],
    /* 下载附件的信息 */
    downloadMessage:[
      {fileName:'线性代数',fileType:1,fileSize:'11.8k',time:'1-14'},
      {fileName:'线性代数',fileType:2,fileSize:'11.8k',time:'1-14'},
      {fileName:'线性代数',fileType:1,fileSize:'11.8k',time:'1-14'}
    ],
    // 班群的人员信息
    classMessagePeople:[
      {stu_name:'已到',
      course_id:1,
      student_id:2,
      flag:true,
      status:0,
      classDetialBtn:[
        {name:'已到',btn:true,color:'#38FBBF'},
        {name:'迟到',btn:true,color:'#FEC25B'},
        {name:'未到',btn:true,color:'#EB5526'}]
      }]
}

// 记录按钮
let choseClose = function (e) {
  let recordBtnMessage = this.data.recordBtnMessage
  let recorderBtnFlag = this.data.recorderBtnFlag
  if (recorderBtnFlag) {
    for (let i = 0; i < recordBtnMessage.length; i++) {
      recordBtnMessage[i].hidden = recordBtnMessage[i].angleFlag
    }// 隐藏所有按钮选项
    this.setData({
      recordBtnMessage: recordBtnMessage,
      recorderBtnFlag: false
    })
  }
},
// 打开选择年级
recordChoose = function (e) {
  console.log(e.currentTarget.dataset.index)
  let recordBtnMessage = this.data.recordBtnMessage
  let recorderBtnFlag = this.data.recorderBtnFlag
  let index = e.currentTarget.dataset.index
  if (recorderBtnFlag) {
    // 打开
    my.openChooseBtn(this, recordBtnMessage, index)
  } else {
    // 关闭
    my.displayAllBtn(this, recordBtnMessage)
  }
},
/* btnTitle */
indexBtn = function (e) {
  
  
  let str = e.currentTarget.dataset.str
  let index = e.currentTarget.dataset.index
  let color = e.currentTarget.dataset.color
  let item = this.data[str]

  for (let i = 0; i<item.length; i++) {
    if (i === index) {
      item[i].color = item[i].borderColor = color
    } else {
      item[i].color = '#7c7c7c'
      item[i].borderColor= 'transparent'
    }
  }
  console.log(item,str, this.data.CommonpageContainControll);
  getDataBase.fuc.getTieList(this)
  this.setData({
      [str] :item,
      CommonpageContainControll: index
    })
    
  

},
/* 班群里面的按钮 */
classBtn = function (e) {
  let page = e.currentTarget.dataset.page
  let str = e.currentTarget.dataset.str
  let pageStr = this.data[page]
  console.log(pageStr)
  for (let i in pageStr) {
    i === str? pageStr[i] = false:pageStr[i] = true; 
  }
  console.log(pageStr)
  this.setData({
    [page] : pageStr
  })
}
let fuc = {
  choseClose : choseClose,
  recordChoose :recordChoose,
  indexBtn :indexBtn,
  classBtn :classBtn,
  // 课程列表的请求
  classMessageBtn:(e)=>{
    console.log(e.currentTarget.dataset.id);
    getDataBase.fuc.getCommonClassListDetail(this,e.currentTarget.dataset.id)
    
  },
  classMessageDetailBtn(e) {
    console.log(e.currentTarget);
    let index = e.currentTarget.dataset.index
    console.log(e.currentTarget.dataset.index);
    let classDetialPeople = this.data.classDetialPeople
    for(let i of classDetialPeople.keys()) {
      if(!classDetialPeople[i].flage) //classDetialPeople[i].flage =tru
      this.setData({
        [`classDetialPeople[${i}].flag`] :true
      })
    }
    this.setData({
      [`classDetialPeople[${index}].flag`] :false
    })
  },
  closeStatusBtn(e) {
    // 关闭按钮
    //console.log(e);
    
    let classDetialPeople = this.data.classDetialPeople
    for(let i of classDetialPeople.keys()) {
      if(!classDetialPeople[i].flage) //classDetialPeople[i].flage =tru
      this.setData({
        [`classDetialPeople[${i}].flag`] :true
      })
    }
   
  },
  //改变status
  classMessageChageStatus(e) {
    console.log(e);
    
  }
}
module.exports = {
  fuc :fuc,
  message : message
}