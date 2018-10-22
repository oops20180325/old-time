import { apiConfig} from './baseConfig.js'

function _showError(error){
  wx.showToast({
    title: error.msg||'sorry',
    icon: 'none',
    duration: 1500
  })
}

// promise 封装

class HTTP {

// 参数解构
  request({url,data = {}, methods = "GET"}){
    // console.log(url)
    return new Promise((reslove,reject)=>{
      this._request(url, reslove, reject, data, methods)
    })
  }

  // 实例方法 
  _request(url, reslove, reject,data={},methods="GET"){
    wx.request({
      url: apiConfig.apiBaseUrl + url,
      header:{
        appkey: apiConfig.appKey
      },
      data:data,
      method: methods,
      dataType:'json',
      success(res){
        let code = res.statusCode + '';
        if (code.startsWith('2')){
          reslove(res.data)
        }else{
          let error = res.data;
          reject()
          _showError(error)
        }
       
      },
      fail(err){
        reject()
        wx.showToast({
          title: 'error',
          icon: 'none',
          duration: 1500
        })
      }
    })
  }
}

export{HTTP}