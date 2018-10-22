// miniprogram/pages/book/book.js
import bookApi from '../../api/book.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    books:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 把一个异步回调修改成promise
    // const promise = new Promise((reslove,reject)=>{
    //   wx.getSystemInfo({
    //     success: function(res) {
    //       reslove(res)
    //     },
    //     fail(err){
    //       reject(err)
    //     }
    //   })
    // })
    // promise.then((res)=>{
    //   console.log(res)
    // }).catch((err)=>{
    //   console.log(err)
    // })

    // promise 好处 链式调用
    bookApi.getHotList().then((res)=>{
      console.log(0,res)
      this.setData({
        books:res
      })
      return bookApi.getHotList()
    }).then(res=>{
      console.log(1,res)
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

  }
})