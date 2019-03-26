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
      { text: '大一上学期', angleFlag: false, hidden: false },
      { text: '大一下学期', angleFlag: true, hidden: true },
      { text: '大二上学期', angleFlag: true, hidden: true },
      { text: '大二下学期', angleFlag: true, hidden: true },
    
    ],

    /* titlebtn 信息 */
    indexBtn:[
      { text: '班群', color: '#28C1F1', borderColor: '#28C1F1' },
      { text: '社区', color: '#7c7c7c', borderColor: 'transparent' }
    ],
    /* 首页按钮的内容 */
    pageContainControll:0,
    pageSecond:{
      commonIndex:false,
      classMessage:true,
      commonDetail:true
    },
    pageClassSecond:{
      classIndex:true,
      download:true,
      calssDetail:true,
      tree:true,
      treeRank:true,
      notice:true
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
      }],
    classMessageDetial:{
        latecount: 0,
        total: 32,
        truantcount: 0,
        id:1
        }
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
  // console.log(item,str, this.data.CommonpageContainControll);
  if(index===1) {
    getDataBase.fuc.getTieList(this)
  }
  for (let i = 0; i<item.length; i++) {
    if (i === index) {
      item[i].color = item[i].borderColor = color
    } else {
      item[i].color = '#7c7c7c'
      item[i].borderColor= 'transparent'
    }
  }


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
  console.log(str)
  if(str==='download') {
    //下载页面 请求下载页面的数据
    getDataBase.fuc.getDownloadFileMessage(this,e.currentTarget.dataset.id)
  }
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
  classMessageBtn:function(e){
    // console.log(e.currentTarget.dataset.id);
    let type = e.currentTarget.dataset.type
    let data = getDataBase.fuc.getCommonClassListDetail(this,e.currentTarget.dataset.id, type,e.currentTarget.dataset.index)

  },
  classMessageDetailBtn(e) {
    // console.log(e.currentTarget);
    let index = e.currentTarget.dataset.index
    // console.log(e.currentTarget.dataset.index);
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
    
  },
  // page二级控制
  turnIntoSecond(e) {
    let back = e.currentTarget.dataset.back,
    now = e.currentTarget.dataset.now,
    index = e.currentTarget.dataset.index,
    firstPage=e.currentTarget.dataset.firstPage
    let second =e.currentTarget.dataset.second
    
    this.setData({
      pageContainControll:parseInt(index),
      [`pageSecond.${back}`]:false,
      [`pageSecond.${firstPage}`]:true,
      [`${second}.${now}`]:true
    })
  },
  // 返回二级
  turnIntoThird(e) {
    let back = e.currentTarget.dataset.back,
    now = e.currentTarget.dataset.now,
    second = e.currentTarget.dataset.second
    this.setData({
      [`${second}.${now}`]:true,
      [`${second}.${back}`]:false
    })
  },
  intoTiePage(e) {
    let now = e.currentTarget.dataset.now,
    next = e.currentTarget.dataset.next,
    second = e.currentTarget.dataset.second,
    item = e.currentTarget.dataset.id
   //  console.log(item);
    
    // console.log(e);
    getDataBase.fuc.getTieDetail(this,now,next,second,item)
    /*this.setData({
      [`pageSecond.${now}`] :  true,
      [`pageSecond.${next}`] :  false,
      [`pageCommonSecond.${second}`] :  false,
    })*/
  },
  // 签到按钮
  isArrayNowClass(e) {
    let isArrayClass  =this.data.isArrayClass
    if(!isArrayClass) {
      //签到
      wx.showToast({
        title:'签到成功',
        icon:'success'
      })
      this.setData({
        isArrayClass : true
      })
    }
  },
  inToCommonClassNotice(e) {
    // let id =e.currentTarget.dataset.id
    //进入就可以了
    this.setData({
      ['pageClassSecond.classIndex']: true,
      ['pageClassSecond.notice']: false
    })
  },intoCommonClssTree(e) {
    // 进入树
    let url ='https://campus.gbdev.cn:8080/IMBA'.concat('/tree/list')
    // 请求树的数据
    getDataBase.fuc.getMyMessage(this,url)
    this.setData({
      ['pageClassSecond.classIndex']: true,
      ['pageClassSecond.tree']: false
    })
  },//进入发帖
  commonTiebtn(e) {
    this.setData({

    })
  },
  //提问
  intoQuestion(e){

    this.setData({
      ['pageSecond.commonIndex']:true,
      ['pageSecond.commonDetail']:false,
      ['pageCommonSecond.commonSend']:false
    })
  },//返回帖子
  returnTie(e){
    // 重置tag
    this.setData({
      tag:wx.getStorageSync('tag'),
      ['pageSecond.commonIndex']:false,
      ['pageSecond.commonDetail']:true,
      ['pageCommonSecond.commonSend']:true
    })
  },//关闭tag
  tagContainClose(e) {
    let index =e.currentTarget.dataset.index
    let tag =this.data.tag
    tag[index].flag = false
    this.setData({
      tag:tag
    })
  },
  //搜索
  inputSearch(e) {
    let type = e.currentTarget.dataset.type
    console.log(e.detail);
    if(type==='input'){
      let  searchMessage = e.detail.value
      if(e.detail.cursor<=0) {
        this.setData({
          tieMessage:wx.getStorageSync('tieMessage'),
          searchMessage:searchMessage
        })
      } else{
        this.setData({
          searchMessage:searchMessage
        })
      }

    }
    if(type==='btn'){
      // 请求
      getDataBase.fuc.getSearchMes(this)
    }
  },
  // 发布问题的input
  inputQuestion:function(e) {
    let str = e.currentTarget.dataset.str
    let type = e.currentTarget.dataset.type
    if(type==='input'){
      this.setData({
        [`questionMessage.${str}`]:e.detail.value
      })
    } else {
      let questionMessage = this.data.questionMessage
      // 获取tag
      let tag = this.data.tag
      let userSend = '小明'
      console.log(new Date().toLocaleString());
      
      let question ={
        commonts:0,
        post:{
          id:5,
          name:userSend,
          postsContent:questionMessage.content,
          postsTime:new Date().toLocaleDateString(),
          postsTag:tag,
          postsTitle:questionMessage.title
        }
      }
      let tieMessage = this.data.tieMessage
      tieMessage.unshift(question)
      this.setData({
        tieMessage:tieMessage
      })
      this.returnTie()
      
    }

  }
}
module.exports = {
  fuc :fuc,
  message : message
}