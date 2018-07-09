import api from '../../api/api'

/**
 *  加载中
 */
const state = {
	isShowBottom:false
};
/**
 *
 */
const mutations = {
	/**
	 * 设置状态
	 * @param state
	 */
	setShowBottom(state, status) {
		state.isShowBottom = status;
	},
};

/**
 * @type {{}}
 */
const getters = {
	getShowBottomStatus: (state)  => {
		return state.isShowBottom;
	},
};

/**
 * @type {{}}
 */
const actions = {
	setShowBottom({state, commit}, status) {
		commit('getShowBottomStatus', status);
	}
};

export default {
	namespaced: true,
	state,
	mutations,
	getters,
	actions
}