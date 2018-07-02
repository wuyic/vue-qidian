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
	/**
	 * shudan
	 * @returns {AxiosPromise<any>}
	 */
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
	/**
	 * 我的书单
	 * @returns {AxiosPromise<any>}
	 */
	getMyBookList() {
		return axios.get(
			nodeServiceUrl, {
				params:{
					url:'https://mage.if.qidian.com/Atom.axd/Api/BookList/GetMyCreateBookList',
					method:'get'
				}
			}
		)
	},
	/**
	 * 搜索顶部提示
	 * @returns {AxiosPromise<any>}
	 */
	getSearchTop() {
		return axios.get(
			nodeServiceUrl, {
				params:{
					url:'https://mage.if.qidian.com/Atom.axd/Api/Search/SearchTops',
					method:'get'
				}
			}
		)
	},

	/**
	 * 获取全局广告
	 * @returns {AxiosPromise<any>}
	 */
	getAdGol() {
		return axios.get(
			nodeServiceUrl, {
				params:{
					url:'https://mage.if.qidian.com/Atom.axd/Api/Client/GetConfIOS',
					method:'post'
				}
			}
		)
	},

	/**
	 * 搜索 自动补全
	 * @returns {AxiosPromise<any>}
	 */
	getSearchAutoComputed() {
		return axios.get(
			nodeServiceUrl, {
				params:{
					url:'https://mage.if.qidian.com/Atom.axd/Api/Search/AutoCompleteWithBookList?key=',
					method:'get'
				}
			}
		)
	},
	/**
	 * 搜索 书籍
	 * @returns {AxiosPromise<any>}
	 */
	getSearchBook() {
		return axios.get(
			nodeServiceUrl, {
				params:{
					url:'https://mage.if.qidian.com/Atom.axd/Api/Search/GetBookStoreWithCategory',
					method:'get'
					// action	-1
					// channel	-1
					// key	想
					// needDirect	1
					// order	-1
					// p	all
					// pageIndex	1
					// size	-1
					// type	-1
					// update	-1
					// vipBoutiqueSignstatus	-1a-1a-1
				}
			}
		)
	},

	/**
	 * 搜索 书单
	 * @returns {AxiosPromise<any>}
	 */
	getSearchBook() {
		return axios.get(
			nodeServiceUrl, {
				params:{
					url:'https://mage.if.qidian.com/Atom.axd/Api/BookList/Search?key=%E6%83%B3&pageNumber=1&pageSize=20',
					method:'get',
				}
			}
		)
	},




}
