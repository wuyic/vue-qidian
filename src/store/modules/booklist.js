import api from '../../api/api'

const state = {
	count: 0,
	bookList: {
		list:[],
		pageIndex:1,
		isOver:false,
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
	 * openPhoneTips
	 */
	openPhoneTips:false,

	/**
	 * 创建书单基础信息
	 */
	createBookList: {
		nameMaxWord:25,
		infoMaxWord:500,
		backgroundColor:['', '#f1f4f3']

	},

	/**
	 * 创建书单的颜色
	 */
	color:[
		'#9b9b9b',
		'#d43c33'
	],

	/**
	 * 校验安全手机号
	 */
	HasSafePhone:0,  //0不行 1行
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
	 * 刷新
	 */
	refreshInit(state) {
		// state.bookList.list = [...[]];
		state.bookList.pageIndex = 1;
		state.bookList.isOver = false;
		// state.myBookList.myCreate = [...[]];
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
	}

};

/**
 * @type {{}}
 */
const actions = {
	/**
	 * 获取我收藏的书单列表
	 */
	getMyCollectBookListA({state, commit, RootState}) {
		!state.bookList.isOver && state.bookList.pageIndex > 1 && commit('loading/setShowBottom', true, {root: true});
		!state.bookList.isOver && api.getBookList({pageIndex:state.bookList.pageIndex}).then(data => {
			console.log('获取我关注的书单', data);
			data.data.Data && state.bookList.pageIndex++;
			data.data.Data && data.data.Data.length < 20 && commit('setBookListState', {isOver:true});
			console.log('isOver : ',state.bookList.isOver);
			if (state.bookList.pageIndex > 1) {
				commit('loading/setShowBottom', false, {root: true});
			}
			commit('setBookList', {booklist:data.data.Data || [], isNew:state.bookList.pageIndex<=2});
		})
	},

	/**
	 * 获取我创建的书单
	 * @param state
	 * @param commit
	 * @param RootState
	 */
	getMyBookList({state, commit, RootState}) {
		api.getMyBookList().then(data => {
			console.log('获取我的书单成功', data);
			commit('setMyBookList', data.data.Data);
		})
	},

	/**
	 * 下拉刷新
	 * @param state
	 * @param commit
	 * @param RootState
	 */
	refreshData({state, commit, RootState}) {
		commit('refreshInit');
		console.log('state', state);
		actions.getMyCollectBookListA({state, commit, RootState});
		actions.getMyBookList({state, commit, RootState});
		commit('loading/setMarginTopDis',{}, {root: true});
	},


	/**
	 * 点击创建书单后
	 * @param state
	 * @param commit
	 * @param RootState
	 */
	myBookListAddClick({state, commit, RootState}, {router}) {
		if (state.myBookList.enable == 2) {
			return ;
		}
		api.checkSafePhone().then(
			data=>{
				console.log('校验手机号返回', data);
				if (data.data.Data.HasSafePhone == 1) {
					state.openPhoneTips = false;
					router.push({name:'myBookListCreate'})
				} else {
					state.openPhoneTips = true;
				}
			}
		).catch(

		)

	}
};

export default {
	namespaced: true,
	state,
	mutations,
	getters,
	actions
}
