import axios from 'axios'
import {bookBigType,bookSmallType} from './data'

const nodeServiceUrl = 'http://127.0.0.1:5678/get';

export default {
	//获取书架列表
	test() {
		return axios.get(
			nodeServiceUrl,
			{
				params:{
					'url': "https://mage.if.qidian.com/argus/api/v1/feeds/getuserfeeds?lastTime=0&pg=1&pz=20",
					'method': 'get'
				}})
	},
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
    return new Promise(function(resolve, reject) {
      let data = bookBigType();
      setTimeout(()=>{
        resolve({data:data});
      }, 100);
    });

  },
  //获取书籍小分类  都市。。。
  getBookType(type) {
    return new Promise(function(resolve, reject) {
      let data = bookSmallType(type);
      console.log("123")
      console.log(data);
      setTimeout(()=>{
        resolve({data:data});
      }, 100);
    });
  },
}
