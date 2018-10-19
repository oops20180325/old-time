// components/classic/music/music.js

// 获取背景播放器
let player = wx.getBackgroundAudioManager()
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    img: {
      type: String,
    },
    content: {
      type: String,
    },
    isPlay:{
      type:Boolean,
    },
    src:String

  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    onPlay(){
      console.log(111)
      // 切换图片
      this.setData({
        isPlay: !this.properties.isPlay
      })
      // 播放音乐
      player.src = this.properties.src;
    }
  },
  /** 
   * 生命周期
   */
  // 组件移除是触发
  detached(){
    console.log(11111)
    player.stop();
  }
})
