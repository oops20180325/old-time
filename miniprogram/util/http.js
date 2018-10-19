import { apiConfig} from './baseConfig.js'

function _showError(error){
  wx.showToast({
    title: error.msg||'sorry',
    icon: 'none',
    duration: 1500
  })
}

class HTTP {

  // 实例方法
  request(params){
    // url,data methods
    wx.request({
      url: apiConfig.apiBaseUrl+params.url,
      header:{
        appkey: apiConfig.appKey
      },
      data:params.data,
      method:params.method||'GET',
      dataType:'json',
      success(res){
        let code = res.statusCode + '';
        if (code.startsWith('2')){
          params.handler && params.handler(res.data)
        }else{
          let error = res.data;
          _showError(error)
        }
       
      },
      fail(err){
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