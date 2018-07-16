import axios from 'axios'
import {bookBigType,bookSmallType} from './data'

const nodeServiceUrl = 'http://127.0.0.1:5678/get';

function paramsToUrlParam(obj) {

	if (typeof obj != 'object') {
		return '';
	}

	let param = '';
	Object.keys(obj).forEach((key)=>{
		param += key;
		param += '=';
		param += obj[key];
		param += '&';
	});

	return param.slice(0,-1);
}


let apiList = {
	getBookCase        :false, //获取书架列表
	getBookBigType     :false, //获取书籍大分类
	getBookType        :false, //获取书籍小分类
	getBookList        :false, //获取我搜藏的书单
	getMyBookList      :false, //我的书单
	bookListGetConfig  :false, //获取创建书单的配置
	BookListAdd        :false, //添加书单
	BookListGetTipList :false, //获取书单提示
	BookListGetDetali  :false, //获取书单详情
	checkSafePhone     :false, //校验用户手机号
	getSearchTop       :false, //搜索顶部提示
	getAdGol           :false, //获取全局广告
	getSearchAutoComputed     :false, //搜索 自动补全
	getSearchBook      :false, //搜索 书籍
	getSearchBookList  :false, //搜索 书单
};


export default {
	//获取书架列表
	test() {
		return axios.get(
			nodeServiceUrl,
			{
				params:{
					'url': "https://mage.if.qidian.com/argus/api/v1/feeds/getuserfeeds",
					'method': 'get',
					param:paramsToUrlParam({
						lastTime:0,
						pg:1,
						pz:20,
					}),
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
                    'method': 'post',
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
	getBookList({pageIndex}) {
		return axios.get(
			nodeServiceUrl,{
				params:{
					url:'https://mage.if.qidian.com/Atom.axd/Api/BookList/GetMyCollectBookList',
					method: 'get',
					param:paramsToUrlParam({
						page:pageIndex,
						size:20,
					}),
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
	 * 获取创建书单的配置
	 * @returns {AxiosPromise<any>}
	 */
	bookListGetConfig() {
		return axios.get(
			nodeServiceUrl, {
				params:{
					url:'https://mage.if.qidian.com/Atom.axd/Api/BookList/GetConfig',
					method:'get'
				}
			}
		)
	},
	/**
	 * 添加书单
	 * @returns {AxiosPromise<any>}
	 */
	BookListAdd({desc, name}) {
		return axios.get(
			nodeServiceUrl, {
				params:{
					url:'https://mage.if.qidian.com/Atom.axd/Api/BookList/Add',
					method:'post',
					param:paramsToUrlParam({
						des:desc,
						name:name,
					}),
				}
			}
		)
	},
	/**
	 * 获取书单提示
	 * @returns {AxiosPromise<any>}
	 */
	BookListGetTipList({bookListId}) {
		return axios.get(
			nodeServiceUrl, {
				params:{
					url:'https://mage.if.qidian.com/Atom.axd/Api/BookList/GetTipList',
					method:'post',
					param:paramsToUrlParam({
						id:bookListId
					}),
				}
			}
		)
	},
	/**
	 * 获取书单详情
	 * @returns {AxiosPromise<any>}
	 */
	BookListGetDetali({bookListId, page}) {
		return axios.get(
			nodeServiceUrl, {
				params:{
					url:'https://mage.if.qidian.com/Atom.axd/Api/BookList/Detail',
					method:'post',
					param:paramsToUrlParam({
						id:bookListId,
						page:page,
						size:20
					}),
				}
			}
		)
	},
	/**
	 * 校验用户手机号
	 * @returns {AxiosPromise<any>}
	 */
	checkSafePhone() {
		return axios.get(
			nodeServiceUrl, {
				params:{
					url:'https://mage.if.qidian.com/Atom.axd/Api/User/CheckSafePhone',
					method:'post',
				}
		// {
		// 	"Result": 0,
		// 	"Message": "",
		// 	"Data": {
		// 	"HasSafePhone": 0 不可以, 1代表可以
		// 		"Message": "根据《网络安全法》\n该操作需绑定安全手机",
		// 		"ActionText": "绑定手机",
		// 		"ActionUrl": "QDReader://aq.yuewen.com/mobile/bindphone",
		// 		"CancelText": "暂时不"
		// }
		// }
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
	getSearchAutoComputed(keyword) {
		return axios.get(
			nodeServiceUrl, {
				params:{
					url:'https://mage.if.qidian.com/Atom.axd/Api/Search/AutoCompleteWithBookList',
					method:'get',
					param:paramsToUrlParam({
						key:keyword,
					}),
				}
			}
		)
	},
	/**
	 * 搜索 书籍
	 * @returns {AxiosPromise<any>}
	 */
	getSearchBook(key, pageIndex) {
		return axios.get(
			nodeServiceUrl, {
				params:{
					url:'https://mage.if.qidian.com/Atom.axd/Api/Search/GetBookStoreWithCategory',
					method:'post',
					param: paramsToUrlParam ({
						action:    -1,
						channel:   -1,
						key:       key,
						needDirect: 1,
						order:     -1,
						p:	       'all',
						pageIndex: pageIndex,
						size:      -1,
						type:      -1,
						update:    -1,
						vipBoutiqueSignstatus:	'-1a-1a-1',
					})
				}
			}
		)
	},

	/**
	 * 搜索 书单
	 * @returns {AxiosPromise<any>}
	 */
	getSearchBookList(key, pageIndex) {
		return axios.get(
			nodeServiceUrl, {
				params:{
					url:'https://mage.if.qidian.com/Atom.axd/Api/BookList/Search',
					method:'get',
					param:paramsToUrlParam({
						key:key,
						pageNumber:pageIndex,
						pageSize:20,
					}),
				}
			}
		)
	},




}
