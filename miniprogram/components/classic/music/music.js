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
      console.log(this.properties.isPlay)
      if(!this.properties.isPlay){
         // 播放音乐(初始化或者继续播放)

        console.log(player.src)
        console.log(this.properties.src) 
        player.src === this.properties.src ? player.play() : player.src = this.properties.src;
       

        
      }else{
        player.pause();
      }
      // 切换properties
      this.setData({
        isPlay: !this.properties.isPlay
      })
      
      
    },
    // 改变状态
    _recoverPlaying: function () {
      if (player.paused) {
        this.setData({
          isPlay: false
        })
        return
      }
      if (player.src == this.properties.src) {
        if (!player.paused) {
          this.setData({
            isPlay: true
          })
        }
      }
    },
    // 播放状态处理
    _monitorSwitch: function () {
      player.onPlay(() => {
        this._recoverPlaying()
      })
      player.onPause(() => {
        this._recoverPlaying()
      })
      player.onStop(() => {
        this._recoverPlaying()
      }),
        player.onEnded(() => {
          this._recoverPlaying()
        })
    }
  },
  /** 
   * 生命周期
   */
  // 组件移除是触发
  detached(){
    // 这块处理貌似不太好，如果我想切换到别的面时还能播放怎么办（只要没有控制音乐就不改变state状态），所以我们在组件激活时处理
    console.log(11111)
    // player.stop();
  },
  attached(){
    this._recoverPlaying();
    this._monitorSwitch()
  }
})
