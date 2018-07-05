import api from '../../api/api'

const state = {

	/**
	 * 页面切换状态
	 * recommond  searchHistory searchTip  searchAns
	 */
	pageState:'recommond',

	/**
	 * 搜索关键词
	 */
	keyWord:'',

	/**
	 *  搜索结果
	 */
	ansList:'',

	/**
	 *  搜索顶部热词列表
	 */
	searchTops:[],

	/**
	 *  搜索顶部热词索引
	 */
	searchTopsChangeIndex:0,

	/**
	 *  搜索历史记录
	 */
	searchHistory:[
		'张三'
	],

	/**
	 * 搜索自动补全
	 */
	searchTips:[],

	/**
	 * 搜索结果
	 */
	searchResult:{
		book:[],
		bookList:[],
		bookPageIndex:1,
		bookListPageIndex:1,
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
		state.searchTopsChangeIndex = (state.searchTopsChangeIndex + 1) % Math.ceil(state.searchTops.length/10);
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
	 * 设置搜索历史
	 * @param state
	 * @param word
	 */
	setSearchHistory(state, word) {
		state.searchHistory.unshift(word);
		if (state.searchHistory.length > 50) {
			state.searchHistory.pop();
		}
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
	setSearchAutoComputed(state, list) {
		state.searchTips = [...list];
	},

	/**
	 * 设置搜索结果
	 */
	setSearchResult(state, {list, type}) {
		console.log(list, type);
		state.searchResult[type] = [... state.searchResult[type] || [], ...list];
	}


};

/**
 * @type {{}}
 */
const getters = {

	/**
	 *
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
		let min = state.searchTopsChangeIndex*10;
		let max = state.searchTopsChangeIndex*10 + 10;
		return state.searchTops.filter((ad, i) =>  min<=i && i< max)
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

	getSearchResult:(state) => type => {
		return state.searchResult[type];
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
	setKeyWord({state, commit, RootState}, keyWord) {
		commit('setKeyWord', keyWord);
		if (keyWord != state.keyWord && keyWord.length) {
			actions.getSearchAutoComputed({state, commit});
		}
		if (!state.keyWord.length && state.pageState != 'searchAns') {
			actions.changePageState({state, commit, RootState}, 'searchHistory');
		} else if (state.pageState != 'searchAns'){
			actions.changePageState({state, commit, RootState}, 'searchTip');
		}
	},

	/**
	 * 获取顶部热词
	 * @param state
	 * @param commit
	 * @param RootState
	 */
	setSearchTop({state,commit, RootState}) {
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
	getSearchAutoComputed({state, commit}) {
		state.keyWord.length > 0 && state.keyWord.replace(/[' ']/g,"").length > 0
		&& api.getSearchAutoComputed(encodeURIComponent(state.keyWord)).then(
			data => {
				console.log('获取搜索提示成功', data);
				let temList = (data.data.BookListInfo && data.data.BookListInfo.BookList) || [] ;
				data.data && data.data.Data.length && (temList = [...temList, ...data.data.Data]);
				commit('setSearchAutoComputed', temList);
			}
		)
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
		if(e.keyCode == 13 && state.keyWord.length > 0 && state.keyWord.replace(/[' ']/g,"").length > 0){
			actions.searchByKeyWord({state, commit}, {type:'all'});
		}
	},

	/**
	 * 确认搜索
	 */
	searchByKeyWord({state, commit}, {type, item}) {
		//更改页面状态
		actions.changePageState({state, commit}, 'searchAns');


		//如果传入了关键词
		if (item && item.length) {
			commit('setKeyWord', item);
		}

		//添加搜索历史
		commit('setSearchHistory', state.keyWord);


		let keyWord = encodeURIComponent(state.keyWord);

		(type == 'all' || type == 'book') &&
			api.getSearchBook(keyWord, state.searchResult.bookPageIndex).then(
				data=>{
					console.log('查询书籍成功',data);
					commit('setSearchResult', {list:data.data.Data || [], type:'book'})
				}
		);

		(type == 'all' || type == 'bookList') &&
			api.getSearchBookList(keyWord, state.searchResult.bookListPageIndex).then(
				data=>{
					console.log('查询书单成功',data);
					commit('setSearchResult', {list:data.data.Data.BookList || [], type:'bookList'})
				}
		);
	}
};

export default {
	namespaced: true,
	state,
	mutations,
	getters,
	actions
}
