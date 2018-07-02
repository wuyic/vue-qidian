import api from '../../api/api'

const state = {
	keyWord:'',
	ansList:'',
	searchTops:[],
	searchTopsChangeIndex:0,

	searchHistory:[],
};


/**
 *
 */
const mutations = {
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
	 *
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
	}
};

/**
 * @type {{}}
 */
const getters = {
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
	}
};

/**
 * @type {{}}
 */
const actions = {
	/**
	 * 设置关键词
	 */
	setKeyWord({state, commit, RootState}, keyWord) {
		commit('setKeyWord', keyWord);
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
	}
};

export default {
	namespaced: true,
	state,
	mutations,
	getters,
	actions
}
