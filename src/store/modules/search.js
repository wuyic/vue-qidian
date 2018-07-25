import api from '../../api/api'

let sleep = (ms) => {
	return new Promise((resolve) => {
		setTimeout(resolve, ms)
	})
};
const state = {

	/**
	 * 页面切换状态
	 * recommond  searchHistory searchTip  searchAns
	 */
	pageState: 'recommond',

	/**
	 * 搜索关键词
	 */
	keyWord: '',

	/**
	 *  搜索结果
	 */
	ansList: '',

	/**
	 *  搜索顶部热词列表
	 */
	searchTops: [],

	/**
	 *  搜索顶部热词索引
	 */
	searchTopsChangeIndex: 0,

	/**
	 *  搜索历史记录
	 */
	searchHistory: [],

	/**
	 * 搜索自动补全
	 *   myBookcast: 书架列表中的
		 booklist:   搜索的书单
		 otherData:  搜索的其他数据
	 */
	searchTips: {
		myBookcase: [],
		booklist: [],
		otherData: []
	},

	/**
	 * 搜索结果
	 * bookCardList 搜索出书名后的推荐
	 */
	searchResult: {
		book: [],
		bookCardList: [],
		bookList: [],
		bookPageIndex: 1,
		bookListPageIndex: 1,
		bookLoading: false,
		bookListLoading: false,
	}
};


/**
 *
 */
const mutations = {

	/**
	 *
	 */
	changePageState(state, pageState) {
		state.pageState = pageState;
	},

	/**
	 * 设置关键词
	 * @param state
	 * @param bookcase
	 */
	setKeyWord(state, word) {
		state.keyWord = word;
	},

	/**
	 * 设置查询列表
	 */
	setAnsList(state, list) {
		state.ansList = [...list];
	},

	/**
	 * 添加查询结果 更多
	 */
	setAnsListMore(state, list) {
		state.ansList = [...state.ansList, ...list];
	},

	/**
	 * 搜索热词 换一换
	 * @param state
	 * @param list
	 */
	changeSearchTopsChangeIndex(state) {
		state.searchTopsChangeIndex = (state.searchTopsChangeIndex + 1) % Math.ceil(state.searchTops.length / 10);
	},

	/**
	 * 设置顶部热词
	 * @param state
	 * @param list
	 */
	setSearchTops(state, list) {
		state.searchTops = [...list];
	},

	/**
	 * 设置搜索历史 去重复
	 * @param state
	 * @param word
	 */
	setSearchHistory(state, word) {
		let indexOld = state.searchHistory.indexOf(word);
		indexOld > -1 && state.searchHistory.splice(indexOld, 1);
		state.searchHistory.unshift(word);
		state.searchHistory.length > 50 && state.searchHistory.pop();
	},

	/**
	 * 清空搜索历史
	 * @param state
	 */
	cleanSearchHistory(state) {
		state.searchHistory = [...[]];
	},

	/**
	 * 获取搜索自动补全列表
	 */
	setSearchAutoComputed(state, {type, data}) {
		data = data || [];
		state.searchTips[type] = [...data];
	},

	/**
	 * 设置搜索结果
	 */
	setSearchResult(state, {list, type, isNew}) {
		console.log(list, type);

		isNew && (state.searchResult[type] = [...list]);

		!isNew && (state.searchResult[type] = [... state.searchResult[type] || [], ...list]);

	}


};

/**
 * @type {{}}
 */
const getters = {

	/**
	 * 改变页面状态
	 */
	pageState: (state) => {
		return state.pageState;
	},

	/**
	 * 获取关键词
	 * @param state
	 */
	getKeyWord: (state) => {
		return state.keyWord;
	},

	/**
	 * 获取搜索热词
	 * @param state
	 * @param getters
	 * @param rootState
	 * @returns {Array.<*>}
	 */
	searchTopsGetByIndex: (state, getters, rootState) => {
		let min = state.searchTopsChangeIndex * 10;
		let max = state.searchTopsChangeIndex * 10 + 10;
		return state.searchTops.filter((ad, i) => min <= i && i < max)
	},

	/**
	 * 获取搜索历史列表
	 * @param state
	 * @returns {Array}
	 */
	getSearchHistory: (state) => {
		return state.searchHistory;
	},

	/**
	 * 获取搜索自动补全
	 * @param state
	 * @returns {Array}
	 */
	getSearchTips: (state) => {
		return state.searchTips;
	},

	//获取搜索结果
	getSearchResult: (state) => {
		return state.searchResult;
	},

	/**
	 * 处理查询出的结果（飙红）
	 * @param state
	 */
	dealAnsWord: (state) => (word) => {
		if (state.keyWord.length > 0) {
			let re = new RegExp(state.keyWord, 'g');
			let ans = "<span style='color:#c4483c'>" + state.keyWord + "</span>";
			return word.replace(re, ans);
		} else {
			return word;
		}
	}
};

/**
 * @type {{}}
 */
const actions = {

	/**
	 * 改变页面状态
	 */
	changePageState({state, commit}, pageState) {
		console.log('changePageState', pageState);
		switch (pageState) {
			case 'searchHistory':
				state.keyWord == '' && state.searchHistory.length > 0 && commit('changePageState', pageState);
				break;
			default :
				if (['searchAns', 'searchTip', 'recommond'].indexOf(pageState) != -1)
					commit('changePageState', pageState);
				break;
		}
	},


	/**
	 * 设置关键词
	 */
	setKeyWord({state, commit, rootState}, keyWord) {

		if (keyWord != state.keyWord) {
			commit('setKeyWord', keyWord);
			keyWord.length && actions.getSearchAutoComputed({state, commit, rootState});
		}

		if (!state.keyWord.length) {
			actions.changePageState({state, commit, rootState}, 'searchHistory');
		} else {
			actions.changePageState({state, commit, rootState}, 'searchTip');
		}
	},

	/**
	 * 获取顶部热词
	 * @param state
	 * @param commit
	 * @param rootState
	 */
	setSearchTop({state, commit, rootState}) {
		api.getSearchTop().then(
			data => {
				console.log('获取搜索顶部提示成功', data);
				commit('setSearchTops', data.data.Data)
			}
		)
	},

	/**
	 *  获取自动补全
	 *  补全由两部分组成 一个是 BookListInfo（书单） 一个是Data（书籍或作者）
	 */
	getSearchAutoComputed({state, commit, rootState}) {
		console.log(rootState)
		if (state.keyWord.length > 0 && state.keyWord.replace(/[' ']/g, "").length > 0) {
			console.log(rootState.bookcase.bookCase.getBookGrepName(state.keyWord));
			commit('setSearchAutoComputed', {type:'myBookcase', data:rootState.bookcase.bookCase.getBookGrepName(state.keyWord)})

			api.getSearchAutoComputed(encodeURIComponent(state.keyWord)).then(
				data => {
					console.log('获取搜索提示成功', data);
					//设置书单
					if (data.data.BookListInfo && data.data.BookListInfo.BookList) {
						commit('setSearchAutoComputed', {type: 'booklist', data: data.data.BookListInfo.BookList})
					}
					if (data.data.Data && data.data.Data.length) {
						commit('setSearchAutoComputed', {type: 'otherData', data: data.data.Data});
					}
				}
			)
		}
	},

	/**
	 * 改变顶部热词
	 * @param state
	 * @param commit
	 */
	changeSearchTops({state, commit}) {
		commit('changeSearchTopsChangeIndex');
	},

	/**
	 * 设置搜索历史
	 */
	setSearchHistory({state, commit}, searchHistory) {
		commit('setSearchHistory', searchHistory);
	},

	/**
	 * 清空搜索历史
	 * @param state
	 * @param commit
	 */
	cleanSearchHistory({state, commit}) {
		commit('cleanSearchHistory');
		actions.changePageState({state, commit}, 'recommond');

	},

	/**
	 * 监听键盘
	 */
	onKeyPressEnter({state, commit}, e) {
		console.log(e);
		if (e.keyCode == 13 && state.keyWord.length > 0 && state.keyWord.replace(/[' ']/g, "").length > 0) {
			actions.searchByKeyWord({state, commit}, {type: 'all'});
		}
	},

	/**
	 * 确认搜索
	 */
	searchByKeyWord({state, commit, rootState}, {type, item}) {

		//更改页面状态
		actions.changePageState({state, commit}, 'searchAns');

		// //如果传入了关键词
		if (item && item.length) {
			commit('setKeyWord', item);
		}

		//添加搜索历史
		commit('setSearchHistory', state.keyWord);

		let keyWord = encodeURIComponent(state.keyWord);
		if (rootState != undefined && rootState.loading.isShowBottom) {
			return;
		}


		if (type == 'all' || type == 'book') {

			state.searchResult.bookPageIndex > 1 && commit('loading/setShowBottom', true, {root: true});
			api.getSearchBook(keyWord, state.searchResult.bookPageIndex).then(
				data => {
					state.searchResult.bookPageIndex += 1;
					commit('loading/setShowBottom', false, {root: true});
					console.log('查询书籍成功', data);
					commit('setSearchResult', {list: data.data.Data || [], type: 'book', isNew: type == 'all'})

					commit('setSearchResult', {
						list: data.data.CardList || [],
						type: 'bookCardList',
						isNew: true
					})
				}
			)
		}


		if (type == 'all' || type == 'bookList') {
			state.searchResult.bookListPageIndex > 1 && commit('loading/setShowBottom', true, {root: true});

			api.getSearchBookList(keyWord, state.searchResult.bookListPageIndex).then(
				data => {
					if (state.searchResult.bookListPageIndex > 1) {
						commit('loading/setShowBottom', false, {root: true});
					}
					state.searchResult.bookListPageIndex += 1;

					console.log('查询书单成功', data);
					commit('setSearchResult', {
						list: data.data.Data && data.data.Data.BookList || [],
						type: 'bookList',
						isNew: type == 'all'
					})
				}
			);
		}
	}

};

export default {
	namespaced: true,
	state,
	mutations,
	getters,
	actions
}
