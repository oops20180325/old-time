import { HTTP } from '../util/http-p.js'

class Book extends HTTP {
  getHotList(){
    return this.request({
      url:'/book/hot_list'
    })
  }
  getMyBookCount(){
    return this.request({
      url:'/book/favor/count'
    })
  }
  getDetail(bid) {
    let params = {
      url: '/book/' + bid + '/detail',
    }
    return this.request(params)
  }

  getComments(bid) {
    return this.request({
      url: `/book/${bid}/short_comment`
    })
  }

  postComment(bid, comment) {
    return this.request({
      url: '/book/add/short_comment',
      method: 'POST',
      data: {
        book_id: bid,
        content: comment
      }
    })
  }

  getLikeStatus(bid) {
    let params = {
      url: '/book/' + bid + '/favor'
    }
    return this.request(params)
  }
}

const bookApi = new Book();
export default bookApi;