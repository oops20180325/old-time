// components/nav/nav.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    title:String,
    first:Boolean, //是否是第一期
    last:Boolean, // 是否是最后一期
  },

  /**
   * 组件的初始数据
   */
  data: {
    disLeftSrc: 'images/triangle.dis@left.png',
    highLeftSrc: 'images/triangle@left.png'
  },

  /**
   * 组件的方法列表 所以组件中的方法和page中的方法是不在一个地方的
   */
  methods: {
    onLeft() {
      // 是否是最新
      if (this.properties.last){
        return
      }
      this.triggerEvent('left', 'left', {})
    },
    onRight() {
      if(this.properties.first){
        return
      }
      this.triggerEvent('right', 'right', {})
    }
  },
  /** 
   * 生命周期
   */
  ready(){
    console.log(this.data)
  },  
})
