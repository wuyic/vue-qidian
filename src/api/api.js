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
	BookListFilterBooks:false, //获取书单中的过滤
	BookListDislikeBook:false, //书单 拍砖
	BookListLikeBook   :false, //书单 喜欢
	BookCaseAdd        :false, //加入书架
	BookListCollect    :false, //搜藏书单
	BookListGoTip      :false, //书单送花
};


export default {

	/**
	 * 书单  加入书架
	 * @returns {AxiosPromise<any>}
	 */
	BookCaseAdd({bookListId}) {
		return axios.get(
			nodeServiceUrl, {
				params:{
					url:'https://mage.if.qidian.com/Atom.axd/Api/BookCase/Refresh',
					method:'post',
					param:paramsToUrlParam({
						CaseInfo:{
							"DelCate" : [],
							"NewBook" : [{
								     "BookType" : 1,
									"BId" : 1003581222,
									"CId" : 0,
									"OpTime" : 1531983545971.541,
									"IsTop" : 0
								}
							],
							"EditBook" : [],
							"DelBook" : [],
							"NewCate" : [],
							"EditCate" : []
						},
						LastSyncTime:1531983299466,
						bookUpdateMaxTime:1531982071000,
						pageIndex:1,
						pageSize:999999,
					}),
				}
			}
		)
	},

	/**
	 * 书单  喜欢
	 * @returns {AxiosPromise<any>}
	 */
	BookListLikeBook({bookid, id, type}) {
		return axios.get(
			nodeServiceUrl, {
				params:{
					url:'https://mage.if.qidian.com/Atom.axd/Api/BookList/LikeBook',
					method:'post',
					param:paramsToUrlParam({
						bookid:bookid,
						id:id,
						type:type,
					}),
				}
			}
		)
	},

	/**
	 * 书单  拍砖
	 * @returns {AxiosPromise<any>}
	 */
	BookListDislikeBook({bookid, id, type}) {
		return axios.get(
			nodeServiceUrl, {
				params:{
					url:'https://mage.if.qidian.com/Atom.axd/Api/BookList/DislikeBook',
					method:'post',
					param:paramsToUrlParam({
						bookid:bookid,
						id:id,
						type:type,
					}),
				}
			}
		)
	},

	/**
	 * 书单  献花
	 * @returns {AxiosPromise<any>}
	 */
	BookListGoTip({booklistId, num}) {
		return axios.get(
			nodeServiceUrl, {
				params:{
					url:'https://mage.if.qidian.com/Atom.axd/Api/BookList/GoTip',
					method:'post',
					param:paramsToUrlParam({
						id:booklistId,
						tipgear:num,
					}),
				}
			}
		)
	},

	/**
	 * 获取书单中的过滤
	 * @returns {AxiosPromise<any>}
	 */
	BookListFilterBooks({bookListId}) {
		return axios.get(
			nodeServiceUrl, {
				params:{
					url:'https://mage.if.qidian.com/Atom.axd/Api/BookList/FilterBooks',
					method:'post',
					param:paramsToUrlParam({
						bookListId:562910,
						categoryId:	2,
						keyword:'男频',
						page:1,
						size:20,
					}),
				}
			}
		)
	},

	/**
	 * 获取书单中的过滤
	 * type 0 搜藏   type=1 取消搜藏
	 * @returns {AxiosPromise<any>}
	 */
	BookListCollect({bookListId, type}) {
		return axios.get(
			nodeServiceUrl, {
				params:{
					url:'https://mage.if.qidian.com/Atom.axd/Api/BookList/Collect',
					method:'post',
					param:({
						id:bookListId,
						type:type,
					}),
				}
			}
		)
	},



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
					method:'get',
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
					method:'get',
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


	/**
	 *  获取支付配置
	 */
	getSettingForPay({}) {
		return axios.get(
			nodeServiceUrl, {
				params:{
					url:'https://pay.yuewen.com/ajax/sdk/getsetting',
					method:'post',
					param:paramsToUrlParam({
						appId:	33,
						areaId:	40,
						userguid:461199585,
						ver	:1,
					}),
				}
			}
		)
	}

}
