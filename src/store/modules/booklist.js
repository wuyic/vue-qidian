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
		des: "已经达到创建书单上限了哦~",
		enable: 2,
		myCreate: [],
		url: "https://acts.qidian.com/2017/5799909/index.html",
		urlText: "了解详情",
	},

	/**
	 * 创建书单基础信息
	 */
	createBookList: {},

	/**
	 * 创建书单的颜色
	 */
	color:[
		'#9b9b9b',
		'#d43c33'
	],
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
			state.myBookList = data
		}
	},

	/**
	 *
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
		state.bookList.pageIndex > 1 && commit('loading/setShowBottom', true, {root: true});
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

	refreshData({state, commit, RootState}) {
		commit('refreshInit');
		console.log('state', state);
		actions.getMyCollectBookListA({state, commit, RootState});
		actions.getMyBookList({state, commit, RootState});
		commit('loading/setMarginTopDis',{}, {root: true});
	}
};

export default {
	namespaced: true,
	state,
	mutations,
	getters,
	actions
}
