import api from '../../api/api'

const state = {
	count: 0,
	/**
	 * 我的书单 书单列表
	 */
	bookList: {
		list: [],
		pageIndex: 1,
		isOver: false,
	},
	/**
	 书单内详细书籍
	 */
	bookListInfo: [],

	/**
	 * 我的书单
	 */
	myBookList: {
		"enable": 1,
		"url": "https://acts.qidian.com/2017/5799909/index.html",
		"des": "你可以创建书单哦~",
		"urlText": "了解详情",
		"myCreate": []
	},

	/**
	 * 创建书单时判断手机号
	 * openPhoneTips
	 */
	openPhoneTips: false,

	/**
	 * 校验安全手机号
	 */
	HasSafePhone: 0,  //0不行 1行

	/**
	 * 创建书单基础信息
	 */
	createBookList: {
		nameMaxWord: 25,
		infoMaxWord: 500,
		backgroundColor: ['#fef4f3', '#f6f7f9'],
		color: ['#d43c33', '#333'],
		name: '',
		info: '',
		myBookListId: 0,
	},

	/**
	 * 创建书单的颜色
	 */
	color: [
		'#9b9b9b',
		'#d43c33'
	],

	/**
	 * 书单详情
	 */
	bookListDetail: {
		id: 455220,
		// id:358648,
		tips: {
			"authorHeadImg": "https://qidian.qpic.cn/qd_face/349573/5783386/100",
			"authorId": 2380038,
			"authorName": "感动中国",
			"ownerDes": "史上最强老书虫",
			"isSelfCreate": 0,
			"tipTimes": 1595,
			"userBalance": 501,
			"readingCoupons": 0,
			"helpUrl": "http://ih5.if.qidian.com/statics/help/ios/help_booklist.htm",
			"qdText": "优质书单需要鼓励，献花支持一下吧",
			"gearList": [{
				"price": 10,
				"selected": 1,
				"unit": "点",
				"text": "1"
			}, {
				"price": 50,
				"selected": 0,
				"unit": "点",
				"text": "6"
			}, {
				"price": 100,
				"selected": 0,
				"unit": "点",
				"text": "15"
			}],
			"voteHistoryList": [{
				"userImg": "https://qidian.qpic.cn/qd_face/349573/5567283/100"
			}, {
				"userImg": "https://qidian.qpic.cn/qd_face/349573/1079692/100"
			}, {
				"userImg": "https://qidian.qpic.cn/qd_face/349573/1970579/100"
			}, {
				"userImg": "https://qidian.qpic.cn/qd_face/349573/5424917/100"
			}, {
				"userImg": "https://qidian.qpic.cn/qd_face/349573/3081101/100"
			}, {
				"userImg": "https://qidian.qpic.cn/qd_face/349573/775022/100"
			}]
		},
		info: {},
		books: [],
		pageIndex: 1,
		isOver: false,
		filter: {
			categoryId: -1,
			pageIndex: 1,
			isOver: false,
		},
	},
	/**
	 * 书单讨论
	 */
	bookListDiscuss:{
		pageIndex: 1,
		isOver: false,
		list:[],
		lookType:0, //0 all  1 only author
		textShow:[
			'只看单主',
			'查看全部'
		],
		commentCount:0,
	}
};


/**
 *
 */
const mutations = {
	/**
	 * 设置书单
	 * @param state
	 * @param bookcase
	 */
	setBookList(state, {booklist, isNew}) {
		if (isNew) {
			state.bookList.list = [...booklist];
		} else {
			state.bookList.list = [...state.bookList.list, ...booklist];
		}
	},
	/**
	 * 设置查询结束
	 * @param state
	 * @param bookcase
	 */
	setBookListState(state, {isOver}) {
		state.bookList.isOver = isOver;
	},

	/**
	 * 设置我的书单
	 */
	setMyBookList(state, data) {
		if (data) {
			state.myBookList = data;
			if (!state.myBookList.myCreate) {
				state.myBookList.myCreate = [...[]];
			}
		}
	},

	/**
	 * 刷新 我的书单列表
	 */
	refreshInit(state) {
		// state.bookList.list = [...[]];
		state.bookList.pageIndex = 1;
		state.bookList.isOver = false;
		// state.myBookList.myCreate = [...[]];
	},

	/**
	 * 刷新  书单详情
	 */
	refreshBookListDetail(state) {
		state.bookListDetail = {
			id: 455220,
			tips: {
				"gearList": [],
				"voteHistoryList": []
			},
			info: {},
			books: [],
			pageIndex: 1,
			isOver: false,
			filter: {
				categoryId: -1,
				pageIndex: 1,
				isOver: false,
			}
		};
		state.bookListDiscuss = {
			pageIndex: 1,
				isOver: false,
				list:[],
				lookType:0, //0 all  1 only author
				textShow:[
				'只看单主',
				'查看全部'
			],
				commentCount:0,
		}
	},

	/**
	 * 创建书单时， 属性
	 */
	setCreateValue: (state, {type, value}) => {
		state.createBookList[type] = value;
	},

	/**
	 * 书单详情内的书籍列表
	 */
	setBookInBookListDetail: (state, list) => {
		if (state.bookListDetail.pageIndex == 1) {
			state.bookListDetail.books = [...list];
		} else {
			state.bookListDetail.books = [...state.bookListDetail.books, ...list];
		}
	},

	/**
	 * 书单讨论
	 */
	setBookInBookListDiscussList: (state, {list, count}) => {
		state.bookListDiscuss.commentCount = count;
		if (state.bookListDiscuss.pageIndex == 1) {
			state.bookListDiscuss.list = [...list];
		} else {
			state.bookListDiscuss.list = [...state.bookListDiscuss.books, ...list];
		}
	},

	/**
	 * 刷新 书单讨论
	 */
	refreshBookListDiscuss: (state) => {
		state.bookList.pageIndex = 1;
		state.bookList.isOver = false;
	}
};

/**
 * @type {{}}
 */
const getters = {
	getMyBookList(state) {
		return state.myBookList;
	},

	getMyCollectBookList(state) {
		return state.bookList;
	},
	getColor(state) {
		if (state.myBookList.myCreate && state.myBookList.myCreate.length > 0) {
			return state.color[0];
		}
		return state.color[1];
	},
	getOpenPhoneTips(state) {
		return state.openPhoneTips;
	},
	/**
	 * 获取创建书单时的信息
	 * @param state
	 * @returns {state.createBookList|{nameMaxWord, infoMaxWord, backgroundColor, color, name, info}}
	 */
	getCreateBookInfo(state) {
		return state.createBookList;
	},

	getCreateBookListColor: (state) => (type) => {
		let obj = state.createBookList;
		switch (type) {
			case 'nameTextColor':
				if (obj.name.length > obj.nameMaxWord) {
					return obj.color[0];
				}
				return obj.color[1];
				break;

			case 'nameBackGroundColor':
				if (obj.name.length > obj.nameMaxWord) {
					return obj.backgroundColor[0];
				}
				return obj.backgroundColor[1];
				break;
			case 'infoTextColor':
				if (obj.info.length > obj.infoMaxWord) {
					return obj.color[0];
				}
				return obj.color[1];
				break;
			case 'infoBackGroundColor':
				if (obj.name.length > obj.infoMaxWord) {
					return obj.backgroundColor[0];
				}
				return obj.backgroundColor[1];
				break;
		}
	},

	/**
	 * title右上角创建的透明度
	 * @param state
	 * @returns {number}
	 */
	getCreateOpt(state) {
		let obj = state.createBookList;
		console.log(obj.name.length, obj.info.length);
		if (obj.name.length > 0 && obj.name.length <= obj.nameMaxWord &&
			obj.info.length > 0 && obj.info.length <= obj.infoMaxWord) {
			return 1;
		}
		return 0.5;
	},

	/**
	 *  书单详情
	 */
	getterBookListDetail(state) {
		return state.bookListDetail;
	},

	/**
	 * 书单讨论详情
	 * @param state
	 */
	getBookListDiscussGetter(state) {
		return state.bookListDiscuss;
	}


};

/**
 * @type {{}}
 */
const actions = {
	/**
	 * 获取我收藏的书单列表
	 */
	getMyCollectBookListA({state, commit, rootState}) {
		!state.bookList.isOver && state.bookList.pageIndex > 1 && commit('loading/setShowBottom', true, {root: true});
		!state.bookList.isOver && api.getBookList({pageIndex: state.bookList.pageIndex}).then(data => {
			console.log('获取我关注的书单', data);
			data.data.Data && state.bookList.pageIndex++;
			data.data.Data && data.data.Data.length < 20 && commit('setBookListState', {isOver: true});
			console.log('isOver : ', state.bookList.isOver);
			if (state.bookList.pageIndex > 1) {
				commit('loading/setShowBottom', false, {root: true});
			}
			commit('setBookList', {booklist: data.data.Data || [], isNew: state.bookList.pageIndex <= 2});
		})
	},

	/**
	 * 获取我创建的书单
	 * @param state
	 * @param commit
	 * @param rootState
	 */
	getMyBookList({state, commit, rootState}) {
		api.getMyBookList().then(data => {
			console.log('获取我的书单成功', data);
			commit('setMyBookList', data.data.Data);
		})
	},

	/**
	 * 下拉刷新 我的书单
	 * @param state
	 * @param commit
	 * @param rootState
	 */
	refreshData({state, commit, rootState}) {
		commit('refreshInit');
		console.log('state', state);
		actions.getMyCollectBookListA({state, commit, rootState});
		actions.getMyBookList({state, commit, rootState});
		commit('loading/setMarginTopDis', {}, {root: true});
	},


	/**
	 * 点击创建书单后 校验成功则跳转到创建页面， 否则弹出提示
	 * @param state
	 * @param commit
	 * @param rootState
	 */
	myBookListAddClick({state, commit, rootState}, {router, refs, type}) {
		// refs.toastBox({type:type, status:true})
		if (state.myBookList.enable == 2) {
			return;
		}
		api.checkSafePhone().then(
			data => {
				console.log('校验手机号返回', data);
				if (data.data.Data.HasSafePhone == 1) {
					state.openPhoneTips = false;
					router.push({name: 'myBookListCreate'})
				} else {
					refs.toastBox({type: type, status: true})
				}
			}
		).catch(

		)
	},


	/**
	 * 创建书单
	 */
	createBookList({state, commit, rootState}, {router, toast}) {
		console.log('111');
		let obj = state.createBookList;
		if (obj.name.length > 0 && obj.name.length <= obj.nameMaxWord &&
			obj.info.length > 0 && obj.info.length <= obj.infoMaxWord) {
			console.log('in');
			api.BookListAdd({desc: obj.info, name: obj.name}).then(
				data => {
					console.log('创建书单返回', data);
					if (data.data.Result != 0) {
						toast({text: data.data.Message, timeout: 1500})
						// router.push({name:'bookListmyCollect'});
					} else {
						state.createBookList.myBookListId = data.data.Data.id;
						// router.push({name:'booklistDetail'});
					}
				}
			)
		}
	},

	/**
	 * 跳转到书单详情页面
	 */
	gotoBookListDetail({state, commit, rootState}, {router, id}) {
		if (id) {
			commit('refreshBookListDetail');
			state.bookListDetail.id = id;
			router.push({name: 'booklistDetail'})
		}
	},

	/**
	 * 书单详情
	 */
	getBookListDetail: ({state, commit, rootState}) => {
		let detail = state.bookListDetail;

		if (detail.id == 0) {
			return;
		}

		detail.pageIndex == 1 && api.BookListGetTipList({bookListId: detail.id}).then(
			data => {
				console.log('书单Tip获取成功', data);
				if (data.data.Result == 0) {
					state.bookListDetail.tips = data.data.Data;
				}
			}
		);
		!detail.isOver && detail.pageIndex > 1 && commit('loading/setShowBottom', true, {root: true});
		!detail.isOver && api.BookListGetDetali({bookListId: detail.id, page: detail.pageIndex}).then(
			data => {
				console.log('书单详情获取成功', data);
				if (data.data.Result == 0) {
					commit('setBookInBookListDetail', data.data.Data.books);
					state.bookListDetail.info = data.data.Data;
					data.data.Data && data.data.Data.books.length < 20 && (state.bookListDetail.isOver = true);
					state.bookListDetail.pageIndex++;
					if (state.bookListDetail.pageIndex > 1) {
						commit('loading/setShowBottom', false, {root: true});
					}
				}

			}
		)
	},

	/**
	 * 下拉刷新 书单详情
	 * @param state
	 * @param commit
	 * @param rootState
	 */
	refreshDataBookListDetail({state, commit, rootState}) {
		state.bookListDetail.pageIndex = 1;
		state.bookListDetail.isOver = false;
		actions.getBookListDetail({state, commit, rootState});
		commit('loading/setMarginTopDis', {}, {root: true});
	},

	/**
	 * 书单详情 过滤
	 */
	getBookListFilter: ({state, commit, rootState}) => {
		let detail = state.bookListDetail;
		!detail.filter.isOver && api.BookListGetDetali({bookListId: detail.id, page: detail.pageIndex}).then(
			data => {
				console.log('书单过滤', data);
				state.bookListDetail.filter.pageIndex++;
			}
		)
	},

	/**
	 * 喜欢与拍砖
	 * 喜欢成功， 则改变喜欢状态 并且在数组中改变拍砖状态
	 */
	BookListLikeOrNot: ({state, commit, rootState}, {type, index}) => {

		let detail = state.bookListDetail;
		console.log(index, detail.books[index]);
		let params = {bookid: detail.books[index].bookId, id: detail.id, type: 0};
		console.log('compare', detail.books[index]);
		if (type == 'like') {
			params.type = detail.books[index].isSelftFavored;
			let addOrDes = params.type == 1 ? -1 : 1;
			api.BookListLikeBook(params).then(
				data => {
					console.log('喜欢成功', data);
					if (data.data.Result == 0) {
						detail.books[index].beFavoredCount += addOrDes;
						detail.books[index].isSelftFavored = (detail.books[index].isSelftFavored + 1) % 2;
						console.log('compare', detail.books[index]);
						if (detail.books[index] && detail.books[index].hasDisliked == 1 && detail.books[index].isSelftFavored) {
							detail.books[index].hasDisliked = 0;
							detail.books[index].dislikedCount -= 1;
						}
					}
				}
			)
		}

		if (type == 'dislike') {
			params.type = detail.books[index].hasDisliked;
			let addOrDes = params.type == 1 ? -1 : 1;
			api.BookListDislikeBook(params).then(
				data => {
					console.log('拍砖成功', data);
					if (data.data.Result == 0) {
						detail.books[index].dislikedCount += addOrDes;
						detail.books[index].hasDisliked = (detail.books[index].hasDisliked + 1) % 2;
						if (detail.books[index] && detail.books[index].isSelftFavored == 1 && detail.books[index].hasDisliked) {
							detail.books[index].isSelftFavored = 0;
							detail.books[index].beFavoredCount -= 1;
						}
					}
				}
			)
		}
	},

	/**
	 * 收藏书单 取消收藏  0收藏  1取消收藏
	 */
	BookListCollect: ({state, commit, rootState}) => {
		let detail = state.bookListDetail;
		api.BookListCollect({bookListId: detail.info.id, type: detail.info.isCollect}).then(
			data => {
				console.log('添加/取消收藏书单成功', data);
				state.bookListDetail.info.isCollect = (detail.info.isCollect + 1) % 2;
				state.bookListDetail.info.collectCount += (detail.isCollect == 1 ? -1 : 1);
			}
		)
	},

	/**
	 * 送花状态更改
	 */
	changeTipsGearList: ({state, commit, rootState}, {index}) => {
		let gearList = state.bookListDetail.tips.gearList;
		gearList.forEach((item, i) => {
			if (index == i) {
				gearList[i].selected = 1;
			} else {
				gearList[i].selected = 0;
			}
		})
	},

	/**
	 * 书单 献花
	 */
	BookListGoTip: ({state, commit, rootState}, {index}) => {
		let gearList = state.bookListDetail.tips.gearList;
		gearList.forEach((item, i) => {
			if (index == i) {
				gearList[i].selected = 1;
			} else {
				gearList[i].selected = 0;
			}
		})
	},


	/**
	 * 获取书单讨论
	 */
	getBookListDiscuss: ({state, commit, rootState}) => {
		let detail = state.bookListDetail;
		let discuss = state.bookListDiscuss;

		if (detail.id == 0) {
			return;
		}

		!discuss.isOver && discuss.pageIndex > 1 && commit('loading/setShowBottom', true, {root: true});
		!discuss.isOver && api.BookListCommentGetList({bookListId: detail.id, page: discuss.pageIndex, lookType:discuss.lookType}).then(
			data => {
				console.log('书单讨论详情获取成功', data);
				if (data.data.Result == 0) {
					commit('loading/setMarginTopDis',{}, {root: true});
					commit('setBookInBookListDiscussList', {list:data.data.Data, count:data.data.commentCount});

					data.data.Data && data.data.Data.length < 20 && (discuss.isOver = true);
					discuss.pageIndex++;
					if (discuss.pageIndex > 1) {
						commit('loading/setShowBottom', false, {root: true});
					}
				}
			}
		)
	},

	/**
	 * 下拉刷新 书单讨论
	 * @param state
	 * @param commit
	 * @param rootState
	 */
	refreshDataBookListDiscuss({state, commit, rootState}) {
		state.bookListDiscuss.pageIndex = 1;
		state.bookListDiscuss.isOver = false;
		actions.getBookListDiscuss({state, commit, rootState});
		commit('loading/setMarginTopDis', {}, {root: true});
	},

	/**
	 * click 只看作者
	 * @param state
	 * @param commit
	 * @param rootState
	 */
	onlyReadBookListDiscuss({state, commit, rootState}) {
		commit('loading/setMarginTopDis', {value:1}, {root: true});

		state.bookListDiscuss.pageIndex = 1;
		state.bookListDiscuss.isOver = false;
		state.bookListDiscuss.lookType = (state.bookListDiscuss.lookType+1) % 2;
		actions.getBookListDiscuss({state, commit, rootState});
	},
};

export default {
	namespaced: true,
	state,
	mutations,
	getters,
	actions
}
