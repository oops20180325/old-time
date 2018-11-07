// miniprogram/pages/book-detail/book-detail.js
import bookApi from '../../api/book.js'
import likeApi from '../../api/like.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    comments:[], // 评论
    book:null,
    likeStatue:false,
    likeCount:0,
    posting:false, // 输入框是否打开
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //小程序loading
    wx.showLoading()
    // question 什么时候结束loading ajax是异步请求的
    //  解决1. promise 2. onready生命周期中结束 
    // 串行发送或者并行发送
    console.log(options,options.id)

    // bookApi.getDetail(options.id).then(res => {
    //   console.log(res)
    //   this.setData({
    //     book: res
    //   })
    // })
    // bookApi.getLikeStatus(options.id).then(res => {
    //   console.log(res)
    //   this.setData({
    //     likeStatus: res.like_status,
    //     likeCount: res.fav_nums
    //   })
    // })
    //  bookApi.getComments(options.id).then(res => {
    //   console.log(res)
    //   this.setData({
    //     comments: res.comments
    //   })
    // })

    let detail = bookApi.getDetail(options.id)
    let likeStatus =  bookApi.getLikeStatus(options.id)
    let comments = bookApi.getComments(options.id)
    // 上述api方法均返回一个promise实例
    // 使用promise.all 同时解决并行发送数据与监听请求完成
    Promise.all([detail, likeStatus, comments]).then((res)=>{
      // res 为一个数组 里面包含每个子promise refuse返回的数据
      // 微信 隐藏loading
      wx.hideLoading();
      this.setData({
        book: res[0]
      })
      this.setData({
        likeStatus: res[1].like_status,
        likeCount: res[1].fav_nums
      })
      this.setData({
        comments: res[2].comments
      })
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  // 自定义方法
  onFakePost(){
    this.setData({
      posting: true
    })
  },
  onLike(e){
    console.log(e)
    let data = e.detail;
    let art_id = this.data.book.id;
    let typer = 400;

    //  like(like_or_not,art_id,type,callback)
    likeApi.like(data.behavior, art_id, typer, (data) => {
      // console.log(data);
      if (data.error_code === 0) {
        // success
        wx.showToast({
          title: data.msg,
          duration: 500,
        })
        // 更新数据 其实貌似不需要
        // this.getpageData();
      }
    })
    
  },
  onCancel(){
    this.setData({
      posting: false
    })
  },
  onPost(event){
    const comment = event.detail.text || event.detail.value
    console.log(event)
    if (!comment) {
      return
    }
    if (comment.length > 12) {
      wx.showToast({
        title: '短评最多12个字',
        icon: 'none'
      })
      return
    }
    // 假装评论
    wx.showToast({
      title: '假装评论成功',
    });
    // 关闭评论框
    setTimeout(
      ()=>{
        this.setData({
          posting: false
        })
      },400
    )
    
  }  
})