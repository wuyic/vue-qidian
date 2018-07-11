import api from '../../api/api'

const state = {
	count: 0,
	bookList: {
		list:[],
		pageIndex:1
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
	 * 设置我的书单
	 */
	setMyBookList(state, data) {
		if (data) {
			state.myBookList = data
		}
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

};

/**
 * @type {{}}
 */
const actions = {
	/**
	 *
	 */
	getBookList({state, commit, RootState}) {


		api.getBookList({pageIndex:state.bookList.pageIndex}).then(data => {
			console.log('获取我关注的书单', data);
			commit('setBookList', {booklist:data.data.Data || [], isNew:state.bookList.pageIndex==1});
			state.bookList.pageIndex++;
		})
	},

	getMyBookList({state, commit, RootState}) {
		api.getMyBookList().then(data => {
			console.log('获取我的书单成功', data);
			commit('setMyBookList', data.data.Data);
		})
	}
};

export default {
	namespaced: true,
	state,
	mutations,
	getters,
	actions
}
