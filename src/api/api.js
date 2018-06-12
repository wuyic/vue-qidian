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
	/**
	 * 获取书架列表
	 * @returns {AxiosPromise<any>}
	 */
	getBookCase() {
        return axios.get(
            nodeServiceUrl,
            {
                params:{
                'url': "https://mage.if.qidian.com/Atom.axd/Api/BookCase/Refresh",
                'method': 'post'
                }
            })
    },
	/**
	 * 获取书籍大分类
	 * @returns {Promise}
	 */
	getBookBigType() {
        return new Promise(function(resolve, reject) {
            let data = bookBigType();
            setTimeout(()=>{resolve({data:data})}, 100);
        });
    },
	/**
	 * 获取书籍小分类  都市。。。
	 * @param type
	 * @returns {Promise}
	 */
	getBookType(type) {
    return new Promise(function(resolve, reject) {
        let data = bookSmallType(type);
        setTimeout(()=>{resolve({data:data})}, 100);
        });
    },

	getBookList() {
		return axios.get(
			nodeServiceUrl,{
				params:{
					url:'https://mage.if.qidian.com/Atom.axd/Api/BookList/GetMyCollectBookList?page=1&size=20',
					method: 'get'
				}
			}
		)
	},

	getMyBookList() {
		return axios.get(
			nodeServiceUrl, {
				params:{
					url:'https://mage.if.qidian.com/Atom.axd/Api/BookList/GetMyCreateBookList',
					method:'get'
				}
			}
		)
	}
}
