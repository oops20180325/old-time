// miniprogram/pages/classic/classic.js
// 导入api
import api from '../../api/classic.js'

import likeApi from '../../api/like.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    classicData:null,
    first:true,
      },
  // 自定义函数
  onlike(e){
    // console.log(e.detail)
    let data = e.detail;
    let art_id = this.data.classicData.id;
    let typer = this.data.classicData.type;

    //  like(like_or_not,art_id,type,callback)
    likeApi.like(data.behavior, art_id, typer,(data)=>{
      // console.log(data);
      if(data.error_code === 0){
        // success
        wx.showToast({
          title: data.msg,
          duration:500,
        })
        // 更新数据 其实貌似不需要
        // this.getpageData();
      }
    })
    
  },
  // 获取数据
  getpageData(){
    api.getLatest((res) => {
      console.log('收到', res)
      this.setData({
        classicData: res
      })
    });
  },
  // right handler
  onRight(data){
    console.log(data)
  },
  // left handler
  onLeft(data){
    console.log(data)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getpageData();
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