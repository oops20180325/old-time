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
    console.log(options,options.id)
    bookApi.getDetail(options.id).then(res=>{
      console.log(res)
      this.setData({
        book:res
      })
    })
    bookApi.getLikeStatus(options.id).then(res=>{
      console.log(res)
      this.setData({
        likeStatus:res.like_status,
        likeCount:res.fav_nums
      })
    })
    bookApi.getComments(options.id).then(res=>{
      console.log(res)
      this.setData({
        comments:res.comments
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