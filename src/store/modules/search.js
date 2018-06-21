import api from '../../api/api'

const state = {
	keyWord:'',
	ansList:'',
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
		state.list = [...list];
	},

	/**
	 * 添加查询列表 更多
	 */
	setAnsListMore(state, list) {
		state.list = [...state.list, ...list];
	},

};

/**
 * @type {{}}
 */
const getters = {

};

/**
 * @type {{}}
 */
const actions = {
	/**
	 *
	 */
	setKeyWord({state, commit, RootState, keyWord}) {
		commit('setKeyWord', keyWord);
	},
};

export default {
	state,
	mutations,
	getters,
	actions
}
