import axios from 'axios'


const nodeServiceUrl = 'http://127.0.0.1:5678/get';

export default {
  //获取书架列表
  getBookList() {
    return axios.get(
      nodeServiceUrl,
      {
        params:{
        'url': "https://mage.if.qidian.com/Atom.axd/Api/BookCase/Refresh",
        'method': 'post'
      }})
  },
  //获取书籍大分类
  getBookBigType() {
    return axios.get(
      nodeServiceUrl,
      {
        params:{
          'url': "https://mage.if.qidian.com/argus/api/v1/categoryPage/getsiteuionpages",
          'method': 'get'
        }})
  },
  //获取书籍小分类  都市。。。
  getBookType(type) {
    return axios.get(
      nodeServiceUrl,
      {
        params:{
          'url': "https://mage.if.qidian.com/argus/api/v1/categoryPage/getcategoryinfo?siteId="+type,
          'method': 'get'
        }})
  },
}