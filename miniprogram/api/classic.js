import {HTTP} from '../util/http.js'

class Classic extends HTTP{

    // 私有方法
    getLatest(callback){
      // 子类中的this 和父类中的this 都指向实例
      this.request({
        url: '/classic/latest',
        method: 'GET',
        data: '',
        handler: (data) => {
          // 使用callback 把data暴露出去 毕竟异步方法的结果不能用return，会拿不到的。
          try {
            callback(data)
          } catch(err){
            throw Error('你至少传个callback啊');
          }
          
        }
      })
    }
}

// export { Classic} // 这样写太麻烦了 引入的页面还得实例化才能用

// 下面这样更友好，不用实例化 且 不受制于名字
let classicApi = new Classic();
export default classicApi