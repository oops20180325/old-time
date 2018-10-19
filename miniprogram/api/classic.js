import {HTTP} from '../util/http.js'


//  不仅仅是 获取数据相关的api哦
class Classic extends HTTP{

   
    // 类中的方法
    // 1.获取最近一期
    getLatest(callback){
      // 子类中的this 和父类中的this 都指向实例
      this.request({
        url: '/classic/latest',
        method: 'GET',
        data: '',
        handler: (data) => {
          // 使用callback 把data暴露出去 毕竟异步方法的结果不能用return，会拿不到的。
          try {
            callback(data);
            // 保存索引
            this._setLatestIndex(data.index)
          } catch(err){
            throw Error('你至少传个callback啊');
          }
          
        }
      })
    }
    // 2.获取当前期的上一期
    getPrevious(nowIndex,callback){
      this.request({
        url:`/classic/${nowIndex}/previous`,
        handler:(data)=>{
          callback(data)
        }
      })
    }
    // 3.获取当前期的下一期
    getnext(nowIndex,callback){
      this.request({
        url: `/classic/${nowIndex}/next`,
        handler: (data) => {
          callback(data)
        }
      })
    }
    // 4.是否是第一期
    isFirst(index){
      return index ===1 ? true:false
    }
    // 4.2是否是最新一期
    isLatest(index){
      let latestIndedx = this._getLatestIndex();

      return index == latestIndedx ? true :false 
    }
    // 5.储存最新一期de期数
    // 利用小程序额 缓存方法 wx.setStorageSync
    _setLatestIndex(index){
      wx.setStorageSync('latest', index)
    }
    // 6.读取最新一期索引
    _getLatestIndex(){
      let latestIndex  = wx.getStorageSync('latest')
      return latestIndex
    }
}

// export { Classic} // 这样写太麻烦了 引入的页面还得实例化才能用

// 下面这样更友好，不用实例化 且 不受制于名字
let classicApi = new Classic();
export default classicApi