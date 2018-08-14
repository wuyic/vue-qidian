import axios from 'axios'
import {bookBigType,bookSmallType} from './data'

const nodeServiceUrl = 'http://127.0.0.1:5678/get';
// const nodeServiceUrl = 'http://192.168.1.194:5678/get';

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
	BookListGetReceiveList :false, //书单 收到的花束明细
	BookListGetInfo    :false, //书单 修改时 获取 粗略信息
	BookListUpdate     :false, //更新书单
	BookListBeforeAddBook  :false, //我的书单 添加书籍之前
	BookListAddBook    :false, //我的书单 添加书籍
	BookListDel        :false,  //删除书单
	BookListCommentAdd :false,  //书单评论-添加
	BookListCommentGetList :false,  //获取 书单 评论
	BookListGetRelation:false,  //获取 书单 推荐

	BookStoreGetList   :false,  //精选中 的书籍
	BookStoreGetIntellRecommend   :false,  //精选中推荐、
	BookStoreGetRelatedBooks      :false,  //获取 书友还看过、
	BookStoreGetBookFansList      :false,  //获取 书籍粉丝列表、
	BookStoreGetBookFansFames     :false,  //获取 书籍粉丝 榜首
	BookStoreGetUserBookFansValue     :false,  //获取 我在该书籍中的粉丝值

	BookGetBookDiscount:false, //书籍 获取书籍折扣
	BookGet            :false, //书籍 获取书籍详细信息
	BookGetBookAd      :false, //书籍 获取书籍广告
	BookGetBookHonors  :false, //书籍 获取作品荣誉
	BookGetNonAnony    :false, //书籍 获取书籍信息


	InterActionGetRecomTicket  :false, //书籍 获取 推荐票
	InterActionGetMonthTicket  :false, //书籍 获取 月票
	InterActionGetDonate       :false, //书籍 获取 打赏
	InterActionGetReview       :false, //书籍 获取 推荐票 月票 打赏 总揽
	InterActionGetMengZhuDonateInfo :false, //书籍盟主需打赏多少的信息
	InterActionAddDonate       :false, //打赏 书籍


	ReviewGet          :false, //书籍 获取 书评
	ReviewGetReply     :false, //书籍 获取 回复书评

	UserGetAuthorInfo  :false, //获取作者主页信息
	UserGetUserPageInfo:false, //获取 用户主页信息



};


export default {
	/**
	 * 获取 用户主页信息
	 * @returns {AxiosPromise<any>}
	 * isFreeUser 0 bushi  1shi
	 */
	UserGetUserPageInfo(options) {
		return axios.get(
			nodeServiceUrl, {
				params:{
					url:'https://mage.if.qidian.com/Atom.axd/Api/User/GetUserPageInfo',
					method:'post',
					param:paramsToUrlParam({
						userId:options.userId,
					}),
				}
			}
		)
	},


	/**
	 * 打赏 书籍
	 * @returns {AxiosPromise<any>}
	 * isFreeUser 0 bushi  1shi
	 */
	InterActionAddDonate(options) {
		return axios.get(
			nodeServiceUrl, {
				params:{
					url:'https://mage.if.qidian.com/Atom.axd/Api/InterAction/AddDonate',
					method:'post',
					param:paramsToUrlParam({
						bookId	:options.bookId || -1,
						description	:options.description || -1,
						moneyType	:options.moneyType || -1,
						totalMoney	:options.totalMoney || -1,
					}),
				}
			}
		)
	},

	/**
	 * 获取 书籍盟主需打赏多少的信息
	 * @returns {AxiosPromise<any>}
	 * isFreeUser 0 bushi  1shi
	 */
	InterActionGetMengZhuDonateInfo(options) {
		return axios.get(
			nodeServiceUrl, {
				params:{
					url:'https://mage.if.qidian.com/Atom.axd/Api/InterAction/GetMengZhuDonateInfo',
					method:'post',
					param:paramsToUrlParam({
						bookId:options.bookId || -1,
					}),
				}
			}
		)
	},
	/**
	 * 获取 我在该书籍中的粉丝值
	 * @returns {AxiosPromise<any>}
	 * isFreeUser 0 bushi  1shi
	 */
	BookStoreGetUserBookFansValue(options) {
		return axios.get(
			nodeServiceUrl, {
				params:{
					url:'https://mage.if.qidian.com/Atom.axd/Api/BookStore/GetUserBookFansValue',
					method:'get',
					param:paramsToUrlParam({
						bookId:options.bookId || -1,
						userId:options.userId || -1,
					}),
				}
			}
		)
	},

	/**
	 * 获取 书籍粉丝 榜首
	 * @returns {AxiosPromise<any>}
	 * isFreeUser 0 bushi  1shi
	 */
	BookStoreGetBookFansFames(options) {
		return axios.get(
			nodeServiceUrl, {
				params:{
					url:'https://mage.if.qidian.com/Atom.axd/Api/BookStore/GetBookFansFames',
					method:'get',
					param:paramsToUrlParam({
						bookId:options.bookId || -1,
					}),
				}
			}
		)
	},

	/**
	 * 获取 书籍粉丝列表
	 * @returns {AxiosPromise<any>}
	 * isFreeUser 0 bushi  1shi
	 */
	BookStoreGetBookFansList(options) {
		return axios.get(
			nodeServiceUrl, {
				params:{
					url:'https://mage.if.qidian.com/Atom.axd/Api/BookStore/GetBookFansList',
					method:'get',
					param:paramsToUrlParam({
						bookId:options.bookId || -1,
						pageIndex:options.pageIndex || 1,
						pageSize:options.pageSize || 20,
					}),
				}
			}
		)
	},

	/**
	 * 获取 书友还看过
	 * @returns {AxiosPromise<any>}
	 * isFreeUser 0 bushi  1shi
	 */
	BookStoreGetRelatedBooks(options) {
		return axios.get(
			nodeServiceUrl, {
				params:{
					url:'https://mage.if.qidian.com/Atom.axd/Api/BookStore/GetRelatedBooks',
					method:'post',
					param:paramsToUrlParam({
						bookId:options.bookId || 0,
						pageIndex:options.pageIndex || 1
					}),
				}
			}
		)
	},
	/**
	 * 书籍 获取 书籍信息
	 * @returns {AxiosPromise<any>}
	 * isFreeUser 0 bushi  1shi
	 */
	UserGetAuthorInfo(options) {
		return axios.get(
			nodeServiceUrl, {
				params:{
					url:'https://mage.if.qidian.com/Atom.axd/Api/User/GetAuthorInfo',
					method:'post',
					param:paramsToUrlParam({
						authorId:options.authorId || -1,
						pageIndex:options.pageIndex || -1,
						pageSize:options.pageSize || 10,
					}),
				}
			}
		)
	},
	/**
	 * 书籍 获取 书评
	 * @returns {AxiosPromise<any>}
	 * isFreeUser 0 bushi  1shi
	 */
	ReviewGet(options) {
		return axios.get(
			nodeServiceUrl, {
				params:{
					url:'https://mage.if.qidian.com/Atom.axd/Api/Review/Get',
					method:'get',
					param:paramsToUrlParam({
						ReviewType:112,
						bookId:options.bookId || 0,
						pageIndex:bookId.pageIndex || 1,
					}),
				}
			}
		)
	},

	/**
	 * 书籍 获取 回复书评
	 * @returns {AxiosPromise<any>}
	 * isFreeUser 0 bushi  1shi
	 */
	ReviewGetReply(options) {
		return axios.get(
			nodeServiceUrl, {
				params:{
					url:'https://mage.if.qidian.com/Atom.axd/Api/Review/GetReply',
					method:'get',
					param:paramsToUrlParam({
						LastPostId:options.LastPostId || 0,
						PageIndex: options.PageIndex  || 1,
						pageSize:  options.reviewId   ||10,
						reviewId:  options.reviewId   || 1207110155
					}),
				}
			}
		)
	},
	/**
	 * 书籍 获取 打赏
	 * @returns {AxiosPromise<any>}
	 * isFreeUser 0 bushi  1shi
	 */
	InterActionGetReview(options) {
		return axios.get(
			nodeServiceUrl, {
				params:{
					url:'https://mage.if.qidian.com/Atom.axd/Api/InterAction/GetReview',
					method:'post',
					param:paramsToUrlParam({
						bookId:options.bookId||0,
					}),
				}
			}
		)
	},
	/**
	 * 书籍 获取 打赏
	 * @returns {AxiosPromise<any>}
	 * isFreeUser 0 bushi  1shi
	 */
	InterActionGetDonate(options) {
		return axios.get(
			nodeServiceUrl, {
				params:{
					url:'https://mage.if.qidian.com/Atom.axd/Api/InterAction/GetDonate',
					method:'post',
					param:paramsToUrlParam({
						bookId:options.bookId||0,
					}),
				}
			}
		)
	},
	/**
	 * 书籍 获取 月票
	 * @returns {AxiosPromise<any>}
	 * isFreeUser 0 bushi  1shi
	 */
	InterActionGetMonthTicket(options) {
		return axios.get(
			nodeServiceUrl, {
				params:{
					url:'https://mage.if.qidian.com/Atom.axd/Api/InterAction/GetMonthTicket',
					method:'post',
					param:paramsToUrlParam({
						bookId:options.bookId||0,
					}),
				}
			}
		)
	},
	/**
	 * 书籍 获取 推荐票
	 * @returns {AxiosPromise<any>}
	 * isFreeUser 0 bushi  1shi
	 */
	InterActionGetRecomTicket(options) {
		return axios.get(
			nodeServiceUrl, {
				params:{
					url:'https://mage.if.qidian.com/Atom.axd/Api/InterAction/GetRecomTicket',
					method:'post',
					param:paramsToUrlParam({
						bookId:options.bookId||0,
					}),
				}
			}
		)
	},
	/**
	 * 书籍 获取 作品荣誉
	 * @returns {AxiosPromise<any>}
	 * isFreeUser 0 bushi  1shi
	 */
	BookGetBookHonors(options) {
		return axios.get(
			nodeServiceUrl, {
				params:{
					url:'https://mage.if.qidian.com/Atom.axd/Api/Book/GetBookHonors',
					method:'get',
					param:paramsToUrlParam({
						bookId:options.bookId||0,
						pageIndex:options.pageIndex||1,
						pageSize:options.pageSize|| 20,
					}),
				}
			}
		)
	},

	/**
	 * 书籍 获取 书籍信息
	 * @returns {AxiosPromise<any>}
	 * isFreeUser 0 bushi  1shi
	 */
	BookGetNonAnony(options) {
		return axios.get(
			nodeServiceUrl, {
				params:{
					url:'https://mage.if.qidian.com/Atom.axd/Api/Book/GetNonAnony',
					method:'post',
					param:paramsToUrlParam({
						bookId:options.bookId||0,
					}),
				}
			}
		)
	},

	/**
	 * 书籍 获取书籍广告
	 * @returns {AxiosPromise<any>}
	 * isFreeUser 0 bushi  1shi
	 */
	BookGetBookAd(options) {
		return axios.get(
			nodeServiceUrl, {
				params:{
					url:'https://mage.if.qidian.com/Atom.axd/Api/Book/GetBookAd',
					method:'get',
					param:paramsToUrlParam({
						adpos:'bookdetail',
						bookid:options.bookId || 0,
					}),
				}
			}
		)
	},

	/**
	 * 书籍 获取书籍详细信息
	 * @returns {AxiosPromise<any>}
	 * isFreeUser 0 bushi  1shi
	 */
	BookGet(options) {
		return axios.get(
			nodeServiceUrl, {
				params:{
					url:'https://mage.if.qidian.com/Atom.axd/Api/Book/Get',
					method:'get',
					param:paramsToUrlParam({
						BookId:options.bookId || 0,
						iosDeviceType:options.iosDeviceType || 0,
						isOutBook:options.isOutBook || 0,
						preview:options.preview || 0
					}),
				}
			}
		)
	},
	/**
	 * 书籍 获取书籍折扣
	 * @returns {AxiosPromise<any>}
	 * isFreeUser 0 bushi  1shi
	 */
	BookGetBookDiscount({bookId, isFreeUser}) {
		return axios.get(
			nodeServiceUrl, {
				params: {
					url: 'https://mage.if.qidian.com/Atom.axd/Api/Book/GetBookDiscount',
					method: 'post',
					param: paramsToUrlParam({
						bookid: bookId,
						isFreeUser: isFreeUser
					}),
				}
			}
		)
	},




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
	 * 添加 书单 评论
	 * @returns {AxiosPromise<any>}
	 */
	BookListCommentAdd({bookListId, content}) {
		return axios.get(
			nodeServiceUrl, {
				params:{
					url:'https://mage.if.qidian.com/Atom.axd/Api/BookListComment/Add',
					method:'post',
					param:paramsToUrlParam({
						bookListId:bookListId,
						content:content
					}),
				}
			}
		)
	},

	/**
	 * 精选中 的书籍
	 * @returns {AxiosPromise<any>}
	 */
	BookStoreGetList(option) {
		return axios.get(
			nodeServiceUrl, {
				params:{
					url:'https://mage.if.qidian.com/Atom.axd/Api/BookStore/GetBookStoreList',
					method:'get',
					param:paramsToUrlParam({
						rCount:option.rCount || 4,
						rdm:1532591067,
						sId:option.sId || 0, //0 男  1女
					}),
				}
			}
		)
	},
	/**
	 * 精选中 推荐
	 * @returns {AxiosPromise<any>}
	 */
	BookStoreGetIntellRecommend(options) {
		return axios.get(
			nodeServiceUrl, {
				params:{
					url:'https://mage.if.qidian.com/Atom.axd/Api/Recommend/GetIntellRecommend',
					method:'get',
					param:paramsToUrlParam({
						ndreson:options.ndreson || 1,
						pageIndex:options.pageIndex || 1,
						pageSize:options.pageSize || 20,
						rCount:options.rCount || 4,
						rectype:options.rectype || 201,
					}),
				}
			}
		)
	},

	/**
	 * 获取 书单 评论
	 * lookType 0 全部  1只看作者
	 * @returns {AxiosPromise<any>}
	 */
	BookListCommentGetList({bookListId, lookType, page}) {
		return axios.get(
			nodeServiceUrl, {
				params:{
					url:'https://mage.if.qidian.com/Atom.axd/Api/BookListComment/GetList',
					method:'get',
					param:paramsToUrlParam({
						bookListId:bookListId,
						lookType:lookType,
						page: page,
						size:20,
						timestamp:12345
					}),
				}
			}
		)
	},

	/**
	 * 获取 书单 推荐
	 * lookType 0 全部  1只看作者
	 * @returns {AxiosPromise<any>}
	 */
	BookListGetRelation({bookId}) {
		return axios.get(
			nodeServiceUrl, {
				params:{
					url:'https://mage.if.qidian.com/Atom.axd/Api/BookList/GetRelation',
					method:'post',
					param:paramsToUrlParam({
						bookid:bookId,
						isRecommended:	1,
						page:	1,
						size:	3,
						type:	2,
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
	 * 书单 收到的花束明细
	 * @returns {AxiosPromise<any>}
	 */
	BookListGetReceiveList({page}) {
		return axios.get(
			nodeServiceUrl, {
				params:{
					url:'https://mage.if.qidian.com/Atom.axd/Api/BookList/GetReceiveList',
					method:'get',
					param:paramsToUrlParam({
						page:1,
						size:20,
					}),
				}
			}
		)
	},

	/**
	 * 书单 修改时 获取 粗略信息
	 * @returns {AxiosPromise<any>}
	 */
	BookListGetInfo({bookListId}) {
		return axios.get(
			nodeServiceUrl, {
				params:{
					url:'https://mage.if.qidian.com/Atom.axd/Api/BookList/GetBookListInfo',
					method:'get',
					param:paramsToUrlParam({
						id:bookListId
					}),
				}
			}
		)
	},

	/**
	 * 我的书单 添加书籍之前
	 * @returns {AxiosPromise<any>}
	 */
	BookListBeforeAddBook({bookListId, bookid, labelId}) {
		return axios.get(
			nodeServiceUrl, {
				params:{
					url:'https://mage.if.qidian.com/Atom.axd/Api/BookList/BeforeAddBook',
					method:'get',
					param:paramsToUrlParam({
						bookid:bookid,
						id:bookListId,
						labelId:labelId,
					}),
				}
			}
		)
	},

	/**
	 * 我的书单 添加书籍
	 * @returns {AxiosPromise<any>}
	 */
	BookListAddBook({bookListId, bookid, recom}) {
		return axios.get(
			nodeServiceUrl, {
				params:{
					url:'https://mage.if.qidian.com/Atom.axd/Api/BookList/AddBook',
					method:'post',
					param:paramsToUrlParam({
						bookid:bookid,
						id:bookListId,
						recom:recom,
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
	 * 更新书单
	 * @returns {AxiosPromise<any>}
	 */
	BookListUpdate({desc, name, id, label, labelId}) {
		return axios.get(
			nodeServiceUrl, {
				params:{
					url:'https://mage.if.qidian.com/Atom.axd/Api/BookList/Update',
					method:'post',
					param:paramsToUrlParam({
						des: desc,
						name: name,
						id: id,
						label: label,
		                labelId: labelId,
					}),
				}
			}
		)
	},

	/**
	 * 删除书单
	 * @returns {AxiosPromise<any>}
	 */
	BookListDel({id}) {
		return axios.get(
			nodeServiceUrl, {
				params:{
					url:'https://mage.if.qidian.com/Atom.axd/Api/BookList/Del',
					method:'post',
					param:paramsToUrlParam({
						id: id,
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
