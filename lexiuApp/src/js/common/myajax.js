import FetchJsonp from 'fetch-jsonp'

export default {
  fetch(url,successCallback,failCallBack){
    fetch(url).then((res) => {
      return res.json();
    }).then((result) => {
      successCallback(result)
    }).catch(function(ex) {
      failCallBack(ex)
    })
  },
  fetch2(option){
    fetch(option.url).then((res) => {
      return res.json();
    }).then((result) => {
      option.success(result)
    }).catch(function(ex) {
      option.fail(ex)
    })
  },
  fetchJsonp(url,successCallback,failCallBack,config){
    if(!config){
      config = {
         jsonpCallback: 'callback',
          timeout:5000
      }
    }
    FetchJsonp(url,config).then((res) => {
      return res.json();
    }).then((result) => {
      successCallback(result)
    }).catch(function(ex) {
      failCallBack(ex)
    })
  },
  fetchJsonp2(option){
    FetchJsonp(option.url,option.config).then((res) => {
      return res.json();
    }).then((result) => {
      option.success(result)
    }).catch(function(ex) {
      option.fail(ex)
    })
  }
}
