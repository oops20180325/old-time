import { HTTP } from '../util/http.js'

class Like extends HTTP {
  // 定义实例方法
  like(like_or_not,art_id,typer,callback){
    let url = like_or_not === 'cancel' ? '/like/cancel' : '/like';
    // console.log(url)

    // 子类中的this 和父类中的this 都指向实例
    this.request({
      url,
      method: 'POST',
      data: {
        art_id,
        'type': typer
      },
      handler: (data) => {
        // 使用callback 把data暴露出去 毕竟异步方法的结果不能用return，会拿不到的。
        try {
          callback(data)
        } catch (err) {
          throw Error('你至少传个callback啊');
        }

      }
    })
  }
}

let likeApi = new Like();

export default likeApi;