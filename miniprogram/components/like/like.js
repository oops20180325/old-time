// components/like/like.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    count:{
      type:Number,
    },
    islike:{
      type:Boolean
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    like:'/images/like/like.png',
    notlike:'/images/like/nolike.png',
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 自定义方法
    changelike(event){
      // console.log(event);
      // console.log(this);
      let like = !this.properties.islike;
      let count = this.properties.count;
      count = like?count+1:count-1;
      this.setData({
        count:count,
        islike:like
      })
      // 广播事件
      let behavior = this.properties.islike?'like':'cancel';
      this.triggerEvent('onlike', { behavior},{})
    }

  }
})
