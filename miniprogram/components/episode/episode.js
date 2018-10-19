// components/episode/episode.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
      index:{
        type:String, // 期刊
        value:1,
        observer:function(newVal,oldVal,changePath){
          let val = +newVal < 10 ? '0'+newVal : newVal
          
          this.setData({
            _index: val
            // index:val  // 在这里直接更改所在属性本身的值 又会触发observer函数导致无线递归，直到内存爆炸
          })
        }
      }
  },

  /**
   * 组件的初始数据
   */
  data: {
    months: [
      '一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月',
      '十二月'
    ],
    year:0,
    month:'',
    _index:''
  },

  /**
   * 组件的方法列表
   */
  methods: {
    init(){
      let date = new Date()
      let month = date.getMonth()
      let year = date.getFullYear()
      this.setData({
        month: this.data.months[month],
        year: year
      })
    }
  },
  /** 
   * 组件的生命周期
   * 
   */
  ready(){
    // console.log(this)
    this.init();
  }
})
